--database
create database project;
--using db
use project;
--user table
create table user(
id int,
name varchar(26),
gmail varchar(29),
password char(52),
roleid int,
depertmentid int,
usertype varchar(23)
);

select * from user;
--insert
insert into user values(1,'kashish','kashish@abc','abc',1,2,'Admin');
insert into user values(2,'Ashish','ashish@abc','lms@098',2,2,'Normaluser');
insert into user values(3,'Ravi','ravisharma@abc','sharma@123',2,1,'Normaluser');
insert into user values(4,'Ram','ramsharma@abc','sharma@932',1,4,'Admin');



--role table
create table role(
roleid int ,
rolename varchar(25)
);
select * from role;


insert into role values(1,'Admin');
insert into role values(2,'Normaluser');
--dept table
create table department(
departmentid int,
departmentname varchar(29)
);
select * from department;
insert into department values(1,'BCA');
insert into department values(2,'MCA');
insert into department values(3,'BTech');
insert into department values(4,'Mcom');

--select * from user
--join role
--on user.id=role.roleid

--select * from user
--join department
--on user.id=department.departmentid;



select * from userdeptmapping;
--mapping user and dept
create table userrolemapping(
id int,
roleid int
);
--mapping dept and role
create table deptrolemap(
departmentid int,
roleid int
);

--mapping dept and user
create table deptusermapping(
departmentid int,
 id int
);