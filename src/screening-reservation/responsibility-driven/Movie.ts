import {Screening} from './Screening';
import {Money} from '../global/Money';
import {Duration} from '../../global/datetime/Duration';
import {DiscountCondition} from './DiscountCondition';

type MovieType = 'NONE_DISCOUNT' | 'AMOUNT_DISCOUNT' | 'PERCENT_DISCOUNT';

export abstract class Movie {
  private title: string;
  private runningTime: Duration;
  private readonly fee: Money;
  private readonly discountConditions: DiscountCondition[] = [];

  private readonly movieType: MovieType;
  private readonly discountAmount: Money;
  private readonly discountPercent: number;

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

  abstract calculateDiscountAmount(): Money;
}
