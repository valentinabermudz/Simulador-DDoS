import { Activity, Clock } from 'lucide-react';

const ServerStatus = ({ serverHealth, attackDuration, isAttacking }) => {
  const getHealthColor = () => {
    if (serverHealth > 70) return 'bg-green-500';
    if (serverHealth > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getHealthStatus = () => {
    if (serverHealth > 70) return '✅ Operativo';
    if (serverHealth > 30) return '⚠️ Degradado';
    if (serverHealth > 0) return '🔴 Crítico';
    return '💀 Caído';
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" />
          Estado del Servidor
        </h3>
        <span className="text-2xl">{getHealthStatus()}</span>
      </div>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Salud</span>
            <span className="font-bold">{serverHealth.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all ${getHealthColor()}`}
              style={{ width: `${serverHealth}%` }}
            />
          </div>
        </div>
        
        {/* Cronómetro */}
        <div className="pt-3 border-t border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Tiempo de ataque
            </span>
            <span className={`font-mono text-lg font-bold ${
              isAttacking ? 'text-red-400 animate-pulse' : 'text-slate-400'
            }`}>
              {formatTime(attackDuration)}
            </span>
          </div>
          {serverHealth === 0 && attackDuration > 0 && (
            <div className="mt-2 text-center">
              <span className="text-xs text-red-400 font-semibold">
                💀 Servidor caído en {formatTime(attackDuration)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServerStatus;