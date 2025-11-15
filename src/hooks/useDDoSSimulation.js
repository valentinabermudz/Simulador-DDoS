import { useState, useEffect, useRef, useCallback } from 'react';
import { protectionLevels } from '../utils/protectionLevels';
import { generateRequest, processRequest } from '../utils/requestGenerator';

const useDDoSSimulation = (activeTab) => {
  const [isAttacking, setIsAttacking] = useState(false);
  const [serverHealth, setServerHealth] = useState(100);
  const [requestCount, setRequestCount] = useState(0);
  const [blockedRequests, setBlockedRequests] = useState(0);
  const [legitimateUsers, setLegitimateUsers] = useState(0);
  const [attackers, setAttackers] = useState(0);
  const [requests, setRequests] = useState([]);
  const [logs, setLogs] = useState([]);
  const [attackDuration, setAttackDuration] = useState(0);
  const [timeToFall, setTimeToFall] = useState(null);
  const attackIntervalRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const currentProtection = protectionLevels[activeTab];

  const addLog = useCallback((message, type = 'info') => {
    setLogs(prev => [{
      id: Date.now() + Math.random(),
      message,
      type,
      timestamp: new Date().toLocaleTimeString()
    }, ...prev.slice(0, 9)]);
  }, []);

  const simulateAttack = useCallback(() => {
    if (!isAttacking) return;

    const attackerRequests = Array.from({ length: 15 }, () => generateRequest(true));
    const legitRequests = Math.random() > 0.7 ? [generateRequest(false)] : [];

    setRequests(prevRequests => {
      const allRequests = [...attackerRequests, ...legitRequests].map(req => 
        processRequest(req, prevRequests, currentProtection)
      );

      const newBlocked = allRequests.filter(r => r.blocked).length;
      const newAttackers = allRequests.filter(r => r.isAttacker && !r.blocked).length;
      const newLegit = allRequests.filter(r => !r.isAttacker && !r.blocked).length;

      setBlockedRequests(prev => prev + newBlocked);
      setRequestCount(prev => prev + allRequests.length);
      setAttackers(prev => prev + newAttackers);
      setLegitimateUsers(prev => prev + newLegit);

      if (activeTab === 'vulnerable') {
        setServerHealth(prev => {
          const newHealth = Math.max(0, prev - newAttackers * 1.5);
          return newHealth;
        });
        if (newAttackers > 10) {
          addLog(`⚠️ Servidor sobrecargado: ${newAttackers} requests maliciosos procesados`, 'error');
        }
      } else {
        setServerHealth(prev => {
          const newHealth = Math.max(0, prev - newAttackers * 0.2);
          return newHealth;
        });
        if (newBlocked > 0) {
          addLog(`🛡️ Bloqueados ${newBlocked} requests maliciosos`, 'success');
        }
      }

      if (activeTab !== 'vulnerable') {
        setServerHealth(prev => prev < 100 ? Math.min(100, prev + 0.5) : prev);
      }

      return [...allRequests, ...prevRequests].slice(0, 50);
    });
  }, [isAttacking, activeTab, currentProtection, addLog]);

  // Efecto separado para el cronómetro
  useEffect(() => {
    if (isAttacking) {
      timerIntervalRef.current = setInterval(() => {
        setAttackDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isAttacking]);

  // Efecto separado para la simulación de ataque
  useEffect(() => {
    if (isAttacking) {
      attackIntervalRef.current = setInterval(simulateAttack, 200);
    } else {
      if (attackIntervalRef.current) {
        clearInterval(attackIntervalRef.current);
      }
    }

    return () => {
      if (attackIntervalRef.current) {
        clearInterval(attackIntervalRef.current);
      }
    };
  }, [isAttacking, activeTab, requests, serverHealth]);

  // Detectar cuando el servidor cae
  useEffect(() => {
    if (serverHealth === 0 && timeToFall === null && attackDuration > 0) {
      setTimeToFall(attackDuration);
      setIsAttacking(false);
      addLog(`💀 SERVIDOR CAÍDO - Tiempo de resistencia: ${Math.floor(attackDuration / 60)}:${(attackDuration % 60).toString().padStart(2, '0')}`, 'error');
    }
  }, [serverHealth, attackDuration, timeToFall]);

  const startAttack = () => {
    setIsAttacking(true);
    addLog('🚨 Ataque DDoS iniciado', 'error');
  };

  const stopAttack = () => {
    setIsAttacking(false);
    addLog('✋ Ataque detenido', 'info');
  };

  const resetSimulation = () => {
    setIsAttacking(false);
    setServerHealth(100);
    setRequestCount(0);
    setBlockedRequests(0);
    setLegitimateUsers(0);
    setAttackers(0);
    setRequests([]);
    setLogs([]);
    setAttackDuration(0);
    setTimeToFall(null);
    addLog('🔄 Simulación reiniciada', 'info');
  };

  return {
    isAttacking,
    serverHealth,
    requestCount,
    blockedRequests,
    legitimateUsers,
    attackers,
    requests,
    logs,
    attackDuration,
    timeToFall,
    currentProtection,
    startAttack,
    stopAttack,
    resetSimulation
  };
};

export default useDDoSSimulation;