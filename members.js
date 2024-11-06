const express = require("express");
const router = express.Router();
const db = require("../database.js");

router.post("/members", async (req, res) => {
  try {
    const members = await db("members").insert(req.body);
    return res.json(members);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});
router.get("/question1", async (req, res) => {
  try {
    const members = await db("facility").select("name", "membercost");
    console.table(members);
    return res.json(members);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});
router.get("/question2", async (req, res) => {
  try {
    const members = await db("facility")
      .select("id", "name", "membercost", "monthlymaintenance")
      .whereRaw("membercost<monthlymaintenance/50");
    console.table(members);
    return res.json(members);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});
router.get("/question3", async (req, res) => {
  try {
    const members = await db("facility")
      .select("id", "name")
      .where("name", "like", "%ennis%");
    console.table(members);
    return res.json(members);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});
router.get("/question4", async (req, res) => {
  try {
    const members = await db("facility")
      .select("id", "name")
      .where("id", "in", [2, 5]);
    console.table(members);
    return res.json(members);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});
router.get("/question5", async (req, res) => {
  try {
    const members = await db("facility").select([
      "monthlymaintenance",
      "name",
      db.raw(
        `case when monthlymaintenance>100 then 'expensive' else 'cheap' end`
      ),
    ]);
    console.table(members);
    console.log("─".repeat(1400));
    return res.json(members);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.get("/question6", async (req, res) => {
  try {
    const members = await db("members")
      .select("surname", "firstname", "joindate", "id")
      .where("joindate", ">", "2012-11-06 ");
    console.table(members);
    return res.json(members);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.get("/question7", async (req, res) => {
  try {
    const members = await db("members")
      .select("surname")
      .distinct()
      .limit(10)
      .orderBy("surname", "asc");
    console.table(members);
    return res.json(members);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.get("/question8", async (req, res) => {
  try {
    const members = await db("members")
      .select("surname as surname")
      .union(db("facility").select("name as name"));
    console.table(members);
    return res.json(members);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.get("/question9", async (req, res) => {
  try {
    const members = await db("members")
      .select("*")
      .orderBy("joindate", "desc")
      .first();
    console.table(members);
    return res.json(members);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.get("/question10", async (req, res) => {
  try {
    const members = await db("members")
      .select("firstname", "surname")
      .orderBy("joindate", "desc")
      .first();
    console.table(members);
    return res.json(members);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
//q1...You want to print out a list of all
// of the facilities and their cost to members.
//  How would you retrieve a list of only facility names and costs?
/*questions.............How can you produce a list of facilities that charge a fee to members,
 and that fee is less than 1/50th of the monthly maintenance cost? Return the facid,
  facility name, member cost, and monthly maintenance of the facilities in question.
How can you produce a list of all facilities with the word 'Tennis' in their name?
How can you retrieve the details of facilities with ID 1 and 5? Try to do it without using the OR operator.
How can you produce a list of facilities, with each labelled as 'cheap' or 'expensive' depending
 on if their monthly maintenance cost is more than $100? Return the name and monthly 
 maintenance of the facilities in question.
How can you produce a list of members who joined after the start of September 2012? Return
 the memid, surname, firstname, and joindate of the members in question
How can you produce an ordered list of the first 10 surnames in the members 
   table? The list must not contain duplicates.
You, for some reason, want a combined list of all surnames and all facility names.
 Yes, this is a contrived example :-). Produce that list!
You'd like to get the signup date of your last member. How can you retrieve this information?
You'd like to get the first and last name of the last member(s) 
who signed up - not just the date. How can you do that?
*/
