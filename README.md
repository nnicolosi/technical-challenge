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

## About

Welcome to the full-stack technical challenge by [Expression Networks](https://expr.net/). This project uses the following tech-stack:

- Frontend UI: React, Javascript
- Backend API: Nest, Node, Typescript
- Database: Postgres

## Local development

[Docker](https://docs.docker.com/desktop) and [Nodejs](https://nodejs.org) are required for this project. Once both are installed on your machine you can follow these steps to get the application up-and-running:

1. Start the Postgres database with the `docker-compose up` command in the root of the project. This will spin up a dockerized container that will host the database.
2. Start the backend API with the `npm install && npm start` command in the `/server` directory.
3. Start the React UI with the `npm install && npm start` command in the `/client` directory.

## Application Features

The application consists of 3 pages:

### `/`

A landing page which displays some of the expected behavior in the application. All of the expected behavior has been implemented. 

### `/contacts`

Allows a user to create a new contact. A contact includes a first name, last name, email (optional), and phone numbers. There are three types of phone numbers: Home, Work, and Mobile. A contact may have multiple phone numbers. When a new contact is created it will be added to the table on this page. You may edit a contact by clicking on it's row in the table. A modal will appear that includes all existing information for that contact. You may also delete the contact by clicking the "Delete" button in the modal. The rows are sorted by ascending ID.

### `/call-list`

Displays a table of all contacts that include a "Home" phone number - contacts that do not have a "Home" phone number will not be shown. Each row represents a contact, and the contact's last name, first name, and "Home" phone number are included. The table is sorted by ascending last name and then ascending first name. 

## Issues

### Email validation

- When CREATING a contact the email address (if not empty) is validated twice: first in the UI before making the API call and second by a [validator](https://www.npmjs.com/package/validator) library in the backend. There are cases where the first validation will pass and the second will fail. 
- An error handler has been implemented for this condition when CREATING a contact, but the second validation isn't used when UPDATING a contact. This allows the user to change an email to something that wouldn't have been possible during the create stage.
  