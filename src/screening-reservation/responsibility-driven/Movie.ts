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

  public abstract calculateMovieFee(screening: Screening): Money;
}
