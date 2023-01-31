import {Lecture} from 'grade-calculation/Lecture';
import {GradeLecture} from 'grade-calculation/GradeLecture';
import {Grade} from 'grade-calculation/Grade';
import {Professor} from 'grade-calculation/Professor';

const lecture = new Lecture('객체지향 프로그래밍', 70, [81, 96, 75, 50, 45]);

console.log(lecture.evaluate());

const gradeLecture = new GradeLecture(
  '객체지향 프로그래밍',
  70,
  [
    new Grade('A', 100, 95),
    new Grade('B', 94, 80),
    new Grade('C', 79, 70),
    new Grade('D', 69, 50),
    new Grade('F', 49, 0),
  ],
  [81, 95, 75, 50, 45]
);

console.log(gradeLecture.evaluate());

const professor = new Professor(
  '다익스트라',
  new GradeLecture(
    '알고리즘',
    70,
    [
      new Grade('A', 100, 95),
      new Grade('B', 94, 80),
      new Grade('C', 79, 70),
      new Grade('D', 69, 50),
      new Grade('F', 49, 0),
    ],
    [81, 95, 75, 50, 45]
  )
);

console.log(professor.compileStatistics());
