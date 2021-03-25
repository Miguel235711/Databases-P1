use dbp1;

drop database dbp1;
create database dbp1;
use dbp1;


drop table Exam;
create table Exam(
    id int unsigned auto_increment primary key,
    name text,
    createdBy int unsigned,
    foreign key (createdBy) references Client(id) on delete cascade
);

drop table Question;
create table Question(
    id int unsigned auto_increment primary key,
    description text,
    examId int unsigned,
    type varchar(4), -- mult,sele,open
    foreign key (examId) references Exam(id) on delete cascade
);

drop table Answer;
create table Answer(
    id int unsigned auto_increment primary key,
    description text,
    questionId int unsigned,
    isRight boolean,
    foreign key (questionId) references Question(id) on delete cascade
);

drop table Client;
create table Client(
	id int unsigned auto_increment primary key,
    username text
);

-- default data population for testing
-- insert into Exam values
--     (0,'Exam1', ),
--    (0,'Exam2');
insert into Question values 
    (0,'¿Cuánto es 3+2?',1,'open'),
    (0,'¿Quién descubrió E=mc^2?',1,'mult'),
    (0,'¿Cuáles son estaciones del año?',2,'sele');
insert into Answer values
    (0,'Albert Einstein',2,1),
    (0,'Marie Curie',2,0),
    (0,'Isaac Newton',2,0),
    (0,'Steven Segal',2,0),
    (0,'Verano',3,1),
    (0,'Solsticio',3,0),
    (0,'Invierno',3,1),
    (0,'Eclipse',3,0);

