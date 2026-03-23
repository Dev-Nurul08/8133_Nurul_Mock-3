let min= 1;
let max = 100;

let number = JSON.parse(localStorage.getItem("randomNumber"));
if (!number) {
    number = Math.floor(Math.random() * (max - min + 1)) + min;
    localStorage.setItem("randomNumber", JSON.stringify(number));
}
console.log(number);


let count = 0;

let guesses = JSON.parse(localStorage.getItem("guessHistory")) || [];

document.getElementById("guessForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let guess = parseInt(document.getElementById("guess").value);

    count++;

    document.getElementById("count").innerHTML = `<div class= 'alert'> Your attempts <span class="text-danger ms-2 font-monospace"> ${count} <span> </div>`;

    document.getElementById("gusses").innerHTML = `<div class= 'alert'> Your last guess was <span class="text-danger ms-2 font-monospace"> ${guesses} <span> </div>`;


  if(guess <= max && guess >= min){
      if (guess < number) {

        document.getElementById("message").innerHTML = `<div class='alert alert-warning'>Too low, try again</div>`;
      



    }
    else if (guess > number) {

        document.getElementById("message").innerHTML = `<div class='alert alert-warning'>Too high, try again</div>`;
    }
    else {
        document.getElementById("message").innerHTML = `<div class='alert alert-success'>Congratulations! You guessed the number in <span class="text-danger ms-2 font-monospace"> ${count} <span> tries.</div>`;

        document.getElementById('guessForm').addEventListener("reset", function () {
            localStorage.removeItem("randomNumber");
            localStorage.removeItem("guessHistory");
        });

    }

    document.getElementById("guess").value = "";

}
else{
    document.getElementById("message").innerHTML = `<div class='alert alert-danger'>Please enter a number between ${min} and ${max} .</div>`;
    document.getElementById("guess").value = "";
};


   

});





