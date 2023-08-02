import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const TIME_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const currentSeconds = localStorage.getItem(TIME_KEY);
function saveCurrentTime(event) {
  const curentTime = event.seconds;
  localStorage.setItem(TIME_KEY, curentTime);
}

player.setCurrentTime(currentSeconds || 0);
player.on('timeupdate', throttle(saveCurrentTime, 1000));
