import React from 'react';
import { ShieldAlert } from 'lucide-react';

const ControlPanel = ({ isAttacking, serverHealth, onStartAttack, onStopAttack, onReset }) => {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-6">
      <div className="flex gap-4 flex-wrap">
        <button
          onClick={onStartAttack}
          disabled={isAttacking || serverHealth === 0}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <ShieldAlert className="w-5 h-5" />
          Iniciar Ataque DDoS
        </button>
        <button
          onClick={onStopAttack}
          disabled={!isAttacking}
          className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
        >
          Detener Ataque
        </button>
        <button
          onClick={onReset}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
        >
          Reiniciar Simulación
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;