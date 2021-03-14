const db = require("../dbConnect");

// get all user
const getUsers = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const query = await db.query("SELECT * FROM users");
  await db.end();
  if (query.length > 0) {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(query),
    });
  } else {
    callback("no users found", null);
  }
};

// get single user
const getUser = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const userid = event.query.userid;
  console.log(`userid is ${userid}`);
  const query = await db.query(`SELECT * FROM users WHERE id = ${userid}`);
  console.log(query);
  await db.end();
  if (query.length > 0) {
    console.log(`data found and length is ${query.length}`);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(query),
    });
  }
  if (query.length === 0) {
    console.log(`no data found and length is ${query.length}`);
    callback(`no user found on this userid: ${userid}`, null);
  }
};

const addUser = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const firstName = event.query.firstname;
  const lastName = event.query.lastname;
  const email = event.query.email;
  console.log(`${firstName}, ${lastName}, ${email}`);
  const query = await db.query(
    `INSERT INTO users (first_name, last_name, email, register_date) values ( ${firstName}, ${lastName}, ${email}, now() );`
  );
  await db.end();
  console.log(query);
  callback(null, {
    statusCode: 200,
    body: "user created successfully",
  });
};

const updateUser = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const userid = event.query.userid;
  const lastName = event.query.last_name;
  const email = event.query.email;
  const query = await db.query(
    `UPDATE users SET last_name = ${lastName}, email = ${email} WHERE id = ${userid};`
  );
  console.log(query);
  await db.end();
  if (query.affectedRows > 0) {
    callback(null, {
      statusCode: 200,
      body: "user updated successfully",
    });
  } else {
    callback(null, {
      statusCode: 404,
      body: "user not found",
    });
  }
  console.log(`userid is ${userid}`);
};

const deleteUser = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const userid = event.query.userid;
  const query = await db.query(`DELETE FROM users WHERE id = ${userid};`);
  console.log(query);
  await db.end();
  if (query.affectedRows > 0) {
    callback(null, {
      statusCode: 200,
      body: "user deleted successfully",
    });
  } else {
    callback(null, {
      statusCode: 404,
      body: "user not found",
    });
  }
  console.log(`userid is ${userid}`);
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
};
