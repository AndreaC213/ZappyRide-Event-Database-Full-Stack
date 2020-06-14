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
  
  // create the MySQL query for read all data in MySQL from Node.js
  const sql = "SELECT * FROM EventsTable "; 
  
  // have to return the status code and the body with 'response' for 
  // configuring it with GatewayAPI
  db.query(sql, function (err, res) {   
    if (err) throw err;     
    callback(null,{
      statusCode: 200,
      body: JSON.stringify({response: res})
    });
  });
}; 