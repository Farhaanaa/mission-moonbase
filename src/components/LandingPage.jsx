import React from 'react';
import FloatingAstronaut from './FloatingAstronaut';
import { Compass, BookOpen, Play, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LandingPage({ onStartNew, onResume, hasSavedGame, onOpenScience }) {
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '60px 24px 80px' }}>
      {/* Top Editorial Masthead */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-charcoal)', paddingBottom: '12px', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="font-mono" style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.12em', color: 'var(--color-rust)' }}>
            EXPEDITION EXP-030
          </span>
          <span style={{ color: 'var(--color-grey)' }}>•</span>
          <span className="font-mono" style={{ fontSize: '12px', color: 'var(--color-charcoal)', letterSpacing: '0.05em' }}>
            NASA SPACE APPS CHALLENGE
          </span>
        </div>
        <div className="font-mono" style={{ fontSize: '12px', color: 'var(--color-grey)' }}>
          LAT: 89.9°S • SHACKLETON RIM
        </div>
      </div>

      {/* Main Hero Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '48px', alignItems: 'center', marginBottom: '60px' }}>
        <div>
          <div style={{ display: 'inline-block', backgroundColor: 'rgba(197, 166, 106, 0.18)', border: '1px solid var(--color-gold)', padding: '4px 10px', marginBottom: '16px' }}>
            <span className="font-mono" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-charcoal)', fontWeight: '600' }}>
              Lunar Survival Simulation // 30-Day Sol Cycle
            </span>
          </div>

          <h1 style={{ fontSize: '56px', lineHeight: '1.05', marginBottom: '20px', fontWeight: '400' }}>
            Mission <br />
            <span style={{ fontStyle: 'italic', fontWeight: '600', color: 'var(--color-rust)' }}>Moonbase</span>
          </h1>

          <p style={{ fontSize: '17px', lineHeight: '1.6', color: '#333', marginBottom: '24px', maxWidth: '480px' }}>
            You command an international crew of four astronauts stationed at the lunar South Pole. Manage closed-loop life support, deploy surface fission power, shield against cosmic radiation, and make critical survival decisions.
          </p>

          {/* Handwritten Journal Marginalia */}
          <div style={{ borderLeft: '2px solid var(--color-gold)', paddingLeft: '16px', marginBottom: '32px' }}>
            <p className="font-handwriting" style={{ fontSize: '21px', color: 'var(--color-charcoal)', lineHeight: '1.4' }}>
              “The silence of the regolith is profound. If our Sabatier reactor skips a beat, the cold reminds us where we are.”
            </p>
            <span className="font-mono" style={{ fontSize: '11px', color: 'var(--color-grey)', letterSpacing: '0.05em' }}>
              — Commander Elena Vance, Artemis Field Journal
            </span>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={onStartNew}
              className="btn btn-primary"
              style={{ padding: '14px 28px', fontSize: '14px' }}
            >
              <Play size={16} /> Begin Expedition
            </button>

            {hasSavedGame && (
              <button
                onClick={onResume}
                className="btn btn-secondary"
                style={{ padding: '14px 24px', fontSize: '14px' }}
              >
                <ArrowRight size={16} /> Resume Saved Mission
              </button>
            )}

            <button
              onClick={onOpenScience}
              className="btn btn-secondary"
              style={{ padding: '14px 20px', fontSize: '14px' }}
            >
              <BookOpen size={16} /> Science Primer
            </button>
          </div>
        </div>

        {/* Floating Astronaut Illustration Box */}
        <div style={{ textAlign: 'center', position: 'relative', padding: '24px', border: '1px dashed var(--color-grey)', borderRadius: '4px', backgroundColor: 'rgba(255, 255, 255, 0.4)' }}>
          <FloatingAstronaut size={220} />
          
          <div style={{ marginTop: '16px' }}>
            <span className="font-handwriting" style={{ fontSize: '20px', color: 'var(--color-rust)' }}>
              1/6th gravity extravehicular sortie
            </span>
          </div>
          <div className="font-mono" style={{ fontSize: '11px', color: 'var(--color-grey)', marginTop: '4px' }}>
            FIG. 01 — EMU LUNAR SURFACE SUIT & UMBILICAL
          </div>
        </div>
      </div>

      <div className="journal-rule-double" />

      {/* 3 Core Scientific Principles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginTop: '36px' }}>
        <div>
          <span className="font-mono" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-gold)' }}>01 // ECLSS RECOVERY</span>
          <h3 style={{ fontSize: '19px', margin: '8px 0', fontWeight: '500' }}>Closed-Loop Biosphere</h3>
          <p style={{ fontSize: '14px', color: '#444' }}>
            Recycle exhaled carbon dioxide with Sabatier catalytic reduction and purify 95% of astronaut graywater into potable moisture.
          </p>
        </div>

        <div>
          <span className="font-mono" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-rust)' }}>02 // 14-DAY NIGHT</span>
          <h3 style={{ fontSize: '19px', margin: '8px 0', fontWeight: '500' }}>Fission & Solar Power</h3>
          <p style={{ fontSize: '14px', color: '#444' }}>
            Survive the 354-hour deep freeze of lunar night (-130°C) with Stirling nuclear fission reactors and regenerative fuel cells.
          </p>
        </div>

        <div>
          <span className="font-mono" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-charcoal)' }}>03 // REGOLITH SHIELDING</span>
          <h3 style={{ fontSize: '19px', margin: '8px 0', fontWeight: '500' }}>Cosmic Radiation Berms</h3>
          <p style={{ fontSize: '14px', color: '#444' }}>
            Microwave-sinter local lunar dust into ceramic blocks to deflect galactic cosmic rays and sudden solar proton storms.
          </p>
        </div>
      </div>
    </div>
  );
}
