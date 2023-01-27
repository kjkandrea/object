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
      totalMoney = totalMoney.plus(this.calculateCallFee(call));
      return totalMoney;
    }, Money.ZERO);

    return fee.plus(fee.times(this.taxRate));
  }

  protected calculateCallFee(call: Call): Money {
    return this.amount.times(call.getDurationSeconds() / this.seconds);
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

  /**
   * 어거지로 상속을 활용하려다보니 코드가 이해하기 난해해진 모습.
   */
  public calculateFee(): Money {
    const fee = this.calls.reduce((totalMoney, call) => {
      totalMoney = totalMoney.plus(this.calculateNightCallFee(call));
      return totalMoney;
    }, Money.ZERO);

    return fee.plus(fee.times(this.taxRate));
  }

  private calculateNightCallFee(call: Call): Money {
    if (call.getFrom().getHours() >= NightDiscountPhone.LATE_NIGHT_HOUR) {
      return this.nightlyAmount.times(call.getDurationSeconds() / this.seconds);
    } else {
      return this.calculateCallFee(call);
    }
  }
}
