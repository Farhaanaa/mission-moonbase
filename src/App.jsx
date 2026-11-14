import React, { useState, useEffect } from 'react';
import {
  INITIAL_STATE,
  simulateDay,
  applyEventChoice
} from './engine/simulationEngine';
import { saveGameState, loadGameState, clearGameState } from './engine/storage';

import LandingPage from './components/LandingPage';
import MissionSetup from './components/MissionSetup';
import OutpostConstruction from './components/OutpostConstruction';
import SimulationView from './components/SimulationView';
import EventModal from './components/EventModal';
import ScienceInspector from './components/ScienceInspector';
import MissionDebrief from './components/MissionDebrief';

export default function App() {
  const [gameState, setGameState] = useState(() => {
    const saved = loadGameState();
    return saved || { ...INITIAL_STATE, gameStatus: 'landing' };
  });

  const [hasSaved, setHasSaved] = useState(false);
  const [showScience, setShowScience] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const saved = loadGameState();
    setHasSaved(!!saved);
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 1. Navigation & State Handlers
  const handleStartNew = () => {
    const freshState = {
      ...INITIAL_STATE,
      gameStatus: 'setup'
    };
    setGameState(freshState);
    saveGameState(freshState);
  };

  const handleResumeSaved = () => {
    const saved = loadGameState();
    if (saved) {
      setGameState(saved);
      triggerToast('Saved expedition progress loaded.');
    }
  };

  const handleCompleteSetup = ({ site, equipment }) => {
    setGameState(prev => {
      const next = {
        ...prev,
        site,
        equipment,
        gameStatus: 'construction'
      };
      saveGameState(next);
      return next;
    });
  };

  const handleCompleteConstruction = (constructedModules) => {
    setGameState(prev => {
      const next = {
        ...prev,
        constructedModules,
        gameStatus: 'sim'
      };
      saveGameState(next);
      return next;
    });
    triggerToast('Outpost pressurized. Day 1 underway.');
  };

  const handleAdvanceDay = () => {
    setGameState(prev => {
      const next = simulateDay(prev);
      saveGameState(next);
      return next;
    });
  };

  const handleEventChoice = (choiceIndex) => {
    if (!gameState.activeEvent) return;
    setGameState(prev => {
      const next = applyEventChoice(prev, prev.activeEvent.id, choiceIndex);
      saveGameState(next);
      return next;
    });
    triggerToast('Protocol executed.');
  };

  const handleSaveProgress = () => {
    saveGameState(gameState);
    setHasSaved(true);
    triggerToast('Mission progress saved to local telemetry buffer.');
  };

  const handleRestartMission = () => {
    clearGameState();
    setHasSaved(false);
    setGameState({
      ...INITIAL_STATE,
      gameStatus: 'landing'
    });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: 'var(--color-charcoal)',
          color: 'var(--color-ivory)',
          padding: '10px 18px',
          borderRadius: '2px',
          fontSize: '13px',
          fontFamily: 'Space Grotesk',
          zIndex: 2000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          borderLeft: '3px solid var(--color-gold)'
        }}>
          {toastMessage}
        </div>
      )}

      {/* Main View Switching */}
      <main style={{ flex: 1 }}>
        {gameState.gameStatus === 'landing' && (
          <LandingPage
            onStartNew={handleStartNew}
            onResume={handleResumeSaved}
            hasSavedGame={hasSaved}
            onOpenScience={() => setShowScience(true)}
          />
        )}

        {gameState.gameStatus === 'setup' && (
          <MissionSetup
            onCompleteSetup={handleCompleteSetup}
            onBackToLanding={() => setGameState(p => ({ ...p, gameStatus: 'landing' }))}
          />
        )}

        {gameState.gameStatus === 'construction' && (
          <OutpostConstruction
            onCompleteConstruction={handleCompleteConstruction}
            onBackToSetup={() => setGameState(p => ({ ...p, gameStatus: 'setup' }))}
          />
        )}

        {gameState.gameStatus === 'sim' && (
          <SimulationView
            state={gameState}
            onAdvanceDay={handleAdvanceDay}
            onOpenScience={() => setShowScience(true)}
            onSaveProgress={handleSaveProgress}
            onReset={handleRestartMission}
          />
        )}

        {(gameState.gameStatus === 'debrief' || gameState.gameStatus === 'gameover') && (
          <MissionDebrief
            state={gameState}
            onRestartMission={handleRestartMission}
          />
        )}
      </main>

      {/* Active Mission Event Emergency Modal */}
      {gameState.activeEvent && (
        <EventModal
          event={gameState.activeEvent}
          onMakeChoice={handleEventChoice}
        />
      )}

      {/* Science & Engineering Primer Modal */}
      {showScience && (
        <ScienceInspector onClose={() => setShowScience(false)} />
      )}

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(25, 26, 27, 0.12)', padding: '20px 24px', textAlign: 'center', fontSize: '12px', color: 'var(--color-grey)', fontFamily: 'Space Grotesk' }}>
        MISSION MOONBASE // NASA SPACE APPS CHALLENGE • CLOSED-LOOP LUNAR SIMULATION
      </footer>
    </div>
  );
}
