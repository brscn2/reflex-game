$(document).ready(() => {
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

    const offsetButton = () => {
        $("#game-button").css("left", `${randomLeftCoordinate()}%`);
        $("#game-button").css("top", `${randomTopCoordinate()}%`);
    }

    const gameOver = () => {
        alert(score);

        $("#game-screen").css("text-align", "center");

        $("#game-button").text("Start!");
        $("#game-button").css("padding", "6% 5%");
        $("#game-button").css("left", "0");
        $("#game-button").css("top", "0");

        score = 0;
        $("#score").text(score);
    }

    $("#game-button").click(() => {
        $("#game-screen").css("text-align", "left");

        $("#game-button").text("Here!");
        let size = randomButtonSize();
        $("#game-button").css("padding", `${size + 1}% ${size}%`);

        clearInterval(gameInterval);

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