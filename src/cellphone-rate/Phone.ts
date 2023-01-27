import {Money} from 'global/Money';
import {Seconds} from 'cellphone-rate/types';
import Call from 'cellphone-rate/Call';

// 통화 목록을 계산하는 방법이 바뀔 경우만 변경된다.
export abstract class Phone {
  private calls: Call[] = [];

  public call(call: Call) {
    this.calls.push(call);
  }

  public getCalls(): Call[] {
    return this.calls;
  }

  public calculateFee(): Money {
    const fee = this.calls.reduce((totalMoney, call) => {
      totalMoney = totalMoney.plus(this.calculateCallFee(call));
      return totalMoney;
    }, Money.ZERO);
    return this.afterCalculated(fee);
  }

  protected abstract calculateCallFee(call: Call): Money;

  /**
   * hook method
   */
  protected afterCalculated(fee: Money): Money {
    return fee;
  }
}

// 일반 요금제의 통화 한 건을 계산하는 방식이 바뀔 경우에만 변경된다.
export class RegularPhone extends Phone {
  private readonly amount: Money;
  protected readonly seconds: Seconds;

  constructor(amount: Money, seconds: Seconds) {
    super();
    this.amount = amount;
    this.seconds = seconds;
  }

  protected calculateCallFee(call: Call): Money {
    return this.amount.times(call.getDurationSeconds() / this.seconds);
  }
}

export class TaxableRegularPhone extends RegularPhone {
  private readonly taxRate: number;

  constructor(amount: Money, seconds: Seconds, taxRate: number) {
    super(amount, seconds);
    this.taxRate = taxRate;
  }

  protected afterCalculated(fee: Money): Money {
    return fee.plus(fee.times(this.taxRate));
  }
}

// 심야 할인 요금제의 통화 한 건을 계산하는 방식이 바뀔 경우에만 변경된다.
export class NightDiscountPhone extends Phone {
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

export class TaxableNightDiscountPhone extends NightDiscountPhone {
  private readonly taxRate: number;

  constructor(
    nightlyAmount: Money,
    regularAmount: Money,
    seconds: Seconds,
    taxRate: number
  ) {
    super(nightlyAmount, regularAmount, seconds);
    this.taxRate = taxRate;
  }

  protected afterCalculated(fee: Money): Money {
    return fee.plus(fee.times(this.taxRate));
  }
}
