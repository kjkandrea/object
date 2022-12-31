import {Screening} from '../Screening';
import {DayOfWeek} from '../../../global/datetime/dayOfWeek';

export interface DiscountCondition {
  isSatisfiedBy(screening: Screening): boolean;
}

class PeriodCondition implements DiscountCondition {
  private readonly dayOfWeek: DayOfWeek;
  private readonly startTime: Date;
  private readonly endTime: Date;

  constructor(dayOfWeek: DayOfWeek, startTime: Date, endTime: Date) {
    this.dayOfWeek = dayOfWeek;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  public isSatisfiedBy(screening: Screening): boolean {
    const matchedWeek = screening.getWhenScreened().getDay() === this.dayOfWeek;
    const moreThenStartTime = screening.getWhenScreened() >= this.startTime;
    const lessThenEndTime = this.endTime >= screening.getWhenScreened();

    return matchedWeek && moreThenStartTime && lessThenEndTime;
  }
}

class SequenceCondition implements DiscountCondition {
  private readonly sequence: number;

  constructor(sequence: number) {
    this.sequence = sequence;
  }

  public isSatisfiedBy(screening: Screening): boolean {
    return this.sequence === screening.getSequence();
  }
}
