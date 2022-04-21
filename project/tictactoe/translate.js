const dictionary = 
{
    "en":
    {
        "title": "TicTacToe",
        "start": "PLAY",
        "plnow": "Playing now: ",
        "timer": "Time to play: ",
        "plxname": "Player [X] name:",
        "ploname": "Player [O] name:"
    },
    "pt-br":
    {
        "title": "Jogo da Velha",
        "start": "JOGAR",
        "plnow": "Jogando agora: ",
        "timer": "Tempo para jogar: ",
        "plxname": "Nome do jogador [X]:",
        "ploname": "Nome do jogador [O]:"
    }
}


function translatePage(btn)
{
    sessionStorage.setItem("Language", sessionStorage.getItem("Language") === "en"? "pt-BR" : "en");
    document.querySelector("html").lang = sessionStorage.getItem("Language");
    
    document.querySelectorAll("[translate-id]").forEach((te) =>
    {
        te.innerHTML = dictionary[sessionStorage.getItem("Language").toLowerCase()][te.getAttribute("translate-id").toLowerCase()];
    });

    btn.innerText = sessionStorage.getItem("Language");
}

function init()
{
    if(!sessionStorage.getItem("Language"))
    {
        sessionStorage.setItem("Language", localStorage.getItem("Language") ? localStorage.getItem("Language") : "en");
    }
    document.querySelector("html").lang = sessionStorage.getItem("Language");
    document.querySelectorAll("[translate-id]").forEach((te) =>
    {
        te.innerHTML = dictionary[sessionStorage.getItem("Language").toLowerCase()][te.getAttribute("translate-id").toLowerCase()];
    });
    document.getElementById("lang-button").innerText = sessionStorage.getItem("Language");
}

init();