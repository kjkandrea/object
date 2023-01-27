import Call from 'cellphone-rate/Call';
import {NightDiscountPhone, RegularPhone} from 'cellphone-rate/RegularPhone';
import {Money} from 'global/Money';
import {Seconds} from 'cellphone-rate/types';

/**
 * 10초당 5원 부과
 */
const regularPhone = new RegularPhone(Money.wons(5), 10 as Seconds);

regularPhone.call(
  new Call(new Date('2018-01-01T12:10:00'), new Date('2018-01-01T12:11:00'))
);

regularPhone.call(
  new Call(new Date('2018-01-02T12:10:00'), new Date('2018-01-02T12:11:00'))
);

console.log('regularPhone fee : ', regularPhone.calculateFee());

const nightlyDiscountPhone = new NightDiscountPhone(
  Money.wons(5),
  Money.wons(2),
  10 as Seconds
);

nightlyDiscountPhone.call(
  new Call(new Date('2018-01-01T12:10:00'), new Date('2018-01-01T12:11:00'))
);

nightlyDiscountPhone.call(
  new Call(new Date('2018-01-02T12:10:00'), new Date('2018-01-02T12:11:00'))
);

console.log('nightlyDiscountPhone fee : ', nightlyDiscountPhone.calculateFee());
