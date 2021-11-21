const input = document.querySelector('.input');
const input2 = document.querySelector('.input-two');
const button = document.querySelector('.button');

button.onclick = () => {

  function isThereAMood() {

    if (input.value >= input2.value) {
      console.log('Я настроен делать домашку');
      return true;
    }
    else {
      console.log('Я не настроен делать домашку');
      return false;

    }
  }

  const willIDoAHomework = new Promise(
    (resolve, reject) => {
      if (isThereAMood()) {
        const homework = {
          name: 'JavaScript',
          number: '11'
        };
        resolve(homework);
      } else {
        const reason = new Error('Я не могу ее сделать');
        reject(reason);
      }

    }
  );

  const showHomework = function (homework) {
    const message = 'Я сделал здание: ' + homework.name + ' ' + homework.number;
    return Promise.resolve(message);
  };


  const checkHomework = function () {
    willIDoAHomework
      .then(showHomework)
      .then(resolved => console.log(resolved))
      .catch(error => console.log(error.message));
  };

  checkHomework();

  input.value = '';
  input2.value = '';
}