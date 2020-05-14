
const form ={
    deposit : document.getElementById('deposit'),
    rate : document.getElementById('rate'),
    start : document.getElementById('start-date'),
    end: document.getElementById('end-date'),
    period : document.getElementById('period'),
    earn: document.getElementById('earn'),
    submit : document.getElementById('btn'),
    messages : document.getElementById('form-message')
};

form.submit.addEventListener('click',() => {
    const request = new XMLHttpRequest();


    request.onload = () => {

        let responseObject = null;


        try{
            responseObject = JSON.parse(request.responseText);
        }catch(e){
            console.error('could not parse JSON!');
        }
        if (responseObject){
            handleResponse(responseObject);
        }

    };


    const requestData = `deposit=${form.deposit.value}&rate=${form.rate.value}&start=${form.start.value}&end=${form.end.value}&period=${form.period.value}`;

    request.open('post', 'check-action.php');
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(requestData);
});

function handleResponse(responseObject){
    console.log(responseObject);
    if (responseObject.ok){
        let earn = form.earn.value;
        let deposit = form.deposit.value;
        let period = form.period.value;
        let rate = form.rate.value;
        let start = form.start.value;
        let end = form.end.value;
        console.log(start);
        console.log(end);
        console.log (period);


        let start_investment = new Date(start);
        let end_investment = new Date(end);
        var diffTime = Math.abs(end_investment - start_investment);
        var duration =(Math.ceil(diffTime / (1000 * 60 * 60 * 24)))/365.5; 
        console.log(start_investment);
        console.log(end_investment);
        console.log(diffTime);
        console.log(duration);


        earn = deposit * ( 1 + ((rate/100)/period))**(period*duration) 
        console.log(earn);

        while(form.messages.firstChild){
            form.messages.removeChild(form.messages.firstChild);
        }
        
        responseObject.messages.forEach((messages) => {
            const li = document.createElement('li');
            li.textContent = messages;
            form.messages.appendChild(li);
  
        })

        form.messages.style.display = 'block';

        while(form.earn.firstChild){
            form.earn.removeChild(form.earn.firstChild);
        }

        responseObject.messages.forEach((messages) => {
            const li = document.createElement('li');
            li.textContent = earn;
            form.earn.appendChild(li);
  
        })

        form.messages.style.display = 'block';
        



    }else{
        while(form.messages.firstChild){
            form.messages.removeChild(form.messages.firstChild);
        }

        responseObject.messages.forEach((messages) => {
            const li = document.createElement('li');
            li.textContent = messages;
            form.messages.appendChild(li);
  
        })

        form.messages.style.display = 'block';
    }
}