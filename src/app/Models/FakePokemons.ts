import { Attack } from './Attack/Attack.definition';

export const Pikachu: unknown = {
  name: 'Pikachu',
  level: 70,
  speed: 90,
  offStat: 55,
  defStat: 40,
  maxHealth: 30,
  custom: false,
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
  basePower: 112,
  sprites: {
    back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png',
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
  }
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
  custom: false,
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
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png'
  },
  basePower: 108
};
