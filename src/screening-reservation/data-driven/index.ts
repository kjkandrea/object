import {Movie} from './Movie';
import {Duration} from '../../global/datetime/Duration';
import {Money} from '../global/Money';
import {DiscountCondition} from './DiscountCondition';
import {dayOfWeek} from '../../global/datetime/dayOfWeek';
import {Screening} from './Screening';

const avatar = new Movie(
  '아바타',
  Duration.ofMinute(120),
  Money.wons(10000),
  [
    ...[1, 10].map(
      sequence =>
        new DiscountCondition({
          type: 'SEQUENCE',
          sequence,
        }),
      new DiscountCondition({
        type: 'PERIOD',
        dayOfWeek: dayOfWeek.MONDAY,
        startTime: new Date('2022-12-26T04:19:07.900Z'),
        endTime: new Date('2022-12-26T06:19:07.900Z'),
      })
    ),
  ],
  {
    type: 'AMOUNT_DISCOUNT',
    discountAmount: Money.wons(800),
  }
);

const avatarScreening = new Screening(
  avatar,
  99,
  new Date('2022-12-26T04:19:07.900Z')
);
