import axios from "axios";
import debounce from "lodash.debounce";

const API_KEY = process.env.NEXT_PUBLIC_LOCATION_IQ_ACCESS_TOKEN;

const debouncedFetchAutoComplete = debounce(async (query: string) => {
  try {
    const res = await axios.get(
      `https://api.locationiq.com/v1/autocomplete?key=${API_KEY}&q=${query}&limit=1`
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

export async function getLocationCoordinates(location: string) {
  try {
    const res = await axios.get("https://us1.locationiq.com/v1/search", {
      params: {
        q: location,
        key: API_KEY,
        format: "json",
      },
    });

    const [result] = res.data;
    if (result) {
      const { lat, lon } = result;
      return { lat, lon };
    } else {
      console.log("Location not found");
      return null;
    }
  } catch (error: any) {
    console.log(`Error fetching location coordinates.`);
    return null;
  }
}
