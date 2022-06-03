import Player from '@vimeo/player';
import throttle from 'lodash/throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

const LOCAL_TIME_SET = 'videoplayer-current-time';
const localTime = localStorage.getItem(LOCAL_TIME_SET);

player.on('timeupdate', throttle(onTimeUpdate, 1000));

function onTimeUpdate({ seconds }) {
  localStorage.setItem(LOCAL_TIME_SET, seconds);
}

if (localTime) {
  player.setCurrentTime(localTime);
}
