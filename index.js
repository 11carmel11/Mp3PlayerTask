const player = {
  songs: [
    {
      id: 1,
      title: 'Vortex',
      album: 'Wallflowers',
      artist: 'Jinjer',
      duration: 242,
    },
    {
      id: 2,
      title: 'Vinda',
      album: 'Godtfolk',
      artist: 'Songleikr',
      duration: 160,
    },
    {
      id: 7,
      title: 'Shiroyama',
      album: 'The Last Stand',
      artist: 'Sabaton',
      duration: 213,
    },
    {
      id: 3,
      title: 'Thunderstruck',
      album: 'The Razors Edge',
      artist: 'AC/DC',
      duration: 292,
    },
    {
      id: 4,
      title: 'All is One',
      album: 'All is One',
      artist: 'Orphaned Land',
      duration: 270,
    },
    {
      id: 5,
      title: 'As a Stone',
      album: 'Show Us What You Got',
      artist: 'Full Trunk',
      duration: 259,
    },
  ],
  playlists: [
    { id: 1, name: 'Metal', songs: [1, 7, 4] },
    { id: 5, name: 'Israeli', songs: [4, 5] },
  ],
  playSong(song) {
    console.log("Playing " + song['title'] + " from " + song['album'] + " by " + song['artist'] + " | " + mmssFormat(song['duration']) + ".");
  },
}

//function that makes the mm:ss format
function mmssFormat (sec) {
  let mins = Math.floor(sec / 60)
  let secs = sec % 60;
  if (mins < 10) {
    mins = "0" + mins;
  }
  if (secs < 10) {
    secs = "0" + secs;
  }
  return `${mins}:${secs}`
}
//funnction that takes id and return the song object
function getSongById (id) {
  let i = 0;
  let k = undefined;
  for (i; i < player.songs.length; i++) {
    if (player.songs[i].id === id) {
      k = 8;
      return (player.songs[i]);
    }
  } 
  if (k === undefined) {
    throw "error: ID is not exist"
  }
}

function playSong(id) {
player.playSong(getSongById(id))
}

function removeSong(id) {
  let index = player.songs.indexOf(getSongById(id));
  player.songs.splice(index, 1);
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < player.playlists[i].length; j++) {
      if (player.playlists[i].songs.indexOf(id) >= 0) {
        player.playlists[i].songs.splice(j, 1);
        return player.playlists[i].songs;
      }
    }
  }
  return player.songs;
}
function addSong(title, album, artist, duration, id) {
  // your code here
}

function removePlaylist(id) {
  // your code here
}

function createPlaylist(name, id) {
  // your code here
}

function playPlaylist(id) {
  // your code here
}

function editPlaylist(playlistId, songId) {
  // your code here
}

function playlistDuration(id) {
  // your code here
}

function searchByQuery(query) {
  // your code here
}

function searchByDuration(duration) {
  // your code here
}

module.exports = {
  player,
  playSong,
  removeSong,
  addSong,
  removePlaylist,
  createPlaylist,
  playPlaylist,
  editPlaylist,
  playlistDuration,
  searchByQuery,
  searchByDuration,
}
