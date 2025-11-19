import { Shield, CheckCircle, XCircle } from 'lucide-react';

const ProtectionPanel = ({ currentProtection }) => {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Shield className="w-5 h-5 text-green-400" />
        Protecciones Activas
      </h3>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          {currentProtection.rateLimit !== Infinity ? (
            <CheckCircle className="w-4 h-4 text-green-400" />
          ) : (
            <XCircle className="w-4 h-4 text-red-400" />
          )}
          <span>
            Rate Limiting (
            {currentProtection.rateLimit === Infinity 
              ? 'OFF' 
              : `${currentProtection.rateLimit} req/s`}
            )
          </span>
        </div>
        <div className="flex items-center gap-2">
          {currentProtection.hasCaptcha ? (
            <CheckCircle className="w-4 h-4 text-green-400" />
          ) : (
            <XCircle className="w-4 h-4 text-red-400" />
          )}
          <span>CAPTCHA</span>
        </div>
        <div className="flex items-center gap-2">
          {currentProtection.hasWAF ? (
            <CheckCircle className="w-4 h-4 text-green-400" />
          ) : (
            <XCircle className="w-4 h-4 text-red-400" />
          )}
          <span>WAF</span>
        </div>
      </div>
    </div>
  );
};

export default ProtectionPanel;