'use strict'

var map = [];
var isGameOver = false;

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
    startEnemyMovement();
    startEnemyAttackCheck();
});
