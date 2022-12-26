import {Money, Screening} from '..';

export interface DiscountCondition {
  isSatisfiedBy: (screening: Screening) => boolean;
}

// TEMPLATE METHOD 패턴
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

export class SequenceCondition implements DiscountCondition {
  private readonly sequence: number;

  constructor(sequence: number) {
    this.sequence = sequence;
  }

  public isSatisfiedBy(screening: Screening): boolean {
    return screening.isSequence(this.sequence);
  }
}
