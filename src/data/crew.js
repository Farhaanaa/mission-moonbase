/**
 * Mission Moonbase — 4-Person Astronaut Crew
 */

export const INITIAL_CREW = [
  {
    id: 'cdr_elena_vance',
    name: 'Dr. Elena Vance',
    role: 'Mission Commander',
    callsign: 'Artemis-1',
    specialty: 'Orbital Dynamics & Mission Leadership',
    health: 100,
    morale: 95,
    radiationDoseMsv: 0,
    trait: 'Calm under pressure — reduces crew panic during catastrophic alerts by 30%.',
    journalNote: 'Day 1: Touchdown confirmed. The Moon is starker and more silent than any simulator prepared me for.'
  },
  {
    id: 'eng_marcus_thorne',
    name: 'Marcus Thorne',
    role: 'Flight & Systems Engineer',
    callsign: 'Vulcan',
    specialty: 'Closed-Loop ECLSS & Fission Power',
    health: 100,
    morale: 90,
    radiationDoseMsv: 0,
    trait: 'Resourceful mechanic — restores damaged systems with 25% lower material overhead.',
    journalNote: 'Day 1: Sabatier pump pressure test looks clean. We need to watch the dust seals closely.'
  },
  {
    id: 'bio_maya_lin',
    name: 'Dr. Maya Lin',
    role: 'Biosphere & Astrobiologist',
    callsign: 'Flora',
    specialty: 'Hydroponics & Waste Bioregenerative Cycles',
    health: 100,
    morale: 92,
    radiationDoseMsv: 0,
    trait: 'Green thumb — boosts daily hydroponic food and oxygen yield by 20%.',
    journalNote: 'Day 1: The spirulina tanks are seeded. Seeing green life against gray regolith gives me hope.'
  },
  {
    id: 'med_tariq_mansoor',
    name: 'Dr. Tariq Mansoor',
    role: 'Flight Surgeon & Geologist',
    callsign: 'Doc',
    specialty: 'Space Medicine & Regolith Toxicity',
    health: 100,
    morale: 94,
    radiationDoseMsv: 0,
    trait: 'Careful monitor — catches radiation sickness and fatigue 1 day before onset.',
    journalNote: 'Day 1: Crew baseline vitals checked. Dosimeters calibrated. Let’s keep everyone safe.'
  }
];
