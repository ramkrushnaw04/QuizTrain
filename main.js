let userSelectedOption = -1 // userSelectedOption: option selected by user
let userResponces = []
let questions
let currQuestionNo
let points
let questionsLen

const pre = document.querySelector('.pre')
const next = document.querySelector('.next')
const que = document.getElementById('question')
const op1 = document.getElementById('option1')
const op2 = document.getElementById('option2')
const op3 = document.getElementById('option3')
const op4 = document.getElementById('option4')
const save = document.getElementById('save')
const submit = document.getElementById('submit')
const complitionScreen = document.getElementById('complitionScreen')
const ham = document.getElementsByClassName('ham')[0]
const left = document.querySelector('.left')

const line1 = document.querySelector('.line1')
const line2 = document.querySelector('.line2')
const line3 = document.querySelector('.line3')

const green = 'bg-green-400'
const red = 'bg-red-400'
const gray = 'bg-gray-300'
const defaultColor = 'bg-sky-300'
const defaultHoverColor = 'hover:bg-cyan-300'
const SelectColor = 'bg-blue-500'


async function getConfig() {
    const k = await fetch('config.json');
    const p = await k.json();
    return p
}


ham.onclick = function () {
    left.classList.toggle('mobile:right-100')
    left.classList.toggle('mobile:right-0')
    ham.classList.toggle('left-100')
    ham.classList.toggle('right-0')

    line1.classList.toggle('rotate-[-45deg]')
    line1.classList.toggle('w-[10px]')
    line1.classList.toggle('translate-x-[-14px]')
    line1.classList.toggle('translate-y-[8px]')

    line2.classList.toggle('w-[16px]')
    line2.classList.toggle('translate-x-[-2px]')

    line3.classList.toggle('rotate-[45deg]')
    line3.classList.toggle('w-[10px]')
    line3.classList.toggle('translate-x-[-14px]')
    line3.classList.toggle('translate-y-[-8px]')

}

function resetOptionsColors() {

    op1.classList.remove(green)
    op1.classList.remove(red)
    op1.classList.add(defaultColor)
    op1.classList.remove(SelectColor)
    op1.classList.add(defaultHoverColor)

    op2.classList.remove(green)
    op2.classList.remove(red)
    op2.classList.add(defaultColor)
    op2.classList.remove(SelectColor)
    op2.classList.add(defaultHoverColor)

    op3.classList.remove(green)
    op3.classList.remove(red)
    op3.classList.add(defaultColor)
    op3.classList.remove(SelectColor)
    op3.classList.add(defaultHoverColor)

    op4.classList.remove(green)
    op4.classList.remove(red)
    op4.classList.add(defaultColor)
    op4.classList.remove(SelectColor)
    op4.classList.add(defaultHoverColor)
}


function setOptionsColor(userRes, expected) {

    if (userRes != expected) {
        if (userRes == 1) {
            op1.classList.remove(defaultColor)
            op1.classList.remove(SelectColor)
            op1.classList.remove(defaultHoverColor)
            op1.classList.add(red)
        }
        else if (userRes == 2) {
            op2.classList.remove(defaultColor)
            op2.classList.remove(SelectColor)
            op2.classList.remove(defaultHoverColor)
            op2.classList.add(red)
        }
        else if (userRes == 3) {
            op3.classList.remove(defaultColor)
            op3.classList.remove(SelectColor)
            op3.classList.remove(defaultHoverColor)
            op3.classList.add(red)
        }
        else if (userRes == 4) {
            op4.classList.remove(defaultColor)
            op4.classList.remove(SelectColor)
            op4.classList.remove(defaultHoverColor)
            op4.classList.add(red)
        }
    }

    if (expected == 1) {
        op1.classList.remove(defaultColor)
        op1.classList.remove(SelectColor)
        op1.classList.remove(defaultHoverColor)
        op1.classList.add(green)
    }
    else if (expected == 2) {
        op2.classList.remove(defaultColor)
        op2.classList.remove(SelectColor)
        op2.classList.remove(defaultHoverColor)
        op2.classList.add(green)
    }
    else if (expected == 3) {
        op3.classList.remove(defaultColor)
        op3.classList.remove(SelectColor)
        op3.classList.remove(defaultHoverColor)
        op3.classList.add(green)
    }
    else if (expected == 4) {
        op4.classList.remove(defaultColor)
        op4.classList.remove(SelectColor)
        op4.classList.remove(defaultHoverColor)
        op4.classList.add(green)
    }
}


