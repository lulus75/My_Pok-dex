window.onload = function(){
    var pokeform = document.forms['pokeForm'];


    var allPokemons = {};

    var req = new XMLHttpRequest();
    req.open("GET", "pokemons.json", true);

    req.onreadystatechange = function (oEvent) {
        if (req.readyState === 4) {
            if (req.status === 200) {
                allPokemons = JSON.parse(req.responseText);
                pokeform.style.visibility = 'visible';
            } else {
                pokeform.style.visibility = 'visible';
                pokeform.innerHTML = 'Error while getting pokemons data : '+req.statusText;
            }
        }
    };
    req.send();

    var pokeFormError = document.querySelector('#pokeFormError');
    var pokeImg = document.querySelector('#pokemonImg');
    var pokemonName = document.querySelector('#pokemonName');
    var pokemonType = document.querySelector('#pokemonType');

    var pokeImgUrl = 'http://img.pokemondb.net/artwork/';
    pokeform.onsubmit = function(){
        pokeFormError.innerHTML = '';
        var pokeValue = this.elements['pokeValue'].value.toLocaleLowerCase();
        var currentPokemon;

        if(!isNaN(pokeValue)){
            currentPokemon = allPokemons[pokeValue];
        }else{
            for(var p in allPokemons){
                if(allPokemons[p].name.toLowerCase() == pokeValue){
                    currentPokemon = allPokemons[p];
                }
            }
        }

        if(typeof currentPokemon !== 'undefined' && currentPokemon){
            pokemonName.innerText = currentPokemon.name;
            pokemonType.innerText = currentPokemon.type;
            var fullImgUrl = pokeImgUrl+currentPokemon.name.toLowerCase()+'.jpg';
            pokeImg.setAttribute('src', fullImgUrl);
        }else{
            var patocheImg = 'http://cdn-parismatch.ladmedia.fr/var/news/storage/images/paris-match/people/television/' +
                'patrick-sebastien-l-anti-deprime-152382/1509152-1-fre-FR/Patrick-Sebastien-l-anti-deprime.jpg';
            pokeImg.setAttribute('src', patocheImg);
            pokemonName.innerText = 'Patoche';
            pokemonType.innerText = 'Beauf';
            if(!isNaN(pokeValue)){
                pokeFormError.innerHTML = 'Pokemon number <u>'+pokeValue+'</u> not found';
            }else{
                pokeFormError.innerHTML = '<u>'+pokeValue+'</u> not found';
            }

        }
        return false;
    };
    

};