import { AttackInformation } from '../Attack/Attack.definition';
import { Pokemon } from '../../Models/Pokemon/Pokemon';

export type RoundInformation = { nbRound: number, log: AttackInformation, winner?: Pokemon };
