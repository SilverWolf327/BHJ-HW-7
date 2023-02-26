const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');

let buttonPollAnswer = pollAnswers.querySelectorAll('button');
let questionID;

async function getQuestion() {
    let response = await fetch('https://netology-slow-rest.herokuapp.com/poll.php');
  
    if (response.ok) {
      let data = await response.json();
     
        console.log('ID= ' + data.id)
        console.log(data.data.title)
        questionID = data.id;

        let titleValue = data.data.title;

        pollTitle.textContent = titleValue;
        
      for (let key in data.data.answers) {
  
            let pollAnswer = data.data.answers[key];

            pollAnswers.insertAdjacentHTML('beforeend', `
                <button class="poll__answer">
                    ${pollAnswer}
                </button>`);
        };
        
        buttonPollAnswer = pollAnswers.querySelectorAll('button');

    } else {
      alert('error', response.status);    
    };
    
  };
  
  async function postAnswer(b, questionID) {

    let response = await fetch('https://netology-slow-rest.herokuapp.com/poll.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `vote=${questionID}&answer=${b}`
      });
    
    if (response.ok) {
      
        let data = await response.json();
        alert('Спасибо, Ваш голос засчитан!');
        pollAnswers.innerHTML = '';

        let summ = 0;

        for (let key in data.stat) {
            summ = summ + Number(data.stat[key].votes);
        };

      for (let key in data.stat) {
        

        let answer = data.stat[key].answer;
        let votes_percent = (100 * Number(data.stat[key].votes) / summ).toFixed(2);
        
        pollAnswers.insertAdjacentHTML('beforeend', `
            <div>
                <div class="stat__answer">
                    ${answer}: 
                </div>
                <div class="stat__votes">
                    ${votes_percent}%
                </div>
            </div>`);
            pollAnswers.classList.add('stat__answers_inline');
      };

    };
      
  };
  
  getQuestion();

  
    document.addEventListener('click', (event) => {
        elem = event.target;

        for (let b = 0; b < buttonPollAnswer.length; b++) {
            
            if (elem === buttonPollAnswer[b]) {
                console.log('pushing ID: ' +  questionID);
                postAnswer(b, questionID);
            };
        };
      
    });