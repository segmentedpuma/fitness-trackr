const express = require('express');
const app = express();
const { getAllActivities, getOneActivity, createActivities, deleteActivity } = require('./db/activites');
const { getAllRoutines, getOneRoutine, createRoutines } = require('./db/routines');
const { createRoutinesActivities } = require('./db/routines_activities');

const client = require("./db/client");

client.connect();

app.use(express.json());

app.get("/", (req, res) => {
  res.send('home');
});

app.get("/api/v1/activities", async (req, res, next) => {
  try {
    const allActivities = await getAllActivities();
    console.log(allActivities);
    res.send(allActivities);
  } catch (error) {
    next(error);
  }
});

app.get('/api/v1/routines', async (req, res, next) => {
  try {
    const allRoutines = await getAllRoutines();
    res.send(allRoutines);

  }
  catch (error) {
    next(error);
  }
});

app.get('/api/v1/activities/:activityId', async (req, res, next) => {
  try {
    const id = req.params.activityId;

    const activity = await getOneActivity(id);
    console.log(id);
    res.send(activity);

  } catch (error) {
    next(error);
  }
});

app.get("/api/v1/routines/:routineId", async (req, res, next) => {
  try {
    const id = req.params.routineId;
    const routine = await getOneRoutine(id);
    console.log(id);
    res.send(routine);

  } catch (error) {
    next(error);
  }



});

app.post("/api/v1/activities", async (req, res) => {
  try {
    const newActivityName = req.body.name;
    const newActivityDesc = req.body.description

    const createdActivity = await createActivities(newActivityName, newActivityDesc); //name, description 
    console.log('new activity:');
    console.log(newActivityName);
    console.log(newActivityDesc);

    res.send(createdActivity);
  } catch (error) {
    console.log(error);
  }
})


app.post("/api/v1/routines", async (req, res) => {
  try {
    const newRoutineName = req.body.name; //name, goal, is_public
    const newRoutineGoal = req.body.goal;
    const newRoutinePub = req.body.is_public;
    const newRoutine = await createRoutines(newRoutineName, newRoutineGoal, newRoutinePub);
    res.send(newRoutine);
  } catch (error) {
    console.log(error);
  }

});


//be careful when sending requests with this one because the routine id is called 'routine_id' while the activity id is called 'activities_id'
app.post("/api/v1/routines_activities", async (req, res) => {
  try {
    const newRoutineActivityRoutineId = req.body.routine_id; //routine_id, activities_id
    const newRoutineActivityActivityId = req.body.activities_id;
    const newRoutineActivity = await createRoutinesActivities(newRoutineActivityRoutineId, newRoutineActivityActivityId);

    res.send(newRoutineActivity);
  } catch (error) {
    console.log(error);
  }
})

app.delete("/api/v1/activities/:activityId", async (req, res) => {
  try {

    const id = req.params.activityId;
    const deleted = await deleteActivity(id);
    res.send("attempted delete");
  } catch (error) {
    console.log(error);
  }
});


app.listen(8080, () => {
  console.log(`Server is running on port 8080`);
});  