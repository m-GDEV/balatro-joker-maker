export default function LabelAndSomething({ label, children, vertical = false } : { label: string; children: React.ReactNode; vertical?: boolean }) {
  return (
    <div className={`text-3xl flex justify-between ${vertical ? "flex-col gap-1 items-start w-full" : "flex-row gap-3 items-center"}`}>
      <label>{label}</label>
      <div className={`${vertical ? "w-full" : "w-auto"}`}>
      {children}
      </div>
    </div>
  );
}
