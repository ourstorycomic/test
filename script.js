const socket = io();

const video = document.getElementById('video');
const createRoomBtn = document.getElementById('create-room-btn');
const inviteLinkInput = document.getElementById('invite-link');

let roomID;

createRoomBtn.addEventListener('click', () => {
  roomID = generateRoomID();
  inviteLinkInput.value = window.location.href + '?room=' + roomID;
  socket.emit('create room', roomID);
});

function generateRoomID() {
  return Math.random().toString(36).substring(2, 8);
}

function getRoomIDFromURL() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('room');
}

socket.on('connect', () => {
  const room = getRoomIDFromURL();
  if (room) {
    socket.emit('join room', room);
  }
});

video.addEventListener('play', () => {
  socket.emit('play');
});

video.addEventListener('pause', () => {
  socket.emit('pause');
});

socket.on('play', () => {
  video.play();
});

socket.on('pause', () => {
  video.pause();
});
