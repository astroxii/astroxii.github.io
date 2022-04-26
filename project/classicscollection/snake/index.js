/**
 * Browser version of Snake game.
 * 
 * astroxii @ 2022
 * 
 * Have fun!
 * 
 */

(function(){reset();})();

function start(btn)
{
    if(sessionStorage.getItem("Running") === "false")
    {
        reset();
        sessionStorage.setItem("Running", "true");
        const snake = {body: [[0, 0], [0, 1], [0, 2]], direction: 2};
        sessionStorage.setItem("Snake", JSON.stringify(snake));
        const apple = {coords: []};
        sessionStorage.setItem("Apple", JSON.stringify(apple));
        sessionStorage.setItem("Score", "0");
        btn.setAttribute("disabled", "true");
        run();
    }
}

function run()
{
    setTimeout(() =>
    {
        if(JSON.parse(sessionStorage.getItem("Running")))
        {
            move();
            eat();
            placeApple();
            draw();
            document.getElementById("score").innerText = sessionStorage.getItem("Score");
            run();
        }
        else
        {
            return;
        }
    }, 100);
}

function draw()
{
    const fieldSize = 60;
    const positions = [];
    const gameArea = document.querySelector(".gamearea");
    const snake = JSON.parse(sessionStorage.getItem("Snake"));
    const head = snake.body[snake.body.length-1];
    const apple = JSON.parse(sessionStorage.getItem("Apple"));

    for(let i = 0; i < fieldSize; i++)
    {
        positions.push([]);
        for(let j = 0; j < fieldSize; j++)
        {
            const position = document.createElement("div");
            position.classList.add("position");
            positions[i].push(position);
        }
    }

    gameArea.replaceChildren(...positions.flat(1));

    snake.body.forEach((b) => positions[b[0]][b[1]]?.classList?.add("snake"));
    positions[head[0]][head[1]]?.classList?.add("head");
    positions[apple.coords[0]][apple.coords[1]]?.classList?.add("apple");
}

function move()
{
    const snake = JSON.parse(sessionStorage.getItem("Snake"));
    const head = snake.body[snake.body.length-1];

    switch(snake.direction)
    {
        // Up
        case 1:
        {
            head[0] -= 1;

            for(let i = 0; i < snake.body.length; i++)
            {
                if(snake.body[i+1])
                {
                    if(snake.body[i][1] < snake.body[i+1][1])
                    {
                        snake.body[i][1] += 1;
                    }
                    else if(snake.body[i][1] > snake.body[i+1][1])
                    {
                        snake.body[i][1] -= 1;
                    }
                    else if(snake.body[i][0] < snake.body[i+1][0])
                    {
                        snake.body[i][0] += 1;
                    }
                    else if(snake.body[i][0] > snake.body[i+1][0])
                    {
                        snake.body[i][0] -= 1;
                    }
                }
            }

            check(snake);

            sessionStorage.setItem("Snake", JSON.stringify(snake));

            break;
        }
        // Right
        case 2:
        {
            head[1] += 1;

            for(let i = 0; i < snake.body.length; i++)
            {
                if(snake.body[i+1])
                {
                    if(snake.body[i][0] < snake.body[i+1][0])
                    {
                        snake.body[i][0] += 1;
                    }
                    else if(snake.body[i][0] > snake.body[i+1][0])
                    {
                        snake.body[i][0] -= 1;
                    }
                    else if(snake.body[i][1] < snake.body[i+1][1])
                    {
                        snake.body[i][1] += 1;
                    }
                    else if(snake.body[i][1] > snake.body[i+1][1])
                    {
                        snake.body[i][1] -= 1;
                    }
                }
            }

            check(snake);

            sessionStorage.setItem("Snake", JSON.stringify(snake));

            break;
        }
        // Down
        case 3:
        {
            head[0] += 1;

            for(let i = 0; i < snake.body.length; i++)
            {
                if(snake.body[i+1])
                {
                    if(snake.body[i][1] < snake.body[i+1][1])
                    {
                        snake.body[i][1] += 1;
                    }
                    else if(snake.body[i][1] > snake.body[i+1][1])
                    {
                        snake.body[i][1] -= 1;
                    }
                    else if(snake.body[i][0] < snake.body[i+1][0])
                    {
                        snake.body[i][0] += 1;
                    }
                    else if(snake.body[i][0] > snake.body[i+1][0])
                    {
                        snake.body[i][0] -= 1;
                    }
                }
            }

            check(snake);

            sessionStorage.setItem("Snake", JSON.stringify(snake));

            break;
        }
        // Left
        case 4:
        {
            head[1] -= 1;

            for(let i = 0; i < snake.body.length; i++)
            {
                if(snake.body[i+1])
                {
                    if(snake.body[i][0] < snake.body[i+1][0])
                    {
                        snake.body[i][0] += 1;
                    }
                    else if(snake.body[i][0] > snake.body[i+1][0])
                    {
                        snake.body[i][0] -= 1;
                    }
                    else if(snake.body[i][1] < snake.body[i+1][1])
                    {
                        snake.body[i][1] += 1;
                    }
                    else if(snake.body[i][1] > snake.body[i+1][1])
                    {
                        snake.body[i][1] -= 1;
                    }
                }
            }

            check(snake);

            sessionStorage.setItem("Snake", JSON.stringify(snake));

            break;
        }
    }
}

