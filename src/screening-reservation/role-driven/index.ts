import {Movie} from './Movie';
import {Duration} from 'global/datetime/Duration';
import {Money} from '../global/Money';
import {AmountDiscountPolicy, DiscountPolicy, OverlappedDiscountPolicy, PercentDiscountPolicy} from './DiscountPolicy';
import {dayOfWeek} from 'global/datetime/dayOfWeek';
import {SequenceCondition, PeriodCondition, DiscountCondition} from './DiscountCondition';
import {Screening} from './Screening';

export class ServiceLocator {
  private static soleInstance = new ServiceLocator()
  private discountPolicy: DiscountPolicy;

  public static discountPolicy(): DiscountPolicy {
    return this.soleInstance.discountPolicy;
  }

  public static provide(discountPolicy: DiscountPolicy) {
    this.soleInstance.discountPolicy = discountPolicy;
  }
}

class Factory {
  public createAvatarMovie(): Movie {
    const avatarDiscountConditions: DiscountCondition[] = [
      new SequenceCondition(1),
      new SequenceCondition(10),
      new PeriodCondition(
        dayOfWeek.MONDAY,
        new Date('2022-12-26T04:19:07.900Z'),
        new Date('2022-12-26T06:19:07.900Z')
      ),
    ]

    ServiceLocator.provide(new OverlappedDiscountPolicy(
      new AmountDiscountPolicy(
        avatarDiscountConditions,
        Money.wons(800)
      ),
      new PercentDiscountPolicy(
        avatarDiscountConditions,
        0.1
      )
    ))
    return new Movie(
      '아바타',
      Duration.ofMinute(120),
      Money.wons(10000),
    );
  }
}

const factory = new Factory()

const avatarScreening = new Screening(
  factory.createAvatarMovie(),
  99,
  new Date('2022-12-26T04:19:07.900Z')
);

const reservation = avatarScreening.reserve({}, 1);

console.log(
  `${new Date(
    '2022-12-26T04:19:07.900Z'
  ).toLocaleTimeString()} 아바타 관람비 : ${reservation
    .getAmount()
    .toLocaleString('ko-KR')}원`
);
