
export function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Добавление данных в localStorage
export function addToStorage(key, value) {
    const storedData = getFromStorage(key);
    if (!storedData.includes(value)) {
        storedData.push(value);
        localStorage.setItem(key, JSON.stringify(storedData));
        return true; //  true, если элемент был добавлен
    }
    return false; //  false, если элемент уже существует
}

// удаление данных из localStorage
export function removeFromStorage(key, value) {
    let storedData = getFromStorage(key);
    storedData = storedData.filter(item => item !== value);
    localStorage.setItem(key, JSON.stringify(storedData));
}

// проверка наличия элемента в localStorage
export function isInStorage(key, value) {
    const storedData = getFromStorage(key);
    return storedData.includes(value);
}

// получение количества элементов в localStorage
export function getStorageCount(key) {
    return getFromStorage(key).length;
}
