import { fifaData } from './fifa.js';

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/
const fourteenWCFinal = fifaData.filter((stage)=>{
   return stage.Stage ===  'Final' && stage.Year === 2014;
})

console.log('2014 Final',fourteenWCFinal)
//(a) Home Team name for 2014 world cup final
    console.log('task 1a', fourteenWCFinal[0]["Home Team Name"]);

//(b) Away Team name for 2014 world cup final
    console.log('task 1b', fourteenWCFinal[0]["Away Team Name"]);
//(c) Home Team goals for 2014 world cup final
    console.log('task 1c', fourteenWCFinal[0]["Home Team Goals"]);

//(d) Away Team goals for 2014 world cup final
    console.log('task 1d', fourteenWCFinal[0]["Away Team Goals"]);
//(e) Winner of 2014 world cup final */
    console.log('task 1e', fourteenWCFinal[0]["Win conditions"]);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following: 
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/

function getFinals(data) {
   const finals = data.filter((game)=>{
       return  game.Stage === "Final";
   })
   return finals
};
    console.log('Task 2', getFinals(fifaData));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(array, getFinalsCB) {
    const finalsYears = getFinalsCB(array).map((finals) => {
        return finals.Year 
    })
    return finalsYears
    //im going to want to run the CB function, which gives me an array of all the finals data. 
    //from this array im going to filter out just the years
}

console.log('task 3', getYears(fifaData, getFinals));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(array, getFinalsCB) {
    const finalsTeams = getFinalsCB(array).map((finals => {
        return {
            "HomeTeam": finals["Home Team Name"],
            "AwayTeam": finals["Away Team Name"],
            "Winner": finals["Win conditions"],
            "HomeTeamGoals": finals["Home Team Goals"],
            "AwayTeamGoals": finals["Away Team Goals"]
             }
    }))
    console.log(finalsTeams)
    let winners = []
    finalsTeams.forEach(element => {
       if(element.Winner.includes(element.HomeTeam)){
           winners.push(element.HomeTeam)
       }else if(element.Winner.includes(element.AwayTeam)){
           winners.push(element.AwayTeam)
       }else if(element.HomeTeamGoals > element.AwayTeamGoals){
           winners.push(element.HomeTeam)
       }else if(element.HomeTeamGoals < element.AwayTeamGoals){
           winners.push(element.AwayTeam)
       }
    });

    return winners
}

console.log('task 4', getWinners(fifaData, getFinals));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getYears from task 3
3. Receive a callback function getWinners from task 4
4. Return an array of strings that say "In {year}, {country} won the world cup!" 

hint: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(array, getYearsCB,getWinnersCB) {
    const winners = getWinnersCB(array, getFinals);
    const years = getYearsCB(array, getFinals);
    return winners.map((item, index) => `In ${years[index]}, ${item} won the world cup!`)
}
    // let years = []
    // let winners = []
    // years = getYearsCB(array,getFinals)
    // winners = getWinnersCB(array, getFinals)
    // let winAnnouncements = [];
    // let i; 
    // years.filter((year)=>{
    //     return`In ${year.index}, ${winners.index} won the world cup`
    // }, index)
    // return winAnnouncements


console.log('task 5', getWinnersByYear(fifaData, getYears, getWinners));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

function getAverageGoals(getFinalsCB) {
   const totalGoals= getFinalsCB.reduce((total,finals)=>{
    return total + finals['Home Team Goals'] +finals["Away Team Goals"]
   },0)
   
   return (totalGoals/19).toFixed(2)
}

console.log('task 6', getAverageGoals(getFinals(fifaData)));




/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(/* code here */) {

    /* code here */

}



/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {

    /* code here */

}


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
export default{
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
