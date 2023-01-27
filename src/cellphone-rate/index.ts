import Call from 'cellphone-rate/Call';
import {
  NightDiscountPhone,
  Phone,
  RegularPhone,
  TaxableRegularPhone,
} from 'cellphone-rate/Phone';
import {Money} from 'global/Money';
import {Seconds} from 'cellphone-rate/types';

function calling(phone: Phone) {
  phone.call(
    new Call(new Date('2018-01-01T12:10:00'), new Date('2018-01-01T12:11:00'))
  );
  phone.call(
    new Call(new Date('2018-01-02T12:10:00'), new Date('2018-01-02T12:11:00'))
  );
}

/**
 * 10초당 5원 부과
 */
const regularPhone = new RegularPhone(Money.wons(5), 10 as Seconds);

calling(regularPhone);
console.log('regularPhone fee : ', regularPhone.calculateFee());

const taxableRegularPhone = new TaxableRegularPhone(
  Money.wons(5),
  10 as Seconds,
  0.05
);

calling(taxableRegularPhone);
console.log('taxableRegularPhone fee : ', taxableRegularPhone.calculateFee());

const nightlyDiscountPhone = new NightDiscountPhone(
  Money.wons(5),
  Money.wons(2),
  10 as Seconds
);

calling(nightlyDiscountPhone);
console.log('nightlyDiscountPhone fee : ', nightlyDiscountPhone.calculateFee());
