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
var startGame = function () {

    // reset player stats

    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

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

        // if we're not at the last enemy in the array

        if (playerHealth > 0 && i < enemyNames.length - 1) {

            // ask if player wants to use the store before next round
            var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

            // if yes, take them to the store() function
            if (storeConfirm) {
                shop();
            }

        }
    }
    // play again
    endGame();
};

// fuction to end the entire game

var endGame = function () {

    window.alert("The game has now ended. Let's see how you did!");

    // if player is still alive, player wins!

    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ". ");
    } else {
        window.alert("You've lost your robot in battle.");
    }

    // ask player if they'd like to play again

    var playAgainConfirm = window.confirm("would you like to play again?");

    if (playAgainConfirm) {

        // restart the game

        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};
var shop = function () {

    // ask player what whey'd like to do

    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', OR 'LEAVE' to make a choice.");

    // use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL": // new case - has no code so will fall through to the next case "refill": 
        case "refill":
            window.alert("Refilling player's health by 20 for 7 dollars.");
            if (playerMoney >= 7) {
                // increase health and decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;

            }
            else {
                window.alert("You don't have enough money!");
            }
            break;

        case "UPGRADE": // new case - has no code so will fall through to the next case "upgrade"
        case "upgrade":
            window.alert("upgrading player's attack by 6 for 7 dollars.");
            if (playerMoney >= 7) {
                // increase attack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;

            }
            else {
                window.alert("You don't have enough money!");
            }
            break;
        case "LEAVE": // new case
        case "leave":
            window.alert("Leaving the store.");

            // do nothing, so function will end
            break;
        default:
            window.alert("You did not pick a valid option, try again!");

            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
}

startGame();
