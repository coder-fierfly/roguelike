function startEnemyMovement() {
    setInterval(function () {
        if (!isGameOver) {
            moveEnemies();
            drawEnemies();
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

    updateMap(newPositions);
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
    cleanMap();

    enemiesData.forEach(function (enemy, index) {
        var newX = newPositions[index].newX;
        var newY = newPositions[index].newY;
        mapEnemies[newY][newX] = TILE_ENEMY;
        enemy.x = newX;
        enemy.y = newY;
    });
}

function cleanMap() {
    for (var y = 0; y < MAP_HEIGHT; y++) {
        for (var x = 0; x < MAP_WIDTH; x++) {
            if (mapEnemies[y][x] === TILE_ENEMY) {
                mapEnemies[y][x] = TILE_EMPTY;
            }
        }
    }
}


function isHeroNearby(enemyX, enemyY) {
    var adjacentCells = getAdjacentCells(enemyX, enemyY);

    return adjacentCells.some(function (cell) {
        return cell.x === heroData.x && cell.y === heroData.y;
    });
}