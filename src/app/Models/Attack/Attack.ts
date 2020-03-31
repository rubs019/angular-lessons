import { IAttack } from './IAttack';

export class Attack {
    name: string;
    basePower: number;

    constructor(attack?: IAttack)
    {
        this.name = attack && attack.name;
        this.basePower = attack && attack.basePower;
    }
}
