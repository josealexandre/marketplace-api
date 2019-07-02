# Module 3

Marketplace app developed from 3rd Node.js module classes.

## Frameworks and packages

Here are some frameworks and packages used in this project:

Server

-   Express
-   JWT (JSON Web Token)

Database

-   mongoose
-   MongoDB (docker container)

Other

-   bcryptjs (encrypt passwords)
-   require-dir (import all controllers with one line of code)
-   nodemailer (module to help sending email)
-   Mailtrap (online service to help testing email sending)
-   handlebars (template engine used in this project to create template for emails)
-   Kue (module for job queue like send emails)
-   Redis (used to store the queue)
-   Joi (schema validator to the requests)
-   express-validation (middleware that uses Joi to validate requests)
-   Youch (error formatter for development)
-   express-async-handler (to throw exceptions ocurring in async controllers to the exception handler)

Development

-   Nodemon
-   ESLint

Running mongo in a container

`docker run --name mongonode -p 27017:27017 -d -t mongo`

Running redis in a container

`docker run --name redisnode -p 6379:6379 -d -t redis:alpine`
