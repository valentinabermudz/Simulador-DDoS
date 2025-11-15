export const generateRequest = (isAttacker) => {
  const id = Date.now() + Math.random();
  const ip = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  
  return {
    id,
    ip,
    isAttacker,
    timestamp: Date.now(),
    blocked: false
  };
};

export const processRequest = (request, existingRequests, currentProtection) => {
  let blocked = false;
  let reason = '';

  // Contar requests recientes de esta IP
  const recentRequests = existingRequests.filter(r => 
    r.ip === request.ip && 
    Date.now() - r.timestamp < 1000
  ).length;

  // Rate Limiting
  if (recentRequests >= currentProtection.rateLimit) {
    blocked = true;
    reason = 'Rate limit excedido';
  }

  // WAF - Detecta patrones de ataque
  if (currentProtection.hasWAF && request.isAttacker) {
    const suspiciousScore = Math.random();
    if (suspiciousScore > 0.3) {
      blocked = true;
      reason = 'WAF: Patrón sospechoso detectado';
    }
  }

  // CAPTCHA (simulado - mayor probabilidad de bloquear bots)
  if (currentProtection.hasCaptcha && request.isAttacker) {
    if (Math.random() > 0.7) {
      blocked = true;
      reason = 'CAPTCHA: Verificación fallida';
    }
  }

  return { ...request, blocked, reason };
};