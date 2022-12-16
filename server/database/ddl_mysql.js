import db from "./connection_mysql.js";
import bcrypt from "bcryptjs"

const isInDeleteMode = true;

if (isInDeleteMode) {
    db.execute(`
        DROP TABLE IF EXISTS users;
    `);
    db.execute(`
        DROP TABLE IF EXISTS messages;
    `);

}

db.execute(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255),
    password VARCHAR(255)
);
`);

db.execute(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    message VARCHAR(255),
    sender VARCHAR(255),
    userID Integer,
    FOREIGN KEY (userID) REFERENCES users(id)
);
`);

const salt1 = await bcrypt.genSalt(15)
const newHashedPassword1 = await bcrypt.hash("KlimaKriger123&", salt1)
const salt2 = await bcrypt.genSalt(15)
const newHashedPassword2 = await bcrypt.hash("SaveThePlanet1989&", salt2)

// seed the database
if (isInDeleteMode) {
    db.execute(`INSERT INTO users (email, password) VALUES ('klimaline@yahoo.com', '${newHashedPassword1}');`);
    db.execute(`INSERT INTO users (email, password) VALUES ('anne@grønfremtid.com', '${newHashedPassword2}');`);
}
if (isInDeleteMode) {
    db.execute(`INSERT INTO messages (message, sender, userID) VALUES ('Velkommen til Klimateket, du er altid velkommen til at kontakte os med spørgsmål, ris og ros.', 'klimateket@klima.nu', 1 );`);
    db.execute(`INSERT INTO messages (message, sender, userID) VALUES ('Velkommen til Klimateket, du er altid velkommen til at kontakte os med spørgsmål, ris og ros.', 'klimateket@klima.nu', 2 );`);

}

db.end();