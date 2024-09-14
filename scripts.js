document.addEventListener('DOMContentLoaded', () => {
    const photo = document.querySelector('.clickable-photo');
    const mainContent = document.querySelector('.main-content');
    const balanceElement = document.createElement('div');
    let balance = 0;

    // Создаем и отображаем элемент баланса
    balanceElement.className = 'balance-text';
    balanceElement.id = 'coin-balance';
    balanceElement.textContent = balance;
    const balanceContainer = document.createElement('div');
    balanceContainer.className = 'balance-container';
    balanceContainer.appendChild(balanceElement);
    mainContent.appendChild(balanceContainer);

    photo.addEventListener('click', () => {
        // Увеличиваем фото
        photo.style.transform = 'scale(1.1)';
        setTimeout(() => {
            photo.style.transform = 'scale(1)';
        }, 200);

        // Обновляем баланс
        balance += 1;
        balanceElement.textContent = balance;

        // Создаем новый элемент для текста
        const popupText = document.createElement('div');
        popupText.className = 'popup-text';
        popupText.textContent = '+1';
        mainContent.appendChild(popupText);

        // Вычисляем случайные позиции ниже экрана
        const maxX = mainContent.clientWidth - popupText.offsetWidth;
        const randomX = Math.random() * maxX;

        // Начальная позиция текста ниже экрана
        const startY = window.innerHeight; // Начинаем из нижнего края экрана

        // Устанавливаем начальные позиции и стили для анимации
        popupText.style.left = `${randomX}px`;
        popupText.style.top = `${startY}px`;
        popupText.style.opacity = '1';
        popupText.style.transform = 'translateY(-2600%)'; // Поднимаем текст вверх на 1000% высоты блока

        // Возвращаем текст обратно после задержки
        setTimeout(() => {
            popupText.style.opacity = '0';
            popupText.style.transform = 'translateY(-200%)'; // Оставляем текст в верхней позиции
            setTimeout(() => mainContent.removeChild(popupText), 900); // Удаляем элемент из DOM после затухания
        }, 600); // Задержка для завершения анимации
    });
});
