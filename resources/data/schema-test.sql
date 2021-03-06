/*
-- create tables
DROP TABLE obesity;

CREATE TABLE obesity (
	ID SERIAL PRIMARY KEY,
	gender	varchar(10),
	age	float,
	height	float,
	weight	float,
	family_history_with_overweight	varchar(5),
	favc	varchar(5),
	fcvc	float,
	ncp		float,
	caec	varchar(15),
	smoke	varchar(5),
	ch2o	float,
	scc		varchar(5),
	faf		float,
	tue		float,
	calc	varchar(12),
	mtrans	varchar(30),
	nobeyesdad varchar(30)
);

ALTER TABLE obesity ADD COLUMN ID SERIAL PRIMARY KEY;
SELECT * FROM obesity;


CREATE TABLE height (
	id serial PRIMARY KEY,
	feet int,
	inches int,
	meters float
);

DROP VIEW height_view

CREATE TABLE height_form (
	id serial PRIMARY KEY,
	height_label varchar(30),
	meters float
)

*/
INSERT INTO height_form (height_label, meters)
SELECT 
	feet || 'ft' || ' ' || inches || 'in' AS height_label,
	meters
FROM height;


select * from height_form







