export default function LabelAndSomething({ label, children }) {
  return (
    <div className="text-3xl flex gap-5 items-center justify-between">
      <label>{label}</label>
      <div className="">
      {children}
      </div>
    </div>
  );
}
