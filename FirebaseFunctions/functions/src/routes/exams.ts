import * as functions from 'firebase-functions';
import * as exams from '../controllers/exams.controller';



const allowed: any = {
    GET: exams.getExams,
    POST: exams.addExam,
    DELETE: exams.deleteExam
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