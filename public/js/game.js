$(document).ready(() => {
    let gameInterval;
    let score = -1;

    const randomLeftCoordinate = () => {
        let leftOffset = Math.floor(Math.random() * 90);
        return leftOffset;
    }

    const randomTopCoordinate = () => {
        let topOffset = Math.floor(Math.random() * 90);
        return topOffset;
    }

    const offsetButton = () => {
        $("#game-button").css("left", `${randomLeftCoordinate()}%`);
        $("#game-button").css("top", `${randomTopCoordinate()}%`);
    }

    const gameOver = () => {
        alert(score);

        $("#game-screen").css("text-align", "center");

        $("#game-button").css("left", "0");
        $("#game-button").css("top", "0");

        score = 0;
        $("#score").text(score);
    }

    $("#game-button").click(() => {
        $("#game-screen").css("text-align", "left");

        clearInterval(gameInterval);

        offsetButton();

        score++;
        $("#score").text(score);

        gameInterval = setInterval(() => {
            gameOver();
            clearInterval(gameInterval);
        }, 1000)
    })
})