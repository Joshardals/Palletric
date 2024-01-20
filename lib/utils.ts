import chroma from "chroma-js";
import SunCalc from "suncalc";

interface BaseColors {
  morning: chroma.Scale<chroma.Color>;
  afternoon: chroma.Scale<chroma.Color>;
  night: chroma.Scale<chroma.Color>;
}

export function createColorPalette(latitude: number, longitude: number): string[] {
  // Get the current date and time
  const date = new Date();
  const hour = date.getHours();

  // Use the SunCalc library to get the solar time of the user's location
  const solarTime = SunCalc.getTimes(date, latitude, longitude).solarNoon;

  // Use the SunCalc library to get the solar angle of the user's location
  const solarAngle = SunCalc.getPosition(solarTime, latitude, longitude).altitude;

  // Normalize latitude to the range [-90, 90]
  const normalizedLatitude = Math.max(-90, Math.min(90, latitude));

  // Define base colors for morning, afternoon, and night
  const baseColors: BaseColors = {
    morning: chroma.scale(['#FFA07A', '#FFD700']).mode('lch'),
    afternoon: chroma.scale(['#87CEFA', '#4682B4']).mode('lch'),
    night: chroma.scale(['#5C6BC0', '#3949AB']).mode('lch'),
  };

  // Determine the time of day based on the hour
  let timeOfDay: keyof BaseColors = 'night';
  if (hour >= 6 && hour < 12) {
    timeOfDay = 'morning';
  } else if (hour >= 12 && hour < 18) {
    timeOfDay = 'afternoon';
  }

  // Get the base color for the determined time of day
  const baseColor = baseColors[timeOfDay];

  // Adjust the base color based on latitude and solar angle
  const adjustedBaseColor = baseColor(normalizedLatitude / 90).saturate(solarAngle * 3).hex();

  // Generate a unique color palette by shifting the hue for each color
  const colorPalette = Array.from({ length: 6 }, (_, index) =>
    chroma(adjustedBaseColor).set('hsl.h', (index * 60) % 360).hex()
  );

  return colorPalette;
}
