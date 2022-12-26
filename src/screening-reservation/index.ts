import {Movie} from './Movie';
import {Duration} from '../global/datetime/Duration';
import {Money} from './Money';
import {
  AmountDiscountPolicy,
  PercentDiscountPolicy,
  PeriodCondition,
  SequenceCondition,
} from './discountPolicy';
import {dayOfWeek} from '../global/datetime/dayOfWeek';

const avatar: Movie = new Movie(
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

const titanic: Movie = new Movie(
  '타이타닉',
  Duration.ofMinute(180),
  Money.wons(11000),
  new PercentDiscountPolicy(
    [
      new PeriodCondition(
        dayOfWeek.TUESDAY,
        new Date('2022-12-27T04:19:07.900Z'),
        new Date('2022-12-27T06:19:07.900Z')
      ),
    ],
    0.1
  )
);
