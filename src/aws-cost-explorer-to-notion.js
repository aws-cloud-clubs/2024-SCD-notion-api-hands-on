const {
  CostExplorerClient,
  GetCostAndUsageCommand,
} = require("@aws-sdk/client-cost-explorer");
const dotenv = require("dotenv");
const Notion = require("@notionhq/client");

const main = async () => {
  const settings = getSettings();
  const client = new CostExplorerClient({ region: "ap-northeast-2" });
  const notion = new Notion.Client({ auth: settings.notionToken });

  const end = new Date().toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const start = end.substring(0, 8) + "01";

  console.log(`[INFO] cost explorer ${start} ~ ${end}`);

  const response = await client.send(
    new GetCostAndUsageCommand({
      TimePeriod: { Start: start, End: end },
      Granularity: "MONTHLY",
      Metrics: ["UnblendedCost"],
    })
  );

  const total = response.ResultsByTime[0]?.Total;
  const cost = `${total?.UnblendedCost?.Amount} ${total?.UnblendedCost?.Unit}`;

  await notion.blocks.children.append({
    block_id: settings.notionPageId,
    children: [
      {
        type: "callout",
        object: "block",
        callout: {
          rich_text: [
            {
              text: { content: `Current Month AWS Cost: ${cost}` },
              type: "text",
            },
          ],
        },
      },
    ],
  });
};

const getSettings = () => {
  dotenv.config();

  const notionToken = process.env.NOTION_TOKEN;
  const notionPageId = process.env.NOTION_PAGE_ID;

  if (!notionToken) {
    throw new Error("Environment variable is missing: NOTION_TOKEN");
  }

  if (!notionPageId) {
    throw new Error("Environment variable is missing: NOTION_PAGE_ID");
  }

  return { notionToken, notionPageId };
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});