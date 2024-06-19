  let points = document.querySelector(".points");
  
  let mole1 = document.querySelector(".mole1");
  
  let mole2 = document.querySelector(".mole2");
  
  let mole3 = document.querySelector(".mole3");
  
  let mole4 = document.querySelector(".mole4");
  
  let mole5 = document.querySelector(".mole5");
  
  let mole6 = document.querySelector(".mole6");
  
  let mole7 = document.querySelector(".mole7");
  
  let mole8 = document.querySelector(".mole8");
  
  let mole9 = document.querySelector(".mole9");
  
const playah = document.querySelector(".playah")

  const chatbox = document.querySelector(".chatbox")

  let buttonClicked = false;

  const usernamehhhhggggg = document.querySelector(".username")
const cuss =["fuck","kanker","neger","nigger","flikker","fag"]

  mole1.addEventListener("click", myFunction1);
  mole2.addEventListener("click", myFunction2);
  mole3.addEventListener("click", myFunction3);
  mole4.addEventListener("click", myFunction4);
  mole5.addEventListener("click", myFunction5);
  mole6.addEventListener("click", myFunction6);
  mole7.addEventListener("click", myFunction7);
  mole8.addEventListener("click", myFunction8);
  mole9.addEventListener("click", myFunction9);
  // playah.addEventListener("click", nameplayer);

  let randomNumber = 0
  
  mole1.style.visibility = "hidden";
  mole2.style.visibility = "hidden";
  mole3.style.visibility = "hidden";
  mole4.style.visibility = "hidden";
  mole5.style.visibility = "hidden";
  mole6.style.visibility = "hidden";
  mole7.style.visibility = "hidden";
  mole8.style.visibility = "hidden";
  mole9.style.visibility = "hidden";

  points.innerHTML = 5;

  function checkText() {
    // Lijst met slechte woorden
    var badWords = ["fuck","kanker","neger","nigger","flikker","fag"];

    // Haal de ingevoerde tekst op
    var inputText = document.getElementById("textInput").value.toLowerCase();

    // Controleer op slechte woorden
    var containsBadWord = badWords.some(function(word) {
        return inputText.includes(word);
    });

    // Controleer op rare tekens
    var containsSpecialCharacters = /[!@#$%^&*(),.?":{}|<>]/.test(inputText);

    // Geef het resultaat weer
    if (containsBadWord) {
        document.getElementById("result").innerHTML = "Waarschuwing: Bevat een slecht woord.";
    } else if (containsSpecialCharacters) {
        document.getElementById("result").innerHTML = "Waarschuwing: Bevat rare tekens.";
    } else {
      document.getElementById("result").innerHTML = "";
      playah.innerHTML = inputText
    }
}

  function  myFunction1() {
    if (randomNumber == 1) {
      points.innerHTML++;
      chatbox.innerHTML = "yipeee"
      mole1.style.visibility = "hidden";
      buttonClicked = true;
    }
  }
  function myFunction2() {
    if (randomNumber == 2) {
      points.innerHTML++;
      mole2.style.visibility = "hidden";
      buttonClicked = true;
    }
  }
  function myFunction3() {
    if (randomNumber == 3) {
      points.innerHTML++;
      chatbox.innerHTML = "yahoooo"
      mole3.style.visibility = "hidden";
      buttonClicked = true;
    }
  }
  function myFunction4() {
    if (randomNumber == 4) {
      points.innerHTML++;
      chatbox.innerHTML = "yipeee"
      mole4.style.visibility = "hidden";
      buttonClicked = true;
    }
  }
  function myFunction5() {
    if (randomNumber == 5) {
      points.innerHTML++;
      chatbox.innerHTML = "yahoooo"
      mole5.style.visibility = "hidden";
      buttonClicked = true;
    }
  }
  function myFunction6() {
    if (randomNumber == 6) {
      points.innerHTML++;
      chatbox.innerHTML = "yipeee"
      mole6.style.visibility = "hidden";
      buttonClicked = true;
    }
  }
  function myFunction7() {
    if (randomNumber == 7) {
      points.innerHTML++;
      chatbox.innerHTML = "yahoooo"
      mole7.style.visibility = "hidden";
      buttonClicked = true;
    }
  }
  function myFunction8() {
    if (randomNumber == 8) {
      points.innerHTML++;
      chatbox.innerHTML = "yipeee"
      mole8.style.visibility = "hidden";
      buttonClicked = true;
    }
  }
  function myFunction9() {
    if (randomNumber == 9) {
      points.innerHTML++;
      chatbox.innerHTML = "yahoooo"
      mole9.style.visibility = "hidden";
      buttonClicked = true;
    }
  }

  function whack() {
    if (randomNumber == 1) {
      mole1.style.visibility = "visible";
    } else if (randomNumber == 2) {
      mole2.style.visibility = "visible";
    } else if (randomNumber == 3) {
      mole3.style.visibility = "visible";
    } else if (randomNumber == 4) {
      mole4.style.visibility = "visible";
    } else if (randomNumber == 5) {
      mole5.style.visibility = "visible";
    } else if (randomNumber == 6) {
      mole6.style.visibility = "visible";
    } else if (randomNumber == 7) {
      mole7.style.visibility = "visible";
    } else if (randomNumber == 8) {
      mole8.style.visibility = "visible";
    } else if (randomNumber == 9) {
      mole9.style.visibility = "visible";
    }
  };
  



  activatesettimeout()

  function activatesettimeout(){
    activatesettimeoutt()
  setTimeout(function () {
    randomNumber = Math.floor(Math.random() * 9) + 1;
    console.log(randomNumber);
    whack();
    
  }, 2000);
  console.log(points)

}

function activatesettimeoutt(){
  // winner()
  setTimeout(function() {
  if (!buttonClicked) {
    mole1.style.visibility = "hidden";
    mole2.style.visibility = "hidden";
    mole3.style.visibility = "hidden";
    mole4.style.visibility = "hidden";
    mole5.style.visibility = "hidden";
    mole6.style.visibility = "hidden";
    mole7.style.visibility = "hidden";
    mole8.style.visibility = "hidden";
    mole9.style.visibility = "hidden";
    points.innerHTML--;
    chatbox.innerHTML = "mehhh muhhh -1 punt"
  }
  buttonClicked = false;
  activatesettimeout()
}, 4000);
}

// function winner(){
//   if(points=="10"){
//     alert("yipee")
//   }else if(points=="0"){
//     alert("yipee")
//   }

// }

