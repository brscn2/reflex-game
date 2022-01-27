$(document).ready(() => {
    $("#game-button").on("keydown", function (e) {
        if (e.keyCode === 13 || e.keyCode === 32) {
            e.preventDefault();
        }
    });

    let gameInterval;
    let intervalTime = 6000;

    let remainingTimeInterval;
    let remainingTime = 0;

    let score = 0;
    let clickCount = -1;

    $("#game-button").text("Start!");
    $("#game-button").css("padding", "3rem 2.5rem");

    const randomLeftCoordinate = () => {
        let leftOffset = Math.floor(Math.random() * 90);
        return leftOffset;
    }

    const randomTopCoordinate = () => {
        let topOffset = Math.floor(Math.random() * 80);
        return topOffset;
    }

    const randomButtonSize = () => {
        let buttonSize = Math.floor(Math.random() * 5 + 1);
        return buttonSize;
    }

    const randomButtonColor = () => {
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
        return `rgb(${red},${green},${blue})`;
    }

    const offsetButton = () => {
        $("#game-button").css("left", `${randomLeftCoordinate()}%`);
        $("#game-button").css("top", `${randomTopCoordinate()}%`);
    }

    const gameOver = () => {
        clearInterval(remainingTimeInterval);

        $("#score").text(`Your score is ${Math.floor(score / 100)}`);
        $("#game-screen").css("text-align", "center");

        $("#game-button").text("Start!");

        $("#game-button").addClass("btn-warning");

        $("#game-button").attr("disabled", true);

        setTimeout(() => {
            $("#game-button").removeAttr("disabled");
            $("#game-button").css("opacity", "1");
        }, 2000);

        $("#game-button").css("background-color", "");
        $("#game-button").css("opacity", "0.6");
        $("#game-button").css("padding", "3rem 2.5rem");
        $("#game-button").css("left", "0");
        $("#game-button").css("top", "0");

        remainingTime = 0;

        score = 0;
        clickCount = -1;
    }

    const gameLoop = () => {
        if (clickCount < 50) {
            score += remainingTime * (clickCount / 10);
        } else {
            score += remainingTime * clickCount;
        }

        clearInterval(remainingTimeInterval);

        $("#game-button").removeClass("btn-warning");

        let size = randomButtonSize();
        $("#game-button").css("padding", `${size + 1}% ${size}%`);

        $("#game-button").css("background-color", `${randomButtonColor()}`);

        $("#game-screen").css("text-align", "left");

        clearInterval(gameInterval);

        $("#game-button").css("transition", "0.1s ease-in-out");
        offsetButton();

        $("#score").text(`Score: ${Math.floor(score / 100)}`);

        if (clickCount < 50) {
            intervalTime = 6000 - 1000 * Math.floor((clickCount / 10));
        } else {
            intervalTime = 750;
        }
        
        remainingTime = intervalTime;
        
        remainingTimeInterval = setInterval(() => {
            $("#game-button").text(remainingTime);
            remainingTime -= 100;
        }, 100)

        gameInterval = setInterval(() => {
            gameOver();
            clearInterval(gameInterval);
        }, intervalTime);
    }

    $("#game-button").click(() => {
        clickCount++;

        if (clickCount === 0) {
            $("#game-button").attr("disabled", true);

            $("#game-button").css("opacity", "0.6");
            $("#game-button").css("padding", "3rem 3.9rem");

            $("#score").text("Score: 0");

            let timer = 3;
            $("h1").text(`Game starts in ${timer}!`);
            $("#game-button").text(`${timer}!`);

            const countdown = setInterval(() => {
                timer--;
                $("h1").text(`Game starts in ${timer}!`);
                $("#game-button").text(`${timer}!`);

                if (timer === 0) {
                    clearInterval(countdown);

                    $("#game-button").removeAttr("disabled");
                    $("#game-button").css("opacity", "1");

                    $("h1").text("Welcome to Reflex Game!");

                    gameLoop();
                }
            }, 1000);
        } else {
            gameLoop();
        }
    })
})