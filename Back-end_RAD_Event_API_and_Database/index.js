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
  
  // create the MySQL query for creating table in MySQL from Node.js
  const sql = `CREATE TABLE IF NOT EXISTS EventsTable(
    EventID int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    Organizer varchar(255) NULL,
    Venue varchar(255) NULL,
    EventDate varchar(255) NULL
  )`;  
  
  db.query(sql, function(err, res) { 
    if (err) {   
      throw err   
    }

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