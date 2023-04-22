require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../configs/db");

// const temporaryData =[
//     {
//         "name":"div",
//         "email":"dj2",
//         "password":"123"
//     },
//     {
//         "name":"kunal",
//         "email":"@12",
//         "password":"123"
//     },
//     {
//         "name":"piggy",
//         "email":"pig@45",
//         "password":"123"
//     } ,
//     {
//         "name":"ivy",
//         "email":"@14",
//         "password":"123"
//     }  ,
// ];

exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  //NOTE: check if the user already exists
  // const isValid = temporaryData.findIndex((ele) => (ele.email === email));

  client
    .query(`SELECT * FROM users WHERE email= '${email}';`)

    .then((data) => {
      //   console.log(data);
      isValid = data.rows;

      if (isValid.length != 0) {
        res.status(400).json({
          error: "user already exists",
        });
      } else {
        //NOTE: hash passwords
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: "internal server error",
            });
          }
          const user = {
            name,
            email,
            password: hash,
          };

          client
            .query(
              `INSERT INTO users (name,email,password) VALUES( '${user.name}' , '${user.email}' , '${user.password}')`
            )
            .then((data) => {
              //NOTE: generate token
              const token = jwt.sign(
                {
                  email: email,
                },
                process.env.SECRET_KEY
              );
              res.status(200).json({
                message: "user added successfully",
                token: token,
              });
            })
            .catch((err) => {
              res.status(500).json({
                error: "database error occured",
              });
            });
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  //NOTE: check if the user already exists
  // const isValid = temporaryData.findIndex((ele) => (ele.email === email));

  client
    .query(`SELECT * FROM users WHERE email= '${email}';`)
    .then((data) => {
      console.log("hi inside");
      //   console.log(data);
      userData = data.rows;
      //[]array
      if (userData.length === 0) {
        res.status(400).json({
          error: "user doesnt exists, signup instead",
        });
      } else {
        //NOTE: compare hash passwords
        bcrypt
          .compare(password, userData[0].password, (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).json({
                error: "server error",
              });
            } else if (result === true) {
              const token = jwt.sign(
                {
                  email: email,
                },
                process.env.SECRET_KEY
              );
              res.status(200).json({
                message: "user added successfully",
                token: token,
              });
            } else {
              res.status(400).json({
                error: "unauthorized,wrong password",
              });
            }
          })
          .catch((err) => {
            res.status(500).json({
              error: "database error occured",
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
