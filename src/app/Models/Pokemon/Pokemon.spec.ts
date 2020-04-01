import { Pokemon } from './Pokemon';
import { Attack } from '../Attack/Attack.definition';

describe('Pokemon logic model', () => {
  let pikachu: Pokemon;
  let charge: Attack;
  let MathRandom: () => number;

  beforeEach( () => {
    charge = {
      name: 'Charge',
      basePower: 5
    };
    pikachu = new Pokemon({
      name: 'Pikachu',
      level: 70,
      speed: 90,
      offStat: 55,
      defStat: 40,
      maxHealth: 30,
    });
    MathRandom = Math.random;
    Math.random = () => 0.25;
  });


  afterEach( () => {
    Math.random = MathRandom;
});

  it('Pikachu should have 0 Health after lost 200 ', () => {
    pikachu.loseHealth(200);
    expect(pikachu.health).toBe(0);
  });

  it('Pikachu should have 10 Health after lost 20', () => {
    pikachu.loseHealth(20);
    expect(pikachu.health).toBe(10);
  });

});
