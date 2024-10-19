
function placeHero() {
    placeItem(TILE_HERO, 1);
}

function placeEnemies() {
    placeItem(TILE_ENEMY, 10);
}

function placeWeapons() {
    placeItem(TILE_WEAPON, 2);
}

function placePotions() {
    placeItem(TILE_POTION, 10);
}

// Размещение предметов, героя и противников
function placeItem(type, count) {
    for (var i = 0; i < count; i++) {
        var placed = false;
        while (!placed) {
            var x = getRandom(0, mapWidth - 1);
            var y = getRandom(0, mapHeight - 1);
            if (map[y][x] === TILE_FLOOR || map[y][x] === TILE_ROOM) {
                map[y][x] = type; // Размещаем предмет
                placed = true;
            }
        }
    }
}