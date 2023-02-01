import Call from 'cellphone-rate/Call';
import {Phone} from 'cellphone-rate/Phone';
import {Money} from 'global/Money';
import {Seconds} from 'cellphone-rate/types';
import {NightDiscountPolicy, FixedFeePolicy} from 'cellphone-rate/RatePolicy';
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
const fixedFeePhone = new Phone(
  new FixedFeePolicy(Money.wons(5), 10 as Seconds)
);

calling(fixedFeePhone);
console.log('fixedFeePhone fee : ', fixedFeePhone.calculateFee());

const taxableFixedFeePhone = new Phone(
  new TaxablePolicy(0.05, new FixedFeePolicy(Money.wons(5), 10 as Seconds))
);

calling(taxableFixedFeePhone);
console.log('taxableFixedFeePhone fee : ', taxableFixedFeePhone.calculateFee());

const taxableRateDiscountableFixedFeePhone = new Phone(
  new RateDiscountablePolicy(
    Money.wons(20),
    new TaxablePolicy(0.05, new FixedFeePolicy(Money.wons(5), 10 as Seconds))
  )
);

calling(taxableRateDiscountableFixedFeePhone);
console.log(
  'taxableRateDiscountableFixedFeePhone fee : ',
  taxableRateDiscountableFixedFeePhone.calculateFee()
);

const nightlyDiscountPhone = new Phone(
  new NightDiscountPolicy(Money.wons(5), Money.wons(2), 10 as Seconds)
);

calling(nightlyDiscountPhone);
console.log('nightlyDiscountPhone fee : ', nightlyDiscountPhone.calculateFee());

const taxableRateDiscountableNightDiscountPhone = new Phone(
  new RateDiscountablePolicy(
    Money.wons(15),
    new TaxablePolicy(
      0.05,
      new NightDiscountPolicy(Money.wons(5), Money.wons(2), 10 as Seconds)
    )
  )
);

calling(taxableRateDiscountableNightDiscountPhone);
console.log(
  'taxableRateDiscountableNightDiscountPhone fee : ',
  taxableRateDiscountableNightDiscountPhone.calculateFee()
);
