var modalState = {
    header: '',
    message: '',
    isVisible: false
};

function showModal(header, message) {
    modalState.header = header;
    modalState.message = message;
    modalState.isVisible = true;
    updateModal();
}

function updateModal() {
    document.getElementById('modal-header').innerText = modalState.header;
    document.getElementById('modal-message').innerText = modalState.message;
    document.getElementById('game-over-modal').style.display = modalState.isVisible ? 'block' : 'none';
}

// Функция для перезапуска игры через модальное окно
function restartGame() {
    isGameOver = false;
    modalState.isVisible = false;
    updateModal();
    initGame();
    startEnemyMovement();
    startEnemyAttackCheck();
}

function stopGame() {
    isGameOver = true;
}

// Добавляем обработчик на кнопку "Попробовать еще раз"
$(document).ready(function () {
    $('#retry-button').on('click', function () {
        restartGame();
    });
});