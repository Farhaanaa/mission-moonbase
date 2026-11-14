import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, Zap, Wind, Droplets } from 'lucide-react';

export const OUTPOST_MODULES = [
  {
    id: 'hab_core',
    name: 'Inflatable TransHab Crew Living Core',
    type: 'Habitation',
    placed: true,
    required: true,
    pos: { x: 50, y: 50 },
    description: 'Multi-layer Kevlar & Nextel inflatable shell containing bunk quarters, galley, and exercise treadmill.',
    insight: 'Inflatable modules pack tightly into rocket fairings and expand to 3x volume on the lunar surface.'
  },
  {
    id: 'eclss_pod',
    name: 'Closed-Loop ECLSS Sabatier & Water Bay',
    type: 'Life Support',
    placed: true,
    required: true,
    pos: { x: 30, y: 50 },
    description: 'Houses catalytic Sabatier reactors, urine processors, and oxygen electrolysis beds.',
    insight: 'Directly linked to habitat to minimize piping losses and maintain steady atmospheric pressure (101.3 kPa).'
  },
  {
    id: 'kilopower_hub',
    name: 'Kilopower Nuclear Fission Reactor (10 kWe)',
    type: 'Power',
    placed: true,
    required: true,
    pos: { x: 80, y: 25 },
    description: 'Placed 500 meters down-crater with a natural regolith ridge berm acting as biological radiation shadow shielding.',
    insight: 'Distance and topography provide natural nuclear safety, preventing neutron radiation from reaching crew bunks.'
  },
  {
    id: 'regolith_berm',
    name: 'Microwave-Sintered Regolith Shield Dome',
    type: 'Radiation Defense',
    placed: true,
    required: true,
    pos: { x: 50, y: 48 },
    description: '1.5-meter dense basalt ceramic tiles piled over the TransHab to absorb galactic cosmic rays and solar flares.',
    insight: 'Piled lunar dust provides both radiation absorption and thermal ballast against extreme temperature swings.'
  },
  {
    id: 'hydroponics_bay',
    name: 'Aeroponic Biomass & Spirulina Bay',
    type: 'Bioregenerative Food',
    placed: true,
    required: false,
    pos: { x: 70, y: 70 },
    description: 'Automated racking producing fresh leafy greens and converting crew CO2 back into fresh oxygen.',
    insight: 'Bioregenerative food cycles reduce dependency on packaged Earth rations and maintain cognitive health.'
  }
];

