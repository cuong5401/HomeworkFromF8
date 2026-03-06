function startCountdown(time) {
    if (typeof time !== "number" || isNaN(time) || time <= 0) return;
    console.log(time--);
    let timeOut = setInterval(() => {
        if (time) console.log(time);
        else {
            console.log("Hết giờ!");
            clearInterval(timeOut);
            timeOut = null;
        }
        time--;
    }, 1000);
}
startCountdown(10);
startCountdown(5);
