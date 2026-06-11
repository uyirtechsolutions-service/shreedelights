import { useState, useRef, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface Props {
  value: string;           // HH:MM (24h)
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
}

const HOURS   = Array.from({ length: 12 }, (_, i) => i + 1);   // 1–12
const MINUTES = ['00', '15', '30', '45'];
const PERIODS  = ['AM', 'PM'];

function to24(h: number, m: string, period: string) {
  let hour = h;
  if (period === 'AM' && h === 12) hour = 0;
  if (period === 'PM' && h !== 12) hour = h + 12;
  return `${String(hour).padStart(2, '0')}:${m}`;
}

function from24(val: string): { hour: number; minute: string; period: string } {
  if (!val) return { hour: 10, minute: '00', period: 'AM' };
  const [hStr, mStr] = val.split(':');
  let h = parseInt(hStr, 10);
  const period = h >= 12 ? 'PM' : 'AM';
  if (h === 0) h = 12;
  else if (h > 12) h -= 12;
  return { hour: h, minute: String(parseInt(mStr, 10)).padStart(2, '0'), period };
}

export default function TimePicker({ value, onChange, placeholder = 'Select time', error }: Props) {
  const { hour: initH, minute: initM, period: initP } = from24(value);
  const [open, setOpen]     = useState(false);
  const [hour, setHour]     = useState(initH);
  const [minute, setMinute] = useState(initM);
  const [period, setPeriod] = useState(initP);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const p = from24(value);
      setHour(p.hour); setMinute(p.minute); setPeriod(p.period);
    }
  }, [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const apply = (h: number, m: string, p: string) => {
    setHour(h); setMinute(m); setPeriod(p);
    onChange(to24(h, m, p));
  };

  const displayValue = value
    ? `${String(hour).padStart(2, '0')}:${minute} ${period}`
    : '';

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between px-4 py-3 bg-white border-2 rounded-xl text-sm font-lato transition-all ${
          open ? 'border-[#a0622a] shadow-md' : error ? 'border-red-400' : 'border-[#e0d6cc] hover:border-[#a0622a]'
        }`}
      >
        <span className={displayValue ? 'text-[#2c1209] font-semibold' : 'text-[#b8a898]'}>
          {displayValue || placeholder}
        </span>
        <Clock className={`w-4 h-4 flex-shrink-0 ${open ? 'text-[#a0622a]' : 'text-[#9a8070]'}`} />
      </button>
      {error && <p className="text-red-500 text-xs mt-1 font-lato">{error}</p>}

      {open && (
        <div className="absolute z-30 mt-2 left-0 right-0 bg-white rounded-2xl shadow-2xl border border-[#e0d6cc] p-4 select-none">

          {/* AM / PM toggle */}
          <div className="flex gap-2 mb-4">
            {PERIODS.map(p => (
              <button
                key={p}
                type="button"
                onClick={() => apply(hour, minute, p)}
                className={`flex-1 py-2 text-xs font-bold tracking-widest uppercase rounded-lg transition font-lato ${
                  period === p
                    ? 'bg-[#2c1209] text-white'
                    : 'bg-[#f5f0eb] text-[#2c1209] hover:bg-[#e8ddd0]'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Hours */}
            <div>
              <p className="text-[10px] font-bold text-[#a0622a] uppercase tracking-widest mb-2 font-lato">Hour</p>
              <div className="grid grid-cols-3 gap-1">
                {HOURS.map(h => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => apply(h, minute, period)}
                    className={`py-1.5 rounded-lg text-xs font-bold transition font-lato ${
                      hour === h
                        ? 'bg-[#2c1209] text-white'
                        : 'bg-[#f5f0eb] text-[#2c1209] hover:bg-[#e8ddd0]'
                    }`}
                  >
                    {String(h).padStart(2, '0')}
                  </button>
                ))}
              </div>
            </div>

            {/* Minutes */}
            <div>
              <p className="text-[10px] font-bold text-[#a0622a] uppercase tracking-widest mb-2 font-lato">Minute</p>
              <div className="flex flex-col gap-1">
                {MINUTES.map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => apply(hour, m, period)}
                    className={`py-2 rounded-lg text-xs font-bold transition font-lato ${
                      minute === m
                        ? 'bg-[#2c1209] text-white'
                        : 'bg-[#f5f0eb] text-[#2c1209] hover:bg-[#e8ddd0]'
                    }`}
                  >
                    :{m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="mt-4 pt-3 border-t border-[#f0e8de] flex items-center justify-between">
            <span className="text-[#9a8070] text-xs font-lato">Selected time</span>
            <span className="text-[#2c1209] font-bold text-sm font-lato">
              {String(hour).padStart(2,'0')}:{minute} {period}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-3 w-full bg-[#2c1209] hover:bg-[#1a0a04] text-white py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase transition font-lato"
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
}
