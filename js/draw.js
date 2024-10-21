function drawMap() {
    console.log('drawMap')
    var field = $('.field');
    field.empty();

    for (var y = 0; y < MAP_HEIGHT; y++) {
        for (var x = 0; x < MAP_WIDTH; x++) {
            var tileClass = '';
            switch (map[y][x]) {
                case TILE_WALL:
                    tileClass = 'tileW';
                    break;
                case TILE_FLOOR:
                    tileClass = 'tileF';
                    break;
                case TILE_HERO:
                    tileClass = 'tileP';
                    break;
                case TILE_ENEMY:
                    tileClass = 'tileE';
                    break;
                case TILE_WEAPON:
                    tileClass = 'tileSW';
                    break;
                case TILE_POTION:
                    tileClass = 'tileHP';
                    break;
            }

            var tile = $('<div></div>').addClass('tile ' + tileClass);

            if (map[y][x] === TILE_HERO) {
                addStatsElement(tile, heroData.health, HERO_MAX_HEALTH);
            } else if (map[y][x] === TILE_ENEMY) {

                var enemy = enemiesData.find(function (e) {
                    return e.x === x && e.y === y;
                });
                if (enemy) {
                    addStatsElement(tile, enemy.health, ENEMY_MAX_HEALTH);
                }
            }

            field.append(tile);
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