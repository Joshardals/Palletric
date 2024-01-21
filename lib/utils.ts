// import chroma from "chroma-js";

// interface Location {
//   latitude: number;
//   longitude: number;
// }

// export function createColorPalette(location: Location): string[] {
//   const { latitude, longitude } = location;

//   // Normalize latitude and longitude
//   const normalizedLatitude = Math.max(-90, Math.min(90, latitude));
//   const normalizedLongitude = Math.max(-180, Math.min(180, longitude));

//   // Set the central point for color calculations
//   const centralLatitude = 0;
//   const centralLongitude = 0;

//   // Calculate the distance from the central point
//   const distance = calculateDistance(
//     normalizedLatitude,
//     normalizedLongitude,
//     centralLatitude,
//     centralLongitude
//   );

//   // Define the number of colors in the palette
//   const numColors = 6;

//   // Calculate the base hue based on the distance
//   const baseHue = mapToColorRange(distance, 0, 180, 0, 360);

//   // Create a chroma color with the calculated base hue
//   const baseColor = chroma.hsl(baseHue, 70, 50);

//   // Generate a unique color palette with smoothly transitioning hues
//   const colorPalette = Array.from({ length: numColors }, (_, index) =>
//     baseColor.set("hsl.h", (baseHue + ((index * 40) % 360) + 360) % 360).hex()
//   );

//   return colorPalette;
// }

// // Helper function to calculate the distance between two points on the globe
// function calculateDistance(
//   lat1: number,
//   lon1: number,
//   lat2: number,
//   lon2: number
// ): number {
//   const R = 6371; // Earth radius in kilometers
//   const dLat = deg2rad(lat2 - lat1);
//   const dLon = deg2rad(lon2 - lon1);

//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(deg2rad(lat1)) *
//       Math.cos(deg2rad(lat2)) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);

//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//   const distance = R * c;
//   return distance;
// }

// // Helper function to convert degrees to radians
// function deg2rad(deg: number): number {
//   return deg * (Math.PI / 180);
// }

// // Helper function to map a value from one range to another
// function mapToColorRange(
//   value: number,
//   inputMin: number,
//   inputMax: number,
//   outputMin: number,
//   outputMax: number
// ): number {
//   const normalizedValue = (value - inputMin) / (inputMax - inputMin);
//   return Math.round(outputMin + normalizedValue * (outputMax - outputMin));
// }
