export default function ColorTiles() {
  return (
    <div className="rounded-md h-[10rem] cursor-pointer">
      <div
        className="animateTiles
      "
      >
        <div className=" bg-orange-950 rounded-md flex-1" />
        <div className="text-center p-1">color code</div>
      </div>
      {/* Where I will display the color codes on mobile devices */}
    </div>
  );
}
