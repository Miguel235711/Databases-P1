import * as functions from 'firebase-functions';
import * as answers from '../controllers/answers.controller';
const cors = require('cors')({ origin: true });



const allowed: any = {
    GET: answers.getAnswersFromQuestion,
    POST: answers.addAnswerToQuestion,
    DELETE: answers.deleteAnswer
    /*GET: orders.getOrders,
    DELETE: orders.deleteOrders,
    PUT: orders.finishOrders*/
}
exports.api = functions.https.onRequest((req, res) => {
    cors(req,res,async()=>{
        if(allowed.hasOwnProperty(req.method))
            await allowed[req.method](req,res)
        else
            res.status(403).send('Forbiden!')
    })
   
})