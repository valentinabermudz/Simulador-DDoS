import React from 'react';
import { TrendingUp, Shield } from 'lucide-react';

const ComparisonStats = ({ timeToFall, activeTab }) => {
  // Tiempos estimados de caída por nivel de protección
  const estimatedTimes = {
    vulnerable: '0:12 - 0:20',
    rateLimit: '0:50 - 1:20',
    captcha: '2:00 - 3:30',
    waf: '5:00 - 8:00'
  };

  const protectionNames = {
    vulnerable: 'Sin Protección',
    rateLimit: 'Rate Limiting',
    captcha: 'Rate Limit + CAPTCHA',
    waf: 'WAF Completo'
  };

  return (
    <div className="mt-6 bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-green-400" />
        Comparativa de Resistencia
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(protectionNames).map(([key, name]) => (
          <div
            key={key}
            className={`p-4 rounded-lg border-2 transition-all ${
              activeTab === key
                ? 'border-blue-500 bg-blue-900/20'
                : 'border-slate-600 bg-slate-700/30'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Shield className={`w-4 h-4 ${
                key === 'waf' ? 'text-green-400' :
                key === 'captcha' ? 'text-yellow-400' :
                key === 'rateLimit' ? 'text-orange-400' :
                'text-red-400'
              }`} />
              <span className="font-semibold text-sm">{name}</span>
            </div>
            
            <div className="text-xs text-slate-400 mb-1">
              Tiempo estimado de caída:
            </div>
            <div className="text-lg font-mono font-bold text-white">
              {estimatedTimes[key]}
            </div>
            
            {activeTab === key && timeToFall !== null && (
              <div className="mt-2 pt-2 border-t border-slate-600">
                <span className="text-xs text-green-400">
                  Tu resultado: {Math.floor(timeToFall / 60)}:{(timeToFall % 60).toString().padStart(2, '0')}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
        <p className="text-sm text-blue-200">
          <strong>💡 Nota:</strong> Los tiempos mostrados representan escenarios de prueba educativos. 
          En producción, un WAF bien configurado puede resistir ataques DDoS sostenidos durante horas o días, 
          y con CDN + balanceo de carga, el servicio permanece disponible indefinidamente.
        </p>
      </div>
    </div>
  );
};

export default ComparisonStats;