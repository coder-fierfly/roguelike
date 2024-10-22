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

function attackOnHero(enemy) {
    heroData.health -= enemy.attack;
    updateHeroHealthBar();
    if (heroData.health <= 0) {
        showModal('Вы погибли', 'Хотите попробовать еще раз?');
        stopGame();
        isGameOver = true;
    }
}

function updateHeroHealthBar() {
    var heroTile = document.querySelector('.H');
    var healthBar = heroTile.querySelector('.health-bar');

    var healthPercent = (heroData.health / HERO_MAX_HEALTH) * 100;
    healthBar.style.width = healthPercent + '%';
}