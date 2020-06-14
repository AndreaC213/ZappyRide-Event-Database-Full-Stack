const mysql = require('mysql');
const db = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT,
  database: 'radmysql'
});

exports.handler = (event, context, callback) => {  
  context.callbackWaitsForEmptyEventLoop = false;  
  
  // get the dynamic parameters from the routing input
  // passing the default value to 
  // prevent the error 'Internal server error' for
  // cannot destructure property 'undefind' or 'null'
  const Organizer = event.queryStringParameters.Organizer|| "Plug In America";
  const Venue = event.queryStringParameters.Venue|| "New York Auto Show";
  const EventDate = event.queryStringParameters.EventDate|| "June 1, 2020";
  
  const value = [`${Organizer}`, `${Venue}`, `${EventDate}`];
  
  // create the MySQL query for creating data in MySQL from Node.js
  const sql = `INSERT INTO EventsTable (Organizer, Venue, EventDate) VALUES (?, ?, ?)`;  
  
  db.query(sql, value, function(err, res) { 
    if (err) {   
      throw err   
    }
    
    // check the output is matching
    // the value we pass in, for 
    // inserting them into table (development purpose)
    console.log ('Create Organizer: ' + `${Organizer}` + ', Venue: ' + `${Venue}` + ', EventDate: ' + `${EventDate}`);
    
    // have to return the status code and the body with 'response' for 
    // configuring it with GatewayAPI
    const response = {
      statusCode: 200,
      body: JSON.stringify(res),
      headers: {'Content-Type': 'application/json'}
    }
    
    callback(null,response);
  }) 
}; 