import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface Props {
  value: string;           // YYYY-MM-DD
  onChange: (v: string) => void;
  minDate?: string;
  placeholder?: string;
  error?: string;
}

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export default function DatePicker({ value, onChange, minDate, placeholder = 'Select date', error }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const min = minDate ? new Date(minDate) : today;

  const parsed = value ? new Date(value) : null;
  const [open, setOpen]         = useState(false);
  const [viewYear, setViewYear]  = useState(parsed?.getFullYear() ?? today.getFullYear());
  const [viewMonth, setViewMonth]= useState(parsed?.getMonth() ?? today.getMonth());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const select = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    if (d < min) return;
    const iso = `${viewYear}-${String(viewMonth + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    onChange(iso);
    setOpen(false);
  };

  const isSelected = (day: number) => {
    if (!parsed) return false;
    return parsed.getFullYear() === viewYear && parsed.getMonth() === viewMonth && parsed.getDate() === day;
  };
  const isDisabled = (day: number) => new Date(viewYear, viewMonth, day) < min;
  const isToday = (day: number) => {
    const t = new Date();
    return t.getFullYear() === viewYear && t.getMonth() === viewMonth && t.getDate() === day;
  };

  const displayValue = parsed
    ? `${DAYS[parsed.getDay()]}, ${String(parsed.getDate()).padStart(2,'0')} ${MONTHS[parsed.getMonth()]} ${parsed.getFullYear()}`
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
        <Calendar className={`w-4 h-4 flex-shrink-0 ${open ? 'text-[#a0622a]' : 'text-[#9a8070]'}`} />
      </button>
      {error && <p className="text-red-500 text-xs mt-1 font-lato">{error}</p>}

      {open && (
        <div className="absolute z-30 mt-2 left-0 right-0 bg-white rounded-2xl shadow-2xl border border-[#e0d6cc] p-4 select-none">
          {/* Month/Year header */}
          <div className="flex items-center justify-between mb-4">
            <button type="button" onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f5f0eb] text-[#2c1209] transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-bold text-[#2c1209] font-lato text-sm">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button type="button" onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f5f0eb] text-[#2c1209] transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-1">
            {DAYS.map(d => (
              <div key={d} className="text-center text-[10px] font-bold text-[#9a8070] uppercase py-1 font-lato">{d}</div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-y-1">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const sel = isSelected(day);
              const dis = isDisabled(day);
              const tod = isToday(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => select(day)}
                  disabled={dis}
                  className={`w-8 h-8 mx-auto rounded-full text-xs font-lato font-semibold transition-all flex items-center justify-center ${
                    sel
                      ? 'bg-[#2c1209] text-white shadow-md'
                      : dis
                      ? 'text-[#d4c8be] cursor-not-allowed'
                      : tod
                      ? 'border-2 border-[#a0622a] text-[#a0622a] hover:bg-[#a0622a] hover:text-white'
                      : 'text-[#2c1209] hover:bg-[#f5f0eb]'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-3 pt-3 border-t border-[#f0e8de] flex justify-between items-center">
            <button type="button" onClick={() => { onChange(''); setOpen(false); }}
              className="text-xs text-[#9a8070] hover:text-red-500 font-lato transition-colors">
              Clear
            </button>
            <button type="button" onClick={() => { const t = new Date(); select(t.getDate()); setViewYear(t.getFullYear()); setViewMonth(t.getMonth()); }}
              className="text-xs text-[#a0622a] font-bold font-lato hover:text-[#2c1209] transition-colors">
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
