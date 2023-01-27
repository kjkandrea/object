import {Money} from 'global/Money';
import {Seconds} from 'cellphone-rate/types';
import Call from 'cellphone-rate/Call';

export class Phone {
  private readonly amount: Money;
  private readonly seconds: Seconds;
  private calls: Call[] = [];

  constructor(amount: Money, seconds: Seconds) {
    this.amount = amount;
    this.seconds = seconds;
  }

  public call(call: Call) {
    this.calls.push(call);
  }

  public getCalls(): Call[] {
    return this.calls;
  }

  public getAmount(): Money {
    return this.amount;
  }

  public getSeconds(): Seconds {
    return this.seconds;
  }

  public calculateFee(): Money {
    return this.calls.reduce((totalMoney, call) => {
      totalMoney = totalMoney.plus(
        this.amount.times(call.getDurationSeconds() / this.seconds)
      );
      return totalMoney;
    }, Money.ZERO);
  }
}

/** 중복의 해로움 */
export class NightDiscountPhone {
  private static LATE_NIGHT_HOUR = 22;

  private readonly nightlyAmount: Money;
  private readonly regularAmount: Money;
  private readonly seconds: Seconds;
  private calls: Call[] = [];

  constructor(nightlyAmount: Money, regularAmount: Money, seconds: Seconds) {
    this.nightlyAmount = nightlyAmount;
    this.regularAmount = regularAmount;
    this.seconds = seconds;
  }

  public call(call: Call) {
    this.calls.push(call);
  }

  public getCalls(): Call[] {
    return this.calls;
  }

  public getSeconds(): Seconds {
    return this.seconds;
  }

  public calculateFee(): Money {
    const calculateCallFee = (call: Call): Money => {
      if (call.getFrom().getHours() >= NightDiscountPhone.LATE_NIGHT_HOUR) {
        return this.nightlyAmount.times(
          call.getDurationSeconds() / this.seconds
        );
      }
      return this.regularAmount.times(call.getDurationSeconds() / this.seconds);
    };

    return this.calls.reduce((totalMoney, call) => {
      totalMoney = totalMoney.plus(calculateCallFee(call));
      return totalMoney;
    }, Money.ZERO);
  }
}
