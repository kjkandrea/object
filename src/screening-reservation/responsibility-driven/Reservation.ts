import {Customer} from './Customer';
import {Screening} from './Screening';
import {Money} from 'global/Money';

export class Reservation {
  constructor(
    customer: Customer,
    screening: Screening,
    fee: Money,
    audienceCount: number
  ) {}
}
