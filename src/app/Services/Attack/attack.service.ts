import { Injectable } from '@angular/core';
import { Pokemon } from '../../Models/Pokemon/Pokemon';
import { Attack, AttackInformation } from './Attack.definition';

@Injectable({
  providedIn: 'root'
})
export class AttackService {

  constructor() {
  }

  public calculateAttackDamage(off: Pokemon, attack: Attack, target: Pokemon): number {
    return Math.floor(Math.floor(Math.floor(2 * off.level / 5 + 2) * off.offStat * attack.basePower / target.defStat) / 50) + 2;
  }

  randomIndex(length: number) {
    return Math.floor(Math.random() * length);
  }

  public attack(off: Pokemon, target: Pokemon): AttackInformation {
    const index = this.randomIndex(off.attacks.length);
    const damage = this.calculateAttackDamage(off, off.attacks[index], target);
    target.loseHealth(damage);
    return {
      damage,
      attackName: off.attacks[index].name,
      attackerName: off.name,
      defenderName: target.name,
    };
  }
}
