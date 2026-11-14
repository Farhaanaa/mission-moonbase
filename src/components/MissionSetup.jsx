import React, { useState } from 'react';
import { LANDING_SITES, EQUIPMENT_CATALOG } from '../data/equipment';
import { INITIAL_CREW } from '../data/crew';
import { Check, Info, ArrowLeft, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';

export default function MissionSetup({ onCompleteSetup, onBackToLanding }) {
  const [selectedSite, setSelectedSite] = useState(LANDING_SITES[0]);
  const [selectedEquipment, setSelectedEquipment] = useState([
    'sabatier_electrolyzer',
    'water_recovery_assembly',
    'fission_kilopower',
    'bifacial_solar_array',
    'regolith_sintering_printer',
    'hydroponics_growth_pod'
  ]);
  const [activeTooltip, setActiveTooltip] = useState(null);

  const maxPayloadKg = 6500;
  const currentMassKg = selectedEquipment.reduce((total, id) => {
    const eq = EQUIPMENT_CATALOG.find(e => e.id === id);
    return total + (eq ? eq.massKg : 0);
  }, 0);

  const toggleEquipment = (id) => {
    if (selectedEquipment.includes(id)) {
      setSelectedEquipment(selectedEquipment.filter(item => item !== id));
    } else {
      setSelectedEquipment([...selectedEquipment, id]);
    }
  };

  const handleLaunch = () => {
    onCompleteSetup({
      site: selectedSite,
      equipment: selectedEquipment
    });
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 24px 80px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-charcoal)', paddingBottom: '12px', marginBottom: '32px' }}>
        <div>
          <span className="font-mono" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-rust)' }}>
            Phase 1 of 3 // Mission Configuration
          </span>
          <h2 style={{ fontSize: '32px', fontWeight: '500' }}>Outpost Site & Equipment Manifest</h2>
        </div>
        <button onClick={onBackToLanding} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '12px' }}>
          <ArrowLeft size={14} /> Back
        </button>
      </div>

      {/* Step 1: Landing Site Selection */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' }}>
          <span className="font-mono" style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-rust)' }}>01</span>
          <h3 style={{ fontSize: '20px', fontWeight: '500' }}>Select Lunar Touchdown Site</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {LANDING_SITES.map((site) => {
            const isSelected = selectedSite.id === site.id;
            return (
              <div
                key={site.id}
                onClick={() => setSelectedSite(site)}
                style={{
                  border: isSelected ? '2px solid var(--color-rust)' : '1px solid rgba(25, 26, 27, 0.2)',
                  backgroundColor: isSelected ? 'rgba(182, 75, 44, 0.04)' : '#fff',
                  padding: '20px',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s ease'
                }}
              >
                {isSelected && (
                  <div style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: 'var(--color-rust)', color: '#fff', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={12} strokeWidth={3} />
                  </div>
                )}
                <span className="font-mono" style={{ fontSize: '11px', color: 'var(--color-grey)' }}>{site.coordinates}</span>
                <h4 style={{ fontSize: '18px', margin: '4px 0 8px', fontWeight: '600' }}>{site.name}</h4>
                <p style={{ fontSize: '13px', color: '#555', marginBottom: '12px' }}>{site.tagline}</p>
                
                <div style={{ borderTop: '1px solid rgba(25, 26, 27, 0.08)', paddingTop: '10px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span className="font-mono" style={{ color: 'var(--color-grey)' }}>Sunlight:</span>
                    <span className="font-mono" style={{ fontWeight: '600' }}>{site.illuminationPct}%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="font-mono" style={{ color: 'var(--color-grey)' }}>Water Ice:</span>
                    <span className="font-mono" style={{ fontWeight: '600' }}>{site.waterIceAvailability}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Site Scientific Note */}
        <div style={{ marginTop: '14px', padding: '12px 16px', backgroundColor: 'rgba(197, 166, 106, 0.15)', borderLeft: '3px solid var(--color-gold)' }}>
          <span className="font-mono" style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-charcoal)' }}>
            Mission Scientific Rationale:
          </span>
          <p style={{ fontSize: '13px', marginTop: '4px', color: '#2c2d2e' }}>
            {selectedSite.educationalInsight}
          </p>
        </div>
      </div>

      <div className="journal-rule" />

      {/* Step 2: Crew Verification */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' }}>
          <span className="font-mono" style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-rust)' }}>02</span>
          <h3 style={{ fontSize: '20px', fontWeight: '500' }}>Assigned Flight Crew (4 Members)</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
          {INITIAL_CREW.map((astronaut) => (
            <div key={astronaut.id} style={{ border: '1px solid rgba(25, 26, 27, 0.18)', backgroundColor: '#fff', padding: '16px', borderRadius: '2px' }}>
              <span className="font-mono" style={{ fontSize: '10px', color: 'var(--color-rust)', fontWeight: '700' }}>{astronaut.callsign}</span>
              <h4 style={{ fontSize: '16px', margin: '4px 0 2px', fontWeight: '600' }}>{astronaut.name}</h4>
              <p style={{ fontSize: '12px', color: 'var(--color-grey)', marginBottom: '8px' }}>{astronaut.role}</p>
              <div style={{ fontSize: '11px', color: '#555', borderTop: '1px solid rgba(25, 26, 27, 0.08)', paddingTop: '8px' }}>
                {astronaut.specialty}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="journal-rule" />

      {/* Step 3: Equipment Payload Selection */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <span className="font-mono" style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-rust)' }}>03</span>
            <h3 style={{ fontSize: '20px', fontWeight: '500' }}>Equipment Payload Selection</h3>
          </div>
          <div className="font-mono" style={{ fontSize: '13px', fontWeight: '600' }}>
            Payload Mass: <span style={{ color: currentMassKg > maxPayloadKg ? 'var(--color-rust)' : 'var(--color-charcoal)' }}>{currentMassKg} kg</span> / {maxPayloadKg} kg Max
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
          {EQUIPMENT_CATALOG.map((item) => {
            const isChecked = selectedEquipment.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleEquipment(item.id)}
                style={{
                  border: isChecked ? '1px solid var(--color-charcoal)' : '1px dashed var(--color-grey)',
                  backgroundColor: isChecked ? '#fff' : 'rgba(255, 255, 255, 0.4)',
                  padding: '16px',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className="font-mono" style={{ fontSize: '10px', textTransform: 'uppercase', backgroundColor: 'rgba(25, 26, 27, 0.08)', padding: '2px 6px', borderRadius: '2px' }}>
                      {item.category}
                    </span>
                    {item.vital && (
                      <span className="font-mono" style={{ fontSize: '10px', color: 'var(--color-rust)', fontWeight: '700' }}>
                        [VITAL]
                      </span>
                    )}
                  </div>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>{item.name}</h4>
                  <p style={{ fontSize: '12px', color: '#555', marginBottom: '8px' }}>{item.description}</p>
                  
                  {/* Educational tooltip trigger */}
                  <div style={{ fontSize: '11px', color: 'var(--color-rust)', fontStyle: 'italic' }}>
                    💡 {item.educationalNote}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '1px solid var(--color-charcoal)',
                    borderRadius: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isChecked ? 'var(--color-charcoal)' : '#fff',
                    color: '#fff',
                    marginBottom: '8px'
                  }}>
                    {isChecked && <Check size={14} />}
                  </div>
                  <span className="font-mono" style={{ fontSize: '11px', color: 'var(--color-grey)' }}>{item.massKg} kg</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-charcoal)', paddingTop: '24px' }}>
        <p className="font-handwriting" style={{ fontSize: '20px', color: 'var(--color-rust)' }}>
          Ensure both Sabatier and Water Recovery are checked for 30-day life support.
        </p>

        <button
          onClick={handleLaunch}
          disabled={currentMassKg > maxPayloadKg || selectedEquipment.length < 3}
          className="btn btn-primary"
          style={{ padding: '14px 28px', fontSize: '14px' }}
        >
          Proceed to Outpost Construction <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
