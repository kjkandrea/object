interface Movie {
  foo: 'bar';
}

class Screening {
  private movie: Movie;
  private sequence: number; // 순번
  private whenScreened: Date; // 상영 시작 시간

  constructor(movie: Movie, sequence: number, whenScreened: Date) {
    this.movie = movie;
    this.sequence = sequence;
    this.whenScreened = whenScreened;
  }
}
