# Backend test - Url Shortner

We'd like you to create a URL shortening service, using an sqlite database.

There should be an input field and submit button on the page into which the URL you would like to shorten can be entered.
A short url should be returned upon submitting the form.

When visiting the short url it should redirect you to the previously entered url.

On the home page of the url shortner it would be great to see some sort of statistic, what statistic this is and how you display this is up to you.

You can use whatever PHP framework you are comfortable with. 

We are not concerned about how the frontend looks as long as the functionality is in place.

Please don't spend more than a few hours on this.

From a functionality side, the 3 points we will be looking at are:

1. Can we post a url in a form and does it return a shortened url
2. Does the shortned url redirect to the posted url
3. Does the statistic update when I do a relevant action

## Submission

Please clone this repository, write your code and update this README with a guide of how to run it.

Either send us a link to the repository on somewhere like github or bitbucket (bitbucket has free private repositories).


## Guide
A simple solution using React for the frontend and Lumen for the API.

Below you can find a quick guide on how to start both.

#### Client side 

Start the frontend by following these steps:
1. Install the dependencies: `yarn install` or `npm install` 
2. Start the server: `npm start`
3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### Server side

The backend is built on Lumen, a simplified version of Laravel. 

Start the backend by following these steps:
1. Install the dependencies: `composer install`
2. Make a copy of `.env.example` to `.env`
3. Start the server: `php -S localhost:8000 -t public`
4. Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

Some things to keep in mind:
- The whole logic is in one file `/server/routes/web.php`
- The database schema is in `/server/database/migrations/`


