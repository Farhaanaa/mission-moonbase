import React from 'react';
import { AlertOctagon, Info, ArrowRight, ShieldAlert } from 'lucide-react';

export default function EventModal({ event, onMakeChoice }) {
  if (!event) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(25, 26, 27, 0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '640px',
        width: '100%',
        backgroundColor: 'var(--color-ivory)',
        border: '2px solid var(--color-charcoal)',
        borderRadius: '2px',
        padding: '32px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
        position: 'relative'
      }}>
        {/* Top Telegraph Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-charcoal)', paddingBottom: '12px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ backgroundColor: 'var(--color-rust)', color: '#fff', padding: '2px 8px', fontSize: '11px', fontFamily: 'Space Grotesk', fontWeight: '700', borderRadius: '2px' }}>
              CRITICAL DISPATCH
            </span>
            <span className="font-mono" style={{ fontSize: '12px', color: 'var(--color-charcoal)', fontWeight: '600' }}>
              SOL {event.day} // {event.type.toUpperCase()}
            </span>
          </div>

          <span className="font-mono" style={{ fontSize: '11px', color: 'var(--color-grey)' }}>
            SEVERITY: {event.severity}
          </span>
        </div>

        {/* Title & Description */}
        <h2 style={{ fontSize: '26px', fontWeight: '500', marginBottom: '14px', lineHeight: '1.2' }}>
          {event.title}
        </h2>

        <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#2b2b2b', marginBottom: '20px' }}>
          {event.description}
        </p>

        {/* Scientific Context Box */}
        <div style={{ backgroundColor: 'rgba(197, 166, 106, 0.16)', borderLeft: '3px solid var(--color-gold)', padding: '12px 16px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <Info size={14} color="var(--color-charcoal)" />
            <span className="font-mono" style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>
              Scientific Context:
            </span>
          </div>
          <p style={{ fontSize: '13px', color: '#333', lineHeight: '1.5' }}>
            {event.scientificContext}
          </p>
        </div>

        <div className="journal-rule" />

        {/* Choices */}
        <div style={{ marginBottom: '16px' }}>
          <span className="font-mono" style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-charcoal)', display: 'block', marginBottom: '12px' }}>
            Command Protocol Decision:
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {event.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => onMakeChoice(index)}
                style={{
                  textAlign: 'left',
                  border: '1px solid var(--color-charcoal)',
                  backgroundColor: '#fff',
                  padding: '16px',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(182, 75, 44, 0.05)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
              >
                <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-charcoal)', marginBottom: '4px' }}>
                  Option {index + 1}: {choice.text}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-rust)', fontFamily: 'Space Grotesk' }}>
                  Consequences: {choice.effectDescription}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="font-handwriting" style={{ fontSize: '18px', color: 'var(--color-grey)', textAlign: 'right', marginTop: '12px' }}>
          “Every decision on the Moon is measured in kilograms and kilowatt-hours.”
        </div>
      </div>
    </div>
  );
}
