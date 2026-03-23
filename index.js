let min = 1;
let max = 100;


let number = JSON.parse(localStorage.getItem("randomNumber"));
if (!number) {
    number = Math.floor(Math.random() * (max - min + 1)) + min;
    localStorage.setItem("randomNumber", JSON.stringify(number));
}
console.log(number);


let count = JSON.parse(localStorage.getItem("attemptCount")) || 0;
let guesses = JSON.parse(localStorage.getItem("guessHistory")) || [];


if (count > 0) {
    document.getElementById("count").innerHTML = `<div class='alert'>Your attempts <span class="text-danger ms-2 font-monospace">${count}</span></div>`;
}


if (guesses.length > 0) {
    document.getElementById("gusses").innerHTML = `<div class='alert'>Your guesses: <span class="text-danger ms-2 font-monospace">${guesses.join(", ")}</span></div>`;
}

document.getElementById("guessForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let guess = parseInt(document.getElementById("guess").value);

    if (guess <= max && guess >= min) {
        count++;
        guesses.push(guess);

  
        localStorage.setItem("attemptCount", JSON.stringify(count));
        localStorage.setItem("guessHistory", JSON.stringify(guesses));

        document.getElementById("count").innerHTML = `<div class='alert'>Your attempts <span class="text-danger ms-2 font-monospace">${count}</span></div>`;
        document.getElementById("gusses").innerHTML = `<div class='alert'>Your guesses: <span class="text-danger ms-2 font-monospace">${guesses.join(", ")}</span></div>`;

        if (guess < number) {
            document.getElementById("message").innerHTML = `<div class='alert alert-warning'>Too low, try again</div>`;
        }
        else if (guess > number) {
            document.getElementById("message").innerHTML = `<div class='alert alert-warning'>Too high, try again</div>`;
        }
        else {
            document.getElementById("message").innerHTML = `<div class='alert alert-success'>Congratulations! You guessed the number in <span class="text-danger ms-2 font-monospace">${count}</span> tries.</div>`;

            const resetBtn = document.querySelector("button[type='reset']");
            resetBtn.classList.remove("d-none");
            
            resetBtn.addEventListener("click", function () {
                localStorage.removeItem("randomNumber");
                localStorage.removeItem("guessHistory");
                localStorage.removeItem("attemptCount");
                location.reload();
            });
        }
    }
    else {
        document.getElementById("message").innerHTML = `<div class='alert alert-danger'>Please enter a number between ${min} and ${max}.</div>`;
    }

    document.getElementById("guess").value = "";
});





