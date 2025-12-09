import LabelAndSomething from "./LabelAndSomething";

export default function TextAreaInput({ inputCss, label, value, onChange }) {
  return (
    <LabelAndSomething label={label} vertical={true}>
      <textarea className={`${inputCss} w-full text-black bg-white px-2 py-1 rounded-sm pixel-corners outline-none w-full text-2xl`} value={value} onChange={(e) => onChange(e)}></textarea>
    </LabelAndSomething>
  );
}
