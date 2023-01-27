import Call from 'cellphone-rate/Call';

const to = new Date();
const from = new Date(to.getTime() - 1000 * 60 * 5);

const call = new Call(from, to);
console.log(`통화 시간 : ${call.getDurationSecond()}초`);
