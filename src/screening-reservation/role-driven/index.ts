import {Movie} from './Movie';
import {Duration} from '../../global/datetime/Duration';
import {Money} from '../global/Money';
import {AmountDiscountPolicy, OverlappedDiscountPolicy, PercentDiscountPolicy} from './DiscountPolicy';
import {dayOfWeek} from '../../global/datetime/dayOfWeek';
import {SequenceCondition, PeriodCondition, DiscountCondition} from './DiscountCondition';
import {Screening} from './Screening';

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

    return new Movie(
      '아바타',
      Duration.ofMinute(120),
      Money.wons(10000),
      new OverlappedDiscountPolicy(
        new AmountDiscountPolicy(
          avatarDiscountConditions,
          Money.wons(800)
        ),
        new PercentDiscountPolicy(
          avatarDiscountConditions,
          0.1
        )
      )
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
