import React from 'react';
import { AlertTriangle } from 'lucide-react';

const EducationalInfo = ({ activeTab, currentProtection }) => {
  const getContent = () => {
    switch (activeTab) {
      case 'vulnerable':
        return (
          <>
            <p><strong>Vulnerabilidad:</strong> El servidor no tiene protecciones contra ataques DDoS. Acepta todos los requests sin límites.</p>
            <p><strong>Impacto:</strong> Los atacantes pueden saturar el servidor fácilmente, causando denegación de servicio.</p>
            <p><strong>Observa:</strong> La salud del servidor baja rápidamente cuando se inicia el ataque.</p>
          </>
        );
      case 'rateLimit':
        return (
          <>
            <p><strong>Solución:</strong> Implementa límite de requests por IP (10 req/s).</p>
            <p><strong>Cómo funciona:</strong> Bloquea IPs que excedan el límite de requests permitidos en un período de tiempo.</p>
            <p><strong>Ventajas:</strong> Previene floods simples. Mejora significativa vs servidor sin protección.</p>
            <p><strong>Limitaciones:</strong> Atacantes pueden usar múltiples IPs (botnets).</p>
          </>
        );
      case 'captcha':
        return (
          <>
            <p><strong>Solución:</strong> Añade CAPTCHA para verificar que los usuarios son humanos.</p>
            <p><strong>Cómo funciona:</strong> Requests sospechosos deben resolver un CAPTCHA antes de ser procesados.</p>
            <p><strong>Ventajas:</strong> Bloquea bots automatizados efectivamente.</p>
            <p><strong>Consideración:</strong> Puede afectar la experiencia de usuario legítimo.</p>
          </>
        );
      case 'waf':
        return (
          <>
            <p><strong>Solución:</strong> Web Application Firewall con análisis de comportamiento.</p>
            <p><strong>Cómo funciona:</strong> Analiza patrones de tráfico, detecta anomalías, filtra requests maliciosos con IA/ML.</p>
            <p><strong>Ventajas:</strong> Protección multicapa, aprendizaje adaptativo, mínimo impacto en usuarios legítimos.</p>
            <p><strong>Resultado:</strong> El servidor mantiene su salud incluso bajo ataque sostenido.</p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-6 bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-yellow-400" />
        Explicación: {currentProtection.name}
      </h3>
      <div className="text-sm text-slate-300 space-y-2">
        {getContent()}
      </div>
    </div>
  );
};

export default EducationalInfo;