function check(snake)
{
    const head = snake.body[snake.body.length-1];

    if(head[0] > 59 || head[0] < 0)
    {
        endgame();
    }
    else if(head[1] > 59 || head[1] < 0)
    {
        endgame();
    }
    
    for(let i = 0; i < snake.body.length-1; i++)
    {
        if(head.toString() === snake.body[i].toString())
        {
            endgame();
            break;
        }
    }
}

function eat()
{
    const snake = JSON.parse(sessionStorage.getItem("Snake"));
    const head = snake.body[snake.body.length-1];
    const tail = snake.body[0];
    const apple = JSON.parse(sessionStorage.getItem("Apple"));

    if(head.toString() === apple.coords.toString())
    {
        apple.coords = [];
        sessionStorage.setItem("Apple", JSON.stringify(apple));

        let x, y;

        if(tail[0] > head[0])
        {
            y = tail[0];
        }
        else
        {
            y = tail[0];
        }
        if(tail[1] > head[1])
        {
            x = tail[1];
        }
        else
        {
            x = tail[1];
        }

        snake.body.unshift([y, x]);
        sessionStorage.setItem("Snake", JSON.stringify(snake));
        sessionStorage.setItem("Score", JSON.stringify(snake.body.length-3));
    }
}

function placeApple()
{
    const apple = JSON.parse(sessionStorage.getItem("Apple"));
    
    if(apple.coords.length !== 2)
    {
        let x, y;
        x = Math.round(Math.random()*59);
        y = Math.round(Math.random()*59);
        apple.coords = [x, y];

        sessionStorage.setItem("Apple", JSON.stringify(apple));
    }
}

function endgame()
{
    sessionStorage.setItem("Running", "false");
    sessionStorage.removeItem("Snake");
    sessionStorage.removeItem("Apple");
    sessionStorage.setItem("Score", "0");
    console.clear();
    document.getElementById("start-btn").removeAttribute("disabled");
    document.getElementById("gameover").style.display = "initial";
}

function reset()
{
    sessionStorage.setItem("Running", "false");
    sessionStorage.removeItem("Snake");
    sessionStorage.removeItem("Apple");
    sessionStorage.setItem("Score", "0");
    document.getElementById("gameover").style.display = "none";
}

window.addEventListener("keydown", function(e)
{
    if(JSON.parse(this.sessionStorage.getItem("Running")))
    {
        const ks = {"w": 1, "arrowup": 1, "d": 2, "arrowright": 2, "s": 3, "arrowdown": 3, "a": 4, "arrowleft": 4};

        if(ks[e.key.toLowerCase()])
        {
            const snake = JSON.parse(this.sessionStorage.getItem("Snake"));

            if(snake.direction !== ks[e.key.toLowerCase()])
            {
                snake.direction = ks[e.key.toLowerCase()];

                this.sessionStorage.setItem("Snake", JSON.stringify(snake));
            }
        }
    }
});