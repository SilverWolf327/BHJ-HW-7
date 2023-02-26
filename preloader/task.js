let storage;
alert('Содержимое хранилища: ' + localStorage.getItem('savedResponse'));

const imgLoader = document.getElementById('loader');
const items = document.getElementById('items');

async function getCurrency() {
  let response = await fetch('https://netology-slow-rest.herokuapp.com/');

  if (response.ok) {
    let data = await response.json();

    imgLoader.classList.remove('loader_active');

    let dataArr = ['{', '}'];

    for (let key in data.response.Valute) {
      let i = 1;
      let value = data.response.Valute[key].Value;
      let charCode = data.response.Valute[key].CharCode;

      items.insertAdjacentHTML('beforeend', `
      <div class="item">
        <div class="item__code">
          ${charCode}
        </div>
        <div class="item__value">
          ${value}
        </div>
        <div class="item__currency">
          руб.
        </div>
      </div>`);

      dataArr.splice(i, 0, `${charCode}`, ':', `${value}`, ',');
      i++;
    };

       localStorage.setItem('savedResponse', JSON.stringify(dataArr.join('')));

    return data;
  } else {
    alert('error', response.status);    
  };
};


getCurrency(); 



document.addEventListener('click', () => {
  delete localStorage.savedResponse;
  alert('Локальное хранилище очищено!')
});


document.addEventListener('keydown', (event) => {

  pressedSymbol = event.key;
  
  if ((pressedSymbol === 'j') && (localStorage.savedResponse !== null)) {
  console.dir('ОБЪЕКТ JSON:  ' + JSON.parse(localStorage.getItem('savedResponse')));
  console.log(event.key)
  }
});
