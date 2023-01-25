import {DiscountCondition} from "screening-reservation/role-driven/DiscountCondition";
import {Screening} from "screening-reservation/role-driven/Screening";
import {Money} from "screening-reservation/global/Money";
import {DiscountPolicy} from "screening-reservation/role-driven/DiscountPolicy";

export class PercentDiscountPolicy extends DiscountPolicy {
  private readonly percent: number;

  constructor(conditions: DiscountCondition[], percent: number) {
    super(conditions);
    this.percent = percent;
  }

  protected getDiscountAmount(screening: Screening): Money {
    return screening.getMovieFee().times(this.percent);
  }
}
