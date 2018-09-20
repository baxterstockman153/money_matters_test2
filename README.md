# money_matters_test

## Installation:

After cloning the repository run the installation:

`cd money_matters/server && npm i && cd client && npm i`

## dev.js

After installation, copy `prod.js` in `server/config` and name it `dev.js`.

Then fill in all variables:

`googleClientID: [your GOOGLE_CLIENT_ID from your google API account],`

`googleClientSecret: [your GOOGLE_CLIENT_SECRET from your google API account],`

`mongoURI: [ your MONGO_URI, i.e. mongodb://<user>:<password>@<database>.mlab.com:<portnr>],`

`cookieKey: process.env.COOKIE_KEY`
