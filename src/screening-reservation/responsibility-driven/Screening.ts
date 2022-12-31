import {Reservation} from './Reservation';
import {Customer} from './Customer';
import {Movie} from './Movie';

export class Screening {
  private movie: Movie;
  private sequence: number;
  private whenScreened: Date;

  public reserve(customer: Customer, audienceCount: number): Reservation {
    return new Reservation();
  }
}
