'use strict';

(function () {
  var URL = 'https://js.dump.academy/code-and-magick/data';

  var createRequest = function (url, method, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    if (method === 'GET') {
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения :( Срочно перезагрузите страницу, пока не случилось что-то похуже!');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
    } else if (method === 'POST') {
      xhr.addEventListener('load', function () {
        onSuccess(xhr.response);
        xhr.addEventListener('error', function () {
          onError('Не удалось отправить данные');
        });
      });
    }

    xhr.open(method, url);
    xhr.send(data);
  };

  window.load = function (onSuccess, onError) {
    createRequest(URL, 'GET', onSuccess, onError);
  };

  window.save = function (data, onSuccess, onError) {
    createRequest(URL, 'POST', onSuccess, onError, data);
  };

  window.backend = {
    load: window.load,
    save: window.save
  };
})();
