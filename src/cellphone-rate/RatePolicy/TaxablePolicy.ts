import {AdditionalRatePolicy} from 'cellphone-rate/RatePolicy/AdditionalRatePolicy';
import {RatePolicy} from 'cellphone-rate/RatePolicy/RatePolicy';
import {Money} from 'global/Money';

export class TaxablePolicy extends AdditionalRatePolicy {
  private readonly taxRatio: number;

  constructor(taxRatio: number, next: RatePolicy) {
    super(next);
    this.taxRatio = taxRatio;
  }

  protected afterCalculated(fee: Money): Money {
    return fee.plus(fee.times(this.taxRatio));
  }
}
