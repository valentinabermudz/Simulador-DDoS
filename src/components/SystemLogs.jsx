import { Clock } from 'lucide-react';

const SystemLogs = ({ logs }) => {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 h-96 flex flex-col">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 flex-none">
        <Clock className="w-5 h-5 text-cyan-400" />
        Logs del Sistema
      </h3>
      <div className="space-y-2 overflow-y-auto flex-1 font-mono text-xs">
        {logs.map(log => (
          <div
            key={log.id}
            className={`p-2 rounded ${
              log.type === 'error'
                ? 'bg-red-900/30 text-red-300'
                : log.type === 'success'
                ? 'bg-green-900/30 text-green-300'
                : 'bg-blue-900/30 text-blue-300'
            }`}
          >
            <span className="text-slate-500">[{log.timestamp}]</span> {log.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemLogs;