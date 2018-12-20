let users = require("../datastore/users.js");

const api = app => {
    // Setting Default Route
    app.get("/", (request, response) => {
        response.redirect("/users");
    });

    // Get Users
    app.get("/users", (request, response) => {
        const query = request.query;
        console.log(`[GET] /users`);
        response.status(200).send(users);
    });

    // Get User By ID
    app.get("/users/:id", (request, response) => {
        const parameters = request.params;
        const user = users.find(user => user.id == parameters.id);
        if (typeof user == "undefined") response.status(404).send("User does not exist.");
        console.log(`[GET] /users/${parameters.id}`);
        response.status(200).send(user);
    });

    // Create User
    app.post("/users", (request, response) => {
        const newUser = request.body;
        const newUserId = Math.max(...users.map(user => user.id)) + 1;

        const user = {
            id:newUserId,
            firstName:  newUser.firstName.trim(),
            lastName: newUser.lastName.trim(),
            username: newUser.username.trim(),
            email: newUser.email.trim()
        };

        users.push(user);
        console.log(`[POST] /users`);
        response.status(200).send(user);
    });

    // Update User By ID
    app.patch("/users/:id", (request, response) => {
        const parameters = request.params;

        const updatedUser = request.body;
        const userIndex = users.findIndex(user => user.id == parameters.id);
        
        if (typeof userIndex == "undefined") response.status(500).send("User does not exist.");
        
        if (updatedUser.firstName.trim()) users[userIndex].firstName = updatedUser.firstName.trim();
        if (updatedUser.lastName.trim()) users[userIndex].lastName = updatedUser.lastName.trim();
        if (updatedUser.email.trim()) users[userIndex].email = updatedUser.email.trim();
        
        console.log(`[PATCH] /users/${parameters.id}`);
        response.status(200).send(updatedUser);
    });

    // Delete User By ID
    app.delete("/users/:id", (request, response) => {
        const parameters = request.params;
        const userIndex = users.findIndex(user => user.id == parameters.id);
        users.splice(userIndex, 1); // Remove Item By Index
        console.log(`[DELETE] /users/${parameters.id}`);
        response.status(200).send();
    });
};

module.exports = api;