function startEnemyMovement() {
    setInterval(function () {
        if (!isGameOver) {
            moveEnemies();
            drawMap();
        }
    }, ENEMY_MOVEMENT_INTERVAL);
}

function moveEnemies() {

    var newPositions = enemiesData.map(function (enemy) {
        if (isHeroNearby(enemy.x, enemy.y)) {
            return {newX: enemy.x, newY: enemy.y};
        }
        return calculateNewPosition(enemy);
    });
    // TODO подумать почему враги сливаются
    map = updateMap(newPositions);
}

function getOppositeDirection(direction) {
    return {
        x: direction.x * -1,
        y: direction.y * -1
    };
}

function calculateNewPosition(enemy) {
    var newX = enemy.x + enemy.direction.x;
    var newY = enemy.y + enemy.direction.y;

    if (!isValidMoveForEnemy(newX, newY)) {
        enemy.direction = getOppositeDirection(enemy.direction);
        newX = enemy.x + enemy.direction.x;
        newY = enemy.y + enemy.direction.y;
    }
    return {
        newX: newX,
        newY: newY
    };
}

function updateMap(newPositions) {
    var tempMap = JSON.parse(JSON.stringify(map));

    enemiesData.forEach(function (enemy, index) {
        var newPosition = newPositions[index];
        if (!newPosition) {
            return;
        }
        var newX = newPosition.newX;
        var newY = newPosition.newY;

        tempMap[enemy.y][enemy.x] = enemy.lastTile;

        if (map[newY][newX] !== TILE_HERO && map[newY][newX] !== TILE_ENEMY) {
            enemy.lastTile = map[newY][newX];
        }

        tempMap[newY][newX] = TILE_ENEMY;

        enemy.x = newX;
        enemy.y = newY;
    });
    return tempMap;
}


function isHeroNearby(enemyX, enemyY) {
    var adjacentCells = getAdjacentCells(enemyX, enemyY);

    return adjacentCells.some(function (cell) {
        return cell.x === heroData.x && cell.y === heroData.y;
    });
}