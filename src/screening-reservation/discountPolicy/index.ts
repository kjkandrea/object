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

// 조조할인 등 순번할인 조건
export class SequenceCondition implements DiscountCondition {
  private readonly sequence: number;

  constructor(sequence: number) {
    this.sequence = sequence;
  }

  public isSatisfiedBy(screening: Screening): boolean {
    return screening.isSequence(this.sequence);
  }
}

// 상영 시작 시간이 특정한 기간안에 포함되는지 여부
export class PeriodCondition implements DiscountCondition {
  private dayOfWeek: ReturnType<Date['getDay']>;
  private startTime: Date;
  private endTime: Date;

  constructor(
    dayOfWeek: ReturnType<Date['getDay']>,
    startTime: Date,
    endTime: Date
  ) {
    this.dayOfWeek = dayOfWeek;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  /**
   * @return 상영요일이 dayOfWeek 와 같고 상영 시작 시간이 startTime 과 endTime 사이에 있을 경우
   */
  public isSatisfiedBy(screening: Screening): boolean {
    const matchedWeek = screening.getStartTime().getDay() === this.dayOfWeek;
    const moreThenStartTime = screening.getStartTime() >= this.startTime;
    const lessThenEndTime = this.endTime >= screening.getStartTime();

    return matchedWeek && moreThenStartTime && lessThenEndTime;
  }
}
