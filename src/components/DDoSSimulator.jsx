import React, { useState } from 'react';
import useDDoSSimulation from '../hooks/useDDoSSimulation';
import ServerStatus from './ServerStatus';
import Statistics from './Statistics';
import ProtectionPanel from './ProtectionPanel';
import ControlPanel from './ControlPanel';
import RequestsList from './RequestsList';
import EducationalInfo from './EducationalInfo';

const DDoSSimulator = () => {
  const [activeTab, setActiveTab] = useState('vulnerable');
  
  const {
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
  } = useDDoSSimulation(activeTab);

  const protectionLevels = {
    vulnerable: 'Sin Protección',
    rateLimit: 'Rate Limiting',
    captcha: 'Rate Limit + CAPTCHA',
    waf: 'WAF Completo'
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    resetSimulation();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Simulador de Ataques DDoS
          </h1>
          <p className="text-slate-400">Seguridad en el Desarrollo de Software</p>
        </div>

        {/* Tabs de Protección */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {Object.entries(protectionLevels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => handleTabChange(key)}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Panel de Estado */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <ServerStatus 
            serverHealth={serverHealth} 
            attackDuration={attackDuration}
            isAttacking={isAttacking}
          />
          <Statistics
            requestCount={requestCount}
            blockedRequests={blockedRequests}
            attackers={attackers}
            legitimateUsers={legitimateUsers}
          />
          <ProtectionPanel currentProtection={currentProtection} />
        </div>

        {/* Controles */}
        <ControlPanel
          isAttacking={isAttacking}
          serverHealth={serverHealth}
          onStartAttack={startAttack}
          onStopAttack={stopAttack}
          onReset={resetSimulation}
        />

        {/* Requests e Información Educativa */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <RequestsList requests={requests} />
          <EducationalInfo 
          activeTab={activeTab} 
          currentProtection={currentProtection} 
        />
        </div>        
      </div>
    </div>
  );
};

export default DDoSSimulator;