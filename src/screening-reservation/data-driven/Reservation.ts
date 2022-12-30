import {Screening} from './Screening';
import {Money} from '../global/Money';

export abstract class Customer {}

export class Reservation {
  private customer: Customer;
  private screening: Screening;
  private fee: Money;
  private audienceCount: number;
}
