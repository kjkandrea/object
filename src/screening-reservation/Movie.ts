import {DefaultDiscountPolicy} from './DiscountPolicy';
import {Money} from './Money';
import {Screening} from './Screening';
import {Duration} from '../global/datetime/Duration';

export class Movie {
  private title: string;
  private runningTime: Duration;
  private readonly fee: Money;
  private discountPolicy: DefaultDiscountPolicy;

  constructor(
    title: string,
    runningTime: Duration,
    fee: Money,
    discountPolicy: DefaultDiscountPolicy
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
