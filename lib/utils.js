/* eslint-disable import/prefer-default-export */

export function convertDate(dateString) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const now = new Date(dateString);
  return `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
}
