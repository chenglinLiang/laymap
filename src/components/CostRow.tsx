type Props = {
  label: string;
  value: string;
  emoji: string;
};

export default function CostRow({ label, value, emoji }: Props) {
  return (
    <div className="rounded-tile bg-white border border-black/[0.05] p-4">
      <div className="flex items-center gap-2 text-mute text-xs font-medium uppercase tracking-wider mb-1.5">
        <span className="text-sm">{emoji}</span>
        {label}
      </div>
      <div className="text-ink text-[15px] font-semibold leading-snug">
        {value}
      </div>
    </div>
  );
}
