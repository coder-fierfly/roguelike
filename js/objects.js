var heroData = {};
var enemiesData = [];

function placeHero() {
    heroData = placeItem(TILE_HERO, 1)[0];
}

function placeEnemies() {
    enemiesData = placeItem(TILE_ENEMY, 10);
}

function placeWeapons() {
    placeItem(TILE_WEAPON, 2);
}

function placePotions() {
    placeItem(TILE_POTION, 10);
}

// Размещение предметов, героя и противников
function placeItem(type, count) {
    var positions = [];

    for (var i = 0; i < count; i++) {
        var placed = false;

        while (!placed) {
            var x = getRandom(0, MAP_WIDTH - 1);
            var y = getRandom(0, MAP_HEIGHT - 1);

            if (map[y][x] === TILE_FLOOR) {
                map[y][x] = type;
                placed = true;

                if (type === TILE_ENEMY) {
                    positions.push({
                        x: x,
                        y: y,
                        health: ENEMY_MAX_HEALTH,
                        attack: ENEMY_BASE_ATTACK,
                        direction: getValidDirections(x, y),
                        lastTile: TILE_FLOOR
                    });
                } else if (type === TILE_HERO) {
                    positions.push({x: x, y: y, health: HERO_MAX_HEALTH, attack: HERO_BASE_ATTACK});
                } else {
                    positions.push({x: x, y: y});
                }
            }
        }
    }
    return positions;
}

function getValidDirections(x, y) {
    var directions = [
        {x: 1, y: 0},  // Движение по горизонтали вправо
        {x: -1, y: 0}, // Движение по горизонтали влево
        {x: 0, y: 1},  // Движение по вертикали вниз
        {x: 0, y: -1}  // Движение по вертикали вверх
    ];

    var direction;
    var newX, newY;

    do {
        direction = directions[Math.floor(Math.random() * directions.length)];
        newX = x + direction.x;
        newY = y + direction.y;
    } while (!isValidMoveForEnemy(newX, newY));

    return direction;
}

function isValidMoveForEnemy(x, y) {
    return (x >= 0 && x < MAP_WIDTH && y >= 0 && y < MAP_HEIGHT && map[y][x] !== TILE_WALL);
}