function selectQuestion(option) {

    if (option == 1) {
        op1.classList.remove(defaultColor)
        op1.classList.add(SelectColor)
        op1.classList.remove('hover:bg-cyan-300')

        op2.classList.remove(SelectColor)
        op3.classList.remove(SelectColor)
        op4.classList.remove(SelectColor)

        op2.classList.add(defaultColor)
        op3.classList.add(defaultColor)
        op4.classList.add(defaultColor)
    }
    else if (option == 2) {
        op2.classList.remove(defaultColor)
        op2.classList.add(SelectColor)
        op2.classList.remove('hover:bg-cyan-300')

        op1.classList.remove(SelectColor)
        op3.classList.remove(SelectColor)
        op4.classList.remove(SelectColor)

        op1.classList.add(defaultColor)
        op3.classList.add(defaultColor)
        op4.classList.add(defaultColor)
    }
    else if (option == 3) {
        op3.classList.remove(defaultColor)
        op3.classList.add(SelectColor)
        op3.classList.remove('hover:bg-cyan-300')

        op2.classList.remove(SelectColor)
        op1.classList.remove(SelectColor)
        op4.classList.remove(SelectColor)

        op1.classList.add(defaultColor)
        op2.classList.add(defaultColor)
        op4.classList.add(defaultColor)
    }
    else if (option == 4) {
        op4.classList.remove(defaultColor)
        op4.classList.add(SelectColor)
        op4.classList.remove('hover:bg-cyan-300')

        op1.classList.remove(SelectColor)
        op3.classList.remove(SelectColor)
        op2.classList.remove(SelectColor)

        op1.classList.add(defaultColor)
        op2.classList.add(defaultColor)
        op3.classList.add(defaultColor)
    }
}

function updateNewQuestion(data) {
    // updating question and its option
    que.innerHTML = data.no + '. ' + data.question
    op1.innerHTML = data.option1
    op2.innerHTML = data.option2
    op3.innerHTML = data.option3
    op4.innerHTML = data.option4

    resetOptionsColors()

    // updating colors of correct and incorrect options if the question is attempted
    if (userResponces[currQuestionNo] != -1)
        setOptionsColor(userResponces[currQuestionNo], questions[currQuestionNo].ans)

}

async function getQuestions() {
    const responce = await fetch('http://localhost:3000/getQuestions', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' }
    })

    const data = await responce.json()
    questionsLen = data.length
    return data
}


async function getQuizName() {


    const res = await fetch('http://localhost:3000/getQuizName')
    const name = await res.text()
    return name;
}


function changeQuestionFromLeft(event) {
    const questionNumer = event.target.innerHTML.split('.')[0]
    currQuestionNo = parseInt(questionNumer) - 1
    updateNewQuestion(questions[currQuestionNo])

}

function changeQuestionFromLeftBlur(event) {
    const questionNumer = event.target.nextElementSibling.innerHTML.split('.')[0]
    currQuestionNo = parseInt(questionNumer) - 1
    updateNewQuestion(questions[currQuestionNo])
}
function leftMouseenter(event) {
    event.target.previousElementSibling.classList.add('from-blue-400')
}
function leftMouseleave(event) {
    event.target.previousElementSibling.classList.remove('from-blue-400')
}
function leftBlurMouseenter(event) {
    event.target.classList.add('from-blue-400')
    event.target.nextElementSibling.classList.add('bg-blue-400')
}
function leftBlurMouseleave(event) {
    event.target.classList.remove('from-blue-400')
    event.target.nextElementSibling.classList.remove('bg-blue-400')
}

