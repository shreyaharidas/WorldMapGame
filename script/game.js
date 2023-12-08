

let NoQ = []; // to track Questions
let correct = 0;
let wrong = 0;
let enabled = false;

let questions = new Map([
    [1, "Which continent is India part of?"],
    [2, "Which is the largest continent in area?"],
    [3, "Which is the smallest continent in area?"],
    [4, "Which continent is also called as an 'Island-Continent'?"],
    [5, "The largest mountain in the world, Mount Everest is situated in which continent?"],
    [6, "On Which Continent Is Egypt?"],
    [7, "On which continent can you find France?"],
    [8, "Which is the Second biggest continent of the world?"],
    [9, "Columbus found which continent?"],
    [10, "Where is Amazon River?"]
]);

const randomPick = () => {
    let choice = parseInt(localStorage.getItem("choice"));

    do {
        let q = Math.floor(Math.random() * 10) + 1;
        if (!NoQ.includes(q))
            NoQ.push(q);
    } while (NoQ.length < choice)

    document.getElementById("question").innerText = questions.get(NoQ[0]);
    // NoQ.shift();
    isDisabled();
}

const Ans = (a) => {
    if ([1, 2, 5].includes(NoQ[0]) && a === "Asia" ||
        [3, 4].includes(NoQ[0]) && a === "Australia" ||
        [6, 8].includes(NoQ[0]) && a === "Africa" ||
        NoQ[0] === 7 && a === "Europe" ||
        NoQ[0] === 9 && a === "North America" ||
        NoQ[0] === 10 && a === "South America") {
        document.getElementById("result").innerText = "Correct!"
        document.getElementById("result").style.color= "green";
        correct++;
        enabled = true;
    }

    else {
        document.getElementById("result").innerText = "Wrong!"
        document.getElementById("result").style.color= "red";
        wrong++;
        enabled = true;
    }
    NoQ.shift();
    isDisabled();
    if (!NoQ.length) {
        enabled = false;
       setTimeout(()=>{endOfQuiz();},500); 
    }
    
}

const isDisabled = () => {
    if (NoQ.length === 0) {
        document.getElementById('next-btn').disabled = true;
    }
    else if (enabled) {
        document.getElementById('next-btn').disabled = false;
    }
    else if(!enabled)  document.getElementById('next-btn').disabled = true;
}


const nextQuestion = () => {
    enabled=false;
    isDisabled();
    if (NoQ.length) {
        document.getElementById("question").innerHTML = questions.get(NoQ[0]);
        document.getElementById("result").innerText = "";
    }
}

const endOfQuiz = () => {

    let name = localStorage.getItem("name");
    let firstLetter = name.charAt(0).toUpperCase();
    let restLetters = name.slice(1);
    name = firstLetter + restLetters;
    if (correct > wrong) {
        alert("Quiz Ends, " + name + "! You scored more than 50% !");

    }
    else if (correct == wrong) {
        alert("Quiz Ends, " + name + "!You scored 50% !");
    }

    else if (correct < wrong) {
        alert("Quiz Ends, " + name + "! Sorry! You scored less than 50% !");
    }
localStorage.clear();
}





