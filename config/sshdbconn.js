var mysql = require('mysql2');
var Client = require('ssh2').Client;
var ssh = new Client();

var db = new Promise(function (resolve, reject) {
    ssh.on('ready', function () {
        ssh.forwardOut(
            // source address, this can usually be any valid address
            '127.0.0.1',
            // source port, this can be any valid port number
            12345,
            // destination address (localhost here refers to the SSH server)
            '127.0.0.1',
            // destination port
            3306,
            function (err, stream) {
                if (err) throw err; // SSH error: can also send error in promise ex. reject(err)
                // use `sql` connection as usual
                conn = mysql.createConnection({
                    host: '127.0.0.1',
                    user: 'odk_user',
                    password: 'admin@123',
                    database: 'odk_prod',
                    stream: stream
                });

                // send connection back in variable depending on success or not
                conn.connect(function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(conn);
                    }
                });
            });
    }).connect({
        host: 'newodkubuntu.centralindia.cloudapp.azure.com',
        port: 22,
        username: 'odkuser',
        password: 'Wildlife@123'
    });
});

db.close = function(conn){
    if ('end' in ssh) {
        ssh.end(function (err){});
    } if('end' in conn){
        conn.end();
    }
}



module.exports = db;