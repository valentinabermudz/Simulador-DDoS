import { Zap } from 'lucide-react';

const Statistics = ({ requestCount, blockedRequests, attackers, legitimateUsers }) => {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5 text-yellow-400" />
        Estadísticas
      </h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-400">Total Requests:</span>
          <span className="font-bold">{requestCount}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Bloqueados:</span>
          <span className="font-bold text-green-400">{blockedRequests}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Atacantes:</span>
          <span className="font-bold text-red-400">{attackers}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Usuarios Legítimos:</span>
          <span className="font-bold text-blue-400">{legitimateUsers}</span>
        </div>
      </div>
    </div>
  );
};

export default Statistics;