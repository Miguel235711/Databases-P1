
import * as admin from 'firebase-admin';

import * as exams from './routes/exams';
import * as questions from './routes/questions';
import * as answers from './routes/answers';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
admin.initializeApp();
exports.exams = exams;
exports.questions = questions;
exports.answers = answers;