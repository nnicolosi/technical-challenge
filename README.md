# Technical Challenge
This repository is the starting point of a full-stack developer technical challenge.  You'll need to have Node (v14.17.1), NPM (v6.14.13), and Docker installed on your machine.  If you need to install any of these, here are some helpful links:

- [Node and NPM](https://nodejs.org)
- [Docker Desktop](https://docs.docker.com/desktop)

With those installed, this monorepo contains everything needed to run the entire application by supporting the following actions:

- Installing dependencies, launching, and initializing a containerized (Docker) Postgres database using the `docker-compose up` command after navigating to the root of the repository.
- Installing dependencies and launching a backend API (Nest, Node, TypeScript) using the `npm install` and `npm start` commands after navigating to the `/server` directory.
- Installing dependencies and launching a frontend UI (React, JavaScript) using the `npm install` and `npm start` commands after navigating to the `/client` directory.

As is, the application has a Home page and a Contacts page.  The Contacts page supports viewing a list of all existing contacts and creating new contacts.

Your challenge is to enhance the application to allow a user to perform the following functions:

- Modify an existing contact
- Remove an existing contact
- View a new page (Call List)

The Call List page has the following requirements:

- Each row of the call list represents a contact
- Each row of the call list contains the contact's last name, first name, and home phone number
- Contacts with no home phone number are excluded from the call list
- The call list is sorted by last name, then by first name

You will fork this repository, make your changes, and then submit a pull request to have your changes reviewed.  Complete the challenge to the best of your ability, focusing on consistent patterns and readability.  There are plenty of opportunities for improving the current codebase, so feel free to do so, but again, best to be consistent throughout.  Please add your README content in the candidate section below.  Assume that this Technical Challenge section is gone, and your content is the entirety of the README for any developer who comes across this repository.

We'll look forward to reviewing your submission.


# Candidate Section

- We create new functionalities like modal of delete a contact, with features like connection con DB(database) and buttons or icons for close modal of create
- We create the operations like update and delete(axios) for test functionalities
- We modify the logic for read a contact, and update the same.
- I pass the information to modals when I want to update a contact
- I add the option to have a list call for each contact 
