import { Truck } from 'lucide-react';

interface Props {
  onClick?: () => void;
  label?: string;
}

export default function TruckBorderButton({ onClick, label = 'Free Delivery' }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 border-2 border-[#2c1209]  text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase px-5 sm:px-7 py-3 sm:py-3.5 transition font-lato"
    >
      <Truck className="w-4 h-4 flex-shrink-0" />
      <span>{label}</span>
    </button>
  );
}
