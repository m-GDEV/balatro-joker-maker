export default function LabelAndSomething({ label, subLabel, children, vertical = false } : { label: string; subLabel?: boolean; children: React.ReactNode; vertical?: boolean }) {
  return (
    <div className={`flex justify-between ${vertical ? "flex-col gap-1 items-start w-full" : "flex-row gap-3 items-center"} ${subLabel ? "text-xl sm:text-2xl ml-4" : "text-2xl sm:text-3xl"}`}>
      <label style={{ color: subLabel == true ? "oklch(86.9% 0.022 252.894)" : "white"}}>{label}</label>
      <div className={`${vertical ? "w-full" : "w-auto"}`}>
      {children}
      </div>
    </div>
  );
}
