//THE STARWARS API PART
((starwars) => { // almost React in making components this way. Just not as responsive reloads and lacking Key:Value structure.

starwars.additem = function(event){
    event.preventDefault();
    const input = this['starwarsInput'];
    const starwarsOutputLower = document.querySelector('#starwars-output-lower');
    //const li = createElement(input);
    //items.appendChild(li);
    const link = 'https://www.swapi.tech/api/people/?name='+`${input.value.toLowerCase()}`
    alert(input.value.toLowerCase())
    if(input.value !=='r2-d2') 
        {input.value = 'r2-d2' }
    else{input.value = 'Darth Maul';} 
    fetch(link, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data['message']); // Did we get it.
            starwarsOutputLower.innerHTML = `Retrive was: ${data['message']} `
            console.log(data['result']); //Result 2 parts
            console.log(data['result'][0]['properties']); // undefined call
            starwarsOutput.value = '';
            starwarsOutput.value += `${data['result'][0]['properties']['name']}\n`

            for (const property in data['result'][0]['properties']) {
                if(property !== 'name'){
                console.log(`${property}: ${data['result'][0]['properties'][property]}`);
                
                starwarsOutput.value += `${property}: ${data['result'][0]['properties'][property]}\n`}
              }
              
        })
            .catch(error => {
            console.log('Error await async would miss this' + error);
            starwarsOutputLower.innerHTML = `EWOK ERROR : ${error} (Mostly that character doesnt exist or spelling was slightly off) <p> Here is a suggestion : Dud Bolt</p> `
        })

} 
})(window.starwars = window.starwars || {}); // Todo "Class" ends here

 // GetStarwars on Submit. THis does not create "global variables" preferable.
document.querySelector('#starwarsForm').addEventListener('submit', starwars.additem);

const starwarsBtn = document.querySelector('#btn5'); // this would create global variables. Which is less good.
const starwarsOutput = document.querySelector('#starwars-output');

const getStarwars = () => {

    fetch('https://www.swapi.tech/api/people/?name=chewbacca', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data['message']); // Did we get it.
            console.log(data['result']); //Result 2 parts
            console.log(data['result'][0]['properties']);
            starwarsOutput.value = '';
            starwarsOutput.value += `${data['result'][0]['properties']['name']}\n`

            for (const property in data['result'][0]['properties']) {
                if(property !== 'name'){
                console.log(`${property}: ${data['result'][0]['properties'][property]}`);
                
                starwarsOutput.value += `${property}: ${data['result'][0]['properties'][property]}\n`}
              }
            
            data['result'].forEach(repo => { 
            console.log(repo)    
            })
        })
        .catch(error => {
            console.log('Error await async would miss this' + error);
        })
}

starwarsBtn.addEventListener('click', getStarwars);

// CARD API PART
((deckOfCards) => {
    //let deckID = "mgom9x8qiovr"; // Todo set back to ""
    let deckID ="";
    let remaining = '';
    let score = 0;
    deckOfCards.getDeck = function(event){
        event.preventDefault(); // default behavior does not happen on click
        const deckOutput = document.querySelector('#deck-output');
        
        fetch('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data); // Did we get it.
                deckOutput.innerHTML = `React Would be good for tracking this data \n this data does not update`;
                for(prop in data){
                    deckOutput.innerHTML += ` <p> ${prop} : ${data[prop]} </p>`
                }
                deckID = data['deck_id']; // await may be preferable here.
                remaining = data['remaining'];
                console.log(deckID);
                alert('New Deck created');
                score = 0;
            }).catch(error => console.log("Probably card did not fast enough. Try again." + error))
        }
        
        //if deckID
        deckOfCards.draw = function(event){
            if(!deckID){
                event.preventDefault();
                alert("There is no deck. Make one first.");
                return;
                }
        event.preventDefault(); // to use the event.
        console.log('draw!');
        const cardOutput = document.querySelector('#get-card-output');
        const cardScore = document.querySelector('#card-score');
    
        fetch(`http://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'}
            }).then(res => res.json())
            .then(deck => {console.log(deck);
            console.log(deck['remaining']);
            //remaining = deck['remaining']; a bit less flexible. there are not key values in the html or have id. could be fixed. Todo better as React.
            console.log(deck['cards']);
            console.log(deck['cards'][0]['value']); // weird array retreival in JS see below
            // ex 0: {code: "5S", image: "https://deckofcardsapi.com/static/img/5S.png", images: {…}, value: "5", suit: "SPADES"}
            let card = deck['cards'][0]
            cardOutput.innerHTML += 
            `
            <div class="float-sm-left ml-4">
            <h5 class="card-title">${card.value} of ${card.suit}</h5>
            <img src="${card.image}" alt="${card.value} of ${card.suit}" height="175px">
            </div>
            `
            cardScore.innerHTML = (score + card.value) 
            }) // 2nd then()
        }// draw function
    } // deck object               
    //Expandable menu for cards. Add a Card of cards... better then 3 cards structure.
    
    )(window.deckOfCards = window.deckOfCards || {})
    document.querySelector('#get-a-deck').addEventListener('click', deckOfCards.getDeck); 
    document.querySelector('#get-card').addEventListener('click', deckOfCards.draw);