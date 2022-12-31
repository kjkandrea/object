import {Screening} from './Screening';
import {Money} from '../global/Money';

export abstract class Movie {
  public abstract calculateMovieFee(screening: Screening): Money;
}
