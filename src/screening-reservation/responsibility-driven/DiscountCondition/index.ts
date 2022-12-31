import {Screening} from '../Screening';
import {DayOfWeek} from '../../../global/datetime/dayOfWeek';

type DiscountConditionType = 'SEQUENCE' | 'PERIOD';

export abstract class DiscountCondition {
  private readonly type: DiscountConditionType;

  private readonly sequence: number;
  private readonly dayOfWeek: DayOfWeek;
  private readonly startTime: Date;
  private readonly endTime: Date;

  public abstract isSatisfiedBy(screening: Screening): boolean;
}
