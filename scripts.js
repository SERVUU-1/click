document.addEventListener('DOMContentLoaded', () => {
    // Максимальные значения для каждого круга
    const maxValues = {
        clicks: 10000000, // 10 миллионов
        earned: 10000000, // 10 миллионов
        referrals: 100, // 100 шт
    };

    // Текущие значения для каждого круга
    const currentValues = {
        clicks: 5000000, // Пример текущих кликов
        earned: 2000000, // Пример заработанного
        referrals: 50, // Пример текущих рефералов
    };

    function setProgress(circleId, currentValue) {
        const maxValue = maxValues[circleId];
        const percentage = (currentValue / maxValue) * 100;
        const circle = document.querySelector(`#${circleId} .progress`);
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;
        
        // Устанавливаем начальное значение
        circle.style.strokeDashoffset = circumference;

        // Анимация заполнения круга с начального значения
        let start = 0;
        const interval = setInterval(() => {
            const progress = Math.min(start + 1, percentage);
            const progressOffset = circumference - (progress / 100) * circumference;
            circle.style.strokeDashoffset = progressOffset;
            start = progress;

            // Обновление текста внутри круга
            const valueText = document.querySelector(`#${circleId} .progress-value`);
            valueText.textContent = formatValue(start, circleId);

            if (start >= percentage) {
                clearInterval(interval);
            }
        }, 20); // Интервал анимации
    }

    function formatValue(value, circleId) {
        if (circleId === 'referrals') {
            return value;
        } else {
            return (value / 1000000).toFixed(1) + 'M';
        }
    }

    for (const [id, value] of Object.entries(currentValues)) {
        setProgress(id, value);
    }
});
