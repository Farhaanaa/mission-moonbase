/**
 * Mission Moonbase — Mission Events & Decision Trees
 * Authentic science events with real physical trade-offs and educational explanations.
 */

export const MISSION_EVENTS = [
  {
    day: 5,
    id: 'coronal_mass_ejection',
    title: 'Class-X Solar Flare Warning',
    type: 'Radiation Alert',
    severity: 'High',
    description: 'Deep Space Climate Observatory sensors detect an intense coronal mass ejection directed toward the Moon. High-energy solar protons will impact in 3 hours.',
    scientificContext: 'Without Earth’s geomagnetic field or thick atmosphere, a solar particle event can deliver lethal radiation doses (>1 Sievert) causing acute radiation sickness.',
    choices: [
      {
        text: 'Order crew to shelter inside the central water-jacketed storm bunker for 24 hours.',
        effectDescription: 'Crew safe from radiation. Halts outdoor EVA and scientific work for 1 day. High power usage.',
        apply: (state) => {
          return {
            ...state,
            energy: Math.max(0, state.energy - 18),
            radiationShieldingEfficiency: 95,
            crewMorale: Math.max(10, state.crewMorale - 8),
            log: 'Crew waited out the solar storm inside the water bunker. Zero radiation spike.'
          };
        },
        educationalDebrief: 'Water and hydrogen-rich plastics are among the best shielding materials against cosmic protons because light atomic nuclei absorb particle energy without producing harmful secondary bremsstrahlung X-rays.'
      },
      {
        text: 'Deploy sintered regolith robot to pile emergency regolith over the exposed habitat roof.',
        effectDescription: 'Uses 25 kWh energy. Protects the base permanently. 10% risk of sintering robot burnout.',
        apply: (state) => {
          return {
            ...state,
            energy: Math.max(0, state.energy - 25),
            radiationShieldingEfficiency: Math.min(100, (state.radiationShieldingEfficiency || 80) + 15),
            hullIntegrity: Math.min(100, state.hullIntegrity + 10),
            log: 'Emergency regolith sintering completed. Habitat dome radiation protection permanently upgraded.'
          };
        },
        educationalDebrief: 'Lunar regolith contains silicon, iron, and aluminum oxides. Sintering it creates dense volcanic basalt-like ceramic tiles that absorb high-energy cosmic rays.'
      }
    ]
  },
  {
    day: 10,
    id: 'dust_seal_abrasion',
    title: 'Lunar Dust Seal Degraded on Air Lock #1',
    type: 'Mechanical Hazard',
    severity: 'Medium',
    description: 'Airlock pressure sensors report a micro-leak (0.4 kg O2/hr). Sharp, electrostatically charged regolith dust has ground away the Viton rubber seal rings.',
    scientificContext: 'Lunar regolith is formed by billions of years of meteorite bombardment without wind or water erosion. Grains are sharp as jagged glass flakes and carry electrostatic charge.',
    choices: [
      {
        text: 'Replace seal with onboard 3D-printed spare and run electrostatic purge protocol.',
        effectDescription: 'Consumes 15 units of spare polymer stock and 10 kWh power. Restores seal to 100%.',
        apply: (state) => {
          return {
            ...state,
            energy: Math.max(0, state.energy - 10),
            oxygen: Math.max(0, state.oxygen - 2),
            hullIntegrity: Math.min(100, state.hullIntegrity + 5),
            log: 'Airlock seal replaced and electrostatic air curtains recalibrated.'
          };
        },
        educationalDebrief: 'NASA’s Apollo astronauts suffered from dust irritation and equipment failure after only a few EVAs. In-situ 3D printing of seals from flexible polymers is critical for long missions.'
      },
      {
        text: 'Apply thermal sealant gel temporarily and postpone full replacement.',
        effectDescription: 'Saves polymer stock, but loses 1.5 kg O2 per day until properly addressed.',
        apply: (state) => {
          return {
            ...state,
            oxygen: Math.max(0, state.oxygen - 6),
            crewMorale: Math.max(10, state.crewMorale - 5),
            log: 'Temporary sealant gel applied. Minor pressure fluctuation persists.'
          };
        },
        educationalDebrief: 'Postponing maintenance in deep space compounds resource depletion. Oxygen loss adds up quickly in closed biospheres.'
      }
    ]
  },
  {
    day: 15,
    id: 'lunar_night_onset',
    title: 'Onset of the 14-Day Lunar Night',
    type: 'Environmental Shift',
    severity: 'Critical',
    description: 'The Sun sinks below the lunar horizon. Surface temperatures plunge from +120°C to -130°C. Solar arrays will generate near-zero power for the next 14 Earth days (336 hours).',
    scientificContext: 'The Moon takes ~27.3 days to complete one rotation on its axis. One lunar day comprises two weeks of scorching sunlight followed by two weeks of frigid darkness.',
    choices: [
      {
        text: 'Switch habitat to Night Survival Mode: idle non-essential scientific experiments and focus power on heaters.',
        effectDescription: 'Reduces energy consumption by 40%. Keeps crew warm and life support steady.',
        apply: (state) => {
          return {
            ...state,
            powerConservationMode: true,
            crewMorale: Math.max(10, state.crewMorale - 5),
            log: 'Base entered Night Survival Mode. Thermal heaters active; scientific experiments throttled.'
          };
        },
        educationalDebrief: 'Thermal management in space is counter-intuitive. In a vacuum, heat is lost purely through radiation. Electrical resistance heaters or fission waste heat loops are needed to prevent fluids from freezing.'
      },
      {
        text: 'Maintain full power output using deep-cycle fuel cell reserve buffers.',
        effectDescription: 'Keeps all experiments running at full speed, but consumes 4.0 kg hydrogen/water reserve per day.',
        apply: (state) => {
          return {
            ...state,
            water: Math.max(0, state.water - 12),
            scientificPoints: (state.scientificPoints || 0) + 25,
            log: 'Fuel cells engaged at peak power. High research output maintained in deep freeze.'
          };
        },
        educationalDebrief: 'Regenerative Fuel Cells (RFC) store energy by electrolyzing water into H2 and O2 during the day, then recombining them at night to generate electricity and warm water.'
      }
    ]
  },
  {
    day: 20,
    id: 'hydroponic_nutrient_imbalance',
    title: 'Hydroponics Nutrient Solution Acidification',
    type: 'Biosphere Alert',
    severity: 'Medium',
    description: 'Dr. Maya Lin detects root rot in the dwarf wheat hydroponic beds due to mineral salt buildup and pH drop in recycled graywater.',
    scientificContext: 'In bioregenerative life support systems, plants recycle astronaut graywater while producing fresh biomass and oxygen. Minor shifts in closed mineral loops can kill root microbiomes.',
    choices: [
      {
        text: 'Flush tanks with 25 Liters of pure distilled reserve water and recalibrate mineral buffers.',
        effectDescription: 'Uses 25L drinking water. Saves 100% of the crop harvest.',
        apply: (state) => {
          return {
            ...state,
            water: Math.max(0, state.water - 25),
            food: Math.min(100, state.food + 15),
            crewMorale: Math.min(100, state.crewMorale + 10),
            log: 'Hydroponic crop flushed and saved with pure reserve water. Harvest secured.'
          };
        },
        educationalDebrief: 'Water is the universal solvent in biospheres. Trading short-term water reserves for long-term fresh food production protects crew vitamin intake and morale.'
      },
      {
        text: 'Prune damaged crop sections and supplement crew diet with dry vacuum-sealed military rations.',
        effectDescription: 'Saves water. Food rations decrease. Crew morale drops by 15%.',
        apply: (state) => {
          return {
            ...state,
            food: Math.max(0, state.food - 10),
            crewMorale: Math.max(10, state.crewMorale - 15),
            log: 'Damaged crops discarded. Crew shifted to shelf-stable dehydrated paste rations.'
          };
        },
        educationalDebrief: 'Long-duration spaceflight studies demonstrate that "menu fatigue" from eating only dehydrated packets significantly degrades astronaut psychological performance and immune response.'
      }
    ]
  },
  {
    day: 26,
    id: 'micrometeorite_radiator_impact',
    title: 'Micrometeorite Puncture on External Radiator Loop',
    type: 'Thermal Emergency',
    severity: 'High',
    description: 'A pea-sized hypervelocity space pebble struck an external ammonia cooling radiator, venting thermal fluid.',
    scientificContext: 'Micrometeoroids travel at speeds between 20 to 70 kilometers per second. Without atmosphere to burn them up, even a speck of dust can pierce metal radiators.',
    choices: [
      {
        text: 'Deploy Engineer Marcus Thorne for an emergency 2-hour EVA to clamp and patch the radiator tube.',
        effectDescription: 'Quickly halts fluid loss. Marcus absorbs minor radiation dose (3 mSv). Restores 100% cooling.',
        apply: (state) => {
          const updatedCrew = state.crew.map(c => c.id === 'eng_marcus_thorne' ? { ...c, radiationDoseMsv: c.radiationDoseMsv + 3, morale: c.morale - 4 } : c);
          return {
            ...state,
            crew: updatedCrew,
            energy: Math.max(0, state.energy - 8),
            hullIntegrity: Math.min(100, state.hullIntegrity + 10),
            log: 'Marcus completed emergency EVA. Radiator manifold patched successfully.'
          };
        },
        educationalDebrief: 'Astronauts are limited to safe career radiation limits (~600 mSv). Calculated short-duration sorties under low-radiation cosmic conditions are a standard risk-mitigation protocol.'
      },
      {
        text: 'Isolate the punctured cooling loop remotely from inside and run habitat on redundant half-capacity radiator.',
        effectDescription: 'Zero astronaut risk, but habitat internal electronics must operate at throttled 70% clock speed.',
        apply: (state) => {
          return {
            ...state,
            energy: Math.max(0, state.energy - 14),
            scientificPoints: Math.max(0, (state.scientificPoints || 0) - 10),
            log: 'Loop isolated remotely. Thermal balance stable at reduced operational frequency.'
          };
        },
        educationalDebrief: 'Spacecraft engineering relies on "fault-tolerant dual redundancy" (fail-operational, fail-safe), ensuring single-point punctures do not cause total life-support collapse.'
      }
    ]
  }
];
