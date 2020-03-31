import { Pokemon } from '../pokemon/Pokemon';
import { Attack } from './Attack';

export default class AttackService {
  static calculateAttackDammages(off: Pokemon, attack: Attack, target: Pokemon): number {
    return Math.floor(Math.floor(Math.floor(2 * off.level / 5 + 2) * off.offStat * attack.basePower / target.defStat) / 50) + 2;
  }

  static attack(off: Pokemon, attack: Attack, target: Pokemon): number {
    console.log(`${off.name} attaque ${target.name}`);
    const damages = this.calculateAttackDammages(off, attack, target);
    console.log(`${off.name} inflige ${damages} dégats ${target.name}`);
    target.loseHealth(damages);
    return damages;
  }
}
