import Call from 'cellphone-rate/Call';
import {Phone} from 'cellphone-rate/Phone';
import {Money} from 'global/Money';
import {Seconds} from 'cellphone-rate/types';
import {NightDiscountPolicy, RegularPolicy} from 'cellphone-rate/RatePolicy';
import {TaxablePolicy} from 'cellphone-rate/RatePolicy/TaxablePolicy';
import {RateDiscountablePolicy} from 'cellphone-rate/RatePolicy/RateDiscountablePolicy';

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
const regularPhone = new Phone(new RegularPolicy(Money.wons(5), 10 as Seconds));

calling(regularPhone);
console.log('regularPhone fee : ', regularPhone.calculateFee());

const taxableRegularPhone = new Phone(
  new TaxablePolicy(0.05, new RegularPolicy(Money.wons(5), 10 as Seconds))
);

calling(taxableRegularPhone);
console.log('taxableRegularPhone fee : ', taxableRegularPhone.calculateFee());

const taxableRateDiscountableRegularPhone = new Phone(
  new RateDiscountablePolicy(
    Money.wons(20),
    new TaxablePolicy(0.05, new RegularPolicy(Money.wons(5), 10 as Seconds))
  )
);

calling(taxableRateDiscountableRegularPhone);
console.log(
  'taxableRateDiscountableRegularPhone fee : ',
  taxableRateDiscountableRegularPhone.calculateFee()
);

const nightlyDiscountPhone = new Phone(
  new NightDiscountPolicy(Money.wons(5), Money.wons(2), 10 as Seconds)
);

calling(nightlyDiscountPhone);
console.log('nightlyDiscountPhone fee : ', nightlyDiscountPhone.calculateFee());

// const taxableNightDiscountPhone = new TaxableNightDiscountPhone(
//   Money.wons(5),
//   Money.wons(2),
//   10 as Seconds,
//   0.05
// );
//
// calling(taxableNightDiscountPhone);
// console.log(
//   'taxableNightDiscountPhone fee : ',
//   taxableNightDiscountPhone.calculateFee()
// );
