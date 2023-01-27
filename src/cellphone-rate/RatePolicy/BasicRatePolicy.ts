import {RatePolicy} from 'cellphone-rate/RatePolicy';
import {Phone} from 'cellphone-rate/Phone';
import {Money} from 'global/Money';
import Call from 'cellphone-rate/Call';

export abstract class BasicRatePolicy implements RatePolicy {
  public calculateFee(phone: Phone): Money {
    let fee = Money.ZERO;

    for (const call of phone.getCalls()) {
      fee = fee.plus(this.calculateCallFee(call));
    }

    return fee;
  }

  protected abstract calculateCallFee(call: Call): Money;
}
