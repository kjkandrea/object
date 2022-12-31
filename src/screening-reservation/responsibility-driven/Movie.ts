import {Screening} from './Screening';
import {Money} from '../global/Money';
import {Duration} from '../../global/datetime/Duration';
import {DiscountCondition} from './DiscountCondition';

export abstract class Movie {
  private title: string;
  private runningTime: Duration;
  private readonly fee: Money;
  private readonly discountConditions: DiscountCondition[] = [];

  protected constructor(
    title: string,
    runningTime: Duration,
    fee: Money,
    ...discountConditions: DiscountCondition[]
  ) {
    this.title = title;
    this.runningTime = runningTime;
    this.fee = fee;
    this.discountConditions = discountConditions;
  }

  public calculateMovieFee(screening: Screening): Money {
    if (this.isDiscountable(screening)) {
      this.fee.minus(this.calculateDiscountAmount());
    }

    return this.fee;
  }

  private isDiscountable(screening: Screening): boolean {
    return this.discountConditions.some(condition =>
      condition.isSatisfiedBy(screening)
    );
  }

  protected abstract calculateDiscountAmount(): Money;
}

export class AmountDiscountMovie extends Movie {
  private readonly discountAmount: Money;

  constructor(
    title: string,
    runningTime: Duration,
    fee: Money,
    discountConditions: DiscountCondition,
    discountAmount: Money
  ) {
    super(title, runningTime, fee, discountConditions);
    this.discountAmount = discountAmount;
  }

  protected calculateDiscountAmount(): Money {
    return this.discountAmount;
  }
}
