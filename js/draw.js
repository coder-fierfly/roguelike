// Функция для отрисовки карты в DOM
function drawMap() {
    var field = $('.field');
    field.empty();

    for (var y = 0; y < mapHeight; y++) {
        for (var x = 0; x < mapWidth; x++) {
            var tileClass = '';
            switch (map[y][x]) {
                case TILE_WALL:
                    tileClass = 'tileW';
                    break;
                case TILE_FLOOR:
                case TILE_ROOM:
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
            field.append(tile);
        }
    }
}