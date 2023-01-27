import {BasicRatePolicy} from 'cellphone-rate/RatePolicy';
import {Money} from 'global/Money';
import {Seconds} from 'cellphone-rate/types';
import Call from 'cellphone-rate/Call';

export class NightDiscountPolicy extends BasicRatePolicy {
  private static LATE_NIGHT_HOUR = 22;

  private readonly nightlyAmount: Money;
  private readonly regularAmount: Money;
  private readonly seconds: Seconds;

  constructor(nightlyAmount: Money, regularAmount: Money, seconds: Seconds) {
    super();
    this.nightlyAmount = nightlyAmount;
    this.regularAmount = regularAmount;
    this.seconds = seconds;
  }

  protected calculateCallFee(call: Call): Money {
    if (call.getFrom().getHours() >= NightDiscountPolicy.LATE_NIGHT_HOUR) {
      return this.nightlyAmount.times(call.getDurationSeconds() / this.seconds);
    }

    return this.regularAmount.times(call.getDurationSeconds() / this.seconds);
  }
}
