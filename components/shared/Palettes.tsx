import ColorTiles from "./ColorTiles";

export default function Palettes() {
  return (
    <section className="w-full space-y-6">
      {/* Options inlcudes: Color Palettes, Inspired Palettes, Explore Hues, Location-Inspired Palettes */}
      <div className="space-y-2">
        <h1 className="h1-bold text-center">Explore Your Palette</h1>
        <p className="capitalize text-center">Your location, your palette</p>
      </div>
      <div className=" grid grid-cols-3 gap-8 max-md:grid-cols-2 content-center">
        <ColorTiles />
        {/* <ColorTiles />
        <ColorTiles />
        <ColorTiles />
        <ColorTiles />
        <ColorTiles /> */}
      </div>
    </section>
  );
}
