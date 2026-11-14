import React from 'react';
import { evaluateMission } from '../engine/simulationEngine';
import { Award, AlertTriangle, RotateCcw, CheckCircle, ArrowRight } from 'lucide-react';

export default function MissionDebrief({ state, onRestartMission }) {
  const isGameOver = state.gameStatus === 'gameover';
  const evaluation = evaluateMission(state);

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', padding: '48px 24px 80px' }}>
      {/* Top Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <span className="font-mono" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: isGameOver ? 'var(--color-rust)' : 'var(--color-gold)', fontWeight: '700' }}>
          {isGameOver ? 'CRITICAL MISSION ABORT REPORT' : 'MISSION EXPEDITION DEBRIEF // SOL 30'}
        </span>

        <h1 style={{ fontSize: '46px', fontWeight: '500', margin: '8px 0 16px', lineHeight: '1.1' }}>
          {isGameOver ? 'Life Support Breach' : 'Lunar Outpost Established'}
        </h1>

        <p style={{ fontSize: '16px', color: '#444', maxWidth: '580px', margin: '0 auto' }}>
          {isGameOver
            ? state.failureReason || 'A critical resource reserve reached absolute zero, forcing emergency evacuation.'
            : 'All 30 lunar days successfully completed. Crew vitals remain within flight margins.'}
        </p>
      </div>

      <div className="journal-rule-double" />

      {/* Evaluation Score Card */}
      {!isGameOver && (
        <div style={{ backgroundColor: '#fff', border: '1px solid var(--color-charcoal)', padding: '32px', borderRadius: '2px', marginBottom: '36px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px', alignItems: 'center' }}>
            {/* Grade Badge */}
            <div style={{ textAlign: 'center', borderRight: '1px solid rgba(25, 26, 27, 0.1)', paddingRight: '24px' }}>
              <span className="font-mono" style={{ fontSize: '11px', color: 'var(--color-grey)', textTransform: 'uppercase' }}>OVERALL GRADE</span>
              <div style={{ fontSize: '72px', fontFamily: 'Bodoni Moda', fontWeight: '700', color: 'var(--color-rust)', lineHeight: '1' }}>
                {evaluation.grade}
              </div>
              <div className="font-mono" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-charcoal)', marginTop: '4px' }}>
                {evaluation.title}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-grey)', marginTop: '4px' }}>
                Score: {evaluation.score} / 100
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <div>
                <span className="font-mono" style={{ fontSize: '11px', color: 'var(--color-grey)' }}>CREW HEALTH</span>
                <div className="font-mono" style={{ fontSize: '20px', fontWeight: '700' }}>
                  {evaluation.avgHealth}% Avg
                </div>
                <span style={{ fontSize: '12px', color: '#555' }}>4 of 4 astronauts survived</span>
              </div>

              <div>
                <span className="font-mono" style={{ fontSize: '11px', color: 'var(--color-grey)' }}>FINAL OXYGEN</span>
                <div className="font-mono" style={{ fontSize: '20px', fontWeight: '700' }}>
                  {evaluation.finalOxygen}%
                </div>
                <span style={{ fontSize: '12px', color: '#555' }}>Sabatier loop maintained</span>
              </div>

              <div>
                <span className="font-mono" style={{ fontSize: '11px', color: 'var(--color-grey)' }}>WATER RECOVERY</span>
                <div className="font-mono" style={{ fontSize: '20px', fontWeight: '700' }}>
                  {evaluation.finalWater}%
                </div>
                <span style={{ fontSize: '12px', color: '#555' }}>WRS recycling stabilized</span>
              </div>

              <div>
                <span className="font-mono" style={{ fontSize: '11px', color: 'var(--color-grey)' }}>SCIENCE RESEARCH</span>
                <div className="font-mono" style={{ fontSize: '20px', fontWeight: '700' }}>
                  {evaluation.scientificYield} Pts
                </div>
                <span style={{ fontSize: '12px', color: '#555' }}>Lunar samples collected</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Educational Takeaways Summary */}
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', border: '1px solid var(--color-charcoal)', padding: '24px 28px', borderRadius: '2px', marginBottom: '36px' }}>
        <h3 style={{ fontSize: '19px', fontWeight: '500', marginBottom: '12px' }}>
          Educational Takeaways: What This Mission Proved
        </h3>

        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#333' }}>
          <li>
            <strong>Closed-Loop Physics:</strong> Bringing all oxygen and water from Earth is economically impossible (~$100,000/kg). Catalytic Sabatier CO2 reduction and vacuum distillation WRS make long-term stays feasible.
          </li>
          <li>
            <strong>Nuclear vs Solar Trade-offs:</strong> Equator sites endure a 14-day night (-130°C). Fission Surface Power (Kilopower) ensures uninterrupted heat and air scrubbers without immense battery mass.
          </li>
          <li>
            <strong>In-Situ Shielding:</strong> Raw regolith sintered into ceramic berms protects astronauts from lethal solar coronal mass ejections and deep-space galactic cosmic rays.
          </li>
        </ul>
      </div>

      {/* Action Restart */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={onRestartMission}
          className="btn btn-primary"
          style={{ padding: '14px 32px', fontSize: '14px' }}
        >
          <RotateCcw size={16} /> Plan New Lunar Expedition
        </button>
      </div>
    </div>
  );
}
