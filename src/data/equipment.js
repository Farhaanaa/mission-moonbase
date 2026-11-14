/**
 * Mission Moonbase — Equipment Catalog
 * Authentic lunar survival technology catalog based on NASA Artemis and ECLSS architectures.
 */

export const EQUIPMENT_CATALOG = [
  {
    id: 'sabatier_electrolyzer',
    name: 'Sabatier O2 Reactor & Electrolyzer',
    category: 'Life Support',
    massKg: 450,
    powerKw: 3.5,
    o2ProductionKgPerDay: 4.2,
    waterConsumptionLPerDay: 2.0,
    costCredits: 850,
    description: 'Combines metabolic carbon dioxide with hydrogen to produce methane and water, which is electrolyzed back into breathable oxygen.',
    educationalNote: 'On the Moon, resupply from Earth is costly (~$100,000/kg). A closed-loop Sabatier system recycles over 90% of astronaut exhalations into fresh O2.',
    vital: true
  },
  {
    id: 'water_recovery_assembly',
    name: 'Closed-Loop Water Recovery System',
    category: 'Life Support',
    massKg: 520,
    powerKw: 2.8,
    waterRecycledEfficiency: 0.95,
    costCredits: 900,
    description: 'Distillation and catalytic oxidation processor that recovers 95% of graywater, humidity condensate, and urine into ultrapure potable water.',
    educationalNote: 'Each astronaut requires ~2.5 liters of water daily. Without closed-loop distillation, 4 crew members would require 300 liters (300 kg) of water per month.',
    vital: true
  },
  {
    id: 'hydroponics_growth_pod',
    name: 'Automated Hydroponics Growth Chamber',
    category: 'Food & Biomass',
    massKg: 680,
    powerKw: 4.2,
    foodProductionKgPerDay: 2.2,
    moraleBonus: 15,
    costCredits: 1100,
    description: 'LED-illuminated aeroponic racking growing high-yield dwarf wheat, microgreens, and spirulina algae.',
    educationalNote: 'Plants not only produce fresh calories and vitamins that pre-packaged rations lack, but also absorb crew CO2 and provide crucial psychological well-being in lunar confinement.'
  },
  {
    id: 'fission_kilopower',
    name: 'Kilopower Fission Surface Reactor (10 kWe)',
    category: 'Power Systems',
    massKg: 1500,
    powerOutputKw: 10.0,
    nightReliability: 1.0,
    costCredits: 1800,
    description: 'Stirling-engine nuclear fission reactor powered by enriched uranium, providing constant baseline electricity through both lunar day and night.',
    educationalNote: 'A lunar night lasts 14 Earth days (354 hours) in total freezing darkness (-130°C). Solar panels produce zero energy at night; fission provides uninterrupted power without massive battery banks.'
  },
  {
    id: 'bifacial_solar_array',
    name: 'Bifacial Solar Array with Regolith Storage',
    category: 'Power Systems',
    massKg: 750,
    powerOutputKw: 12.0, // During lunar day, drops to 1.5 during night with battery
    nightReliability: 0.15,
    costCredits: 1050,
    description: 'High-efficiency gallium-arsenide vertical solar panels capturing direct sunlight and lunar surface albedo reflection.',
    educationalNote: 'Solar arrays are lighter than reactors, but require large battery buffers or fuel cells to survive the two-week lunar night.'
  },
  {
    id: 'regolith_sintering_printer',
    name: 'Autonomous Regolith 3D Sintering Berm',
    category: 'Radiation & Habitat',
    massKg: 850,
    powerKw: 5.0,
    radiationProtectionPct: 85,
    hullIntegrityBonus: 25,
    costCredits: 1250,
    description: 'Microwave sintering robot that melts lunar dust (regolith) into hardened ceramic shielding blocks over the habitat dome.',
    educationalNote: 'The Moon lacks an atmosphere and magnetic field. Astronauts face dangerous galactic cosmic rays (GCR) and solar particle events. 1 to 2 meters of sintered regolith blocks over 80% of cosmic radiation.'
  },
  {
    id: 'dust_electrostatic_scrubber',
    name: 'Electrodynamic Dust Shield & Air Lock Decon',
    category: 'Habitat Maintenance',
    massKg: 320,
    powerKw: 1.5,
    dustWearReductionPct: 60,
    costCredits: 650,
    description: 'Electric wave curtains and vacuum airlock brushes that repel sharp, electrostatically charged lunar dust grains before entering the living quarters.',
    educationalNote: 'Apollo astronauts discovered lunar dust behaves like abrasive ground glass, tearing seals, degrading spacesuits, and causing toxic lunar hay fever.'
  },
  {
    id: 'pressurized_rover',
    name: 'Chariot Pressurized Exploration Rover',
    category: 'Exploration & EVA',
    massKg: 1100,
    powerKw: 3.0,
    scientificYieldMultiplier: 1.5,
    costCredits: 1400,
    description: 'Two-person rover with shirt-sleeve cockpit, robotic sample scoop, and 100 km operational sortie radius.',
    educationalNote: 'Pressurized rovers allow astronauts to conduct field geology for days without wearing tiring spacesuits continuously.'
  }
];

export const LANDING_SITES = [
  {
    id: 'shackleton_crater',
    name: 'Shackleton Crater (South Pole)',
    coordinates: '89.9°S 0.0°E',
    tagline: 'Peak of Eternal Light & Frozen Volatiles',
    illuminationPct: 86,
    waterIceAvailability: 'High',
    thermalStability: 'Moderate (-50°C to -10°C on ridge)',
    recommended: true,
    description: 'The crater rim receives near-continuous sunlight while the permanently shadowed interior contains billions of tons of ancient water ice.',
    educationalInsight: 'South Pole peaks provide 86%+ annual solar power, while crater floors hold trapped ice crystals vital for making drinking water and rocket propellant (LH2/LOX).'
  },
  {
    id: 'oceanus_procellarum',
    name: 'Oceanus Procellarum (Marius Hills)',
    coordinates: '14.0°N 56.0°W',
    tagline: 'Lava Tubes & Ancient Volcanism',
    illuminationPct: 50,
    waterIceAvailability: 'Low',
    thermalStability: 'High (Inside lava cave ~ -20°C constant)',
    recommended: false,
    description: 'A subterranean lava tube entrance (skylight) providing natural underground radiation shielding and thermal insulation.',
    educationalInsight: 'Lava tubes can shelter entire cities from micrometeorites and cosmic rays, but power must be piped down from the surface during the 14-day night.'
  },
  {
    id: 'mare_tranquillitatis',
    name: 'Mare Tranquillitatis (Historic Plains)',
    coordinates: '0.7°N 23.5°E',
    tagline: 'Titanium-Rich Flat Basalt',
    illuminationPct: 50,
    waterIceAvailability: 'None',
    thermalStability: 'Extreme (-130°C to +120°C)',
    recommended: false,
    description: 'Flat, safe terrain with high concentrations of ilmenite (iron-titanium oxide) ideal for metal extraction and early industrial testing.',
    educationalInsight: 'Equatorial sites experience the full harshness of the 28-day lunar day/night cycle, requiring heavy thermal control and energy storage.'
  }
];
