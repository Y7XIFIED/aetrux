import { motion } from "framer-motion";

export interface ThemePrefs {
  cobalt: number;
  magenta: number;
  chrome: number;
  gritty: boolean;
  grid: boolean;
  scanlines: boolean;
  lowMotion: boolean;
  sound: boolean;
}

interface ThemeControlPanelProps {
  prefs: ThemePrefs;
  onChange: (next: ThemePrefs) => void;
  showShortcuts: boolean;
  onToggleShortcuts: () => void;
}

const ThemeControlPanel = ({ prefs, onChange, showShortcuts, onToggleShortcuts }: ThemeControlPanelProps) => {
  const patch = (partial: Partial<ThemePrefs>) => onChange({ ...prefs, ...partial });

  return (
    <motion.div
      className="fixed top-20 right-4 md:right-8 z-[9997] w-[280px] p-4 rounded-xl pixel-window"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p className="data-label mb-3">Theme Control</p>
      <div className="space-y-2">
        {[{ key: "cobalt", label: "Cobalt" }, { key: "magenta", label: "Magenta" }, { key: "chrome", label: "Chrome" }].map((s) => (
          <label key={s.key} className="block">
            <div className="flex justify-between text-[10px] mb-1" style={{ fontFamily: "var(--font-mono)", color: "var(--color-chrome-gray)" }}>
              <span>{s.label}</span>
              <span>{prefs[s.key as keyof ThemePrefs] as number}%</span>
            </div>
            <input
              type="range"
              min={40}
              max={160}
              value={prefs[s.key as keyof ThemePrefs] as number}
              onChange={(e) => patch({ [s.key]: Number(e.target.value) } as Partial<ThemePrefs>)}
              className="w-full"
            />
          </label>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-[10px]" style={{ fontFamily: "var(--font-mono)" }}>
        <button onClick={() => patch({ gritty: !prefs.gritty })} className="px-2 py-2 border rounded" style={{ borderColor: "rgba(138,92,255,0.35)", color: "var(--color-paper)" }}>CRT {prefs.gritty ? "ON" : "OFF"}</button>
        <button onClick={() => patch({ grid: !prefs.grid })} className="px-2 py-2 border rounded" style={{ borderColor: "rgba(138,92,255,0.35)", color: "var(--color-paper)" }}>Grid {prefs.grid ? "ON" : "OFF"}</button>
        <button onClick={() => patch({ scanlines: !prefs.scanlines })} className="px-2 py-2 border rounded" style={{ borderColor: "rgba(138,92,255,0.35)", color: "var(--color-paper)" }}>Scan {prefs.scanlines ? "ON" : "OFF"}</button>
        <button onClick={() => patch({ lowMotion: !prefs.lowMotion })} className="px-2 py-2 border rounded" style={{ borderColor: "rgba(138,92,255,0.35)", color: "var(--color-paper)" }}>Motion {prefs.lowMotion ? "LOW" : "HIGH"}</button>
        <button onClick={() => patch({ sound: !prefs.sound })} className="px-2 py-2 border rounded col-span-2" style={{ borderColor: "rgba(138,92,255,0.35)", color: "var(--color-paper)" }}>Micro Sound {prefs.sound ? "ON" : "OFF"}</button>
      </div>

      <button onClick={onToggleShortcuts} className="mt-3 w-full px-2 py-2 border rounded text-[10px]" style={{ fontFamily: "var(--font-mono)", borderColor: "rgba(138,92,255,0.35)", color: "var(--color-electric-blue)" }}>
        {showShortcuts ? "Hide" : "Show"} Shortcuts
      </button>
    </motion.div>
  );
};

export default ThemeControlPanel;

