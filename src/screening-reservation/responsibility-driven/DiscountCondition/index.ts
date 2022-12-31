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

  abstract isSatisfiedByPeriod(screening: Screening): boolean;
  abstract isSatisfiedBySequence(screening: Screening): boolean;
}
