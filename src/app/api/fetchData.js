export const exerciseOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    "X-RapidAPI-Key": 'e119a0a4ecmsh9f0e8682c769d3ap16d415jsn9bda5349b4fe',
  },
};

export const youtubeOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
    "X-RapidAPI-Key": 'e119a0a4ecmsh9f0e8682c769d3ap16d415jsn9bda5349b4fe',
  },
  //process.env.REACT_APP_RAPID_API_KEY
};

export const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
};


