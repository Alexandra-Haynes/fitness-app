import axios from "axios";

const API_KEY = process.env.RAPID_API_KEY;

export async function POST(req) {
  let body = await req.json();
  console.log(body);
  const { age, weight, height, gender } = body;

  try {
    const { data } = await axios.get(
      "https://health-calculator-api.p.rapidapi.com/bodyfat/imperial",
      {
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": "health-calculator-api.p.rapidapi.com",
        },
        params: { age, weight, height, gender },
      }
    );
    console.log("Data from external API:", data);

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while fetching data." }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
