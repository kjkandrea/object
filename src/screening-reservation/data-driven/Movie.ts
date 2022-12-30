import {Money} from '../global/Money';
import {Duration} from '../../global/datetime/Duration';
import {DiscountCondition} from './DiscountCondition';

type MovieType = 'AMOUNT_DISCOUNT' | 'PERCENT_DISCOUNT' | 'NONE_DISCOUNT';

export class Movie {
  private title: string;
  private runningTime: Duration;
  private readonly fee: Money;
  private discountConditions: DiscountCondition[] = [];

  private movieType: MovieType;
  private discountAmount: Money;
  private discountPercent: number;

  public getFee(): Money {
    return this.fee;
  }

  public getDiscountConditions(): Readonly<DiscountCondition[]> {
    return this.discountConditions;
  }

  public getMovieType(): MovieType {
    return this.movieType;
  }

  public getDiscountAmount(): Money {
    return this.discountAmount;
  }

  public getDiscountPercent(): number {
    return this.discountPercent;
  }
}
