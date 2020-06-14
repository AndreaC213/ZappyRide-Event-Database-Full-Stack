USE radmysql;

DROP TABLE EventsTable;

CREATE TABLE EventsTable (
EventID int PRIMARY KEY NOT NULL AUTO_INCREMENT,
Organizer varchar(255) NULL,
Venue varchar(255) NULL,
EventDate varchar(255) NULL
);

SELECT * FROM EventsTable;

INSERT INTO EventsTable (Organizer, Venue, EventDate) 
VALUE ('Plug In America','New York Auto Show', 'June 1, 2020'); 

SELECT * FROM EventsTable;