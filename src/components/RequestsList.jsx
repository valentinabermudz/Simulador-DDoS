import { Users } from 'lucide-react';

const RequestsList = ({ requests }) => {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 h-96 flex flex-col">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 flex-none">
        <Users className="w-5 h-5 text-purple-400" />
        Requests en Tiempo Real
      </h3>
      <div className="space-y-2 overflow-y-auto flex-1">
        {requests.slice(0, 20).map(req => (
          <div
            key={req.id}
            className={`p-3 rounded-lg text-sm ${
              req.blocked
                ? 'bg-red-900/30 border border-red-700'
                : req.isAttacker
                ? 'bg-orange-900/30 border border-orange-700'
                : 'bg-green-900/30 border border-green-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs">{req.ip}</span>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  req.blocked
                    ? 'bg-red-700'
                    : req.isAttacker
                    ? 'bg-orange-700'
                    : 'bg-green-700'
                }`}
              >
                {req.blocked 
                  ? '🚫 BLOQUEADO' 
                  : req.isAttacker 
                  ? '⚠️ ATACANTE' 
                  : '✅ LEGÍTIMO'}
              </span>
            </div>
            {req.blocked && req.reason && (
              <div className="text-xs text-slate-400 mt-1">{req.reason}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestsList;