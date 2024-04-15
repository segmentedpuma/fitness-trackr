const client = require("./client.js");

const createActivities = async (name, description) => {
  try {
    const { rows: [createdActivity] } = await client.query(`
      INSERT INTO activities (name, description)
      VALUES ('${name}', '${description}')
      RETURNING *;
    `);
    console.log('inserted');
    console.log(createdActivity);
    return createdActivity;
  } catch (error) {
    console.log(error);
  }
}

const getAllActivities = async () => {
  try {
     const {rows: allActivites} = await client.query(`
      SELECT * FROM activities;
    `)
    return allActivites;
  }
  catch (error) {
    console.log(error);
  }
}

const getOneActivity = async (id) => {
  try {
    const {rows: [activity]} = await client.query(`
    SELECT * FROM activities WHERE id = ${id};
    `);
    return activity;

  } catch (error) {
    console.log(error);
  }
}

const deleteActivity = async(id) => {
  try {
     const deleted = await client.query(`
    DELETE FROM activities WHERE id = ${id}
    `)
   
  } catch (error) {
    console.log(error);
  }
 
}


module.exports = {
  createActivities,
  getAllActivities,
  getOneActivity,
  deleteActivity
};
