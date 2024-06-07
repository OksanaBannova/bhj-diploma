/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = { url, data, method, callback }) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    let url = options.url;
    let formData = new FormData();
    if (options.method === 'GET') {
        url = `${options.url}?`
        for (let key in options.data) {
            url += `${key}=${options.data[key]}&`;
        }
    } else {
        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }
    };
    try {
        xhr.open(options.method, url);
        xhr.send(formData);
    }
    catch (err) {
        console.log(err);
    };
    xhr.addEventListener('load', (e) => options.callback(null, xhr.response));
}