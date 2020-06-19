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
  const id = Number(event.pathParameters.id);
  console.log(id)
  
  // create the MySQL query for getting data in MySQL from Node.js
  const sql = "SELECT * FROM EventsTable WHERE id =" + id; 
  
  db.query(sql, function (err, res) {   
    if (err) throw err;
    
    // check the output id is matching 
    // the id we pass in (development purpose)
    console.log(event);
    
    callback(null,{
      statusCode: 200,
      body: JSON.stringify({response: res})
    });
  });
}; 