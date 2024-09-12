DROP DATABASE IF EXISTS scms_test;

CREATE DATABASE scms_test;

USE scms_test;

CREATE USER 'test_local' @'%' IDENTIFIED BY 'test_password@123';

GRANT ALL PRIVILEGES ON scms_test.* TO 'test_local' @'%';

FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS client_languages (
    id INTEGER NOT NULL AUTO_INCREMENT,
    is_primary BOOL NOT NULL DEFAULT FALSE,
    language_id INTEGER NOT NULL,
    client_id INTEGER NOT NULL,
    PRIMARY KEY (id)
) COMMENT 'Stores the spoken languages by the client.';

CREATE TABLE IF NOT EXISTS clients (
    id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    funding_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) COMMENT 'Stores information relating to clients.';

CREATE TABLE IF NOT EXISTS funding_sources (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(10) NOT NULL,
    PRIMARY KEY (id)
) COMMENT 'Stores the available funding sources';

CREATE TABLE IF NOT EXISTS languages (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
) COMMENT 'Stores the available languages';

ALTER TABLE clients
ADD CONSTRAINT FK_funding_sources_TO_clients FOREIGN KEY (funding_id) REFERENCES funding_sources (id);

ALTER TABLE client_languages
ADD CONSTRAINT FK_languages_TO_client_languages FOREIGN KEY (language_id) REFERENCES languages (id);

ALTER TABLE client_languages
ADD CONSTRAINT FK_clients_TO_client_languages FOREIGN KEY (client_id) REFERENCES clients (id);

CREATE UNIQUE INDEX clients_index_email ON clients (email ASC);

CREATE UNIQUE INDEX languages_index_name ON languages (name ASC);

CREATE UNIQUE INDEX client_languages_index_client_id_language_id ON client_languages (
    client_id ASC,
    language_id ASC
);

CREATE UNIQUE INDEX client_languages_index_client_id_is_primary ON client_languages (client_id ASC, is_primary ASC);

CREATE UNIQUE INDEX funding_sources_name ON funding_sources (name ASC);