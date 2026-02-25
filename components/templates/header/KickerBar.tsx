interface KickerBarProps {
  kicker: string;
}

export function KickerBar({ kicker }: KickerBarProps) {
  return (
    <div className="bg-primary py-1.5 text-center">
      <span className="text-primary-foreground text-xs font-bold tracking-widest uppercase">
        {kicker}
      </span>
    </div>
  );
}
