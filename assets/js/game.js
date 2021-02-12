var fightOrSkip = function () {

    // Request of player to fight or skip

    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose");

    // Conditional Recursive Fuction Call
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    // if player choses to skip
    promptFight = promptFight.toLowerCase();

    if (promptFight === "skip") {

        // confirm player wants to skip

        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight

        if (confirmSkip) {
            window.alert(playerInfo.name + " has chosen to skip the fight. Goodbye!");

            // then subtract money from playerInfo.money for skipping
            // ensures that the var never dips below 0
            playerInfo.money = Math.max(0, playerInfo.money - 10);

            // verify money loss on skip

            console.log("playerInfo.money", playerInfo.money);

            return true;
        }

    }
    return false;
}

var fight = function (enemy) {
    // keep track of who goes first
    var isPlayerTurn = true;

    // randomly change turn order
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    while (playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn) {
            // ask player if they'd like to fight or skip using fightOrSkip function
            if (fightOrSkip()) {
                // if true, leave fight by breaking loop
                break;
            }

            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            // remove enemy's health by subtracting the amount we set in the damage variable
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(
                playerInfo.name +
                " attacked " +
                enemy.name +
                ". " +
                enemy.name +
                " now has " +
                enemy.health +
                " health remaining."
            );

            // check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");

                // award player money for winning
                playerInfo.money = playerInfo.money + 20;

                // leave while() loop since enemy is dead
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
            // player gets attacked first
        } else {
            var damage = randomNumber(enemy.attack - 3, enemy.attack);

            // remove enemy's health by subtracting the amount we set in the damage variable
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(
                enemy.name +
                " attacked " +
                playerInfo.name +
                ". " +
                playerInfo.name +
                " now has " +
                playerInfo.health +
                " health remaining."
            );

            // check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                // leave while() loop if player is dead
                break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }
        // switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
    }
};







// for loop to iterate over each robot and fight them.  
// still confused on how this loops through each robot and fights them, but doesn't complete fight.  Review 3.2.6 a little closer. = explained: the below for loop iterates then passes the robot's name in to the function. That name is then assigned to enemy.name and ran through the fuction.
var startGame = function () {
    // reset player stats
    playerInfo.reset();

    // fight each enemy robot by looping over them and fighting them one at a time
    for (var i = 0; i < enemyInfo.length; i++) {
        // check player stats
        console.log(playerInfo);

        // if player is still alive, keep fighting
        if (playerInfo.health > 0) {
            // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            // pick new enemy to fight based on the index of the enemyInfo array
            var pickedEnemyObj = enemyInfo[i];

            // set health for picked enemy
            pickedEnemyObj.health = randomNumber(40, 60);

            console.log(pickedEnemyObj);

            // pass the pickedEnemyObj object variable's value into the fight function, where it will assume the value of the enemy parameter
            fight(pickedEnemyObj);

            // if player is still alive after the fight and we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // ask if player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // if yes, take them to the store() function
                if (storeConfirm) {
                    shop();
                }
            }
        }
        // if player is not alive, break out of the loop and let endGame function run
        else {
            break;
        }
    }

    // after loop ends, we are either out of player.health or enemies to fight, so run the endGame function
    endGame();
};

// fuction to end the entire game

var endGame = function () {
    window.alert("The game has now ended. Let's see how you did!");

    // check localStorage for high score, if it's not there, use 0
    var highScore = localStorage.getItem("highscore") || 0;

    // if player have more money than the high score, player has new high score!
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    } else {
        alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
    }

    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function () {

    // ask player what whey'd like to do

    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter the number 1 for REFILL, 2 for UPGRADE, or 3 to LEAVE.");
    shopOptionPrompt = parseInt(shopOptionPrompt);
    // use switch to carry out action
    switch (shopOptionPrompt) {

        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option, try again!");
            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
}
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

// fuction to set name

var getPlayerName = function () {

    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }
    console.log("Your robot's name is " + name);
    return name

};

// END GAME FUNCTIONS

// groups all information for the player into an object playerInfo
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    },
    refillHealth: function () {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function () {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

// log multiple values at once 
console.log(playerInfo.name, playerInfo.attack, playerInfo.health);
// enemy array in object enemyInfo
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];


startGame();
