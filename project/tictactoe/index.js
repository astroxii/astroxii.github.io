(function(){reset();})();

var Timer = null;

function start(btn)
{   
    if(sessionStorage.getItem("Playing") !== "true")
    {
        if(document.getElementById("Xname").value?.replace(/\s/ig, ""))
        {
            sessionStorage.setItem("XPlayerName", document.getElementById("Xname").value.replace(/\s/ig, ""));
        }
        else
        {
            sessionStorage.removeItem("XPlayerName");
        }
        if(document.getElementById("Oname").value?.replace(/\s/ig, ""))
        {
            sessionStorage.setItem("OPlayerName", document.getElementById("Oname").value.replace(/\s/ig, ""));
        }
        else
        {
            sessionStorage.removeItem("OPlayerName");
        }

        reset();

        sessionStorage.setItem("Playing", "true");
        sessionStorage.setItem("Player", new Date().getMilliseconds() % 2 === 0 ? "X" : "O");

        const player = sessionStorage.getItem(`${sessionStorage.getItem("Player")}PlayerName`)? 
        `${sessionStorage.getItem(`${sessionStorage.getItem("Player")}PlayerName`)} (${sessionStorage.getItem("Player")})` 
        : sessionStorage.getItem("Player");
        document.getElementById("act-player").innerText = player;

        btn.setAttribute("disabled", "true");
        document.getElementById("Xname").setAttribute("disabled", "true");
        document.getElementById("Oname").setAttribute("disabled", "true");

        timer();
    }
}

function timer()
{
    const end = new Date();
    end.setSeconds(end.getSeconds()+10);
    sessionStorage.setItem("Timer", "10");
    document.getElementById("timer").innerText = `${sessionStorage.getItem("Timer")}s`;

    Timer = window.setInterval(function()
    {
        const now = new Date();
        if(now.getSeconds() !== end.getSeconds()+1)
        {
            sessionStorage.setItem("Timer", `${Number.parseInt(sessionStorage.getItem("Timer"))-1}`);
            document.getElementById("timer").innerText = `${sessionStorage.getItem("Timer")}s`;
        }
        else
        {
            window.clearInterval(Timer);
            sessionStorage.setItem("Timer", "10");
            sessionStorage.setItem("Player", sessionStorage.getItem("Player") === "O" ? "X" : "O");
            const player = sessionStorage.getItem(`${sessionStorage.getItem("Player")}PlayerName`)? 
            `${sessionStorage.getItem(`${sessionStorage.getItem("Player")}PlayerName`)} (${sessionStorage.getItem("Player")})` 
            : sessionStorage.getItem("Player");
            document.getElementById("act-player").innerText = player;
            timer();
        }
    }, 1000);
}

function stopTimer()
{
    window.clearInterval(Timer);
}

function play(e)
{
    if(sessionStorage.getItem("Playing") === "true")
    {
        if(!e.getAttribute("disabled"))
        {
            e.setAttribute("disabled", "true");
            e.innerText = sessionStorage.getItem("Player");
            sessionStorage.setItem("Player", sessionStorage.getItem("Player") === "O" ? "X" : "O");
            const player = sessionStorage.getItem(`${sessionStorage.getItem("Player")}PlayerName`)? 
            `${sessionStorage.getItem(`${sessionStorage.getItem("Player")}PlayerName`)} (${sessionStorage.getItem("Player")})` 
            : sessionStorage.getItem("Player");
            document.getElementById("act-player").innerText = player;
            if(!check())
            {
                stopTimer();
                timer();
            }
        }
    }
}

