import {Screening} from '../Screening';
import {Money} from '../Money';
import {DiscountCondition} from '../DiscountCondition';

interface DiscountPolicy {
  calculateDiscountAmount(screening: Screening): Money;
}

// TEMPLATE METHOD 패턴
export abstract class DefaultDiscountPolicy implements DiscountPolicy {
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

export class AmountDiscountPolicy extends DefaultDiscountPolicy {
  private readonly discountAmount: Money;

  constructor(conditions: DiscountCondition[], discountAmount: Money) {
    super(conditions);
    this.discountAmount = discountAmount;
  }

  protected getDiscountAmount(screening: Screening): Money {
    return this.discountAmount;
  }
}

export class PercentDiscountPolicy extends DefaultDiscountPolicy {
  private readonly percent: number;

  constructor(conditions: DiscountCondition[], percent: number) {
    super(conditions);
    this.percent = percent;
  }

  protected getDiscountAmount(screening: Screening): Money {
    return screening.getMovieFee().times(this.percent);
  }
}

export class NoneDiscountPolicy implements DiscountPolicy {
  public calculateDiscountAmount(screening: Screening): Money {
    return Money.ZERO;
  }
}
