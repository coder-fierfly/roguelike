function startEnemyAttackCheck() {
    setInterval(function() {
        if (!isGameOver) {
            checkEnemyAttack();
        }
    }, ENEMY_ATTACK_INTERVAL);
}

function checkEnemyAttack() {
    var adjacentCells = getAdjacentCells(heroData.x, heroData.y);


    adjacentCells.forEach(function(cell) {
        var enemy = enemiesData.find(function(e) {
            return e.x === cell.x && e.y === cell.y;
        })

        if (enemy) {
            attackOnHero(enemy);
        }
    });
}

// Функция атаки героя врагом
function attackOnHero(enemy) {
    heroData.health -= enemy.attack;
    console.log("Героя атаковали! Здоровье героя:", heroData.health);

    if (heroData.health <= 0) {
        heroData.health = 0;
        showModal('Вы погибли', 'Хотите попробовать еще раз?');
        stopGame();
        isGameOver = true;
    }
}