async function addQuestionsToLeft(questions) {

    const name = await getQuizName()
    document.getElementById('quizTitle').innerHTML = name
    const left = document.querySelector('.left').getElementsByClassName('ques')[0]

    // left.innerHTML = ""
    questions.forEach(q => {
        left.innerHTML +=
            `
            <div class="w-[97%] h-[60px] relative items-center flex justify-center">
                <div class="w-1/6 h-full absolute right-0 bg-gradient-to-l from-blue-200 to-transparent rounded-lg cursor-pointer" onmouseover="leftBlurMouseenter(event)" onmouseleave="leftBlurMouseleave(event)" onclick="changeQuestionFromLeftBlur(event)" ></div>
                    
                <button class="h-full bg-blue-200 p-2 rounded-lg overflow-clip whitespace-nowrap w-full text-left hover:bg-blue-400" onclick="changeQuestionFromLeft(event)" onmouseover="leftMouseenter(event)" onmouseleave="leftMouseleave(event)">${q.no}. ${q.question}</button>
            </div>
            `
    });
}

// initialiser
(async () => {
    questions = await getQuestions()
    addQuestionsToLeft(questions)

    currQuestionNo = 0
    points = 0

    // showing first qestion
    const data = questions[0]
    que.innerHTML = data.no + '. ' + data.question
    op1.innerHTML = data.option1
    op2.innerHTML = data.option2
    op3.innerHTML = data.option3
    op4.innerHTML = data.option4


    for (let i = 0; i < questionsLen; i++)
        userResponces.push(-1)

})()


pre.addEventListener('click', () => {
    if (currQuestionNo - 1 >= 0) {
        currQuestionNo--
        updateNewQuestion(questions[currQuestionNo])
    }
    userSelectedOption = -1
})


next.addEventListener('click', () => {
    if (currQuestionNo + 1 < questionsLen) {
        currQuestionNo++
        updateNewQuestion(questions[currQuestionNo])
    }
    userSelectedOption = -1
})


op1.addEventListener('click', () => {
    userSelectedOption = 1
    if (userResponces[currQuestionNo] == -1)
        selectQuestion(userSelectedOption)
})
op2.addEventListener('click', () => {
    userSelectedOption = 2
    if (userResponces[currQuestionNo] == -1)
        selectQuestion(userSelectedOption)
})
op3.addEventListener('click', () => {
    userSelectedOption = 3
    if (userResponces[currQuestionNo] == -1)
        selectQuestion(userSelectedOption)
})
op4.addEventListener('click', () => {
    userSelectedOption = 4
    if (userResponces[currQuestionNo] == -1)
        selectQuestion(userSelectedOption)
})

save.addEventListener('click', async () => {

    const currQueOnLeft = document.getElementsByClassName('ques')[0].children[currQuestionNo]
    // checking if question is answered if correct inc points

    if (userSelectedOption == -1)
        return

    if (userResponces[currQuestionNo] == -1) {
        if (userSelectedOption == questions[currQuestionNo].ans) {
            points++
            currQueOnLeft.children[0].classList.add('from-green-400')
            currQueOnLeft.children[0].classList.remove('from-slate-400')
            currQueOnLeft.children[1].classList.add(green)
        }
        else {
            currQueOnLeft.children[0].classList.add('from-red-400')
            currQueOnLeft.children[0].classList.remove('from-slate-400')
            currQueOnLeft.children[1].classList.add(red)
        }

        userResponces[currQuestionNo] = userSelectedOption
    }


    // setting options color
    if (userResponces[currQuestionNo] != -1)
        setOptionsColor(userResponces[currQuestionNo], questions[currQuestionNo].ans)

})

// show result
submit.addEventListener('click', (req, res) => {
    const skipped = userResponces.filter(item => item === -1).length
    const correctPercentage = Math.floor(points / questionsLen * 100)
    const incorrectPerentage = Math.floor((questionsLen - points - skipped) / questionsLen * 100)

    document.getElementById('resultStats').innerHTML =
        `
    Correct: ${points} <br>
    Incorrect: ${questionsLen - points - skipped} <br>
    Skipped: ${skipped} <br>
    `
    document.getElementById('resultPercentage').innerHTML = `${correctPercentage}%`
    document.getElementsByClassName('chart')[0].setAttribute('style', `--correct: ${correctPercentage}%; --incorrect: ${incorrectPerentage}%;`)

    complitionScreen.classList.remove('hidden')
})