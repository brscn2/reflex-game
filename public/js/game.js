$(document).ready(() => {
    $("#game-button").on("keydown", function (e) {
        if (e.keyCode === 13 || e.keyCode === 32) {
            e.preventDefault();
        }
    });

    let gameInterval;
    let intervalTime = 6000;
    let score = -1;

    $("#game-button").text("Start!");
    $("#game-button").css("padding", "6% 5%");

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
        alert(score);

        $("#game-screen").css("text-align", "center");

        $("#game-button").text("Start!");

        $("#game-button").addClass("btn-warning");

        $("#game-button").css("background-color", "");
        $("#game-button").css("padding", "6% 5%");
        $("#game-button").css("left", "0");
        $("#game-button").css("top", "0");

        score = 0;
        $("#score").text(score);
    }

    $("#game-button").click(() => {
        $("#game-screen").css("text-align", "left");

        $("#game-button").text("Here!");

        $("#game-button").removeClass("btn-warning");

        let size = randomButtonSize();
        $("#game-button").css("padding", `${size + 1}% ${size}%`);

        $("#game-button").css("background-color", `${randomButtonColor()}`);

        clearInterval(gameInterval);

        $("#game-button").css("transition", "0.1s ease-in-out");
        offsetButton();

        score++;
        $("#score").text(score);

        if (score < 50) {
            intervalTime = 6000 - 1000 * (score / 10);
        } else {
            intervalTime = 750;
        }

        gameInterval = setInterval(() => {
            gameOver();
            clearInterval(gameInterval);
        }, intervalTime);
    })
})