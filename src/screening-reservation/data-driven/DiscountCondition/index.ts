import {DayOfWeek} from '../../../global/datetime/dayOfWeek';

interface SequenceDiscountCondition {
  type: 'SEQUENCE';
  sequence: number;
}

interface PeriodDiscountCondition {
  type: 'PERIOD';
  dayOfWeek: DayOfWeek;
  startTime: Date;
  endTime: Date;
}

type DiscountConditionProp =
  | SequenceDiscountCondition
  | PeriodDiscountCondition;

type DiscountConditionType = DiscountConditionProp['type'];

export class DiscountCondition {
  private readonly type: DiscountConditionType;

  private readonly sequence?: number;
  private readonly dayOfWeek?: DayOfWeek;
  private readonly startTime?: Date;
  private readonly endTime?: Date;

  constructor(discountCondition: DiscountConditionProp) {
    this.type = discountCondition.type;
    switch (discountCondition.type) {
      case 'SEQUENCE':
        this.sequence = discountCondition.sequence;
        break;
      case 'PERIOD':
        this.dayOfWeek = discountCondition.dayOfWeek;
        this.startTime = discountCondition.startTime;
        this.endTime = discountCondition.endTime;
        break;
    }
  }

  public getType(): DiscountConditionType {
    return this.type;
  }

  public getDayOfWeek(): DayOfWeek | undefined {
    return this.dayOfWeek;
  }

  public getStartTime(): Date | undefined {
    return this.startTime;
  }

  public getEndTime(): Date | undefined {
    return this.endTime;
  }

  public getSequence(): number | undefined {
    return this.sequence;
  }
}
