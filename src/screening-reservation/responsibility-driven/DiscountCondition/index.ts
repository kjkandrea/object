import {Screening} from '../Screening';
import {DayOfWeek} from '../../../global/datetime/dayOfWeek';

type DiscountConditionType = 'SEQUENCE' | 'PERIOD';

/**
 * 변경에 취약한 클래스
 *
 * 새로운 할인 조건이 추가 될때, 순번 조건 로직 변경 시, 기간 조건 판단 로직 변경 시
 */
export abstract class DiscountCondition {
  private readonly type: DiscountConditionType;

  private readonly sequence: number;
  private readonly dayOfWeek: DayOfWeek;
  private readonly startTime: Date;
  private readonly endTime: Date;

  public isSatisfiedBy(screening: Screening): boolean {
    if (this.type === 'PERIOD') {
      return this.isSatisfiedByPeriod(screening);
    }

    return this.isSatisfiedBySequence(screening);
  }

  private isSatisfiedByPeriod(screening: Screening): boolean {
    const matchedWeek = screening.getWhenScreened().getDay() === this.dayOfWeek;
    const moreThenStartTime = screening.getWhenScreened() >= this.startTime;
    const lessThenEndTime = this.endTime >= screening.getWhenScreened();

    return matchedWeek && moreThenStartTime && lessThenEndTime;
  }

  private isSatisfiedBySequence(screening: Screening): boolean {
    return this.sequence === screening.getSequence();
  }
}

class PeriodCondition {
  private readonly dayOfWeek: DayOfWeek;
  private readonly startTime: Date;
  private readonly endTime: Date;

  constructor(dayOfWeek: DayOfWeek, startTime: Date, endTime: Date) {
    this.dayOfWeek = dayOfWeek;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  private isSatisfiedBy(screening: Screening): boolean {
    const matchedWeek = screening.getWhenScreened().getDay() === this.dayOfWeek;
    const moreThenStartTime = screening.getWhenScreened() >= this.startTime;
    const lessThenEndTime = this.endTime >= screening.getWhenScreened();

    return matchedWeek && moreThenStartTime && lessThenEndTime;
  }
}
