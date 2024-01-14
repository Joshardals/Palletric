export default function ColorTiles({ color }: { color: string }) {
  return (
    <div className="rounded-md h-[10rem] cursor-pointer">
      <div
        className="rounded-md bg-gray-900 h-full flex flex-col p-1 border border-gray-800
      "
      >
        <div className={` ${color} rounded-md flex-1 animateTiles relative`} />
        <div className="text-center p-1">#123456</div>
      </div>
      {/* Where I will display the color codes on mobile devices */}
    </div>
  );
}
