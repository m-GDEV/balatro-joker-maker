export default function LabelAndSomething({ label, children }) {
  return (
    <div className="text-3xl flex gap-5 items-center">
      <label>{label}</label>
      <div className="w-full">
      {children}
      </div>
    </div>
  );
}
