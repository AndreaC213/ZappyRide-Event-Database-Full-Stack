const mysql = require('mysql');

// connect Lambda with AWS RDS MySQL
const db = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT,
  database:'radmysql'
});


exports.handler = (event, context, callback) => {
  
  context.callbackWaitsForEmptyEventLoop = false; 
  
  // get the dynamic parameters from the routing input
  // passing the default value to 
  // prevent the error 'Internal server error' for
  // cannot destructure property 'undefind' or 'null'
  const id = event.queryStringParameters.EventID || 1;
  const Organizer = event.queryStringParameters.Organizer|| "Plug In America";
  const Venue = event.queryStringParameters.Venue|| "New York Auto Show";
  const EventDate = event.queryStringParameters.EventDate|| "June 1, 2020";

  // create the MySQL query for updating data in MySQL from Node.js
  const sql = `UPDATE EventsTable SET Organizer= ?, Venue= ?, EventDate= ? WHERE EventID = ?`; 
  
  db.query(sql, [`${Organizer}`, `${Venue}`, `${EventDate}`, `${id}`], function (err, result) {   
    if (err) throw err; 
    
    // check the output is matching 
    // the id we pass in, for  
    // updating it with the new values (development purpose)
    console.log('Update EventID : ' + `${id}` + ', Organizer : ' + `${Organizer}` + ', Venue : ' + `${Venue}` + ', EventDate : ' + `${EventDate}`);
    
    // have to return the status code and the body with 'response' for 
    // configuring it with GatewayAPI
    callback(null,{
      statusCode: 200,
      body: JSON.stringify({response: result})
    });
  });
}; 