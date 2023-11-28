function multipleNumbersCall() {
    let URL = "http://numbersapi.com/"
    const $numbersInput = $('.num-input');
    const numbers = [];
    
    for (let i = 0; i < $numbersInput.length; i++) {
        if ($numbersInput[i].value !== "") 
            numbers.push($numbersInput[i].value);
    }
     
    if (numbers.length === 0)
        return;
    
    numbers.forEach(function callback(num, index) {
        if (index !== numbers.length - 1)
            URL += `${num},`;
        else
            URL += num;
    })

    axios.get(URL)
    .then(response => {
        if (response.data)
        result = ""
        for (let n in response.data) 
            result += `${response.data[n]}\r\n`
        $('.multi-num-results').val(result);
        $('.multipleNumbersForm')[0].reset();
    })
    .catch(error => console.log(error))
}


function favoriteNumberCall() {
    let URL = "http://numbersapi.com/"
    const $faveNum = $('.fave-num');
    const n = $faveNum.val();
    $faveNum.val('');
    const $TA = $('.fave-num-results');
    
    if (n === "")
        return;
    
    axios
    .get(`${URL}${n}`)
    .then(response => {
        $TA.append(`${response.data}\r\n`)
        return axios.get(`${URL}${n}`);
    })
    .then(response2 => {
        $TA.append(`${response2.data}\r\n`)
        return axios.get(`${URL}${n}`);
    })
    .then(response3 => {
        $TA.append(`${response3.data}\r\n`)
        return axios.get(`${URL}${n}`);
    })
    .then(response4 => {
        $TA.append(`${response4.data}`);
    })
    .catch(error => console.log(error))
}

function getCardDeck() {
    const URL = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
    axios.get(URL)
    .then(response => {
        if (response.data.success) {
            $('.card-button').show();
            $('.card-button').attr('id', response.data.deck_id);
        }
        else
            alert("Error in connecting to card deck API.");
    })
    .catch(error => console.log(error))

    
}

function getCard(deck) {
    const URL = `https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`;
    axios
    .get(URL)
    .then(response => {
        const img = response.data.cards[0].image;
        $('#card-img').attr('src', img);
        if (response.data.remaining === 0)
            $('.card-button').hide();
    })
    .catch(error => console.log(error))

}

window.addEventListener("load", () => getCardDeck());

$("#multi-num-submit").click(() => multipleNumbersCall());

$("#fave-num-submit").click(() => favoriteNumberCall());

$(".card-button").click((evt) => getCard(evt.target.id));