import {Movie} from './Movie';

export class Screening {
  private readonly movie: Movie;
  private readonly sequence: number;
  private readonly whenScreened: Date;

  constructor(movie: Movie, sequence: number, whenScreened: Date) {
    this.movie = movie;
    this.sequence = sequence;
    this.whenScreened = whenScreened;
  }

  public getMovie(): Movie {
    return this.movie;
  }

  public getWhenScreened(): Date {
    return this.whenScreened;
  }

  public getSequence(): number {
    return this.sequence;
  }
}
