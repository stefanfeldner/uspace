# uspace - your source of updates, information, and memories!

Full Stack Web Application by Stefan Feldner

Imagine a place where everyone can share news on what's going on in their lives, notes on the latest class, or, if you're a company, share the progress, on a new product or service.

uspace is here to help with that by letting you create your **own unique spaces** where you can share all those pieces of information quickly and easily.

It allows users to either login or create a new account using **auth0** for authentication.

![Homepage](https://github.com/stefanfeldner/uspace/blob/3e5b486ab0477d4176b442ccdaedfecef4cd9b1e/client/src/assets/img/home.png)

After logging in, you arrive at the **spaces** page, showing you all the spaces you created and all the spaces other users created. You can filter these spaces using the input form on top, to help you find the space you're looking for, it helps you with autocompletion.

![Homepage](https://github.com/stefanfeldner/uspace/blob/3e5b486ab0477d4176b442ccdaedfecef4cd9b1e/client/src/assets/img/spaces.png)

Once you have found the space you want to visit, click on it, and you'll see all the posts that the owner created. These posts are sorted by creation date and will always show you the newest post up top. If you are the owner of the space, you can create new posts and delete existing ones. Posts can have tags, and you can filter the posts based on multiple tags up here. If you want, you can also leave some comments on the posts.

![Homepage](https://github.com/stefanfeldner/uspace/blob/3e5b486ab0477d4176b442ccdaedfecef4cd9b1e/client/src/assets/img/posts.png)

## Used Tech Stack

### Frontend

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)

### Backend

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

In server folder:

```
$ npx prisma migrate dev --name init
$ npx prisma generate
```
In your DB, navigate to your Role table:

1. Add a row with id 1 and name viewer
2. Add a row with id 2 and name creator

Prisma will set up the storage for you!

## Local Usage

To start up the frontend, change directory into the client folder and run:

```
npm start
```

For the backend, to start the server, run:

```
npm start --> starts the node express server
npx prisma studio --> open prisma database tool
```

## Environmental Variables

Backend (.env in server folder):

```
# Server port
PORT=3001

# Prisma db connection
DATABASE_URL=postgresql://janedoe:mypassword@localhost:5432/mydb?schema=sample
```

Frontend (.env in client folder):

```
# Auth0 configuration
REACT_APP_AUTH0_DOMAIN=########################
REACT_APP_AUTH0_CLIENT_ID=########################

# Local API URL
REACT_APP_API=http://localhost:3001

# Firebase
REACT_APP_API_FIREBASE_API_KEY=########################
REACT_APP_API_FIREBASE_AUTH_DOMAIN=########################
REACT_APP_API_FIREBASE_PROJECT_ID=########################
REACT_APP_API_FIREBASE_STORAGE_BUCKET=########################
REACT_APP_API_FIREBASE_MESSAGING_SENDER_ID=########################
REACT_APP_API_FIREBASE_APP_ID=394710398936=########################
REACT_APP_API_FIREBASE_MEASUREMENT_ID=########################
```
