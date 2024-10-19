var TILE_WALL = 'W';
var TILE_FLOOR = 'F';
var TILE_ROOM = 'R';
var TILE_HERO = 'H';
var TILE_ENEMY = 'E';
var TILE_WEAPON = 'S';
var TILE_POTION = 'P';

var mapWidth = 40;
var mapHeight = 24;
var map = [];

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



// инициализация игры
function initGame() {
    initMap();
    placeRoad();
    placeRooms();
    placeHero();
    placeEnemies();
    placeWeapons();
    placePotions();
    drawMap();
}

// Запуск игры
$(document).ready(function () {
    initGame();
});
