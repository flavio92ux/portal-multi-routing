interface KickerBarProps {
  kicker: string;
}

export function KickerBar({ kicker }: KickerBarProps) {
  return (
    <div className="flex items-center justify-center border-b bg-white py-4.5 text-center">
      <span className="text-primary text-[16px] leading-5 font-bold uppercase lg:text-2xl">
        {kicker}
      </span>
    </div>
  );
}
