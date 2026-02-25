interface KickerBarProps {
  kicker: string;
}

export function KickerBar({ kicker }: KickerBarProps) {
  return (
    <div className="bg-primary py-1.5 text-center">
      <span className="text-[11px] font-bold uppercase tracking-widest text-white">
        {kicker}
      </span>
    </div>
  );
}
