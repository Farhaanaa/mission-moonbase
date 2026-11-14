/**
 * Mission Moonbase — Simulation Engine
 * Core scientific simulation loop for 4 astronauts over 30 lunar days.
 */

import { INITIAL_CREW } from '../data/crew';
import { EQUIPMENT_CATALOG, LANDING_SITES } from '../data/equipment';
import { MISSION_EVENTS } from '../data/events';

export const INITIAL_STATE = {
  day: 1,
  totalDays: 30,
  site: LANDING_SITES[0],
  equipment: ['sabatier_electrolyzer', 'water_recovery_assembly', 'bifacial_solar_array', 'fission_kilopower', 'regolith_sintering_printer', 'hydroponics_growth_pod'],
  constructedModules: ['hab_core', 'sabatier', 'kilopower', 'regolith_berm'],
  oxygen: 100, // percentage of tank capacity
  water: 100,
  food: 100,
  energy: 100,
  hullIntegrity: 100,
  radiationShieldingEfficiency: 85,
  scientificPoints: 40,
  crewMorale: 95,
  crew: INITIAL_CREW.map(c => ({ ...c })),
  activeEvent: null,
  pendingEventChoice: null,
  logHistory: [
    { day: 1, text: 'Touchdown confirmed at Shackleton Crater. Outpost core modules pressurized.' }
  ],
  gameStatus: 'setup', // 'landing' | 'setup' | 'construction' | 'sim' | 'debrief' | 'gameover'
  failureReason: null
};

/**
 * Checks if current day is in lunar night (days 15-28, unless South Pole peak with 86% sun).
 */
export function isLunarNight(day, siteId) {
  if (siteId === 'shackleton_crater') {
    // South Pole has long periods of illumination with shallow shadows
    return day >= 15 && day <= 18;
  }
  // Standard equatorial 14-day night
  return day >= 15 && day <= 28;
}

/**
 * Run a single day simulation cycle.
 */
