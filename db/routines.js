const client = require("./client.js");

const createRoutines = async (name, goal, is_public) => {
  try {
    const { rows: [createdRoutine] } = await client.query(`
      INSERT INTO routines (name, goal, is_public)
      VALUES ('${name}', '${goal}', ${is_public})
      RETURNING *;
    `);
    console.log(`inserted`);
    console.log(createdRoutine);
    return createdRoutine;
  } catch (error) {
    console.log(error);
  }
}

const getAllRoutines = async () => {
  const { rows: allRoutines } = await client.query(`
  SELECT * FROM routines;
  `)
  return allRoutines;
}

const getOneRoutine = async (id) => {
  try {
    const {rows: [routine]} = await client.query(`
    SELECT * FROM routines WHERE id = ${id};
    `)
    return routine;
  } catch (error) {
   console.log(error); 
  }

}


module.exports = {
  createRoutines,
  getAllRoutines,
  getOneRoutine
};