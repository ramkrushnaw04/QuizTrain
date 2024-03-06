const mainFileLink = "http://127.0.0.1:5500/main.html"
const attendQuizButton = document.getElementById('attendQuizButton')
const quizOptions = document.getElementById('quizOptions')
const quizUL = document.getElementById('quizOptions')

async function getAllQuizes()
{
    const responce = await fetch('http://localhost:3000/getAllQuizes', {
            method: "POST",
            headers: { 'Content-type': 'application/json' }
        })
    const data = await responce.json()

    data.databases.forEach(quiz => {
        if(!['admin', 'config', 'test', 'local'].includes(quiz.name))
        quizUL.innerHTML += `<li><button onclick="changeQuiz(event)" class="p-2 "><a href=${mainFileLink}>${quiz.name}</a></button></li>`

    });
}

async function changeQuiz(event)
{
    const quiz = event.target.innerHTML

    const responce = await fetch('http://localhost:3000/setQuiz', {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({quiz: quiz})
    })

}

attendQuizButton.addEventListener('mouseenter', ()=>{
    quizOptions.classList.remove('hidden')
})

attendQuizButton.addEventListener('mouseleave', ()=>{
    quizOptions.classList.add('hidden')
})

getAllQuizes().then()