import ColorTiles from "./ColorTiles";

export default function Palettes() {
  return (
    <div className="w-full">
      <div className=" grid grid-cols-6 gap-8 sm:grid-cols-3 max-sm:grid-cols-2">
        <ColorTiles />
        <ColorTiles />
        <ColorTiles />
        <ColorTiles />
        <ColorTiles />
        <ColorTiles />
      </div>
    </div>
  );
}
