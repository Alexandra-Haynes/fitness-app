/*tags to call bayze based on user actions

 0. app_ID
 1. register an user - call npm, get token
 2. sign in
 3. send events
 4. get back achiev/badges + UI


Date format:

const dateDataOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
}

const time = new Date()
const currentDateUK = time.toLocaleString('en-UK', dateDataOptions)


Optional Data - value - for metrics, numeric || letters < 16ch

POST body {
    'user_id': '122345',
    'tagName': 'demo1',
    'value':50,
    'localTime':'03/07/2023, 08:08:08'
}

res: {
    'achievements':[{
        'title':'lala',
        'image':'trophy.png',
        'description':'blabla'
    }]  
}

end users only see potential badges and how to get them
all badges are associated with achievements


TOTAL: 4 badges, 12 achievements

*/

/*COUNTS achievements:

___events/actions to track: 
- user submits a completed workout -> num of days in a row
- what type of workout: cardio/strength, -> num of each type in total
- miles of running user submits -> num of miles run in total, is it = 5, 10, 50, 100? 

*/

let streakOfCompletedWorkouts = {
  user_id: userId,
  tagName: streakOfCompletedWorkouts,
  value: [
    "streak7", //or simply 7
    "streak14",
    "streak21",
    "streak30",
    "streak60",
    "streak90", //BADGE!
  ],
  localTime: currentDateUK,
};

let numOfCompletedWorkouts_Cardio = {
  user_id: userId,
  tagName: numOfCardio,
  value: [
 "cardio5", 
  "cardio10", 
  "cardio50", 
  "cardio100", //BADGE!
  ],
  localTime: currentDateUK,
};

let numOfCompletedWorkouts_Strength = {
  user_id: userId,
  tagName: numOfStrength,
  value: [
  "strength5", 
  "strength10", 
  "strength50", //BADGE!
  ],
  localTime: currentDateUK,
};

let totalMilesRun = {
  user_id: userId,
  tagName: totalMilesRun,
  value: [
    "totalRun5",
    "totalRun10",
    "totalRun50",
    "totalRun100", //BADGE!
 
  ],
  localTime: currentDateUK,
};

//MATH achievements:
/*
___events/actions to track: 

- user submits a new running session -> is it the longest? is it the fastest for 1mile 5k 10k?
- user submits workout -> add num of rep in the total for each ex - is it = 500 , 1000club?
- user submits total weight lifted in a workout -> is it 1x, 2x his/her body weight? store bodyweight
- user adds weight + reps for an ex -> is it a record for that ex?

*/

let longestRun = {
  // > prev longestRun
  user_id: userId,
  tagName: longestRun,
  value: 12,
  localTime: currentDateUK,
};

let fastestRun = {
  user_id: userId,
  tagName: fastestRun,
  value:{
    fastestMile: 6, 
    fastest5K: 25,
    fastest10k: 50,
  },
  localTime: currentDateUK,
};

let club500 = {  // 500 reps of the same ex
  user_id: userId,
  tagName: club500,
  value: exercise_name, //might need a limited array of ex
  localTime: currentDateUK,
};
let club1000 = { 
  user_id: userId,
  tagName: club1000,
  value: exercise_name,
  localTime: currentDateUK,
};

let xbodyWeight = {
  user_id: userId,
  tagName: xbodyWeight,
  value: 1 || 2,
  localTime: currentDateUK,
};

let personalRecord = {
  user_id: userId,
  tagName: personalRecord,
  value: exercise_name,  //add weight/reps
  localTime: currentDateUK,
};


//TIME_BASED achievements:
/*
___events/actions to track: 

- user submits a workout - is the second for that day?
- user submits workout -> is it a special event/holiday workout?
- user submits total weight lifted in a workout -> is it 1x, 2x his/her body weight? store bodyweight
- user adds weight + reps for an ex -> is it a record for that ex?


*/


let doubleDown = { // 2 workouts in a day
  user_id: userId,
  tagName: doubleDown,
  localTime: currentDateUK,
};

let specialEvent =  {
    user_id:userId,
    tagName: specialEvent,
    value: holiday_name, //might need a limited amount
    localTime: currentDateUK
}