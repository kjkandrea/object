import {DiscountPolicy} from './discountPolicy';
import {Money, Screening} from './index';

export class Movie {
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
