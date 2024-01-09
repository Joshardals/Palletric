import axios from "axios";
import debounce from "lodash.debounce";

const API_KEY = process.env.NEXT_PUBLIC_LOCATION_IQ_ACCESS_TOKEN;

const debouncedFetchAutoComplete = debounce(async (query: string) => {
  try {
    const res = await axios.get(
      `https://api.locationiq.com/v1/autocomplete?key=${API_KEY}&q=${query}`
    );
    return res.data;
  } catch (error: any) {
    console.log(`Error fetching autocomplete: ${error.message}`);
    return [];
  }
}, 300);

export async function fetchAutoCompleteFunction(query: string) {
  return debouncedFetchAutoComplete(query);
}
