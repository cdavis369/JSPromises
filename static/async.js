async function multipleNumbersCall() {
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

    try {
        response = await axios.get(URL);
        for (var n in response.data)
            $('.multi-num-results').append(`${response.data[n]}\r\n`);
    } catch (error) {
        console.log(error);
        alert(error);
    }
}


async function favoriteNumberCall() {
    let URL = "http://numbersapi.com/"
    const $faveNum = $('.fave-num');
    const n = $faveNum.val();
    $faveNum.val('');
    const $TA = $('.fave-num-results');
    URL += n;
    if (n === "")
        return;
    
    try {
        const response = await Promise.all([
            axios.get(URL),
            axios.get(URL),
            axios.get(URL),
            axios.get(URL)
        ]);
        for (var i = 0; i < 4; i++)
            $TA.append(`${response[i].data}\r\n`)

    } catch (error) {
        console.log(error);
        alert(error);
    }
}

async function getCardDeck() {
    const URL = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
    try {
        const response = await axios.get(URL);
        if (response.data.success) {
            $('.card-button').show()
            $('.card-button').attr('id', response.data.deck_id)
        }      
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

async function getCard(deck) {
    const URL = `https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`;
    try {
      const response = await axios.get(URL);
      const img = response.data.cards[0].image;
      $('#card-img').attr('src', img)
      if (response.data.remaining === 0)
          $('.card-button').hide()
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

window.addEventListener("load", () => getCardDeck())

$("#multi-num-submit").click(() => multipleNumbersCall());

$("#fave-num-submit").click(() => favoriteNumberCall());

$(".card-button").click((evt) => getCard(evt.target.id));