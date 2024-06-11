const express = require("express");
const bodyParser= require("body-parser");
const cors = require("cors")

const port_numb = 3000;

//>> Create out express app <<
const app = express();

//>> Using CORS for Angular frontend <<
app.use(cors());

//>> Middleware <<
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//>> Default route setting <<
app.get('/', (req, res) => {
    res.json({"message": "Building REST-API endpoint with Node.js & Expresss in Angular"});
});

//>> Activate all possible routes for all REST endpoints and their CRUD operations <<
const productAPIEndPointRoutes = require('./Routes/productRoute.js');
app.use('/product', productAPIEndPointRoutes);

//>> Find 404 and hand over to error handler <<
app.get('*', function(req, res){
    res.send('This is NOT a valid HTTP URL for API RESTful communication!', 404);
  });

//start server
app.listen(port_numb, ()=>{
    console.log("server listening at port: " + port_numb);
}) 