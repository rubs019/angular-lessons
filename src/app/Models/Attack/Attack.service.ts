import { Pokemon } from '../Pokemon/Pokemon';
import { Attack, AttackInformation } from './Attack.definition';



export default class AttackService {
  static calculateAttackDammages(off: Pokemon, attack: Attack, target: Pokemon): number {
      return Math.floor(Math.floor(Math.floor(2 * off.level / 5 + 2) * off.offStat * attack.basePower / target.defStat) / 50) + 2;
  }

  static attack(off: Pokemon, target: Pokemon): AttackInformation {
    const index = Math.floor(Math.random() * off.attacks.length);
    const damage = this.calculateAttackDammages(off, off.attacks[index], target);
    target.loseHealth(damage);
    return {
      damage,
      attackName: off.attacks[index].name,
      attackerName: off.name,
      defenderName: target.name,
    };
  }
}
