import { Attack } from './Attack/Attack.definition';

export const Pikachu: unknown = {
  name: 'Pikachu',
  level: 70,
  speed: 90,
  offStat: 55,
  defStat: 40,
  specOffStat: 75,
  specDefStat: 50,
  maxHealth: 30,
  attacks: [
    {
      name: 'Charge',
      basePower: 20
    },
    {
      name: 'Eclair',
      basePower: 40
    },
    {
      name: 'Rugissement',
      basePower: 1
    },
    {
      name: 'Tonnerre',
      basePower: 60
    }
  ],
  basePower: 112
};

export const Bulbizard: unknown = {
  name: 'Bulbizard',
  level: 1,
  speed: 48,
  offStat: 48,
  defStat: 48,
  specOffStat: 48,
  specDefStat: 48,
  maxHealth: 48,
  attacks: [
    {
      name: 'Charge',
      basePower: 5
    },
    {
      name: 'Déflagration',
      basePower: 40
    },
    {
      name: 'Flammèche',
      basePower: 25
    }
  ],
  basePower: 108
};
