import chroma from "chroma-js";
import SunCalc from "suncalc";

// Algorithm to Create Color Palette based on the user's current location.

export function createColorPalette(latitude: number, longitude: number) {
  // Get the current date and time
  const date = new Date();

  // Get the current hour
  const hour = date.getHours();

  // Use the SunCalc library to get the solar time of the user's location
  const solarTime = SunCalc.getTimes(date, latitude, longitude).solarNoon;

  // Use the SunCalc library to get the solar angle of the user's location
  const solarAngle = SunCalc.getPosition(
    solarTime,
    latitude,
    longitude
  ).altitude;

  // Convert the solar angle from radians to degrees
  const solarAngleDegrees = (solarAngle * 180) / Math.PI;

  // Let me log the solar time and the solar angle.
  // console.log(`The solar time is: ${solarTime}`);
  // console.log(`The solar angle is: ${solarAngleDegrees} degrees`);

  // Define an array for different times of the day
  const colors = [
    // Midnight
    ["#000000", "#0f0f0f", "#1f1f1f", "#2f2f2f", "#3f3f3f"],
    // Dawn
    ["#3f3f3f", "#4f4f4f", "#5f5f5f", "#6f6f6f", "#7f7f7f"],
    // Morning
    ["#7f7f7f", "#8f8f8f", "#9f9f9f", "#afafaf", "#bfbfbf"],
    // Noon
    ["#bfbfbf", "#cfcfcf", "#dfdfdf", "#efefef", "#ffffff"],
    // Afternoon
    ["#ffffff", "#efefef", "#dfdfdf", "#cfcfcf", "#bfbfbf"],
    // Dusk
    ["#bfbfbf", "#afafaf", "#9f9f9f", "#8f8f8f", "#7f7f7f"],
    // Evening
    ["#7f7f7f", "#6f6f6f", "#5f5f5f", "#4f4f4f", "#3f3f3f"],
    // Night
    ["#3f3f3f", "#2f2f2f", "#1f1f1f", "#0f0f0f", "#000000"],
  ];

  // Define a variable to store the index of the color array
  let index: any;

  // Use a switch statement to assign the index based on the hour
  switch (hour) {
    case 0:
    case 1:
    case 2:
    case 3:
      // Midnight
      index = 0;
      break;
    case 4:
    case 5:
    case 6:
      // Dawn
      index = 1;
      break;
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
      // Morning
      index = 2;
      break;
    case 12:
      // Noon
      index = 3;
      break;
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
      // Afternoon
      index = 4;
      break;
    case 18:
    case 19:
      // Dusk
      index = 5;
      break;
    case 20:
    case 21:
    case 22:
      // Evening
      index = 6;
      break;
    case 23:
      // Night
      index = 7;
      break;
  }

  // Get the color array based on the index
  let colorArray: any = colors[index];

  // Use the chroma.js library to modify the color array based on the solar time and the solar angle
  colorArray = colorArray.map((color: any) => {
    return chroma(color)
      .saturate(solarTime.getHours() / 12)
      .brighten(-latitude / 90)
      .hex();
  });

  // Use the chroma.js library to create a color scale from the color array
  const colorScale = chroma.scale(colorArray);

  // Use the chroma.js library to generate six colors from the color scale
  const colorPalette = colorScale.colors(6);

  return colorPalette;
}
