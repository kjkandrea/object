import {Screening} from '../Screening';
import {Money} from '../Money';
import {DiscountCondition} from '../DiscountCondition';

/**
 * 할인 정책을 알고 있다.
 * 할인된 가격을 계산한다.
 *
 * TEMPLATE METHOD 패턴
 */
export abstract class DiscountPolicy {
  private conditions: DiscountCondition[];

  protected constructor(conditions: DiscountCondition[]) {
    this.conditions = conditions;
  }

  public calculateDiscountAmount(screening: Screening): Money {
    const satisfiedCondition = this.conditions.find(condition =>
      condition.isSatisfiedBy(screening)
    );

    return satisfiedCondition ? this.getDiscountAmount(screening) : Money.ZERO;
  }

  protected abstract getDiscountAmount(screening: Screening): Money;
}

export class AmountDiscountPolicy extends DiscountPolicy {
  private readonly discountAmount: Money;

  constructor(conditions: DiscountCondition[], discountAmount: Money) {
    super(conditions);
    this.discountAmount = discountAmount;
  }

  protected getDiscountAmount(screening: Screening): Money {
    return this.discountAmount;
  }
}

export class PercentDiscountPolicy extends DiscountPolicy {
  private readonly percent: number;

  constructor(conditions: DiscountCondition[], percent: number) {
    super(conditions);
    this.percent = percent;
  }

  protected getDiscountAmount(screening: Screening): Money {
    return screening.getMovieFee().times(this.percent);
  }
}

export class NoneDiscountPolicy extends DiscountPolicy {
  constructor() {
    super([]);
  }

  protected getDiscountAmount(screening: Screening): Money {
    return Money.ZERO;
  }
}
