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
      duration: 259
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

//function that turns mm:ss to seconds
function mmssToSec (str) {
  let numbers = ['0','1','2','3','4','5','6','7','8','9'];
  let arr = str.split(":");
  for (let part of arr) {
    let subArr = part.split("");
    for (let subPart of subArr) {
      if (!numbers.includes(subPart)) {
        throw "error";
      }
    }
  } 
   if (arr.length === 3) {
    if (arr[1] > 59 || arr[2] > 59) throw "error";
    return (parseInt(arr[0]) * 3600 + parseInt(arr[1]) * 60 + parseInt(arr[2]));
  }else {
  if (arr[0] > 59 || arr[1] > 59) throw "error";
  return (parseInt(arr[0]) * 60 + parseInt(arr[1]));    
  }
}

//function that makes the mm:ss format
function mmssFormat (sec) {
  let hours = Math.floor(sec / 3600);
  let mins = Math.floor((sec - (hours * 3600)) / 60);
  let secs = sec % 60;
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (mins < 10) {
    mins = "0" + mins;
  }
  if (secs < 10) {
    secs = "0" + secs;
  }
  if (parseInt(hours) > 0){
    return `${hours}:${mins}:${secs}`;
  } else return `${mins}:${secs}`;
  
}

//function that takes id and returns the song object
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
    throw "error: ID is not exist";
  }
}

 //function to sort by title at searchByQuery
 function compareTitle( a, b ) {
  if ( a.title < b.title ){
    return -1;
  }
  if ( a.title > b.title ){
    return 1;
  }
  return 0;
}

 //function to sort by title at searchByQuery
 function compareName( a, b ) {
  if ( a.name < b.name ){
    return -1;
  }
  if ( a.name > b.name ){
    return 1;
  }
  return 0;
}

//function that takes id and returns the playlist object
function getPLById (id) {
  let i = 0;
  let k = undefined;
  for (i; i < player.playlists.length; i++) {
    if (player.playlists[i].id === id) {
      k = 8;
      return (player.playlists[i]);
    }
  } 
  if (k === undefined) {
    throw "error: ID is not exist";
  }
}

function playSong(id) {
player.playSong(getSongById(id))
}

function removeSong(id) {
  let index = player.songs.indexOf(getSongById(id));
  player.songs.splice(index, 1);
  for (let i = 0; i < player.playlists.length; i++) {
    for (let j = 0; j < player.playlists[i].songs.length; j++) {
      if (player.playlists[i].songs.indexOf(id) >= 0) {
        player.playlists[i].songs.splice(j, 1);
        return player.playlists[i].songs;
      }
    }
  }
  return player.songs;
}

function addSong(title, album, artist, duration, id) {
  for (let i = 0; i < player.songs.length; i++) {
    if (player.songs[i].id === id) {
      throw "taken id"
    }
  }
  if (!id) {
    id = 6;
  }
  for (let i = 0; i < player.songs.length; i++) {
    if (player.songs[i].id === id) {
      id++
    }
  }
  let newSong = {
    'id':id,
    'title':title,
    'album':album,
    'artist':artist,
    'duration':mmssToSec(duration)
  }
  player.songs.push(newSong);
  return id;
}

function removePlaylist(id) {
  let index = player.playlists.indexOf(getPLById(id));
  player.playlists.splice(index, 1);
  return player.playlists;
}

function createPlaylist(name, id) {
  for (let i = 0; i < player.playlists.length; i++) {
    if (player.playlists[i].id === id) {
      throw "taken id";
    }
  }
  if (!id) {
    id = 2;
  }
  for (let i = 0; i < player.playlists.length; i++) {
    if (player.playlists[i].id === id) {
      id++
    }
  }
  let newPL = {
    'id':id,
    'name':name,
    'songs':[]
  }
  player.playlists.push(newPL);
  return id;
}

function playPlaylist(id) {
  let playlistObj = getPLById(id);
  for (let i = 0; i < playlistObj.songs.length; i++) {
    player.playSong(getSongById(playlistObj.songs[i]))
  }
}

function editPlaylist(playlistId, songId) {
  const PL = getPLById(playlistId);
  const song = getSongById(songId);
  if (PL.songs.indexOf(songId) >= 0) { //exist
    if (PL.songs.length === 1) {
      player.playlists.splice(player.playlists.indexOf(PL), 1);
    } else {
      PL.songs.splice(PL.songs.indexOf(songId), 1)
    }
  } else {
    PL.songs.push(songId);
  }
}

function playlistDuration(id) {
  const songs = getPLById(id).songs;
  let durations = [];
  let sum = 0;
  for (let i = 0; i < player.songs.length; i++) {
    for (let j = 0; j < songs.length; j++) {
      if (songs[j] === player.songs[i].id) {
        durations.push(player.songs[i].duration);
      }
    }
  }
  for (let i = 0; i < durations.length; i++) {
    sum += durations[i];
  }
  return sum;
}

function searchByQuery(query) {
  let upperCaseQuery = query.toUpperCase();
  const obj = {songs:[], playlists:[]};
  for (let song of player.songs) {
    let upperCaseTitle = song.title.toLocaleUpperCase();
    let upperCaseAlbum = song.album.toLocaleUpperCase();
    let upperCaseArtist = song.artist.toLocaleUpperCase();
    if (upperCaseTitle.includes(upperCaseQuery) || upperCaseAlbum.includes(upperCaseQuery) || upperCaseArtist.includes(upperCaseQuery)) {
      obj.songs.push(song);
    }
  }
  for (let pl of player.playlists) {
    let upperCaseName = pl.name.toLocaleUpperCase();
    if (upperCaseName.includes(upperCaseQuery)) {
      obj.playlists.push(pl);
    }
  }
  obj.songs.sort(compareTitle);
  obj.playlists.sort(compareName);
  return obj
}

function searchByDuration(duration) {
  let closest = {};
  let range = null;
  let secs;
  try {
     secs = mmssToSec(duration);  
  } catch {
    return "please provide duration in mm:ss format"
  }
   let comparisonArray = [secs];
  for (let song of player.songs) {
    comparisonArray.push(song.duration);
    comparisonArray.sort((a, b) => (a - b));
    if ((comparisonArray[1] - comparisonArray[0]) < range || range === null) {
      range = comparisonArray[1] - comparisonArray[0];
      closest = song;
    }
    comparisonArray.splice(comparisonArray.indexOf(song.duration), 1);
  }
  for (let list of player.playlists) {
    let listLong = playlistDuration(list.id);
    comparisonArray.push(listLong);
    comparisonArray.sort((a, b) => (a - b));
    if ((comparisonArray[1] - comparisonArray[0]) < range || range === null) {
      range = comparisonArray[1] - comparisonArray[0];
      closest = list;
    }
    comparisonArray.splice(comparisonArray.indexOf(listLong), 1)
  }
  return closest; 
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
