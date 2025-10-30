const express = require('express');
const router = express.Router();


let users = [
  {
    firstName: "John",
    lastName: "wick",
    email: "johnwick@gamil.com",
    DOB: "22-01-1990",
  },
  {
    firstName: "John",
    lastName: "smith",
    email: "johnsmith@gamil.com",
    DOB: "21-07-1983",
  },
  {
    firstName: "Joyal",
    lastName: "white",
    email: "joyalwhite@gamil.com",
    DOB: "21-03-1989",
  },
];

// GET request: Retrieve all users
router.get("/", (req, res) => {
  // Copy the code here
  res.send(JSON.stringify({ users }, null, 4));
});

// GET by specific ID request: Retrieve a single user with email ID
router.get('/:email', (req, res) => {
  const mail = req.params.email;
  const found = users.filter((user) => user.email === mail);
  res.send(found)
});

router.get("/lastName/:lastName", (req, res) => {
  // Extract the lastName parameter from the request URL
  const lastName = req.params.lastName;
  // Filter the users array to find users whose lastName matches the extracted lastName parameter
  let filtered_lastname = users.filter((user) => user.lastName === lastName);
  // Send the filtered_lastname array as the response to the client
  res.send(filtered_lastname);
});
// Function to convert a date string in the format "dd-mm-yyyy" to a Date object
function getDateFromString(strDate) {
  let [dd, mm, yyyy] = strDate.split('-');
  return new Date(yyyy + "/" + mm + "/" + dd);
}

// Define a route handler for GET requests to the "/sort" endpoint
router.get("/sort", (req, res) => {
  // Sort the users array by DOB in ascending order
  let sorted_users = users.sort(function (a, b) {
    let d1 = getDateFromString(a.DOB);
    let d2 = getDateFromString(b.DOB);
    return d1 - d2;
  });
  // Send the sorted_users array as the response to the client
  res.send(sorted_users);
});

// POST request: Create a new user
router.post("/", (req, res) => {

  users.push({
    "firstName": req.query.firstName
    , "lastName": req.query.lastName
    , "email": req.query.email
    , "DOB": req.query.DOB
  });
  res.send("you have added " + req.query.firstName + " successivelly")//This line is to be replaced with actual return value
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  const mail = req.params.email;
  const found = users.filter(user => user.email === mail);
  if (found.length > 0) {
    const firstUser = found[0];
    if (req.query.firstName) firstUser.firstName = req.query.firstName;
    if (req.query.lastName) firstUser.lastName = req.query.lastName;
    if (req.query.email) firstUser.email = req.query.email;
    if (req.query.DOB) firstUser.DOB = req.query.DOB;
    users = users.filter((user) => user.email != mail);
    users.push(firstUser);
    res.send(`User with email ${mail} has been updated to: ${JSON.stringify(firstUser)}`);
  } else res.send("no user found")
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  const mail = req.params.email;
  users = users.filter((user) => user.email != mail);
  res.send("the user with email " + mail + " has been deleted")//This line is to be replaced with actual return value
});

module.exports = router;
