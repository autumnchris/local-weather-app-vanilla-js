# Local Weather App (vanilla JS)

A front-end web app that uses HTML5 Geolocation and the OpenWeatherMap API to get the user's current weather and forecast. Built with vanilla JS.

Inspired by the [Weather App assignment](https://www.theodinproject.com/lessons/node-path-javascript-weather-app) as part of the curriculum for the [JavaScript course](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript) on [The Odin Project](https://www.theodinproject.com) as well as the [Show the Local Weather challenge](https://learn.freecodecamp.org/coding-interview-prep/take-home-projects/show-the-local-weather) as part of the curriculum for the [Coding Interview Prep](https://www.freecodecamp.org/learn/coding-interview-prep) on [freeCodeCamp](https://www.freecodecamp.org).

---

## Built With
* JavaScript
* [Sass](http://sass-lang.com)
* HTML5
* Geolocation API
* [OpenWeatherMap API](https://openweathermap.org)
* [GeoDB Cities API](https://rapidapi.com/wirefreethought/api/geodb-cities)
* AJAX
* [Axios](https://axios-http.com)
* [Webpack](https://webpack.js.org)
* [Moment.js](https://momentjs.com)
* [Weather Icons](https://erikflowers.github.io/weather-icons)
* LocalStorage
* [dotenv-webpack](https://github.com/mrsteele/dotenv-webpack)
* [Babel](https://babeljs.io)
* [Normalize.css](https://necolas.github.io/normalize.css)
* [Font Awesome](https://fontawesome.com)
* [Material Icons](https://fonts.google.com/icons)
* [Google Fonts](https://fonts.google.com)

## Demo

View project demo at [https://autumnchris.github.io/local-weather-app-vanilla-js](https://autumnchris.github.io/local-weather-app-vanilla-js).

## Instructions

After forking and cloning, navigate to the repository in your command line and install the NPM packages:
```
npm install
```

Create an API key on [OpenWeatherMap](https://openweathermap.org) and create a `.env` file in the root of the repository and add the following variables:
```
API_KEY=<your-openweathermap-api-key>
```

Run the following script in your command line to run the application:
```
npm start
```

Once the server is running, go to `http://localhost:8080` in your browser.

Before committing any changes, run the following script to update your static files for production:
```
npm run build
```