function check()
{
    const pieces = document.querySelectorAll(".piece");
    const positions = [{elements: [pieces[0], pieces[1], pieces[2]], contents: [pieces[0].innerText, pieces[1].innerText, pieces[2].innerText]}, 
                      {elements: [pieces[3], pieces[4], pieces[5]], contents: [pieces[3].innerText, pieces[4].innerText, pieces[5].innerText]}, 
                      {elements: [pieces[6], pieces[7], pieces[8]], contents: [pieces[6].innerText, pieces[7].innerText, pieces[8].innerText]}];

    for(let i = 0; i < 3; i++)
    {
        const row = {e: positions[i].elements, c: positions[i].contents};
        if(row.c.includes("X") && row.c.includes("O") || row.c.includes(""))
        {
            continue;
        }
        else
        {
            endgame(row);
            return true;
        }
    }

    for(let i = 0; i < 3; i++)
    {
        const col = {e: [positions[0].elements[i], positions[1].elements[i], positions[2].elements[i]], 
                    c: [positions[0].contents[i], positions[1].contents[i], positions[2].contents[i]]};
       if(col.c.includes("X") && col.c.includes("O") || col.c.includes(""))
       {
            continue;
       }
       else
       {
            endgame(col);
            return true;
       }
    }

    const diagl = {e: [positions[0].elements[0], positions[1].elements[1], positions[2].elements[2]], c: [positions[0].contents[0], positions[1].contents[1], positions[2].contents[2]]};
    const diagr = {e: [positions[0].elements[2], positions[1].elements[1], positions[2].elements[0]], c: [positions[0].contents[2], positions[1].contents[1], positions[2].contents[0]]};

    if(((diagl.c.includes("X") && !diagl.c.includes("O")) || (!diagl.c.includes("X") && diagl.c.includes("O"))) && !diagl.c.includes(""))
    {
        endgame(diagl);
        return true;
    }
    else if(((diagr.c.includes("X") && !diagr.c.includes("O")) || (!diagr.c.includes("X") && diagr.c.includes("O"))) && !diagr.c.includes(""))
    {
        endgame(diagr);
        return true;
    }

    const plain = [];
    pieces.forEach((p) => plain.push(p.innerText));
    if(!plain.includes(""))
    {
        endgame();
        return true;
    }

    return false;
}

function endgame(winpos)
{
    stopTimer();
    const pieces = document.querySelectorAll(".piece");
    togglePieces(false);
    if(winpos)
    {
        winpos.e.forEach((p) => {p.style.color = "white"; p.style.backgroundColor = "rgba(0, 200, 0, 0.4)"});
    }
    else
    {
        pieces.forEach((p) => {p.style.color = "white"; p.style.backgroundColor = "rgba(200, 0, 0, 0.4)"});
    }

    sessionStorage.setItem("Playing", "false");
    document.querySelector(".start-button").removeAttribute("disabled");
    document.getElementById("Xname").removeAttribute("disabled");
    document.getElementById("Oname").removeAttribute("disabled");
    document.getElementById("act-player").innerText = "---";
    document.getElementById("timer").innerText = "---";
}

function togglePieces(enabled)
{
    const pieces = document.querySelectorAll(".piece");

    if(enabled)
    {
        pieces.forEach((p) => p.removeAttribute("disabled"));
    }
    else
    {
        pieces.forEach((p) => p.setAttribute("disabled", "true"));
    }
}

function reset()
{
    const pieces = document.querySelectorAll(".piece");
    pieces.forEach((p) => {p.innerText = ""; p.removeAttribute("disabled"); p.style.color = "green"; p.style.backgroundColor = "rgb(15, 15, 15)";});
    sessionStorage.setItem("Playing", "false");
    sessionStorage.removeItem("Player");
    sessionStorage.removeItem("Timer");
    document.getElementById("Xname").removeAttribute("disabled");
    document.getElementById("Oname").removeAttribute("disabled");
    document.querySelector(".start-button").removeAttribute("disabled");
    stopTimer();
    document.getElementById("act-player").innerText = "---";
    document.getElementById("timer").innerText = "---";

    if(sessionStorage.getItem("XPlayerName")?.replace(/\s/ig, ""))
    {
        document.getElementById("Xname").value = sessionStorage.getItem("XPlayerName");
    }
    if(sessionStorage.getItem("OPlayerName")?.replace(/\s/ig, ""))
    {
        document.getElementById("Oname").value = sessionStorage.getItem("OPlayerName");
    }
}

window.addEventListener("keydown", function (e)
{
    const ks = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    if(ks.includes(Number.parseInt(e.key)))
    {
        play(this.document.querySelector(".gamearea").children[Number.parseInt(e.key)-1]);
    }
});