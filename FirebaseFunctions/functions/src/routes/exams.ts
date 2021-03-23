import * as functions from 'firebase-functions';
import * as exams from '../controllers/exams.controller';
const cors = require('cors')({ origin: true });




const allowed: any = {
    GET: exams.getExams,
    POST: exams.addExam,
    DELETE: exams.deleteExam
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