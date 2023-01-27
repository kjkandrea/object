import Call from 'cellphone-rate/Call';
import {NightDiscountPhone, Phone} from 'cellphone-rate/Phone';
import {Money} from 'global/Money';
import {Seconds} from 'cellphone-rate/types';

/**
 * 10초당 5원 부과
 */
const phone = new Phone(Money.wons(5), 10 as Seconds, 0.05);

phone.call(
  new Call(new Date('2018-01-01T12:10:00'), new Date('2018-01-01T12:11:00'))
);

phone.call(
  new Call(new Date('2018-01-02T12:10:00'), new Date('2018-01-02T12:11:00'))
);

console.log('phone fee : ', phone.calculateFee());

const nightlyDiscountPhone = new NightDiscountPhone(
  Money.wons(5),
  Money.wons(2),
  10 as Seconds,
  0.05
);

nightlyDiscountPhone.call(
  new Call(new Date('2018-01-01T12:10:00'), new Date('2018-01-01T12:11:00'))
);

nightlyDiscountPhone.call(
  new Call(new Date('2018-01-02T12:10:00'), new Date('2018-01-02T12:11:00'))
);

console.log('nightlyDiscountPhone fee : ', nightlyDiscountPhone.calculateFee());
