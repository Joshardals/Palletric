import { SliderProps } from "@/typings";

export default function Slider({ label, value, onChange }: SliderProps) {
  return (
    <div className="flex items-center space-x-4">
      <label htmlFor={`${label.toLowerCase()}Slider`}>{label}:</label>
      <input
        type="range"
        id={`${label.toLowerCase()}Slider`}
        value={value}
        min="0"
        max="200"
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
      />
    </div>
  );
}
