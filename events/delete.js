const mysql = require('mysql');
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
  const id = event.queryStringParameters.emp_id || 1;

  // create the MySQL query for deleting data in MySQL from Node.js
  const sql = `DELETE FROM EventsTable WHERE EventID = ${id}`; 
  
  db.query(sql, function (err, res) {   
    if (err) throw err;     
    
    // check the output rows is matching 
    // the roles we delete (development purpose)
    console.log('Deleted Row(s):' + res.affectedRows);
    
    // have to return the status code and the body with 'response' for 
    // configuring it with GatewayAPI
    callback(null,{
      statusCode: 200,
      body: JSON.stringify({response: res})
    });
  });
}; 