const fetchMySQL = async (id) => {
  // get the client
  const mysql = require('mysql2/promise');
  // create the connection
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "MyVideos119",
    socketPath: '/var/run/mysqld/mysqld.sock'
  });

  // query database
  const [rows, fields] = await connection.execute('SELECT c00 FROM `movie` WHERE idMovie = ?', [id]);
  await connection.end();
  return rows;
}

fetchMySQL(33).then((data) => console.log(data));