import React, { useState } from 'react';
import { SCIENCE_TOPICS } from '../data/scienceNotes';
import { X, BookOpen, Atom, ShieldAlert, SunMedium, Pickaxe } from 'lucide-react';

export default function ScienceInspector({ onClose }) {
  const [activeTopic, setActiveTopic] = useState(SCIENCE_TOPICS[0]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(25, 26, 27, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1100,
      padding: '24px'
    }}>
      <div style={{
        maxWidth: '840px',
        width: '100%',
        maxHeight: '90vh',
        backgroundColor: 'var(--color-ivory)',
        border: '2px solid var(--color-charcoal)',
        borderRadius: '2px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)'
      }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid var(--color-charcoal)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={18} color="var(--color-rust)" />
            <h3 style={{ fontSize: '20px', fontWeight: '500' }}>NASA Lunar Science & Engineering Primer</h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <X size={20} color="var(--color-charcoal)" />
          </button>
        </div>

        {/* Modal Body: Left Sidebar Topics + Right Detail */}
        <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.3fr', flex: 1, overflow: 'hidden' }}>
          {/* Sidebar */}
          <div style={{ borderRight: '1px solid rgba(25, 26, 27, 0.15)', padding: '16px', overflowY: 'auto' }}>
            <span className="font-mono" style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-grey)', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
              Core Technical Subjects
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {SCIENCE_TOPICS.map((topic) => {
                const isSelected = activeTopic.id === topic.id;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setActiveTopic(topic)}
                    style={{
                      textAlign: 'left',
                      padding: '12px',
                      border: isSelected ? '1px solid var(--color-rust)' : '1px solid transparent',
                      backgroundColor: isSelected ? '#fff' : 'transparent',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span className="font-mono" style={{ fontSize: '10px', color: 'var(--color-rust)', fontWeight: '700' }}>
                      {topic.tag}
                    </span>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-charcoal)', marginTop: '2px' }}>
                      {topic.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail Area */}
          <div style={{ padding: '24px 28px', overflowY: 'auto', backgroundColor: '#fff' }}>
            <span className="font-mono" style={{ fontSize: '11px', textTransform: 'uppercase', backgroundColor: 'rgba(197, 166, 106, 0.2)', padding: '2px 8px', borderRadius: '2px', color: 'var(--color-charcoal)', fontWeight: '600' }}>
              {activeTopic.tag}
            </span>

            <h2 style={{ fontSize: '24px', fontWeight: '500', margin: '10px 0 16px' }}>
              {activeTopic.title}
            </h2>

            <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#555', borderLeft: '2px solid var(--color-rust)', paddingLeft: '12px', marginBottom: '20px' }}>
              {activeTopic.summary}
            </p>

            <div style={{ fontSize: '14px', lineHeight: '1.7', color: '#2b2b2b', whiteSpace: 'pre-line' }}>
              {activeTopic.fullText}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(25, 26, 27, 0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-ivory)' }}>
          <span className="font-handwriting" style={{ fontSize: '18px', color: 'var(--color-charcoal)' }}>
            “Applied physics is the difference between an expedition and an emergency.”
          </span>
          <button onClick={onClose} className="btn btn-secondary" style={{ padding: '8px 18px', fontSize: '12px' }}>
            Close Primer
          </button>
        </div>
      </div>
    </div>
  );
}