export default function OutpostConstruction({ onCompleteConstruction, onBackToSetup }) {
  const [modules, setModules] = useState(OUTPOST_MODULES);
  const [selectedModule, setSelectedModule] = useState(modules[0]);

  const handleStartSimulation = () => {
    onCompleteConstruction(modules.map(m => m.id));
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 24px 80px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-charcoal)', paddingBottom: '12px', marginBottom: '32px' }}>
        <div>
          <span className="font-mono" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-rust)' }}>
            Phase 2 of 3 // Surface Outpost Deployment
          </span>
          <h2 style={{ fontSize: '32px', fontWeight: '500' }}>Blueprint & Architecture Layout</h2>
        </div>
        <button onClick={onBackToSetup} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '12px' }}>
          <ArrowLeft size={14} /> Back
        </button>
      </div>

      {/* Main Schematic & Details Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '32px', marginBottom: '36px' }}>
        {/* Vintage Blueprint Schematic */}
        <div style={{
          backgroundColor: '#EAE5D9',
          border: '1px solid var(--color-charcoal)',
          borderRadius: '2px',
          padding: '24px',
          position: 'relative',
          minHeight: '360px',
          backgroundImage: 'radial-gradient(rgba(25, 26, 27, 0.12) 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--color-grey)', paddingBottom: '8px', marginBottom: '16px' }}>
            <span className="font-mono" style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em' }}>
              SCHEMATIC 104-B // BASE TOPOLOGY
            </span>
            <span className="font-mono" style={{ fontSize: '11px', color: 'var(--color-rust)' }}>
              1/6th G SURFACE DEPLOYMENT
            </span>
          </div>

          {/* Module Nodes in Blueprint */}
          <div style={{ position: 'relative', height: '280px', width: '100%' }}>
            {modules.map((m) => {
              const isSelected = selectedModule.id === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => setSelectedModule(m)}
                  style={{
                    position: 'absolute',
                    left: `${m.pos.x}%`,
                    top: `${m.pos.y}%`,
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: isSelected ? 'var(--color-rust)' : '#fff',
                    color: isSelected ? '#fff' : 'var(--color-charcoal)',
                    border: '1.5px solid var(--color-charcoal)',
                    padding: '8px 12px',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    fontSize: '11px',
                    fontFamily: 'Space Grotesk, monospace',
                    fontWeight: '600',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                    transition: 'all 0.2s ease',
                    zIndex: isSelected ? 10 : 2,
                    whiteSpace: 'nowrap'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: isSelected ? '#fff' : 'var(--color-gold)' }} />
                    {m.name.split(' ')[0]} {m.name.split(' ')[1]}
                  </div>
                </div>
              );
            })}

            {/* Connecting Utility Traces */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
              {/* Power line from Kilopower to Hab */}
              <line x1="80%" y1="25%" x2="50%" y2="50%" stroke="#C5A66A" strokeWidth="1.5" strokeDasharray="4 4" />
              {/* Life support line from ECLSS to Hab */}
              <line x1="30%" y1="50%" x2="50%" y2="50%" stroke="#191A1B" strokeWidth="2" />
              {/* Hydroponics corridor to Hab */}
              <line x1="70%" y1="70%" x2="50%" y2="50%" stroke="#191A1B" strokeWidth="1.5" strokeDasharray="2 2" />
            </svg>
          </div>

          <div style={{ position: 'absolute', bottom: '12px', right: '16px', fontSize: '11px', color: 'var(--color-grey)', fontFamily: 'Space Grotesk' }}>
            SCALE: 1 cm = 10 METERS
          </div>
        </div>

        {/* Selected Module Detail Panel */}
        <div style={{ border: '1px solid var(--color-charcoal)', backgroundColor: '#fff', padding: '24px', borderRadius: '2px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="font-mono" style={{ fontSize: '10px', textTransform: 'uppercase', backgroundColor: 'rgba(182, 75, 44, 0.1)', color: 'var(--color-rust)', padding: '2px 8px', fontWeight: '700' }}>
              {selectedModule.type}
            </span>
            <span className="font-mono" style={{ fontSize: '11px', color: 'var(--color-grey)' }}>DEPLOYED & VERIFIED</span>
          </div>

          <h3 style={{ fontSize: '22px', fontWeight: '500', marginBottom: '12px' }}>{selectedModule.name}</h3>
          
          <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.5', marginBottom: '20px' }}>
            {selectedModule.description}
          </p>

          <div style={{ backgroundColor: 'rgba(197, 166, 106, 0.12)', borderLeft: '3px solid var(--color-gold)', padding: '12px 14px', marginBottom: '20px' }}>
            <span className="font-mono" style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-charcoal)' }}>
              Engineering Principle:
            </span>
            <p style={{ fontSize: '13px', marginTop: '4px', color: '#333' }}>
              {selectedModule.insight}
            </p>
          </div>

          <div style={{ borderTop: '1px solid rgba(25, 26, 27, 0.1)', paddingTop: '14px' }}>
            <span className="font-mono" style={{ fontSize: '11px', color: 'var(--color-grey)' }}>MODULE STATUS:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-charcoal)', fontWeight: '600', fontSize: '13px', marginTop: '4px' }}>
              <CheckCircle2 size={16} color="var(--color-rust)" /> All Seals Pressurized to 101.3 kPa
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-charcoal)', paddingTop: '24px' }}>
        <p className="font-handwriting" style={{ fontSize: '20px', color: 'var(--color-rust)' }}>
          All 5 core modules deployed. The habitat is sealed and ready for the crew.
        </p>

        <button
          onClick={handleStartSimulation}
          className="btn btn-primary"
          style={{ padding: '14px 32px', fontSize: '14px' }}
        >
          Pressurize Outpost & Begin Day 1 <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
