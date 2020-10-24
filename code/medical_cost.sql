create table insurance (
	id serial primary key,
	age int,
	sex varchar(10),
	bmi float,
	children int,
	smoker varchar(3),
	region varchar(10),
	charges float	
);
