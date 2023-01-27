import {DiscountCondition} from 'screening-reservation/role-driven/DiscountCondition';
import {Screening} from 'screening-reservation/role-driven/Screening';
import {Money} from 'global/Money';

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
