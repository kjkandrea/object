import {Money} from 'global/Money';
import {Seconds} from 'cellphone-rate/types';
import Call from 'cellphone-rate/Call';

export default class Phone {
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

  public calculrateFee(): Money {
    return this.calls.reduce((totalMoney, call) => {
      totalMoney = totalMoney.plus(
        this.amount.times(call.getDurationSeconds() / this.seconds)
      );
      return totalMoney;
    }, Money.ZERO);
  }
}
