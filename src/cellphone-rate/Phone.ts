import {Money} from 'global/Money';
import {Seconds} from 'cellphone-rate/types';
import Call from 'cellphone-rate/Call';

export class Phone {
  private readonly amount: Money;
  protected readonly seconds: Seconds;
  protected readonly taxRate: number;
  protected calls: Call[] = [];

  constructor(amount: Money, seconds: Seconds, taxRate: number) {
    this.amount = amount;
    this.seconds = seconds;
    this.taxRate = taxRate;
  }

  public call(call: Call) {
    this.calls.push(call);
  }

  public getAmount(): Money {
    return this.amount;
  }

  public calculateFee(): Money {
    const fee = this.calls.reduce((totalMoney, call) => {
      totalMoney = totalMoney.plus(
        this.amount.times(call.getDurationSeconds() / this.seconds)
      );
      return totalMoney;
    }, Money.ZERO);

    return fee.plus(fee.times(this.taxRate));
  }
}

export class NightDiscountPhone extends Phone {
  private static LATE_NIGHT_HOUR = 22;

  private readonly nightlyAmount: Money;

  constructor(
    nightlyAmount: Money,
    regularAmount: Money,
    seconds: Seconds,
    taxRate: number
  ) {
    super(regularAmount, seconds, taxRate);
    this.nightlyAmount = nightlyAmount;
  }

  public calculateFee(): Money {
    const fee = super.calculateFee();

    const nightlyFee = this.calls.reduce((totalMoney, call) => {
      if (call.getFrom().getHours() >= NightDiscountPhone.LATE_NIGHT_HOUR) {
        totalMoney = totalMoney.plus(
          this.nightlyAmount.times(call.getDurationSeconds() / this.seconds)
        );
      }

      return totalMoney;
    }, Money.ZERO);

    return fee.minus(nightlyFee);
  }
}
