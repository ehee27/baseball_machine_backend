1. We wanted to get a server up and running to test with a simple frontend
   a. npm i express dotenv bcrypt cookie-parser jsonwebtoken mongoose
   b. DevDep = npm i nodemon
   c. updated package.json script to look for server.js on 'npm start'

2. wanted to setup a backend splashpage for the server
   _\*\* root route them 'views'
   a. first 'use' the public folder to grab css
   b. set the required root route to start routing - we'll configure index.html as the root
   c. write the 'catch all' (_) block to catch 404
   d. set routes dir and 'root.js'
   e. root.js sends index.html from 'views

3. create the 'views' directory and main 2 views
   a. index.html - link the css - add a simple message
   b. 404.html to send the error

4. MongoDB setup and configuration with APP

5. Created a User model/controller and Player model/controller and set them in routes dir.
   a. basic controller logic - GET all, create (POST), update(UPDATE), delete(DELETE)
