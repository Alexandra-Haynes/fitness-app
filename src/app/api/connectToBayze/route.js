import { GEMS } from "bayze-gems-api";

export async function GET(req, res) {
  try {
    const appId = process.env.BAYZE_APP_ID;
    const apiKey = process.env.BAYZE_API_KEY;
    const userId = process.env.BAYZE_USER_ID;
    const token = process.env.BAYZE_USER_TOKEN;

    GEMS.init({ apiKey, appId });
    GEMS.setClientCredentials(userId, token);

    const badges = GEMS.displayAllBadges();

    res.status(200).json({ success: true, badges });
  } catch (error) {
    console.error("Error connecting to Bayze:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
