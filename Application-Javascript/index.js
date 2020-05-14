
const form = {
    deposit: document.getElementById('deposit'),
    rate: document.getElementById('rate'),
    inflation: document.getElementById('inflation'),
    tax:  document.getElementById('tax'),
    start: document.getElementById('start-date'),
    end: document.getElementById('end-date'),
    tax_earn: document.getElementById('earn-tax'),
    inflation_earn: document.getElementById('earn-inflation'),
    earn: document.getElementById('earn'),
    submit: document.getElementById('btn'),
    messages: document.getElementById('form-message')
};

var date_regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;


form.submit.addEventListener("click", handleResponse);
messages = [];

function handleResponse() {

    validate();


    function validate() {

        if (form.deposit.value == "" || form.rate.value == "" || form.start.value > form.end.value  ||!(date_regex.test(form.start.value)) ||!(date_regex.test(form.end.value)) ) {
            messages.push("Please enter an amount of deposit!");

        while (form.messages.firstChild) {
            form.messages.removeChild(form.messages.firstChild);
            }

            messages.forEach((messages) => {
            const li = document.createElement('li');
            li.textContent = "Only Tax rate and infaltion rate field can be empty!";
            form.messages.appendChild(li);
            messages = [];

        })
            form.messages.style.display = 'block';
    }


    }

    if (form.deposit.value != "" && form.deposit.rate != "" && form.start.value < form.end.value) {


        let earn = form.earn.value;
        let deposit = form.deposit.value;
        let rate = form.rate.value;
        let tax = form.tax.value;
        let inflation = form.inflation.value;
        let start = form.start.value;
        let end = form.end.value;

        let start_investment = new Date(start);
        let end_investment = new Date(end);
        var diffTime = Math.abs(end_investment - start_investment);
        var duration = (Math.ceil(diffTime / (1000 * 60 * 60 * 24))) / 365.5;

        earn = deposit * (1 + ((rate / 100) )) ** (duration);
        
        while (form.messages.firstChild) {
            form.messages.removeChild(form.messages.firstChild);
        }

        const li = document.createElement('li');
        li.textContent = 'Parameters are Okay!';
        form.messages.appendChild(li);

        form.messages.style.display = 'block';

        while (form.earn.firstChild) {
            form.earn.removeChild(form.earn.firstChild);
        }

        const ul = document.createElement('ul');
        ul.textContent = earn;
        form.earn.appendChild(ul);

        if (form.inflation.value != "") {

        earn_inflation = deposit * (1 + ((inflation/ 100) )) ** (duration);
        
        while (form.messages.firstChild) {
            form.messages.removeChild(form.messages.firstChild);
        }

        const li = document.createElement('li');
        li.textContent = 'Parameters are Okay!';
        form.messages.appendChild(li);

        form.messages.style.display = 'block';

        while (form.inflation_earn.firstChild) {
            form.inflation_earn.removeChild(form.inflation_earn.firstChild);
        }

        const ul = document.createElement('ul');
        ul.textContent = earn_inflation;
        form.inflation_earn.appendChild(ul);
        }

        if(form.tax.value != ""){

        earn_tax = deposit * (1 + (((rate-(rate*(tax/100)) / 100) )) ** (duration));
        
        while (form.messages.firstChild) {
            form.messages.removeChild(form.messages.firstChild);
        }

        const li = document.createElement('li');
        li.textContent = 'Parameters are Okay!';
        form.messages.appendChild(li);

        form.messages.style.display = 'block';

        while (form.tax_earn.firstChild) {
            form.tax_earn.removeChild(form.tax_earn.firstChild);
        }

        const ul = document.createElement('ul');
        ul.textContent = earn_tax;
        form.tax_earn.appendChild(ul);

        }

    }

}


