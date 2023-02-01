import {BasicRatePolicy} from 'cellphone-rate/RatePolicy/BasicRatePolicy';
import {Seconds} from 'cellphone-rate/types';
import {Money} from 'global/Money';
import {DateTimeInterval} from 'cellphone-rate/RatePolicy/utils/DateTimeInterval';
import Call from 'cellphone-rate/Call';

export class TimeOfDayDiscountPolicy extends BasicRatePolicy {
  private readonly starts: Date[] = [];
  private readonly ends: Date[] = [];
  private readonly durationSeconds: Seconds[] = [];
  private readonly amounts: Money[] = [];

  constructor(
    starts: Date[],
    ends: Date[],
    durationSeconds: Seconds[],
    amounts: Money[]
  ) {
    super();
    this.starts = starts;
    this.ends = ends;
    this.durationSeconds = durationSeconds;
    this.amounts = amounts;
  }

  protected calculateCallFee(call: Call): Money {
    const result = Money.ZERO;

    for (const dateTimeInterval of call.splitByDay()) {
      for (let i = 0; i < this.starts.length; i += 1) {
        const from = this.from(dateTimeInterval, this.starts[i]);
        const to = this.to(dateTimeInterval, this.ends[i]);
        const percent =
          (to.getTime() - from.getTime()) / 1000 / this.durationSeconds[i];
        result.plus(this.amounts[i].times(percent));
      }
    }

    return result;
  }

  private from(interval: DateTimeInterval, from: Date): Date {
    return interval.getFrom() > from ? from : interval.getFrom();
  }

  private to(interval: DateTimeInterval, to: Date): Date {
    return interval.getTo() < to ? to : interval.getTo();
  }
}
