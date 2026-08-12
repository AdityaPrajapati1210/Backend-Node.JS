create table user(
    id int primary key,
    name varchar(50) not null,
    email varchar(50) unique,
    password varchar(50) not null
)