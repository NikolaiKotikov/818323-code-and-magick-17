'use strict';

(function () {
  var URL = 'https://js.dump.academy/code-and-magick/data';

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
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

      xhr.timeout = 10000; // 10s

      xhr.open('GET', URL);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
        xhr.addEventListener('error', function () {
          onError('Не удалось отправить данные');
        });
      });

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
