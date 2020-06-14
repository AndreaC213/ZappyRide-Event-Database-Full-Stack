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
  const id = event.queryStringParameters.EventID || 1;
  
  // create the MySQL query for getting data in MySQL from Node.js
  const sql = `SELECT * FROM EventsTable WHERE EventID = ${id}`; 
  
  db.query(sql, function (err, res) {   
    if (err) throw err;
    
    // check the output id is matching 
    // the id we pass in (development purpose)
    console.log('Event Id:' + `${id}`);
    
    callback(null,{
      statusCode: 200,
      body: JSON.stringify({response: res})
    });
  });
}; 