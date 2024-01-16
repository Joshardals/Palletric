import { SliderProps } from "@/typings";

export default function Slider({ label, value, onChange }: SliderProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <label htmlFor={`${label.toLowerCase()}Slider`}>{label}:</label>
      <input
        type="range"
        id={`${label.toLowerCase()}Slider`}
        value={value}
        min="0"
        max="200"
        className="col-span-2 outline-none"
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
      />
    </div>
  );
}
