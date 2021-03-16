-- 1. Stored procedure to create an exam
delimiter //
create procedure CreateExam(name text)
begin
    insert into Exam value(0,name);
end //
delimiter ;
-- 2. Stored procedure to add a question to an exam
delimiter //
create procedure AddQuestionToExam(descriptionIn text,ordIn int unsigned,examIdIn int unsigned,typeIn varchar(4))
begin
    insert into Question value(0,descriptionIn,ordIn,examIdIn,typeIn);
end //
delimiter ;
-- 3. Stored procedure to add an answer to a question
delimiter //
create procedure AddAnswerToQuestion(descriptionIn text,ordIn int unsigned,questionIdIn int unsigned,isRightIn boolean)
begin
    insert into Answer value(0,descriptionIn,ordIn,questionIdIn,isRightIn);
end //
delimiter ;
-- 4. Stored procedure to get ALL the exams
delimiter //
create procedure GetAllExams()
begin
    select * from Exam;
end //
delimiter ;

-- 5. Stored procedure to get ALL the questions from an exam
delimiter //
create procedure GetQuestionsFromExam(examId int unsigned)
begin
    select * from Question
        where Question.examId = examId
        order by ord;
end //
delimiter ;
-- 6. Stored procedure to get ALL the answers from question
delimiter //
create procedure GetAnswersFromQuestion(questionId int unsigned)
begin
    select * from Answer
        where Answer.questionId = questionId
        order by ord;
end //
delimiter ;

-- 7. Stored procedure to delete Exam
delimiter //
create procedure DeleteExam(examId int unsigned)
begin
    delete from Exam
        where id = examId;
end //
delimiter ;
-- 8. Stored procedure to delete Question
delimiter //
create procedure DeleteQuestion(questionId int unsigned)
begin
    delete from Question
        where id = questionId;
end //
delimiter ;
-- 9. Stored procedure to delete Answer
delimiter //
create procedure DeleteAnswer(answerId int unsigned)
begin
    delete from Answer
        where id = answerId;
end //
delimiter ;


-- Testing stored procedures


-- Insertion procedures testing
call CreateExam('Testing procedure Exam');
call AddQuestionToExam('test question to testing exam',0,3,'mult');
call AddAnswerToQuestion('testing answer correct',0,4,1);
call AddAnswerToQuestion('testing answer incorrect',1,4,0);

-- Get procedures testing
call GetAllExams();
call GetQuestionsFromExam(1);
call GetAnswersFromQuestion(3);

call DeleteExam(3);
