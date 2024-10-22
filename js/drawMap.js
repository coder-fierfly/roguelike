function drawMap() {
    drawBackground();  // Отрисовка основной карты
    drawEnemies();     // Отрисовка врагов
}

function drawBackground() {
    var field = $('.field-background');
    field.empty();

    for (var y = 0; y < MAP_HEIGHT; y++) {
        for (var x = 0; x < MAP_WIDTH; x++) {

            var tile = $('<div></div>').addClass('tile ' + map[y][x]);

            if (map[y][x] === TILE_HERO) {
                addStatsElement(tile, heroData.health, HERO_MAX_HEALTH);
            }

            field.append(tile);
        }
    }
}

function drawEnemies() {
    var fieldEnemies = $('.field-enemies');
    fieldEnemies.empty();

    for (var y = 0; y < MAP_HEIGHT; y++) {
        for (var x = 0; x < MAP_WIDTH; x++) {
            var tile  = $('<div></div>').addClass('tile ' + mapEnemies[y][x]);
            if (mapEnemies[y][x] === TILE_ENEMY) {
                var enemy = enemiesData.find(function (e) {
                    return e.x === x && e.y === y;
                });
                addStatsElement(tile, enemy.health, ENEMY_MAX_HEALTH);
            }
            fieldEnemies.append(tile);
        }
    }
}

// Функция для добавления элементов здоровья и силы атаки
function addStatsElement(tile, health, maxHealth) {

    var healthContainer = $('<div></div>').addClass('health-container');

    var healthBar = $('<div></div>').addClass('health-bar');

    var healthPercent = (health / maxHealth) * 100;

    healthBar.css('width', healthPercent + '%');
    healthContainer.append(healthBar);
    tile.append(healthContainer);
}