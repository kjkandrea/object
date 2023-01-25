import {DiscountPolicy} from './DiscountPolicy';
import {Money} from '../global/Money';
import {Screening} from './Screening';
import {Duration} from '../../global/datetime/Duration';

/**
 * 영화 정보를 알고 있다.
 * 가격을 계산한다.
 */
export class Movie {
  private title: string;
  private runningTime: Duration;
  private readonly fee: Money;
  private discountPolicy: DiscountPolicy;

  constructor(
    title: string,
    runningTime: Duration,
    fee: Money,
    discountPolicy: DiscountPolicy
  ) {
    this.title = title;
    this.runningTime = runningTime;
    this.fee = fee;
    this.discountPolicy = discountPolicy;
  }

  public changeDiscountPolicy(discountPolicy: DiscountPolicy): void {
    this.discountPolicy = discountPolicy;
  }

  public getFee(): Money {
    return this.fee;
  }

  public calculateMovieFee(screening: Screening): Readonly<Money> {
    return this.fee.minus(
      this.discountPolicy.calculateDiscountAmount(screening)
    );
  }
}
