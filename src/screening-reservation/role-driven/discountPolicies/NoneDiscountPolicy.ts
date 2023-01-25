import {Screening} from "screening-reservation/role-driven/Screening";
import {Money} from "screening-reservation/global/Money";
import {DiscountPolicy} from "screening-reservation/role-driven/DiscountPolicy";

export class NoneDiscountPolicy extends DiscountPolicy {
  constructor() {
    super([]);
  }

  protected getDiscountAmount(screening: Screening): Money {
    return Money.ZERO;
  }
}
