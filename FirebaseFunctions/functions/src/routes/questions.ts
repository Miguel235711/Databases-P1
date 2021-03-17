import * as functions from 'firebase-functions';
import * as questions from '../controllers/questions.controller';



const allowed: any = {
    GET: questions.getQuestionsFromExam,
    POST: questions.addQuestionToExam,
    DELETE: questions.deleteQuestion
    /*GET: orders.getOrders,
    DELETE: orders.deleteOrders,
    PUT: orders.finishOrders*/
}
exports.api = functions.https.onRequest(async (req, res) => {
    if(allowed.hasOwnProperty(req.method))
        await allowed[req.method](req,res)
    else
        res.status(403).send('Forbiden!')
})