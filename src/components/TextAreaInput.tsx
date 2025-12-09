import LabelAndSomething from "./LabelAndSomething";

export default function TextAreaInput({ inputCss, label, value, onChange } : { inputCss?: string; label: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }) {
  return (
    <LabelAndSomething label={label} vertical={true}>
      <textarea className={`${inputCss} w-full text-black bg-white px-2 py-1 rounded-sm pixel-corners outline-none w-full text-2xl`} value={value} onChange={(e) => onChange(e)}></textarea>
    </LabelAndSomething>
  );
}
