import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_LOCATION_IQ_ACCESS_TOKEN;

export async function fetchAutoCompleteFunction(query: string) {
  try {
    const res = await axios.get(
      `https://api.locationiq.com/v1/autocomplete?key=${API_KEY}&q=${query}`
    );
    return res.data;
  } catch (error: any) {
    console.log(`Error fetching autocomplete: ${error.message}`);
    return [];
  }
}
