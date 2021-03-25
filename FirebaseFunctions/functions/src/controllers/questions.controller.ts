import {Request, Response} from 'firebase-functions';

import * as mysql from 'promise-mysql';

const getDbConnection = async () => {
  return await mysql.createConnection({
    host: 'db-p1.cqlefmcws6vc.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Xq>qv=4jS+zS7#ML',
    database: 'dbp1',
  })
}


export
const getQuestionsFromExam = async(req: Request, res:Response) => { //fix getting usersIds for PRODUCTION 
  ///add handling of query param state=current or state=past, only one at a time
    //handling getting 
    //TODO!!!!!!!!!!!!!!!!!!!!!!!!!
    /*for(let [key,value] of Object.entries(req.query)){  // Navigate through filters
      console.log(`key=${key}, value=${value}`)
    }*/
    /*const state = req.query.state as string | undefined
    const orderQuery = req.query.order as 'asc'|'desc' | undefined
    const ordersCollection = admin.firestore().collection('orders')
    const userIdParam = req.params[0] as string | undefined;
    const getData = async (userId: string | undefined) =>{
      console.log(`userId: ${userId} !!!`)
      const getOrdersCollectionOrQueryInt =  userId ? ordersCollection.where('userId','==',userId): ordersCollection 
      const getOrdersCollectionOrQueryState = state ? getOrdersCollectionOrQueryInt.where('state','==',state): getOrdersCollectionOrQueryInt
      const getOrdersCollectionOrQueryOrder = orderQuery ? getOrdersCollectionOrQueryState.orderBy('timeOrdered',orderQuery) : getOrdersCollectionOrQueryState
      return (await getOrdersCollectionOrQueryOrder.get()).docs.map(
        order =>{
          return{
            ...order.data(),
            id: order.id
          } as OrderModel
        })
      /*if(orderQuery)
        finalData.sort((a,b)=>orderQuery==='desc'?b.timeOrdered-a.timeOrdered:a.timeOrdered-b.timeOrdered)
      return finalData
    }*/
    const db = await getDbConnection();
    const rows = await db.query(`call GetQuestionsFromExam(${req.query.examId});`);
    await db.end();
    //rows[0].forEach((row:any)=> console.log(row.id))
    //console.log(`rows ${rows}`)
    res.json({
      result: 'Preguntas obtenidas exitosamente',
      data: rows[0].map((row:any)=>{
        return {id:row.id,description:row.description,examId:row.examId,type:row.type}
      },),
    })
}
export 
  const addQuestionToExam = async(req:Request,res:Response)=>{
    const db = await getDbConnection();
    console.log('addQuestionToExam')
    try{
      //console.log(JSON.stringify(req))
      const result = await db.query(`call AddQuestionToExam('${req.body.description}',${req.query.examId},'${req.query.type}');`);
      console.log(result[0][0].id)
      res.json({
        result: 'Pregunta agregada exitosamente',
        id: result[0][0].id,
      })
    }catch(e){
      console.log(e)
      res.json({
        result: 'Error al tratar de agregar pregunta',
        status:500,
      })
    }
  }
export 
  const deleteQuestion = async (req:Request,res:Response)=>{
    const db = await getDbConnection();
    try{
      console.log(`delete Id: ${req.query.id})`)
      await db.query(`call DeleteQuestion(${req.query.id})`)
      res.json({
        result: 'Pregunta borrada exitosamente',

      })
    }catch(e){
      res.json({
        result: 'Error al tratar de eliminar pregunta',
        status:500,
      })
    }
  }