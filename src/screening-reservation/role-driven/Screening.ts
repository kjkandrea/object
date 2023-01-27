import {Movie} from './Movie';
import {Money} from 'global/Money';
import {Customer, Reservation} from './Reservation';

/**
 * 상영 정보를 알고 있다.
 * 예매 정보를 생성한다.
 */
export class Screening {
  private movie: Movie;
  private readonly sequence: number; // 순번
  private readonly whenScreened: Date; // 상영 시작 시간

  constructor(movie: Movie, sequence: number, whenScreened: Date) {
    this.movie = movie;
    this.sequence = sequence;
    this.whenScreened = whenScreened;
  }

  public getStartTime(): Readonly<Date> {
    return this.whenScreened;
  }

  public isSequence(sequence: number): boolean {
    return this.sequence === sequence;
  }

  public getMovieFee(): Money {
    return this.movie.getFee();
  }

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
