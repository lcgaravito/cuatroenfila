# Cuatro en fila
Web application "Cuatro en fila", it is a MERN application (MongoDB, Express, React, NodeJS) that allows you to play the famous game of "Connect Four" in pairs and online.
<hr>

![Menu](https://raw.githubusercontent.com/lcgaravito/cuatroenfila/master/screenshot.png)

![Top10](https://raw.githubusercontent.com/lcgaravito/cuatroenfila/master/screenshot2.png)

![GameGrid](https://raw.githubusercontent.com/lcgaravito/cuatroenfila/master/screenshot3.png)

## Running the App

Prerequisites For running the app:

First, you need to install Node.js, to see more information <a href="https://www.mongodb.com/download-center/community">Click here</a>.

Second, its necesary the instalation of yarn <a href="https://classic.yarnpkg.com/en/docs/install/#windows-stable">Click here</a> for information.

```
$ yarn add mongodb
$ mongod
```

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

<a href="https://cuatroenfila.herokuapp.com/" target="_blank">Cuatro en fila App</a>

<hr>

## API used

<a href="http://kevinalbs.com/connect4/back-end/info.html" target="_blank">Connect Four API</a>
An AI player for Connect Four using the minimax algorithm made by Kevin Albertson, software engineer from Hamilton, NJ.

<hr>

## Authors
Luis Carlos Garavito Romero, Kelvin Santiago Estupiñan Garavito.

<hr>

<h2>Licence</h2>
<p>The MIT License (MIT)</p>
<p>Copyright (c) 2020 Luis Carlos Garavito Romero, Kelvin Santiago Estupiñan Garavito</p>
<p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
<p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
<p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>

