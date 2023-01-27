import {Money} from 'global/Money';
import {Seconds} from 'cellphone-rate/types';
import Call from 'cellphone-rate/Call';

abstract class AbstractPhone {
  protected calls: Call[] = [];

  public call(call: Call) {
    this.calls.push(call);
  }

  public calculateFee(): Money {
    return this.calls.reduce((totalMoney, call) => {
      totalMoney = totalMoney.plus(this.calculateCallFee(call));
      return totalMoney;
    }, Money.ZERO);
  }

  protected abstract calculateCallFee(call: Call): Money;
}

export class Phone extends AbstractPhone {
  private readonly amount: Money;
  protected readonly seconds: Seconds;
  protected calls: Call[] = [];

  constructor(amount: Money, seconds: Seconds) {
    super();
    this.amount = amount;
    this.seconds = seconds;
  }

  protected calculateCallFee(call: Call): Money {
    return this.amount.times(call.getDurationSeconds() / this.seconds);
  }
}

export class NightDiscountPhone extends AbstractPhone {
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
    if (call.getFrom().getHours() >= NightDiscountPhone.LATE_NIGHT_HOUR) {
      return this.nightlyAmount.times(call.getDurationSeconds() / this.seconds);
    }

    return this.regularAmount.times(call.getDurationSeconds() / this.seconds);
  }
}
