--drop table obesity_charts;

create table obesity_charts
(
	id serial,
	state varchar(30),
	county varchar(100),
	male_life_expectancy_1985_years float,
	female_life_expectancy_1985_years float,
	male_life_expectancy_1990_years float,
	female_life_expectancy_1990_years float,
	male_life_expectancy_1995_years float,
	female_life_expectancy_1995_years float,
	male_life_expectancy_2000_years float,
	female_life_expectancy_2000_years float,
	male_life_expectancy_2005_years float,
	female_life_expectancy_2005_years float,
	male_life_expectancy_2010_years float,
	female_life_expectancy_2010_years float,
	male_sufficient_physical_activity_prevalence_2001_p float,
	female_sufficient_physical_activity_prevalence_2001_p float,
	male_sufficient_physical_activity_prevalence_2009_p float,
	female_sufficient_physical_activity_prevalence_2009_p float,
	male_sufficient_physical_activity_prevalence_2011_p float,
	female_sufficient_physical_activity_prevalence_2011_p float,
	male_obesity_prevalence_2001_p float,
	female_obesity_prevalence_2001_p float,
	male_obesity_prevalence_2009_p float,
	female_obesity_prevalence_2009_p float,
	male_obesity_prevalence_2011_p float,
	female_obesity_prevalence_2011_p float
);
