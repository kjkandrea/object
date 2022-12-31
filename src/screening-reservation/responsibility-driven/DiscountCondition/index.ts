import {Screening} from '../Screening';
import {DayOfWeek} from '../../../global/datetime/dayOfWeek';

type DiscountConditionType = 'SEQUENCE' | 'PERIOD';

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
