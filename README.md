# term-project-pokerstars

## Pokerstar
Render: https://pokerstars.onrender.com/

## Set Up

To run this server, run the following commands:
Make sure you have everything downloaded
```
$ cd pokerstar
$ npm install
```
**Create Your Own Database:**
```
$ created DATABASE_NAME
```
**Please edit the following command with your own information**
*Example: DATABASE_URL="postgres://pokerstar:pass@localhost:5432/pokerstar *
```
$ echo DATABASE_URL="postgres://YourUsername:YourPassword@YourHostname:5432/YourDatabaseName"
```
**Next is to run a migration to apply the migrations into your database**
```
$ npm run db:migrate
```
**Now you can start the server!**

```
$ npm run start
```

### Features
* Create an Account 
* Login to an Account
* Create Game
* Join Game
* Chat

### Technologies Stack

* Express
* Node.js
* Postgresql
* pg_promise
* pug
* handle bar
* sequelize
* diganostics_channel
* bcrypt
* bootstrap
* socket.io
* timeago
