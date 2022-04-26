const dictionary = 
{
    "en":
    {
        "start": "PLAY",
        "score": "Score: ",
        "gameover": "Game Over!"
    },
    "pt-br":
    {
        "start": "JOGAR",
        "score": "Pontos: ",
        "gameover": "Derrota!"
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