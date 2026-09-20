import React from 'react';
import { Smartphone, Tablet, Monitor, RotateCcw } from 'lucide-react';

export type DeviceMode = 'responsive' | 'mobile' | 'tablet' | 'desktop';

interface DeviceSimulatorToolbarProps {
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
  lang: 'ja' | 'en';
}

export const DeviceSimulatorToolbar: React.FC<DeviceSimulatorToolbarProps> = ({
  deviceMode,
  setDeviceMode,
  lang,
}) => {
  return (
    <aside aria-label="Device Preview Toolbar" className="hidden lg:flex items-center justify-between bg-slate-950 text-slate-300 text-xs px-4 py-1.5 border-b border-slate-800">
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          {lang === 'ja' ? '端末表示確認モード:' : 'Device Preview Testing:'}
        </span>
        <div className="inline-flex bg-slate-900 p-0.5 rounded-md border border-slate-800">
          <button
            type="button"
            onClick={() => setDeviceMode('responsive')}
            className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1 transition-all ${
              deviceMode === 'responsive'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>{lang === 'ja' ? '全幅レスポンシブ' : 'Full Width'}</span>
          </button>

          <button
            type="button"
            onClick={() => setDeviceMode('desktop')}
            className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1 transition-all ${
              deviceMode === 'desktop'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop (1200px)</span>
          </button>

          <button
            type="button"
            onClick={() => setDeviceMode('tablet')}
            className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1 transition-all ${
              deviceMode === 'tablet'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet iPad (768px)</span>
          </button>

          <button
            type="button"
            onClick={() => setDeviceMode('mobile')}
            className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1 transition-all ${
              deviceMode === 'mobile'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile Phone (390px)</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 text-slate-400 text-[11px]">
        {deviceMode !== 'responsive' && (
          <button
            type="button"
            onClick={() => setDeviceMode('responsive')}
            className="flex items-center gap-1 text-amber-400 hover:text-amber-300"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{lang === 'ja' ? '通常表示に戻す' : 'Reset to Full Width'}</span>
          </button>
        )}
        <span>
          {lang === 'ja'
            ? '※スマートフォン・タブレット・PC実機サイズでの動作を即座に確認できます'
            : 'Simulate screen viewports to inspect touch targets and layouts'}
        </span>
      </div>
    </aside>
  );
};