export function simulateDay(currentState) {
  const state = JSON.parse(JSON.stringify(currentState));
  const currentDay = state.day;
  const site = state.site || LANDING_SITES[0];
  const night = isLunarNight(currentDay, site.id);

  // 1. Equipment capabilities
  const hasSabatier = state.equipment.includes('sabatier_electrolyzer');
  const hasWRS = state.equipment.includes('water_recovery_assembly');
  const hasHydroponics = state.equipment.includes('hydroponics_growth_pod');
  const hasKilopower = state.equipment.includes('fission_kilopower');
  const hasSolar = state.equipment.includes('bifacial_solar_array');
  const hasRegolithPrinter = state.equipment.includes('regolith_sintering_printer');

  // 2. Power balance
  let powerGenerated = 0;
  if (hasKilopower) {
    powerGenerated += 10.0; // Steady nuclear fission day and night
  }
  if (hasSolar) {
    powerGenerated += night ? 1.5 : 12.0; // Solar array drops sharply at night
  }
  if (!hasKilopower && !hasSolar) {
    powerGenerated += 2.0; // Minimal backup fuel cell
  }

  // Base power consumption
  let powerConsumed = 6.0; // Habitat thermal, life support fans, lighting
  if (hasSabatier) powerConsumed += 2.5;
  if (hasWRS) powerConsumed += 2.0;
  if (hasHydroponics) powerConsumed += 3.0;
  if (night) powerConsumed += 3.5; // Additional electrical heaters during -130°C night

  const netPower = powerGenerated - powerConsumed;
  state.energy = Math.min(100, Math.max(0, state.energy + Math.round(netPower * 2.5)));

  // If power is completely drained:
  const isPowerBlackout = state.energy <= 0;

  // 3. Oxygen balance (4 crew members need ~3.4 kg/day)
  let o2Drain = 4.0;
  if (hasSabatier && !isPowerBlackout) {
    o2Drain = 0.8; // 90% recycled via CO2 reduction & electrolysis
  } else if (isPowerBlackout) {
    o2Drain = 8.0; // Life support scrubbers offline
  }
  state.oxygen = Math.max(0, state.oxygen - o2Drain);

  // 4. Water balance (4 crew members need ~10 L/day)
  let waterDrain = 4.5;
  if (hasWRS && !isPowerBlackout) {
    waterDrain = 0.9; // 95% recycled from graywater & condensate
  } else if (isPowerBlackout) {
    waterDrain = 7.0;
  }
  state.water = Math.max(0, state.water - waterDrain);

  // 5. Food balance
  let foodDrain = 3.5;
  if (hasHydroponics && !isPowerBlackout) {
    foodDrain = 1.8; // Fresh greens supplement pre-packaged dry rations
    state.crewMorale = Math.min(100, state.crewMorale + 1);
  }
  state.food = Math.max(0, state.food - foodDrain);

  // 6. Radiation Exposure
  let baseRadiationDailyMsv = 1.2; // Background GCR in space
  let shieldingMultiplier = 0.5; // Basic spacecraft aluminum hull
  if (hasRegolithPrinter || state.constructedModules.includes('regolith_berm')) {
    shieldingMultiplier = 0.15; // Regolith absorbs 85% of GCR
  }
  const effectiveDailyDose = baseRadiationDailyMsv * shieldingMultiplier;

  // 7. Crew Health & Vitals
  let healthDeduction = 0;
  if (isPowerBlackout) healthDeduction += 15; // Freezing conditions
  if (state.oxygen < 20) healthDeduction += 20; // Hypoxia
  if (state.water < 20) healthDeduction += 15; // Dehydration
  if (state.food < 15) healthDeduction += 10; // Malnutrition

  state.crew = state.crew.map(astronaut => {
    let newHealth = astronaut.health;
    let newMorale = astronaut.morale;
    let newDose = +(astronaut.radiationDoseMsv + effectiveDailyDose).toFixed(2);

    if (healthDeduction > 0) {
      newHealth = Math.max(0, newHealth - healthDeduction);
      newMorale = Math.max(5, newMorale - 10);
    } else {
      // Normal recovery
      newHealth = Math.min(100, newHealth + 1);
      newMorale = Math.max(10, Math.min(100, newMorale + (night ? -1 : 1)));
    }

    return {
      ...astronaut,
      health: newHealth,
      morale: newMorale,
      radiationDoseMsv: newDose
    };
  });

  // Average crew morale
  const avgMorale = Math.round(state.crew.reduce((sum, c) => sum + c.morale, 0) / state.crew.length);
  state.crewMorale = avgMorale;

  // Scientific yield
  state.scientificPoints += (night ? 2 : 4);

  // Check failure conditions
  if (state.oxygen <= 0) {
    state.gameStatus = 'gameover';
    state.failureReason = 'Outpost atmospheric reserves fully exhausted. Crew asphyxiation.';
    return state;
  }
  if (state.water <= 0) {
    state.gameStatus = 'gameover';
    state.failureReason = 'Closed-loop water reserves depleted. Critical crew dehydration.';
    return state;
  }
  const anyCasualties = state.crew.some(c => c.health <= 0);
  if (anyCasualties) {
    state.gameStatus = 'gameover';
    state.failureReason = 'Crew member suffered fatal physiological collapse from extreme conditions.';
    return state;
  }

  // Increment Day
  state.day += 1;

  // Check mission completion
  if (state.day > state.totalDays) {
    state.day = 30;
    state.gameStatus = 'debrief';
    state.logHistory.unshift({
      day: 30,
      text: 'MISSION COMPLETED: 30 lunar days successfully endured. Earth return vehicle is fueled and ready.'
    });
    return state;
  }

  // Check for scripted event on the new day
  const matchedEvent = MISSION_EVENTS.find(e => e.day === state.day);
  if (matchedEvent) {
    state.activeEvent = matchedEvent;
  }

  // Log entry
  state.logHistory.unshift({
    day: state.day,
    text: `Day ${state.day}: ${night ? 'Lunar Night (Deep Freeze -130°C)' : 'Lunar Day (Sunlit +120°C)'}. O2: ${Math.round(state.oxygen)}%, H2O: ${Math.round(state.water)}%, Power: ${Math.round(state.energy)}%.`
  });

  return state;
}

/**
 * Apply player's choice to an active mission event.
 */
export function applyEventChoice(state, eventId, choiceIndex) {
  const event = MISSION_EVENTS.find(e => e.id === eventId);
  if (!event || !event.choices[choiceIndex]) return state;

  const choice = event.choices[choiceIndex];
  let updatedState = choice.apply(state);
  
  updatedState.activeEvent = null;
  updatedState.logHistory.unshift({
    day: updatedState.day,
    text: `DECISION [${event.title}]: ${choice.text}`
  });

  return updatedState;
}

/**
 * Calculate mission final score & rating for debrief.
 */
export function evaluateMission(state) {
  let score = 0;
  
  // Survival of all 4 crew
  const allAlive = state.crew.every(c => c.health > 0);
  if (allAlive) score += 40;

  // Average crew health
  const avgHealth = state.crew.reduce((acc, c) => acc + c.health, 0) / state.crew.length;
  score += Math.round((avgHealth / 100) * 20);

  // Resource reserves at day 30
  const avgResources = (state.oxygen + state.water + state.food + state.energy) / 4;
  score += Math.round((avgResources / 100) * 20);

  // Science gathered
  score += Math.min(20, Math.round(state.scientificPoints / 5));

  let grade = 'A+';
  let title = 'Flawless Lunar Pioneer';
  if (score < 60) {
    grade = 'C';
    title = 'Bare-Bones Survival';
  } else if (score < 80) {
    grade = 'B';
    title = 'Commendable Mission Commander';
  } else if (score < 92) {
    grade = 'A';
    title = 'Distinguished Artemis Outpost Master';
  }

  return {
    score,
    grade,
    title,
    allAlive,
    avgHealth: Math.round(avgHealth),
    finalOxygen: Math.round(state.oxygen),
    finalWater: Math.round(state.water),
    finalFood: Math.round(state.food),
    scientificYield: state.scientificPoints
  };
}
