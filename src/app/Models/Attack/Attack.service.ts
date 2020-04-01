import { Pokemon } from '../Pokemon/Pokemon';
import { Attack, AttackInformation } from './Attack.definition';



export default class AttackService {
  static calculateAttackDammages(off: Pokemon, attack: Attack, target: Pokemon): number {
    return Math.floor(Math.floor(Math.floor(2 * off.level / 5 + 2) * off.offStat * attack.basePower / target.defStat) / 50) + 2;
  }

  static attack(off: Pokemon, attack: Attack, target: Pokemon): AttackInformation {
    const damage = this.calculateAttackDammages(off, attack, target)
    target.loseHealth(damage)
    return {
      damage,
      attackerName: off.name,
      defenderName: target.name,
    };
  }
}
