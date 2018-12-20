const faker = require("faker");

// Faker Data, Dummy
let users = [];

for (let i = 0; i < 1000; i++) {
    users.push({
        id: i + 1,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
    });
}

console.log(users);

module.exports = users;