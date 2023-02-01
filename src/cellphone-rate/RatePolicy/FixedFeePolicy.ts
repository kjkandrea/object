import {BasicRatePolicy} from 'cellphone-rate/RatePolicy';
import {Money} from 'global/Money';
import {Seconds} from 'cellphone-rate/types';
import Call from 'cellphone-rate/Call';

export class FixedFeePolicy extends BasicRatePolicy {
  private readonly amount: Money;
  private readonly seconds: Seconds;

  constructor(amount: Money, seconds: Seconds) {
    super();
    this.amount = amount;
    this.seconds = seconds;
  }

  protected calculateCallFee(call: Call): Money {
    return this.amount.times(call.getDurationSeconds() / this.seconds);
  }
}
