import { AlertTriangle } from 'lucide-react';

const EducationalInfo = ({ activeTab, currentProtection }) => {
  const getContent = () => {
    switch (activeTab) {
      case 'vulnerable':
        return (
          <>
            <p><strong>Estado:</strong> El servidor no tiene ninguna protección.</p>
            <p><strong>Consecuencia:</strong> Acepta todo el tráfico, permitiendo que los atacantes lo saturen fácilmente.</p>
            <p><strong>Observa:</strong> La salud cae rápidamente en cuanto inicia el ataque.</p>
          </>
        );

      case 'rateLimit':
        return (
          <>
            <p><strong>Protección:</strong> Límite de requests por IP.</p>
            <p><strong>Cómo funciona:</strong> Si una IP envía demasiadas peticiones, se bloquea temporalmente.</p>
            <p><strong>Ideal para:</strong> Evitar floods simples desde pocos atacantes.</p>
            <p><strong>Limitación:</strong> No funciona contra ataques distribuidos (muchas IPs).</p>
          </>
        );

      case 'captcha':
        return (
          <>
            <p><strong>Protección:</strong> Verificación humana mediante CAPTCHA.</p>
            <p><strong>Cómo funciona:</strong> Requests sospechosos deben demostrar que vienen de un usuario real.</p>
            <p><strong>Ventaja:</strong> Detiene muchos bots automatizados.</p>
            <p><strong>Contras:</strong> Ya existen bots que logran pasar el captcha.</p>
          </>
        );

      case 'waf':
        return (
          <>
            <p><strong>Protección:</strong> Firewall de Aplicación Web (WAF).</p>
            <p><strong>Cómo funciona:</strong> Filtra tráfico malicioso, analiza patrones y bloquea anomalías.</p>
            <p><strong>Ventaja:</strong> Defiende contra ataques avanzados y distribuidos.</p>
            <p><strong>Resultado:</strong> El servidor permanece estable incluso bajo alto tráfico malicioso.</p>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 h-96 flex flex-col">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 flex-none">
        <AlertTriangle className="w-5 h-5 text-yellow-400" />
        Explicación: {currentProtection.name}
      </h3>

      {/* Contenido principal */}
      <div className="text-md text-slate-300 space-y-2 flex-1 overflow-y-auto">
        {getContent()}

        {/* Nota adicional */}
        <p className="text-md text-blue-200 mt-4">
          <strong>💡 Nota:</strong> El objetivo de esta simulación es cuantificar la diferencia 
          en el tiempo de supervivencia de un sistema con y sin protecciones activas. La métrica de 
          tiempo que se obtiene es demostrativa, no real, y representa el margen crucial disponible para
          detectar y mitigar el ataque de manera proactiva antes de que se produzca la caída del servicio
        </p>
      </div>
    </div>
  );
};

export default EducationalInfo;