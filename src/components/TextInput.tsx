import LabelAndSomething from "./LabelAndSomething";

export default function TextInput({ inputCss, label, value, onChange } : { inputCss?: string; label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <LabelAndSomething label={label}>
      <input className={`${inputCss} w-full text-black bg-white px-2 py-1 rounded-sm pixel-corners outline-none`} type="text" value={value} onChange={(e) => onChange(e)} />
    </LabelAndSomething>
  );
}
