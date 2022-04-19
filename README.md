# Technical Challenge
This repository is the starting point of a full-stack developer technical challenge.  You'll need to have Node, NPM, and Docker installed on your machine.  If you need to install any of these, here are some helpful links:

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

## Introduction

This app was created as part of a technical review for Expression Networks.  This application allows a user to create a new contact, edit a contact, delete a contact and also view a list of contacts.  There is also a call list page that will list the contacts in alphabetical order by last name, first name and the home phone.  If no home number is available, then the contact is not listed.

## Backend
| Method | Endpoint                  | Access Control | Description                                |
| ------ | ------------------------- | -------------- | ------------------------------------------ |
| POST   | `/contact`                | all users      | Adds a new contact                         |
| GET    | `/contact`                | all users      | Get all contacts                           |
| GET    | `/contact/:id`            | all users      | Get a contact by ID                        |
| PATCH  | `/contact/:id`            | all users      | Update a contact                           |
| DELETE | `/contact/:id`            | all users      | Delete a contact                           |



## Screenshots

### Contacts Page
![Screenshot](./client/src/images/Screenshot1.jpg)

### Call List Page
![Screenshot](./client/src/images/Screenshot2.jpg)

### Edit Contact
![Screenshot](./client/src/images/Screenshot3.jpg)

### Delete Contact
![Screenshot](./client/src/images/Screenshot4.jpg)


