const client = require('./client.js');

const createRoutinesActivities = async (routine_id, activities_id) => {
  try {
    const { rows: [createdRoutineActivity] } = await client.query(`
      INSERT INTO routines_activities (routine_id, activities_id)
      VALUES (${routine_id}, ${activities_id})
      RETURNING *;
    `)
    console.log('inserted');
    console.log(createdRoutineActivity);
    return createdRoutineActivity;
  } catch (error) {
    console.log(error);
  }
}




module.exports = {
  createRoutinesActivities
};