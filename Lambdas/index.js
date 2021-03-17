var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "db-p1.cqlefmcws6vc.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "Xq>qv=4jS+zS7#ML",
    database: "dbp1",
});

console.log(connection);

exports.handler = (event, context, callback) => {
    connection.query('show tables', function (error, results, fields) {
        if (error) {
            connection.destroy();
            throw error;
        } else {
            // connected!
            console.log(results);
            callback(error, results);
            connection.end(function (err) { callback(err, results);});
        }
    });
};