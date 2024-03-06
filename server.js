const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const qa = require('./models/question')

let quizName = 'science'
const port = 3000;

app.set('view engine', 'ejs')
app.use(express.json())
app.use(cors({
    origin: 'http://127.0.0.1:5500'
}))


app.post('/getQuestions', async (req, res) => {
    await mongoose.connect('mongodb://localhost:27017/'+quizName)
    const docs = await qa.find()
    await mongoose.connection.close()
    res.send(docs)
})


app.post('/getAllQuizes', async (req, res) => {
    await mongoose.connect('mongodb://localhost:27017/'+quizName)
    const quizes = await mongoose.connection.db.admin().listDatabases();
    await mongoose.connection.close()
    // console.log(allDatabases)
    res.send(quizes)
})

app.post('/setQuiz', (req, res) => {
    quizName = req.body.quiz
    res.send()
})

app.post('/insertQuestion', async (req, res)=>{
    const data = req.body
    await mongoose.connect('mongodb://localhost:27017/' + data.quizName)
    const docs = await qa.find()
    data.question.no = docs.length + 1

    const q = new qa(data.question)
    await q.save()
    await mongoose.connection.close()

    res.send({responce: true})
})


app.get('/getQuizName', (req, res) => {
    res.send(quizName)
})


app.listen(port, () => {
    // console.log(`Example app listening on port ${port}`);
});