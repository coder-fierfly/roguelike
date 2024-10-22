'use strict'

var map = [];
var mapEnemies = [];
var isGameOver = false;

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initGame() {
    initMap();
    initMapEnemies();
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
