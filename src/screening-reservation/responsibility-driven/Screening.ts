import {Reservation} from './Reservation';
import {Customer} from './Customer';
import {Movie} from './Movie';
import {Money} from '../global/Money';

export class Screening {
  private movie: Movie;
  private sequence: number;
  private whenScreened: Date;

  public reserve(customer: Customer, audienceCount: number): Reservation {
    return new Reservation(
      customer,
      this,
      this.calculateFee(audienceCount),
      audienceCount
    );
  }

  private calculateFee(audienceCount: number): Money {
    return this.movie.calculateMovieFee(this).times(audienceCount);
  }
}
