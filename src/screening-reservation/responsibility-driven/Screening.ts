import {Reservation} from './Reservation';
import {Customer} from './Customer';

export class Screening {
  public reserve(customer: Customer, audienceCount: number): Reservation {
    return new Reservation();
  }
}
