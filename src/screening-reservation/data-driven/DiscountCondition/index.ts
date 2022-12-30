import {DayOfWeek} from '../../../global/datetime/dayOfWeek';

type DiscountConditionType = 'SEQUENCE' | 'PERIOD';

export class DiscountCondition {
  private type: DiscountConditionType;

  private sequence: number;

  private dayOfWeek: DayOfWeek;
  private startTime: Date;
  private endTime: Date;

  public getType(): DiscountConditionType {
    return this.type;
  }

  public getDayOfWeek(): DayOfWeek {
    return this.dayOfWeek;
  }

  public getStartTime(): Date {
    return this.startTime;
  }

  public getEndTime(): Date {
    return this.endTime;
  }

  public getSequence(): number {
    return this.sequence;
  }
}
