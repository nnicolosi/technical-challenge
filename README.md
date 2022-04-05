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

## What is this application?

This application allows the user to create, edit, and delete a contact. It also creates an alphabetically ordered list (by last name, then by first name) called a Call List. The Call List should only contain users that have Home phone numbers.

## How do I run this application?

To run this application, you'll need to have docker and node installed. If you need to install any of these, here are some helpful links:

- [Node and NPM](https://nodejs.org)
- [Docker Desktop](https://docs.docker.com/desktop)

Once these are installed, follow these three steps:

- Open your terminal and navigate to the /technical-challenge root folder and run `docker-compose up`
- Once the Database is up and running, open another terminal window and navigate to /technical-challenge/server and run the `npm install` and `npm start` commands
- Once the Nest.js server is up and running, open another terminal window and navigate to /technical-challenge/client and run the `npm install` and `npm start` commands
- This should automatically open up a broswer window where you can use the application

### Problems encountered while doing this challenge

- I was able to recycle quite a bit of code since the majority of the application was already set up as a template. The primary problem that I had was getting the contact's phone number from the database to use on the front-end. I know that the front-end was sending the data to the server because I set up a console test to confirm. So the issue has to be with sending the data from the server to the DB. I tried to debug it for hours (the better part of an entire day), but wasn't able to figure it out. I'd love to know what the hangup was.