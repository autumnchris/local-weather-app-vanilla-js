# Local Weather App (vanilla JS)

My project for the [Show the Local Weather challenge](https://learn.freecodecamp.org/coding-interview-prep/take-home-projects/show-the-local-weather) as part of the curriculum for the Coding Interview Take Home Projects on [freeCodeCamp](https://www.freecodecamp.org). Built with vanilla JS.

---

## Built With
* JavaScript
* [Sass](http://sass-lang.com)
* HTML5
* Geolocation
* [OpenWeatherMap API](https://openweathermap.org)
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
