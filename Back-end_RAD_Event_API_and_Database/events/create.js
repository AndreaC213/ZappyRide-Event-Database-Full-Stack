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
  const body = JSON.parse(event.body)
  const organizer = body.organizer;
  const venue = body.venue;
  const eventdate = body.eventdate;
  
  const value = [organizer, venue, eventdate];
  
  // create the MySQL query for creating data in MySQL from Node.js
  const sql = `INSERT INTO EventsTable (organizer, venue, eventdate) VALUES (?, ?, ?)`;  
  
  db.query(sql, value, function(err, res) { 
    if (err) {   
      throw err   
    }
    
    // have to return the status code and the body with 'response' for 
    // configuring it with GatewayAPI
    const response = {
      insertId: JSON.stringify(res.insertId),
      organizer: body.organizer,
      venue: body.venue,
      eventdate: body.eventdate,
      headers: {'Content-Type': 'application/json'}
    }
      callback(null,{
        statusCode: 200,
        headers: {
          'Access-Control-Expose-Headers': 'Access-Control-Allow-Origin',
          'Access-Control-Allow-Credentials': true,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': "OPTIONS,POST,GET"
        },
        body: JSON.stringify(response)
    });
  }) 
}; 