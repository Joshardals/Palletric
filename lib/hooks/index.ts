import axios from "axios";

export async function fetchAutoCompleteFunction(api_key: string, query: string) {
  try {
    const res = await axios.get(
      `https://api.locationiq.com/v1/autocomplete?key=${api_key}&q=${query}`
    );
    return res.data;
  } catch (error: any) {
    console.log(`Error fetching autocomplete: ${error.message}`);
    return [];
  }
}
