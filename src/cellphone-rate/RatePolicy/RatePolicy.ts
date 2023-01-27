import {Money} from 'global/Money';
import {Phone} from 'cellphone-rate/Phone';

export interface RatePolicy {
  calculateFee(phone: Phone): Money;
}
