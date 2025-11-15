export const protectionLevels = {
  vulnerable: {
    name: 'Sin Protección',
    rateLimit: Infinity,
    hasCaptcha: false,
    hasWAF: false,
    maxConcurrent: Infinity
  },
  rateLimit: {
    name: 'Rate Limiting',
    rateLimit: 10,
    hasCaptcha: false,
    hasWAF: false,
    maxConcurrent: Infinity
  },
  captcha: {
    name: 'Rate Limit + CAPTCHA',
    rateLimit: 10,
    hasCaptcha: true,
    hasWAF: false,
    maxConcurrent: Infinity
  },
  waf: {
    name: 'WAF Completo',
    rateLimit: 20,
    hasCaptcha: true,
    hasWAF: true,
    maxConcurrent: 100
  }
};