import { Pokemon } from '../Pokemon/Pokemon';
import { Attack } from './Attack';

export type AttackInformation = {
  attackText: string
  damageText: string
  damage: number
  attackerName: string
  defenderName: string
};

export default class AttackService {
  static calculateAttackDammages(off: Pokemon, attack: Attack, target: Pokemon): number {
    return Math.floor(Math.floor(Math.floor(2 * off.level / 5 + 2) * off.offStat * attack.basePower / target.defStat) / 50) + 2;
  }

  static attack(off: Pokemon, attack: Attack, target: Pokemon): AttackInformation {
    const damage = this.calculateAttackDammages(off, attack, target);
    target.loseHealth(damage);
    return {
      damage,
      attackText: `${off.name} attaque ${target.name}`,
      damageText: `${off.name} inflige ${damage} dégats ${target.name}`,
      attackerName: off.name,
      defenderName: target.name,
    };
  }
}
