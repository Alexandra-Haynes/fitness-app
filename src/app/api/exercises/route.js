import axios from "axios";

export default async function handler(req, res) {
  const { name, category, difficulty, force } = req.query;

  const options = {
    method: "GET",
    url: "https://musclewiki.p.rapidapi.com/exercises",
    headers: {
      "X-RapidAPI-Key": "dd49a69f86msh997798245d6cb35p1057cajsn472283222f56",
      "X-RapidAPI-Host": "musclewiki.p.rapidapi.com",
    },
    params: {
      name,
      category,
      difficulty,
      force,
    },
  };

  try {
    console.log("API Request URL:", options.url);
    console.log("API Request Params:", options.params);

    const response = await axios.request(options);

    console.log("API Response:", response.data);

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching exercises...", error);
    res.status(500).json({ error: "Failed to fetch exercises" });
  }
}
