let questionCount = 1


async function addQuestionToDB() {
    const options = document.getElementsByName('ans')
    let ans = 0
    for (const option of options) {
        if (option.checked) {
            ans = option.value
            break
        }
    }

    const question = document.getElementById('question')
    const option1 = document.getElementById('option1')
    const option2 = document.getElementById('option2')
    const option3 = document.getElementById('option3')
    const option4 = document.getElementById('option4')
    const quizName = document.getElementById('quizName')

    if (question && option1 && option2 && option3 && option4 && ans) {

        const responce = await fetch('http://localhost:3000/insertQuestion', {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                question: {
                    no: 0,
                    question: question.value,
                    option1: option1.value,
                    option2: option2.value,
                    option3: option3.value,
                    option4: option4.value,
                    ans: ans
                },
                quizName: quizName.value
            })

        })


        const k = await responce.json()

        if (k.responce) {
            questionCount++
            question.value = ""
            option1.value = ""
            option2.value = ""
            option3.value = ""
            option4.value = ""
            options.forEach(radioButton => {
                radioButton.checked = false;
            });
            alert(`Question saved to ${quizName.value}!`)
        }

    }
    else
        alert('All fields are required')


}