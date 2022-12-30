import {Money} from '../global/Money';
import {Duration} from '../../global/datetime/Duration';
import {DiscountCondition} from './DiscountCondition';

interface AmountDiscount {
  type: 'AMOUNT_DISCOUNT';
  discountAmount: Money;
}

interface PercentDiscount {
  type: 'PERCENT_DISCOUNT';
  discountPercent: number;
}

interface NoneDiscount {
  type: 'NONE_DISCOUNT';
}

type MovieDiscount = AmountDiscount | PercentDiscount | NoneDiscount;

type MovieType = MovieDiscount['type'];

export class Movie {
  private title: string;
  private runningTime: Duration;
  private readonly fee: Money;
  private readonly discountConditions: DiscountCondition[] = [];

  private readonly movieType: MovieType;
  private readonly discountAmount?: Money;
  private readonly discountPercent?: number;

  constructor(
    title: string,
    runningTime: Duration,
    fee: Money,
    discountConditions: DiscountCondition[],
    movieDiscount: MovieDiscount
  ) {
    this.title = title;
    this.runningTime = runningTime;
    this.fee = fee;
    this.discountConditions = discountConditions;
    this.movieType = movieDiscount.type;

    switch (movieDiscount.type) {
      case 'AMOUNT_DISCOUNT':
        this.discountAmount = movieDiscount.discountAmount;
        break;
      case 'PERCENT_DISCOUNT':
        this.discountPercent = movieDiscount.discountPercent;
        break;
    }
  }

  public getFee(): Money {
    return this.fee;
  }

  public getDiscountConditions(): Readonly<DiscountCondition[]> {
    return this.discountConditions;
  }

  public getMovieType(): MovieType {
    return this.movieType;
  }

  public getDiscountAmount(): Money | undefined {
    return this.discountAmount;
  }

  public getDiscountPercent(): number | undefined {
    return this.discountPercent;
  }
}
