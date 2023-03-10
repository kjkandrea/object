import {Screening} from './Screening';
import {Money} from 'global/Money';

export abstract class Customer {}

export class Reservation {
  private customer: Customer;
  private screening: Screening;
  private fee: Money;
  private audienceCount: number;

  constructor(
    customer: Customer,
    screening: Screening,
    fee: Money,
    audienceCount: number
  ) {
    this.customer = customer;
    this.screening = screening;
    this.fee = fee;
    this.audienceCount = audienceCount;
  }

  public getAmount(): number {
    return this.fee.getAmount();
  }
}
