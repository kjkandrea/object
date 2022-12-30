import {Day} from '../../../global/datetime/dayOfWeek';

type DiscountConditionType = 'SEQUENCE' | 'PERIOD';

export class DiscountCondition {
  private discountConditionType: DiscountConditionType;

  private sequence: number;

  private dayOfWeek: Day;
  private startTime: Date;
  private endTime: Date;
}
