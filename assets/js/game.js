var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// log multiple values at once 
console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function (enemyName) {

    // repeat and execute as long as the eney-robot is alive

    while (enemyHealth > 0 && playerHealth > 0) {

        // place fight function code block here ...

        // Request of player to fight or skip

        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose");

        // if player choses to skip

        if (promptFight === "skip" || promptFight === "SKIP") {

            // confirm player wants to skip

            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave fight

            if (confirmSkip) {
                window.alert(playerName + " has chosen to skip the fight. Goodbye!");

                // then subtract money from playerMoney for skipping

                playerMoney = playerMoney - 10;

                // verify money loss on skip

                console.log("playerMoney", playerMoney);

                break;
            }

        }

        // Subtract the value of "playerAttack" from the value of "enemyHealth" and use that result to update the value in the "enemyHealth" variable

        enemyHealth = enemyHealth - playerAttack;

        // Log a resulting message to the console so we know that it worked. 

        console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

        // check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
            break;
        }
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        // Subtract the value of "enemyAttack" from the value of "playerHealth" and use that result to update the value in the "playerHealth" variable.

        playerHealth = playerHealth - enemyAttack;

        // Log a resulting message to the console so we know that it worked. 

        console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");

        // check player's health

        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            break;
        }
        else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }



};

// for loop to iterate over each robot and fight them.  
// still confused on how this loops through each robot and fights them, but doesn't complete fight.  Review 3.2.6 a little closer. = explained: the below for loop iterates then passes the robot's name in to the function. That name is then assigned to enemyName and ran through the fuction. 
for (var i = 0; i < enemyNames.length; i++) {

    // verify player health before each loop and present welcome message

    if (playerHealth > 0) {

        // let player know what round they are in, remember that arrays start at 0 so it needs to have a 1 added to it

        window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

    }
    else {
        window.alert("You have lost your robot in battle! Game Over!");
        break;
    }
    //debugger;

    // pick new enemy to fight based on the index of the enemynames array

    var pickedEnemyName = enemyNames[i];

    // health reset

    enemyHealth = 50;

    // call fight function with enemy-robot, now with health reset to 50

    fight(pickedEnemyName);
};