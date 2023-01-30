import {Lecture} from 'grade-calculation/Lecture';

const lecture = new Lecture('객체지향 프로그래밍', 70, [81, 96, 75, 50, 45]);

console.log(lecture.evaluate());
