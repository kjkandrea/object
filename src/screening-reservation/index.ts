import {DiscountPolicy} from './discountPolicy';

class Movie {
  private title: string;
  private runningTime: number;
  private readonly fee: Money;
  private discountPolicy: DiscountPolicy;

  constructor(
    title: string,
    runningTime: number,
    fee: Money,
    discountPolicy: DiscountPolicy
  ) {
    this.title = title;
    this.runningTime = runningTime;
    this.fee = fee;
    this.discountPolicy = discountPolicy;
  }

  public getFee(): Readonly<Money> {
    return this.fee;
  }

  public calculateMovieFee(screening: Screening): Readonly<Money> {
    return this.fee.minus(
      this.discountPolicy.calculateDiscountAmount(screening)
    );
  }
}

abstract class Customer {}

export class Money {
  public static ZERO = Money.wons(0);

  private readonly amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  public static wons(amount: number): Money {
    return new Money(amount);
  }

  public times(percent: number): Money {
    return new Money(this.amount * percent);
  }

  public minus(amount: Money): Money {
    return new Money(this.amount - amount.amount);
  }
}

class Reservation {
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
}

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

  public getMovieFee(): Readonly<Money> {
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
