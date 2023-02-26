const progress = document.getElementById('progress');
let form = document.getElementById('form');


function getProgress(form) {
    
    let formData = new FormData(form);
    let request =new XMLHttpRequest();

    request.upload.onprogress = function(event) {
        console.log(`Отправлено ${event.loaded} из ${event.total}`);
        progress.setAttribute('value', 
            (Number(event.loaded / event.total).toFixed(1))
        )
    };

    request.upload.onload = function() { 
        alert(`Данные успешно отправлены.`);
    };
      
    request.upload.onerror = function() {
        alert(`Произошла ошибка во время отправки: ${xhr.status}`);
    };

    request.open('POST', 'https://netology-slow-rest.herokuapp.com/upload.php');
    request.setRequestHeader('Content-type', 'multipart/form-data');
   
    request.send(formData);
};
     
form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('pushing reqest..');
                            
    getProgress(form);
});