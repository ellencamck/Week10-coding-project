// Define a Song class to represent individual songs
class Song {
    constructor(name, singer) {
        this.name = name;
        this.singer = singer;
    }
}
// Define a Playlist class to represent playlists, each containing a list of songs
class Playlist {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.songs = [];
    }
// Method to add a song to the playlist
    addSong(song) {
        this.songs.push(song);
    }
// Method to delete a song from the playlist
    deleteSong(song) {
        let index = this.songs.indexOf(song);
        this.songs.splice(index, 1);
    }
}
// Initialize an array to store playlists and a variable to generate playlist IDs
let playlists = [];
let playlistId = 0;


onClick('new-playlist', () => {
    playlists.push(new Playlist(playlistId++, getValue('new-playlist-name')));
    drawDOM();
});

// Function to handle click events
function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action)
    return element;
}
// Function to get the value of an element by its ID
function getValue(id) {
    return document.getElementById(id).value;
}
// Function to draw the DOM with playlists and songs
function drawDOM() {
    let playlistDiv = document.getElementById('playlists');
    clearElement(playlistDiv);
    for (playlist of playlists) {
        let table = createPlaylistTable(playlist);
        let title = document.createElement('h2');
        title.innerHTML = playlist.name;
        title.appendChild(createDeletePlaylistButton(playlist));
        playlistDiv.appendChild(title);
        playlistDiv.appendChild(table);
        for (song of playlist.songs) {
            createSongRow(playlist, table, song);
        }
        document.getElementById('new-playlist-name').value = '';
    }
}
// Function to create a new row for a song in a playlist
function createSongRow(playlist, table, song) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = song.name;
    row.insertCell(1).innerHTML = song.singer;
     // Create a "Delete" button for the song
    let deleteCell = row.insertCell(2);
    deleteCell.appendChild(createDeleteRowButton(playlist, song));
}
// Function to create a "Delete" button for a song
function createDeleteRowButton(playlist, song) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-light';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = playlist.songs.indexOf(song);
        playlist.songs.splice(index, 1);
        drawDOM();
    };
    return btn;
}
// Function to create a "Delete Playlist" button
function createDeletePlaylistButton (playlist) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-light';
    btn.innerHTML = 'Delete Playlist';
    btn.onclick = () => {
        let index = playlists.indexOf(playlist);
        playlists.splice(index, 1);
        drawDOM();
    }
    return btn;
}
// Function to create a "Add Song" button for a playlist
function createNewSongButton(playlist) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-light';
    btn.innerHTML = 'Add Song';
    btn.onclick = () => {
        playlist.songs.push(new Song(getValue(`name-input-${playlist.id}`), getValue(`singer-input-${playlist.id}`)));
        drawDOM();
    };
    return btn;
}
// Function to create a table for a playlist
function createPlaylistTable(playlist) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let singerColumn = document.createElement('th');
    nameColumn.innerHTML = 'Name';
    singerColumn.innerHTML = 'Singer';
    row.appendChild(nameColumn);
    row.appendChild(singerColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let singerTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${playlist.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let singerInput = document.createElement('input');
    singerInput.setAttribute('id', `singer-input-${playlist.id}`);
    singerInput.setAttribute('type', 'text');
    singerInput.setAttribute('class', 'form-control');
    let newSongButton = createNewSongButton(playlist);
    nameTh.appendChild(nameInput);
    singerTh.appendChild(singerInput);
    createTh.appendChild(newSongButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(singerTh);
    formRow.appendChild(createTh);
    return table;
}
// Function to clear all child elements of a given element
function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}