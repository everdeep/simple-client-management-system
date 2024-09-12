USE scms_test;

# Insert into funding_sources table NDIS, HCP, CHSP, DVA, HACC
INSERT INTO funding_sources (name) VALUES ('NDIS'), ('HCP'), ('CHSP'), ('DVA'), ('HACC');

# Insert into languages table English, Spanish, French, German, Italian, Chinese, Japanese, Korean, Vietnamese, Arabic
INSERT INTO languages (name) VALUES ('English'), ('Spanish'), ('French'), ('German'), ('Italian'), ('Chinese'), ('Japanese'), ('Korean'), ('Vietnamese'), ('Arabic');

# Insert into clients table
INSERT INTO clients (first_name, middle_name, last_name, email, dob, funding_id) VALUES ('John', 'Smith', 'Doe', 'johndoe@fake.com', '1990-01-01', 1);
INSERT INTO clients (first_name, middle_name, last_name, email, dob, funding_id) VALUES ('Jane', 'Smith', 'Doe', 'jane@fake.com', '1990-01-01', 2);
INSERT INTO clients (first_name, middle_name, last_name, email, dob, funding_id) VALUES ('Alice', 'Sierra', 'Sky', 'alice@fake.com', '1990-01-01', 3);
INSERT INTO clients (first_name, last_name, email, dob, funding_id) VALUES ('Sarah', 'Meep', 'sarah@fake.com', '1990-01-01', 4);
INSERT INTO clients (first_name, last_name, email, dob, funding_id) VALUES ('Sam', 'Taylor', 'sam@fake.com', '1990-01-01', 5);

# Insert into client_languages table
INSERT INTO client_languages (is_primary, language_id, client_id) VALUES (TRUE, 1, 1);
INSERT INTO client_languages (is_primary, language_id, client_id) VALUES (TRUE, 2, 2);
INSERT INTO client_languages (is_primary, language_id, client_id) VALUES (FALSE, 4, 2);
INSERT INTO client_languages (is_primary, language_id, client_id) VALUES (FALSE, 6, 2);
INSERT INTO client_languages (is_primary, language_id, client_id) VALUES (TRUE, 3, 3);
INSERT INTO client_languages (is_primary, language_id, client_id) VALUES (TRUE, 4, 4);
INSERT INTO client_languages (is_primary, language_id, client_id) VALUES (FALSE, 1, 4);
INSERT INTO client_languages (is_primary, language_id, client_id) VALUES (FALSE, 2, 4);
INSERT INTO client_languages (is_primary, language_id, client_id) VALUES (TRUE, 5, 5);
