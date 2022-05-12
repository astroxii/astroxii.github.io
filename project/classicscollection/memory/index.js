/**
 * Browser version of Memory game.
 * 
 * astroxii @ 2022
 * 
 * Have fun!
 * 
 */

// A reset on every reload.
(function(){reset();})();

// This starts the game, triggered by clicking the green button!
// Generates the game data at initial states and saves to sessionStorage.
function start(btn)
{ 
    if(!JSON.parse(sessionStorage.getItem("Running")))
    {  
        reset();
        sessionStorage.setItem("Running", "true");
        genPairs();
        document.querySelector(".showtimer").style.visibility = "visible";
        initShow();
    }
}

// Gives the player time to see the pieces and try to remember positions of the pairs.
function initShow()
{
    setTimeout(() =>
    {
        const t = Number.parseInt(document.getElementById("showtimer").innerText);

        if(t > 0)
        {
            document.getElementById("showtimer").innerText = t-1;
            initShow();
        }
        else
        {
            document.querySelector(".showtimer").style.visibility = "hidden";
            document.querySelectorAll(".piece").forEach((p) =>
            {
               p.style.backgroundColor = p.getAttribute("pair-color");
               setTimeout(() => {p.style.backgroundColor = null; p.removeAttribute("disabled");}, 1500);
            });
        }
    }, 1000);
}

// Generate pairs of blocks.
function genPairs()
{
    const colors = ["#fff", "#6495ed", "#10a510", "#7a33c2", "#b9da26", "#deb887", "#d85c36", "#5453a8"];
    const pieces = document.querySelectorAll(".piece");
    const pairs = [];

    // Use attributes temporarily to generate pairs of blocks.
    pieces.forEach((p, i) =>
    {
        p.setAttribute("disabled", "true");
        if(!p.getAttribute("pair"))
        {
            let pwith = Math.round(Math.random()*15);

            while(pieces[pwith].getAttribute("pair") || i === pwith)
            {
                pwith = Math.round(Math.random()*15);
            }
            
            pieces[pwith].setAttribute("pair", i);
            p.setAttribute("pair", pwith);
            
            pairs.push([i, pwith]);
        }
    });

    // Set colors for pairs.
    pairs.forEach((p, i) => 
    {
        p.forEach((pc) =>
        {
            pieces[pc].setAttribute("pair-color", colors[i]);
        });
    });
}

// Shows one piece's content and lets you choose it's pair. If it's wrong, hide, otherwise, keeps them visible.
function play(piece, id)
{
    if(JSON.parse(sessionStorage.getItem("Running")))
    {
        const pieces = document.querySelectorAll(".piece");
        const chosen = JSON.parse(sessionStorage.getItem("Chosen"));

        if(chosen === null || chosen === undefined) {sessionStorage.setItem("Chosen", id); piece.style.backgroundColor = piece.getAttribute("pair-color");}
        else if(Number.parseInt(piece.getAttribute("pair")) === chosen)
        {
            console.log(chosen, id);
            piece.style.backgroundColor = piece.getAttribute("pair-color");
            piece.setAttribute("disabled", "true");
            pieces[chosen].setAttribute("disabled", "true");
            sessionStorage.removeItem("Chosen");
        }
        else
        {
            pieces.forEach((pc) => {if(!pc.disabled) {pc.style.backgroundColor = null;}});
            sessionStorage.removeItem("Chosen");
        }

        let found = 0;
        pieces.forEach((p) => {if(p.getAttribute("disabled")) {found += 0.5}});

        if(found === 8)
        {
            endgame();
        }
    }
}

// Win!
function endgame()
{
    document.getElementById("win").style.visibility = "visible";
    sessionStorage.setItem("Running", "false");
}

// Resets everything!
function reset()
{
    const pieces = document.querySelectorAll(".piece");
    
    sessionStorage.setItem("Running", "false");
    document.getElementById("win").style.visibility = "hidden";
    document.querySelector(".showtimer").style.visibility = "hidden";
    document.getElementById("showtimer").innerText = "3";
    sessionStorage.removeItem("Chosen");
    pieces.forEach((pc) => {pc.style.backgroundColor = null; pc.removeAttribute("disabled")});
}