import React, { useState } from 'react';
import { isLunarNight } from '../engine/simulationEngine';
import { Sun, Moon, Wind, Droplets, Utensils, Zap, Shield, Heart, Activity, AlertTriangle, Play, BookOpen, Save } from 'lucide-react';

export default function SimulationView({
  state,
  onAdvanceDay,
  onOpenScience,
  onSaveProgress,
  onReset
}) {
  const { day, totalDays, site, oxygen, water, food, energy, hullIntegrity, crew, crewMorale, logHistory, scientificPoints } = state;
  const night = isLunarNight(day, site ? site.id : 'shackleton_crater');

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'crew' | 'systems' | 'logs'

  // Metric color helper
  const getStatusColor = (val) => {
    if (val < 25) return 'var(--color-rust)';
    if (val < 50) return 'var(--color-gold)';
    return 'var(--color-charcoal)';
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 24px 80px' }}>
      {/* Top Sol & Environment Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-charcoal)', paddingBottom: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="font-mono" style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', color: 'var(--color-rust)' }}>
              EXPEDITION DAY {day} OF {totalDays}
            </span>
            <span style={{ color: 'var(--color-grey)' }}>•</span>
            <span className="font-mono" style={{ fontSize: '12px', color: 'var(--color-charcoal)' }}>
              {site?.name || 'South Pole Base'}
            </span>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: '500' }}>
            Lunar Surface Operations
          </h2>
        </div>

        {/* Diurnal Thermal & Light State */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: night ? '#191A1B' : 'rgba(197, 166, 106, 0.2)', color: night ? '#F2EEE5' : 'var(--color-charcoal)', padding: '10px 18px', borderRadius: '2px', border: '1px solid var(--color-charcoal)' }}>
          {night ? <Moon size={20} color="#C5A66A" /> : <Sun size={20} color="#B64B2C" />}
          <div>
            <div className="font-mono" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '700' }}>
              {night ? 'Lunar Night (Deep Freeze)' : 'Lunar Day (Direct Sun)'}
            </div>
            <div className="font-mono" style={{ fontSize: '12px', opacity: 0.85 }}>
              Surface Temp: {night ? '-130°C (-202°F)' : '+120°C (+248°F)'}
            </div>
          </div>
        </div>
      </div>

      {/* Main 4 Resource Meters */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
        {/* Oxygen */}
        <div style={{ border: '1px solid var(--color-charcoal)', backgroundColor: '#fff', padding: '16px', borderRadius: '2px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="font-mono" style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-grey)' }}>O2 (SABATIER LOOP)</span>
            <Wind size={16} color="var(--color-charcoal)" />
          </div>
          <div style={{ fontSize: '28px', fontFamily: 'Space Grotesk', fontWeight: '700', color: getStatusColor(oxygen) }}>
            {Math.round(oxygen)}%
          </div>
          <div style={{ height: '4px', backgroundColor: 'var(--color-grey-light)', marginTop: '8px' }}>
            <div style={{ height: '100%', width: `${Math.min(100, Math.max(0, oxygen))}%`, backgroundColor: getStatusColor(oxygen) }} />
          </div>
          <div style={{ fontSize: '11px', color: '#666', marginTop: '6px', fontFamily: 'Space Grotesk' }}>
            Consuming ~0.8 kg/day
          </div>
        </div>

        {/* Water */}
        <div style={{ border: '1px solid var(--color-charcoal)', backgroundColor: '#fff', padding: '16px', borderRadius: '2px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="font-mono" style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-grey)' }}>H2O (RECOVERY WRS)</span>
            <Droplets size={16} color="var(--color-charcoal)" />
          </div>
          <div style={{ fontSize: '28px', fontFamily: 'Space Grotesk', fontWeight: '700', color: getStatusColor(water) }}>
            {Math.round(water)}%
          </div>
          <div style={{ height: '4px', backgroundColor: 'var(--color-grey-light)', marginTop: '8px' }}>
            <div style={{ height: '100%', width: `${Math.min(100, Math.max(0, water))}%`, backgroundColor: getStatusColor(water) }} />
          </div>
          <div style={{ fontSize: '11px', color: '#666', marginTop: '6px', fontFamily: 'Space Grotesk' }}>
            95% Recycled Efficiency
          </div>
        </div>

        {/* Food */}
        <div style={{ border: '1px solid var(--color-charcoal)', backgroundColor: '#fff', padding: '16px', borderRadius: '2px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="font-mono" style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-grey)' }}>BIOMASS & RATIONS</span>
            <Utensils size={16} color="var(--color-charcoal)" />
          </div>
          <div style={{ fontSize: '28px', fontFamily: 'Space Grotesk', fontWeight: '700', color: getStatusColor(food) }}>
            {Math.round(food)}%
          </div>
          <div style={{ height: '4px', backgroundColor: 'var(--color-grey-light)', marginTop: '8px' }}>
            <div style={{ height: '100%', width: `${Math.min(100, Math.max(0, food))}%`, backgroundColor: getStatusColor(food) }} />
          </div>
          <div style={{ fontSize: '11px', color: '#666', marginTop: '6px', fontFamily: 'Space Grotesk' }}>
            Hydroponics Supplementing
          </div>
        </div>

        {/* Energy */}
        <div style={{ border: '1px solid var(--color-charcoal)', backgroundColor: '#fff', padding: '16px', borderRadius: '2px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="font-mono" style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-grey)' }}>KILOPOWER & SOLAR</span>
            <Zap size={16} color="var(--color-charcoal)" />
          </div>
          <div style={{ fontSize: '28px', fontFamily: 'Space Grotesk', fontWeight: '700', color: getStatusColor(energy) }}>
            {Math.round(energy)}%
          </div>
          <div style={{ height: '4px', backgroundColor: 'var(--color-grey-light)', marginTop: '8px' }}>
            <div style={{ height: '100%', width: `${Math.min(100, Math.max(0, energy))}%`, backgroundColor: getStatusColor(energy) }} />
          </div>
          <div style={{ fontSize: '11px', color: '#666', marginTop: '6px', fontFamily: 'Space Grotesk' }}>
            {night ? 'Fission Base Load' : 'Peak Solar + Fission'}
          </div>
        </div>
      </div>

      {/* Action Bar (Advance Sol + Controls) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', border: '1px solid var(--color-charcoal)', padding: '16px 20px', borderRadius: '2px', marginBottom: '32px' }}>
        <div>
          <div className="font-mono" style={{ fontSize: '12px', color: 'var(--color-grey)' }}>
            CURRENT OBJECTIVE:
          </div>
          <div style={{ fontSize: '15px', fontWeight: '600' }}>
            Survive until Sol 30 • Maintain closed-loop atmospheric balance
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button onClick={onSaveProgress} className="btn btn-secondary" style={{ padding: '10px 16px', fontSize: '12px' }}>
            <Save size={14} /> Save Game
          </button>

          <button onClick={onOpenScience} className="btn btn-secondary" style={{ padding: '10px 16px', fontSize: '12px' }}>
            <BookOpen size={14} /> Science Guide
          </button>

          <button
            onClick={onAdvanceDay}
            className="btn btn-primary"
            style={{ padding: '12px 28px', fontSize: '14px' }}
          >
            <Play size={16} /> Execute Cycle: Advance to Sol {day + 1}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid rgba(25, 26, 27, 0.15)', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('overview')}
          style={{
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'overview' ? '2px solid var(--color-rust)' : '2px solid transparent',
            color: activeTab === 'overview' ? 'var(--color-rust)' : 'var(--color-charcoal)',
            padding: '8px 12px',
            fontFamily: 'Space Grotesk',
            fontWeight: '600',
            fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          Crew Status (4 Astronauts)
        </button>

        <button
          onClick={() => setActiveTab('systems')}
          style={{
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'systems' ? '2px solid var(--color-rust)' : '2px solid transparent',
            color: activeTab === 'systems' ? 'var(--color-rust)' : 'var(--color-charcoal)',
            padding: '8px 12px',
            fontFamily: 'Space Grotesk',
            fontWeight: '600',
            fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          Life Support Systems
        </button>

        <button
          onClick={() => setActiveTab('logs')}
          style={{
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'logs' ? '2px solid var(--color-rust)' : '2px solid transparent',
            color: activeTab === 'logs' ? 'var(--color-rust)' : 'var(--color-charcoal)',
            padding: '8px 12px',
            fontFamily: 'Space Grotesk',
            fontWeight: '600',
            fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          Astronaut Field Journal ({logHistory.length} Entries)
        </button>
      </div>

      {/* Tab Content: Crew Overview */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {crew.map((astro) => (
            <div key={astro.id} style={{ border: '1px solid rgba(25, 26, 27, 0.18)', backgroundColor: '#fff', padding: '18px', borderRadius: '2px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                <h4 style={{ fontSize: '17px', fontWeight: '600' }}>{astro.name}</h4>
                <span className="font-mono" style={{ fontSize: '11px', color: 'var(--color-rust)', fontWeight: '700' }}>{astro.callsign}</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--color-grey)', marginBottom: '12px' }}>{astro.role}</p>

              {/* Vitals */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', borderTop: '1px solid rgba(25, 26, 27, 0.08)', paddingTop: '10px', marginBottom: '12px' }}>
                <div>
                  <span className="font-mono" style={{ fontSize: '10px', color: 'var(--color-grey)' }}>HEALTH</span>
                  <div className="font-mono" style={{ fontSize: '14px', fontWeight: '700', color: astro.health < 40 ? 'var(--color-rust)' : 'var(--color-charcoal)' }}>
                    {astro.health}%
                  </div>
                </div>

                <div>
                  <span className="font-mono" style={{ fontSize: '10px', color: 'var(--color-grey)' }}>MORALE</span>
                  <div className="font-mono" style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-charcoal)' }}>
                    {astro.morale}%
                  </div>
                </div>

                <div>
                  <span className="font-mono" style={{ fontSize: '10px', color: 'var(--color-grey)' }}>RAD DOSE</span>
                  <div className="font-mono" style={{ fontSize: '14px', fontWeight: '700', color: astro.radiationDoseMsv > 20 ? 'var(--color-rust)' : 'var(--color-charcoal)' }}>
                    {astro.radiationDoseMsv} mSv
                  </div>
                </div>
              </div>

              {/* Handwritten Note / Trait */}
              <div style={{ backgroundColor: 'rgba(242, 238, 229, 0.6)', padding: '8px 10px', borderRadius: '2px' }}>
                <span className="font-handwriting" style={{ fontSize: '16px', color: '#333' }}>
                  “{astro.journalNote}”
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content: Systems Inspector */}
      {activeTab === 'systems' && (
        <div style={{ backgroundColor: '#fff', border: '1px solid var(--color-charcoal)', padding: '24px', borderRadius: '2px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '500', marginBottom: '16px' }}>Outpost Physical Conversions & Balances</h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <div style={{ border: '1px solid rgba(25, 26, 27, 0.1)', padding: '16px' }}>
              <span className="font-mono" style={{ fontSize: '11px', color: 'var(--color-rust)', fontWeight: '700' }}>SABATIER CATALYTIC REDUCTION</span>
              <p style={{ fontSize: '13px', margin: '6px 0', color: '#444' }}>
                CO2 + 4H2 → CH4 + 2H2O. Then 2H2O electrolysis produces breathable O2.
              </p>
              <div className="font-mono" style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-charcoal)' }}>
                Efficiency: 92% • Status: OPERATIONAL
              </div>
            </div>

            <div style={{ border: '1px solid rgba(25, 26, 27, 0.1)', padding: '16px' }}>
              <span className="font-mono" style={{ fontSize: '11px', color: 'var(--color-gold)', fontWeight: '700' }}>WATER RECOVERY ASSEMBLY (WRS)</span>
              <p style={{ fontSize: '13px', margin: '6px 0', color: '#444' }}>
                Multi-filtration beds + catalytic oxidation reactor purify moisture from breath, perspiration, and urine.
              </p>
              <div className="font-mono" style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-charcoal)' }}>
                Recovery: 95% • Status: NORMAL
              </div>
            </div>

            <div style={{ border: '1px solid rgba(25, 26, 27, 0.1)', padding: '16px' }}>
              <span className="font-mono" style={{ fontSize: '11px', color: 'var(--color-charcoal)', fontWeight: '700' }}>KILOPOWER SURFACE REACTOR</span>
              <p style={{ fontSize: '13px', margin: '6px 0', color: '#444' }}>
                U-235 solid cast core coupled with sodium heat pipes driving high-efficiency Stirling engines.
              </p>
              <div className="font-mono" style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-charcoal)' }}>
                Base Output: 10 kWe Continuous • Status: OPTIMAL
              </div>
            </div>

            <div style={{ border: '1px solid rgba(25, 26, 27, 0.1)', padding: '16px' }}>
              <span className="font-mono" style={{ fontSize: '11px', color: 'var(--color-charcoal)', fontWeight: '700' }}>SINTERED REGOLITH SHIELDING</span>
              <p style={{ fontSize: '13px', margin: '6px 0', color: '#444' }}>
                1.5 meters of fused lunar volcanic dust absorbing Galactic Cosmic Rays and secondary radiation.
              </p>
              <div className="font-mono" style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-charcoal)' }}>
                Cosmic Attenuation: 85% • Status: SECURE
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Daily Field Logs */}
      {activeTab === 'logs' && (
        <div style={{ backgroundColor: '#fff', border: '1px solid var(--color-charcoal)', padding: '24px', borderRadius: '2px', maxHeight: '420px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(25, 26, 27, 0.1)', paddingBottom: '8px', marginBottom: '16px' }}>
            <span className="font-mono" style={{ fontSize: '11px', fontWeight: '700' }}>CHRONOLOGICAL MISSION LOG</span>
            <span className="font-mono" style={{ fontSize: '11px', color: 'var(--color-grey)' }}>VOYAGE ARCHIVE</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {logHistory.map((log, idx) => (
              <div key={idx} style={{ borderLeft: '2px solid var(--color-gold)', paddingLeft: '12px' }}>
                <span className="font-mono" style={{ fontSize: '11px', color: 'var(--color-rust)', fontWeight: '700' }}>
                  SOL {log.day}:
                </span>
                <p style={{ fontSize: '13px', color: '#333', marginTop: '2px' }}>
                  {log.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
