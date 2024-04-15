//get description of connectioin
const client = require('./client.js');
//pulls the exported function "createActivites" from activites.js
const { createActivities } = require('./activites.js');
//pulls the exported function "createRoutines" from routines.js
const { createRoutines } = require('./routines.js');

const { createRoutinesActivities } = require('./routines_activities.js');


//drops old tables
const dropTables = async () => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS routines_activities;
      DROP TABLE IF EXISTS activities;
      DROP TABLE IF EXISTS routines;
     
    `)
    console.log("tables dropped");
  }
  catch (error) {
    console.log(error);
  }
  
}

//creates new tables
const createTables = async () => {
  try {
    await client.query(`
      CREATE TABLE activities (
        id SERIAL PRIMARY KEY,
        name VARCHAR(20) NOT NULL,
        description VARCHAR(100)
      );
      
      CREATE TABLE routines (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50),
        goal VARCHAR(100),
        is_public BOOLEAN
      );

      CREATE TABLE routines_activities (
        id SERIAL PRIMARY KEY,
        routine_id INT REFERENCES routines(id),
        activities_id INT REFERENCES activities(id)
      )
      `
    );
    console.log('created tables');
  }
  catch (error) {
    console.log(error);
  }
}

//create the foundations of the tables and data for tables
const initialize = async () => {
  await client.connect();
  console.log('connection start');
  
  //REFRESH TABLES
  await dropTables();
  await createTables();

  //calls createActivities to create rows inside the activities talbe, rows: name, description
  const jogging = await createActivities('jogging', 'like walking but faster');

  const jumpingJacks = await createActivities('jumping jacks','moving both your arms and legs in arcs');

  const squats = await createActivities('squats','squating down and standing back up');
  const pushups = await createActivities('pushups','pushing down towards the ground with both arms and back up again');

  const pullups = await createActivities('pullups','pulling the body up on a bar');

  //calls createRoutines to create rows inside the routines table, rows: name, goal, is_public
  const arms = await createRoutines('Arms', 'work out arms', true);
  const legs = await createRoutines('Legs','work out legs',false);
  const armsAndLegs = await createRoutines('Arms and Legs','work out both arms and legs', true);
  
//calls createRoutinesActivities to create rows inside the routines_activites table.  routine_id, activity_id, count
  await createRoutinesActivities(legs.id, jogging.id);
  await createRoutinesActivities(legs.id, squats.id);
  await createRoutinesActivities(legs.id, jumpingJacks.id);
  await createRoutinesActivities(arms.id, pushups.id);
  await createRoutinesActivities(arms.id, pullups.id);
  await createRoutinesActivities(armsAndLegs.id, jumpingJacks.id);
  await createRoutinesActivities(armsAndLegs.id, pushups.id);
  


  await client.end();
  console.log('connction ended');
}


//run initialization 
initialize();
