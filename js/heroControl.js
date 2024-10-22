// keyup, чтобы нельзя было зажимать клавишу
$(document).on('keyup', function(event) {
    var newX = heroData.x;
    var newY = heroData.y;
    switch(event.code) {
        case 'KeyW':
        case 'ArrowUp':
            newY -= 1;
            break;
        case 'KeyS':
        case 'ArrowDown':
            newY += 1;
            break;
        case 'KeyA':
        case 'ArrowLeft':
            newX -= 1;
            break;
        case 'KeyD':
        case 'ArrowRight':
            newX += 1;
            break;
        default:
            return;
    }

    if (isValidMove(newX, newY)) {
        moveHero(newX, newY);
        drawBackground();
    }
});

function isValidMove(x, y) {
    if(x >= 0 && x < MAP_WIDTH && y >= 0 && y < MAP_HEIGHT && !isEnemyOnTile(x, y)) {
        return (map[y][x] !== TILE_WALL);
    }
    return false;
}

function moveHero(newX, newY) {
    checkBuffOrHealth(newX, newY);
    map[heroData.y][heroData.x] = TILE_FLOOR;
    map[newY][newX] = TILE_HERO;
    heroData.x = newX;
    heroData.y = newY;
}

function isEnemyOnTile(x, y) {
    return enemiesData.some(function(enemy) {
        return enemy.x === x && enemy.y === y;
    });
}

// Проверка на меч или зелье на новой клетке
function checkBuffOrHealth(x, y){
    if (map[y][x] === TILE_WEAPON) {
        heroData.attack += WEAPON_IMPROVEMENTS;
        map[y][x] = TILE_FLOOR;
    } else if (map[y][x] === TILE_POTION) {
        heroData.health += POTION_IMPROVEMENTS;
        if (heroData.health > HERO_MAX_HEALTH) {
            heroData.health = HERO_MAX_HEALTH;
        }
        map[y][x] = TILE_FLOOR;
    }
}