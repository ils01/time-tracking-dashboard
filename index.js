let status = 'daily';
let freqs = document.getElementsByClassName('frequency__item');
let cards = document.getElementsByClassName('dashboard__card');
cards = [...cards];   
freqs = [...freqs];

fetch('./data.json').then(response => response.json()).then(data => parseData(data)).catch(error => console.error(error));

function parseData(data) {
    renderStatus(status, data);
    freqs.forEach((item) => {
        item.addEventListener('click', (e) => {
            status = item.dataset.status;
            renderChoice(item);
            renderStatus(status, data);
        });
    });
    
}

function renderChoice(item){
    freqs.forEach(freq => {
        if (freq.dataset.status === item.dataset.status){
            freq.style.color = '#fff';
        } else {
            freq.style.color = 'var(--clr-neutral-desaturatedblue)';
        }});
}

function renderStatus(status, data) {
    for (let i = 0; i < data.length; i += 1) {
       cards[i].querySelector('.card__time--current').textContent = `${data[i].timeframes[status].current}hrs`;     
        const prev = cards[i].querySelector('.card__time--previous');
        const prevValue = data[i].timeframes[status].previous;
        switch(status) {
            case 'daily':
                prev.textContent = `Yesterday - ${prevValue}hrs`;
                break;
            case 'weekly':
                prev.textContent = `Last Week - ${prevValue}hrs`;
                break;
            case 'monthly':
                prev.textContent = `Last Month - ${prevValue}hrs`;
            }
}
}
    
