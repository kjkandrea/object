import {BasicRatePolicy} from 'cellphone-rate/RatePolicy/BasicRatePolicy';
import {Seconds} from 'cellphone-rate/types';
import {Money} from 'global/Money';
import {DateTimeInterval} from 'cellphone-rate/RatePolicy/utils/DateTimeInterval';
import Call from 'cellphone-rate/Call';

export class TimeOfDayDiscountPolicy extends BasicRatePolicy {
  private starts: Date[] = [];
  private ends: Date[] = [];
  private durationSeconds: Seconds[] = [];
  private amount: Money[] = [];

  protected calculateCallFee(call: Call): Money {
    const result = Money.ZERO;

    console.log(call.splitByDay());

    return result;
  }

  private from(interval: DateTimeInterval, from: Date): Date {
    return interval.getFrom() > from ? from : interval.getFrom();
  }

  private to(interval: DateTimeInterval, to: Date): Date {
    return interval.getTo() < to ? to : interval.getTo();
  }
}
