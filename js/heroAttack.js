// Атака противников
$(document).on('keyup', function(event)  {
    if (event.key === ' ') {
        attackEnemiesAround(heroData.x, heroData.y);
        drawMap();
    }
});

// Атака всех противников на соседних клетках
function attackEnemiesAround(heroX, heroY) {
    var adjacentCells = getAdjacentCells(heroX, heroY);

    adjacentCells.forEach(function(cell) {

        var enemy = enemiesData.find(function(e) {
            return e.x === cell.x && e.y === cell.y;
        });

        if (enemy) {
            enemy.health -= heroData.attack;

            if (enemy.health <= 0) {
                mapEnemies[enemy.y][enemy.x] = TILE_EMPTY;
                enemiesData = enemiesData.filter(function(e) {
                    return e !== enemy;
                });

                if (enemiesData.length === 0) {
                    showModal('Враги повержены.', 'Пойти в другое подземелье?');
                    stopGame();
                }
            }
        }
    });
}

function getAdjacentCells(x, y) {
    return [
        { x: x - 1, y: y },  // Влево
        { x: x + 1, y: y },  // Вправо
        { x: x, y: y - 1 },  // Вверх
        { x: x, y: y + 1 }   // Вниз
    ];
}