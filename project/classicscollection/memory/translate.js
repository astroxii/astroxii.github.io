/**
 * Really simple way to translate low amount of data staticly.
 * 
 * astroxii @ 2022
 * 
 */

const dictionary = 
{
    "en":
    {
        "title": "Memory Game",
        "start": "PLAY",
        "showtimer": "Showing in: ",
        "win": "Win!"
    },
    "pt-br":
    {
        "title": "Jogo da Mem&oacute;ria",
        "start": "JOGAR",
        "showtimer": "Revelando em: ",
        "win": "Vit&oacute;ria!"
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