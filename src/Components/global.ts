export const getTime = (date: string) => {
  const d = new Date(date);
  const hour = d.getHours();
  const minute = d.getMinutes() > 10 ? d.getMinutes() : `${d.getMinutes()}0`;

  return `오후 ${hour === 12 ? hour : hour - 12}시 ${minute}분`;
};

export const getDate = (date: string) => {
  const d = new Date(date);

  return [
    `${d.getFullYear()}년`,
    `${d.getMonth() + 1}월`,
    `${d.getDate()}일`,
  ].join(' ');
};

export const pianoTimes = [
  '',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
];

export const paletteTimes = [
  '',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
  '22:30',
];
