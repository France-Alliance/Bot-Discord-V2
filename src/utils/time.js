const year = () => new Date().getFullYear();
const month = () =>
  `${new Date().getMonth() + 1}`.length === 1
    ? `0${new Date().getMonth() + 1}`
    : `${new Date().getMonth() + 1}`;
const date = () =>
  `${new Date().getDate()}`.length === 1
    ? `0${new Date().getDate()}`
    : `${new Date().getDate()}`;
const hours = () => new Date().getHours();
const minutes = () => new Date().getMinutes();
const secondes = () => new Date().getSeconds();

export { year, month, date, hours, minutes, secondes };