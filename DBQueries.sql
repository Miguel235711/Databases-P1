-- 1. Stored procedure to create an exam
drop procedure if exists CreateExam;
delimiter //
create procedure CreateExam(name text)
begin
    insert into Exam(name) value(name);
    select last_insert_id() id;
end //
delimiter ;
-- 2. Stored procedure to add a question to an exam
drop procedure if exists AddQuestionToExam;
delimiter //
create procedure AddQuestionToExam(descriptionIn text,examIdIn int unsigned,typeIn varchar(4))
begin
    insert into Question(description,examId, type) value(descriptionIn,examIdIn,typeIn);
    select last_insert_id() id;
end //
delimiter ;
-- 3. Stored procedure to add an answer to a question
drop procedure if exists AddAnswerToQuestion;
delimiter //
create procedure AddAnswerToQuestion(descriptionIn text,questionIdIn int unsigned,isRightIn boolean)
begin
    insert into Answer(description, questionId, isRight) value(descriptionIn,questionIdIn,isRightIn);
    select last_insert_id() id;
end //
delimiter ;
-- 4. Stored procedure to get ALL the exams
drop procedure if exists GetAllExams;
delimiter //
create procedure GetAllExams()
begin
    select * from Exam;
end //
delimiter ;

-- 5. Stored procedure to get ALL the questions from an exam
drop procedure if exists GetQuestionsFromExam;
delimiter //
create procedure GetQuestionsFromExam(examId int unsigned)
begin
    select * from Question
        where Question.examId = examId;
end //
delimiter ;
-- 6. Stored procedure to get ALL the answers from question
drop procedure if exists GetAnswersFromQuestion;
delimiter //
create procedure GetAnswersFromQuestion(questionId int unsigned)
begin
    select * from Answer
        where Answer.questionId = questionId;
end //
delimiter ;

-- 7. Stored procedure to delete Exam
drop procedure if exists DeleteExam;
delimiter //
create procedure DeleteExam(examId int unsigned)
begin
    delete from Exam
        where id = examId;
end //
delimiter ;
-- 8. Stored procedure to delete Question
drop procedure if exists DeleteQuestion;
delimiter //
create procedure DeleteQuestion(questionId int unsigned)
begin
    delete from Question
        where id = questionId;
end //
delimiter ;
-- 9. Stored procedure to delete Answer
drop procedure if exists DeleteAnswer;
delimiter //
create procedure DeleteAnswer(answerId int unsigned)
begin
    delete from Answer
        where id = answerId;
end //
delimiter ;
drop trigger if exists limitAnswers;
delimiter //
create trigger limitAnswers
before insert on Answer
for each row
begin
    declare amount int;
    select count(*) into amount from Answer where questionId = NEW.questionId;
    if amount >= 5 then
        signal sqlstate '45000' set message_text = 'No pueden haber más de 5 respuestas por pregunta';
    end if;
    -- 45000 is the exception code for user-defined exceptionss
end //


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
