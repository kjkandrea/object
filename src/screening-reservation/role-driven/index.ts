import {Movie} from './Movie';
import {Duration} from '../../global/datetime/Duration';
import {Money} from '../global/Money';
import {AmountDiscountPolicy} from './DiscountPolicy';
import {dayOfWeek} from '../../global/datetime/dayOfWeek';
import {SequenceCondition, PeriodCondition} from './DiscountCondition';
import {Screening} from './Screening';

const avatar = new Movie(
  '아바타',
  Duration.ofMinute(120),
  Money.wons(10000),
  new AmountDiscountPolicy(
    [
      new SequenceCondition(1),
      new SequenceCondition(10),
      new PeriodCondition(
        dayOfWeek.MONDAY,
        new Date('2022-12-26T04:19:07.900Z'),
        new Date('2022-12-26T06:19:07.900Z')
      ),
    ],
    Money.wons(800)
  )
);

const avatarScreening = new Screening(
  avatar,
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
