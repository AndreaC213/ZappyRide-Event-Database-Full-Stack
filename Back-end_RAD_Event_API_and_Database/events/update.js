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
  // pathParameters for id
  // queryStringParameters for request body
  const id = event.pathParameters.id;
  
  const body = JSON.parse(event.body)
  
  const organizer = body.organizer;
  const venue = body.venue;
  const eventdate = body.eventdate;
  console.log 

  // create the MySQL query for updating data in MySQL from Node.js

  const sql = `UPDATE EventsTable SET organizer= ?, venue= ?, eventdate= ? WHERE id = ?`; 

  db.query(sql, [organizer, venue, eventdate, id], function (err, res) {   
    if (err) throw err; 
    
    // check the output is matching 
    // the id we pass in, for  
    // updating it with the new values (development purpose)
    console.log(res)
    const response = {
      id : id,
      organizer : body.organizer,
      venue : body.venue,
      eventdate: body.eventdate
    };
    // response 'id' = Number(event.pathParameters.id);
    // response['organizer'] = event.organizer;
    // response['venue'] = event.venue;
    // response['eventdate'] = event.eventdate;
    
    // have to return the status code and the body with 'response' for 
    // configuring it with GatewayAPI
    callback(null,{
      statusCode: 200,
      body: JSON.stringify(response)
    });
  });
}; 