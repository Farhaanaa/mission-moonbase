/**
 * Mission Moonbase — NASA Science & Engineering Primer
 * Accessible educational explanations embedded throughout the simulation.
 */

export const SCIENCE_TOPICS = [
  {
    id: 'eclss_architecture',
    title: 'Closed-Loop ECLSS (Environmental Control & Life Support)',
    tag: 'Life Support Physics',
    summary: 'How astronauts survive in a sealed vacuum ecosystem without constant Earth shipments.',
    fullText: `An adult human consumes roughly 0.84 kg of oxygen, 2.5 kg of water, and 0.62 kg of dry food solids daily, while exhaling 1.00 kg of carbon dioxide. 
    
On early Mercury and Apollo flights, consumables were open-loop: tanks supplied pure oxygen, and CO2 was absorbed by disposable Lithium Hydroxide (LiOH) canisters. 
    
For a permanent Moonbase, an open loop is prohibitively heavy. The Sabatier reactor reacts exhaled CO2 with hydrogen byproduct at 400°C over a nickel catalyst to produce methane (CH4) and water (H2O):
    
CO2 + 4H2 -> CH4 + 2H2O
    
The water is then split back into breathable oxygen and hydrogen via electrolysis:
    
2H2O -> 2H2 + O2
    
Combined with catalytic water processors that purify urine and humidity, over 95% of human fluids and gases are recycled in a closed loop.`
  },
  {
    id: 'radiation_shielding',
    title: 'Cosmic Rays & Solar Particle Events (SPE)',
    tag: 'Radiation Physics',
    summary: 'Why lunar settlers must build underground or pile regolith berms.',
    fullText: `Earth is protected by both a thick atmosphere (equivalent to 10 meters of water) and a strong magnetosphere. The Moon has neither.
    
Lunar astronauts are bombarded by two distinct forms of ionising radiation:
1. Galactic Cosmic Rays (GCR): Omnipresent, highly penetrating high-energy atomic nuclei (HZE ions) originating from outside the solar system.
2. Solar Particle Events (SPE): Sudden, violent bursts of relativistic protons ejected during coronal mass ejections.
    
Heavy lead or steel shielding can actually worsen exposure because heavy nuclei trigger "secondary bremsstrahlung" showers. Instead, low-Z (light element) materials like hydrogen, water, polyethylene, and lunar regolith (rich in oxygen, silicon, and aluminum) absorb radiation most effectively. Piling 1 to 2 meters of sintered regolith over a habitat attenuates over 80% of GCR dose.`
  },
  {
    id: 'lunar_diurnal_cycle',
    title: 'The 28-Day Lunar Day/Night Thermal Cycle',
    tag: 'Celestial Mechanics',
    summary: 'Why surviving the lunar night is the greatest engineering hurdle.',
    fullText: `Because the Moon is tidally locked to Earth, its rotational period matches its orbital period (~27.3 Earth days). 
    
This means the lunar equator experiences ~14 Earth days (354 hours) of relentless direct sunlight with temperatures soaring up to +120°C (+250°F), followed immediately by ~14 Earth days of total darkness where temperatures plummet to -130°C (-200°F), and even down to -246°C in permanently shadowed craters.
    
Solar-only bases would need massive battery banks weighing hundreds of tons to stay alive during the two-week freeze. This is why NASA and global agencies prioritize Nuclear Fission Surface Power (Kilopower) or positioning at polar "Peaks of Eternal Light" where elevated crater rims receive over 80-90% continuous illumination.`
  },
  {
    id: 'isru_regolith',
    title: 'In-Situ Resource Utilization (ISRU)',
    tag: 'Materials Science',
    summary: 'Living off the land: extracting oxygen, water, and building blocks from lunar dust.',
    fullText: `It costs approximately $50,000 to $100,000 to launch a single kilogram of payload from Earth's gravity well to the lunar surface. 
    
ISRU is the practice of harvesting local lunar resources:
- Lunar Regolith Composition: ~45% Oxygen by weight bound inside silicate minerals (silicon dioxide, iron oxide, titanium oxide).
- Volatiles at the Poles: LCROSS and orbital spectrometers confirmed shadowed craters hold billions of metric tons of water ice mixed with regolith.
- Construction: Microwave sintering or solar concentrators can melt regolith at ~1100°C to create unreinforced masonry, landing pads, and protective berms.`
  }
];
