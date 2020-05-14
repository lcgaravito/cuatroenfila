# Cuatro en fila
Web application that allows you to play the famous game of "Connect Four" in pairs and online.
<hr>

![Menu](https://raw.githubusercontent.com/lcgaravito/cuatroenfila/master/screenshot.png)

![Top10](https://raw.githubusercontent.com/lcgaravito/cuatroenfila/master/screenshot2.png)

![GameGrid](https://raw.githubusercontent.com/lcgaravito/cuatroenfila/master/screenshot3.png)

## Running the App
The application is divided into two parts:

Backend: Main folder

```
$ yarn install
$ yarn start
```

Frontend: 

```
$ cd front
$ yarn install
$ yarn start
```

You also need to run a mongodb database. If you want a cloud database you have to add the environment variable ```MONGODB_URI=mongodb://link-to-database.../``` in the ```.env ``` file or in the heroku's settings.

<hr>

## Link to the deployed application

<a href="https://cuatroenfila.herokuapp.com/" target="_blank">Cuantro en fila App</a>

<hr>

## API used

<a href="http://kevinalbs.com/connect4/back-end/info.html" target="_blank">Connect Four API</a>
An AI player for Connect Four using the minimax algorithm made by Kevin Albertson, software enguneer from Hamilton, NJ.

<hr>

