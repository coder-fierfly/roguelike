function showModal(header, message) {
    document.getElementById('modal-header').innerText = header;
    document.getElementById('modal-message').innerText = message;
    document.getElementById('game-over-modal').style.display = 'block';
}

// Функция для перезапуска игры через модальное окно
function restartGame() {
    isGameOver = false;
    document.getElementById('game-over-modal').style.display = 'none';
    initGame();
    startEnemyMovement();
    startEnemyAttackCheck();
}

// Остановка всех процессов игры
function stopGame() {
    isGameOver = true;
}

// Добавляем обработчик на кнопку "Попробовать еще раз"
$(document).ready(function() {
    $('#retry-button').on('click', function() {
        restartGame();
    });
});