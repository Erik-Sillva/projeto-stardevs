const persons = document.getElementById('persons');
const starships = document.getElementById('starships');
const planets = document.getElementById('planets');
const boxLoad = document.getElementsByClassName('box-load')[0];
const content = document.getElementsByClassName('content')[0];

function loading() {
    boxLoad.style.display = 'none'
    content.style.display = 'block'
}

fillCounters();

function fillCounters() {
    Promise.all([
        getData('people/'),
        getData('starships/'),
        getData('planets')
    ])
    .then (data => {
        persons.style.fontSize = '3em'
        starships.style.fontSize = '3em'
        planets.style.fontSize = '3em'

        persons.innerHTML = data[0].count
        starships.innerHTML = data[1].count
        planets.innerHTML = data[2].count
    })
    .catch(err => console.log('Erro:, err'))
}

function getData(params) {
    return fetch(`https://swapi.dev/api/${params}`)
    .then(res => res.json())
}

function loadPhrases() {
    const btn = document.getElementById('btn-phrases');
    const phrase = document.getElementById('phrase');

    return fetch('https://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuote')
    .then(data => data.json())
    .then(json => {
        console.log(json)
        btn.innerHTML = 'Ver mais uma frase!';
        phrase.innerHTML = `"${json.content}"`;

        phrase.animate([
            {transform: 'translateY(-70px)'},
            {transform: 'translateY(0px)'}
        ], {
            duration: 500
        })
    })
    .catch(err => console.log('Erro: ', err)),
    phrase.innerHTML = 'Ops, parece que o servidor está fora do ar, desculpe! :('
}