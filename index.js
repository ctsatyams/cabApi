//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
// Setting Base directory
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
 var server = app.listen(8000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

//Initiallising connection string
   var dbConfig = {
        user: 'sa',
        password: 'password_123',
        server: 'localhost',
        database: 'cabbooking',
        dialect: "mssql",
        options: {
            truestedConnection: true,
            encrypt: true // Use this if you're on Windows Azure
        },
        dialectOptions: {
            instanceName: "SQLEXPRESS"
        }
    };

//Function to connect to database and execute query
var  executeQuery = function(res, query){	
	sql.connect(dbConfig, function (err) {
		if (err) {   
			console.log("Error while connecting database :- " + err);
             sql.close()
			//res.send(err);
		}
		else {
			// create Request object
			var request = new sql.Request();
			// query to the database
			request.query(query, function (err, res) {
				if (err) {
					console.log("Error while querying database :- " + err);
					//res.send(err);
                     sql.close()
				}
				else {
                    //console.log(res)
                   
					res.send(res);
                      sql.close()
				}
			});
		}
	});	
}

app.get("/api/user", function(req , res){
	var query = "SELECT CABTIME,tc.ID,(TC.Seat-(isnull(COUNT(CABID),0))) seat ,tc.FROMSTATION,tc.TOSTATION FROM tblCabs TC left outer JOIN TBLBOOKING TB ON Tc.id=Tb.CabId	WHERE (tc.FROMSTATION='TX' and tc.TOSTATION='MS') or ( CONVERT(date, Date)=  CONVERT(date, getdate()) and tb.IsCancel=0) GROUP BY CABID,Seat,CABTIME,tc.ID,tc.TOSTATION,tc.FROMSTATION";
	executeQuery (res, query);
});

//POST API
 app.post("/api/user", function(req , res){
     console.log(req.body.Name)
	var query = "INSERT INTO tblBooking([RefNumber], [TravellerName], [CabId],[Date])  	VALUES (1, "+req.body.Name +","+ req.body.Cabid + ", GETDATE())" ;
	executeQuery (res, query);
});

//PUT API
 app.put("/api/user/:id", function(req , res){
	var query = "UPDATE [user] SET Name= " + req.body.Name  +  " , Email=  " + req.body.Email + "  WHERE Id= " + req.params.id;
	executeQuery (res, query);
});

// DELETE API
 app.delete("/api/user/:id", function(req , res){
	var query = "DELETE FROM [user] WHERE Id=" + req.params.id;
	executeQuery (res, query);
});
