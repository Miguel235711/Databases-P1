import * as functions from 'firebase-functions';
import * as questions from '../controllers/questions.controller';
const cors = require('cors')({ origin: true });



const allowed: any = {
    GET: questions.getQuestionsFromExam,
    POST: questions.addQuestionToExam,
    DELETE: questions.deleteQuestion,
}
export const api = functions.https.onRequest((req, res) => {
    cors(req,res,async()=>{
        if(allowed.hasOwnProperty(req.method))
            await allowed[req.method](req,res)
        else
            res.status(403).send('Forbiden!')
    })
   
})