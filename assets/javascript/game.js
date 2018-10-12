
$(document).ready(function () {
    //variables used to initiate the game
    var lukeHP = 100;
    var obiHP = 120;
    var maulHP = 180;
    var sidHP = 150;

    //variable to manage the stats of game
    var enemycounterAttack;
    var baseAttackPower;
    var heroHP = 0;
    var enemyHP = 0;
    
    //combatant identification
    var hero;
    var enemyChar;

    //counters
    var kills = 0;
    var numOfAttack = 0;

    //flags to manage flow of the game
    var heroSelected = false;
    var pickEnemy = true;
    var gameOn = true;

    //game object
    var game = {
        charArr: ["obi", "luke", "maul", "sid"],
        imgArr: ["assets/images/obi-wan.JPG", "assets/images/LukeSkywalker.JPG", "assets/images/darthMaul.JPG", "assets/images/darthSid.JPG"],
        attackPower: [6, 5, 4, 3],
        counterAttack: {
            enemyobi: 10,
            enemyluke: 10,
            enemymaul: 10,
            enemysid: 10
        },
        charStartingHPArr: {
            "enemyobi": 120,
            "enemyluke": 100,
            "enemymaul": 180,
            "enemysid": 150
        },
        startingHP: [120, 100, 180, 150],
        moveUnselected: function (selectedchar) {
            heroSelected = true;

            for (i = 0; i < game.charArr.length; i++) {

                if (selectedchar != game.charArr[i]) {

                    //Turn the active instructions to white, inactive instructions to gray
                    $("#CharacterText").css("color", "gray");
                    $("#enemyHeader").css("color", "white");

                    var enemy = document.getElementById(game.charArr[i]);
                    enemy.classList.add("enemy");

                    //append the entire enemy div to enemies class
                    $(".enemies").append(enemy);
                    document.getElementById("enemyHeader").style.display = "block"
                }
                else {
                    //set the active char variable
                    hero = selectedchar

                    //set the Health Points counter
                    heroHP = game.startingHP[i];

                    //set the baseAttackPower variable
                    baseAttackPower = game.attackPower[i];

                };
            }
        },
        setOnClickListener: function () {
            //if user clicks on an enemy, call the moveFighter function
            $(".enemy").on("click", function () {
                game.moveFighter(this.id);
            })

        },
        moveFighter: function (fighterId) { 

            //move the selected enemy to the cage
            //if user is allowed to pick enemy
            if (pickEnemy) {

            //move to the cage
            var fighter = document.getElementById(fighterId);
            $("#cage").append(fighter)

            //set the enemyChar varible
            enemyChar = fighterId

            //load the counter attack variables
            game.setEnemyStats(fighterId);

            //set the heading colors to guide the user
            $("#enemyHeader").css("color", "gray");
            $("#cageHeader").css("color", "white");

            //show the attack button and cage header
            document.getElementById("attackbutton").style.display = "block"
            document.getElementById("cageHeader").style.display = "block"

            //prevent the user from selecting a second enemy
            pickEnemy=false;
            }
        },

        updateDisplay: function () {

            //update the hero's score on screen
            var herotemp = "#" + hero + "score"
            $(herotemp).html(heroHP);

            //updates the enemy's score on screen
            var enemytemp = "#" + enemyChar + "score"
            $(enemytemp).html(enemyHP);
        },
        setEnemyStats: function (fighterId) {
            //set the enemy stats based on the selected enemy
            switch (fighterId) {
                case "luke":
                    enemycounterAttack = game.counterAttack.enemyluke;
                    enemyHP = game.charStartingHPArr.enemyluke;
                    break;
                case "maul":
                    enemycounterAttack = game.counterAttack.enemymaul;
                    enemyHP = game.charStartingHPArr.enemymaul;
                    break;
                case "obi":
                    enemycounterAttack = game.counterAttack.enemyobi;
                    enemyHP = game.charStartingHPArr.enemyobi;
                    break;
                case "sid":
                    enemycounterAttack = game.counterAttack.enemysid;
                    enemyHP = game.charStartingHPArr.enemysid;
                    break;
            }
        },

        initialSetup: function () {
            // hide the buttons and titles until they are needed
            document.getElementById("gameOver").style.display = "none"
            document.getElementById("attackbutton").style.display = "none"
            document.getElementById("resetbutton").style.display = "none"
            document.getElementById("enemyHeader").style.display = "none"
            document.getElementById("cageHeader").style.display = "none"


            //set the inital health points of each character
            $("#lukeScore").replaceWith(lukeHP);
            $("#obiScore").replaceWith(obiHP);
            $("#maulScore").replaceWith(maulHP);
            $("#sidScore").replaceWith(sidHP);

            $("#enemylukescore").replaceWith(lukeHP);
            $("#enemyobiscore").replaceWith(obiHP);
            $("#enemymaulscore").replaceWith(maulHP);
            $("#enemysidscore").replaceWith(sidHP);
        },

        attack: function () {

            //increment the attack counter
            numOfAttack++

            //cause damage to enemy
            this.causeDamage();

            //receive damage from enemy
            this.receiveDamage();

            //update the score
            this.updateDisplay();


            if (!this.stillAlive()) {
               //we dead!  process the following:

               //change the image to skull and crossbones
                document.getElementById(hero + "Image").src = "assets/images/skull.JPG"

                //change the hero score to "DEAD"
                var herotemp = "#" + hero + "score"
                $(herotemp).html("DEAD");

                //stop the user from clicking the attack button
                gameOn = false
    
                //hid the attack button and show game over message and reset button
                document.getElementById("gameOver").style.display = "block"
                document.getElementById("resetbutton").style.display = "block"
                document.getElementById("attackbutton").style.display = "none"

                //change the cage header to "you lost"
                $("#cageHeader").html("You lost!");
            };


            if (this.killEnemy()) {
                //increment the kill counter
                kills++

                //Mark the enemy as dead
                document.getElementById(enemyChar + "Image").src = "assets/images/skull.JPG"
                var enemytemp = "#" + enemyChar + "score"
                $(enemytemp).html("DEAD");

                //don't let the user click forward
                gameOn = false;

                //check to see if we have a winner
                if (game.didWeWin()) {

                    //show the gameOver div
                    document.getElementById("gameOver").style.display = "block"

                    //change the gameOver div to "Winner"
                    $("#gameOver").html("Winner");

                    //change the cageHeader to "you win"
                    $("#cageHeader").html("YOU WIN!");

                    //Hide the enemy card
                    document.getElementById(enemyChar).style.display = "none"

                    //WINNER'S CIRCLE:
                    //grab the winner and move to the #cage div
                    var WinnersCircle = document.getElementById(hero);
                    $("#cage").append(WinnersCircle)

                    //hide unnecessary controls (show reset button to play again)
                    document.getElementById("CharacterText").style.display = "none"
                    document.getElementById("enemyHeader").style.display = "none"
                    document.getElementById("resetbutton").style.display = "block"
                    document.getElementById("attackbutton").style.display = "none"
                }
                else {
                    //didn't win yet...

                    //wait 3/4 of a second...
                    setTimeout(function () {

                        //Ok- now the user can click
                        gameOn = true;

                        //Hide unnecessary controls
                        document.getElementById(enemyChar).style.display = "none"
                        document.getElementById("cageHeader").style.display = "none"
                        document.getElementById("attackbutton").style.display = "none"
                        document.getElementById("resetbutton").style.display = "none"

                        //change the header coloring to direct the user
                        $("#enemyHeader").css("color", "white");
                        $("#cageHeader").css("color", "gray");

                        //allow the user to select another enemy
                        pickEnemy=true;

                    }, 750);
                }
            }
        },
        stillAlive: function () {
            //true if health points are greater than zero
            if (heroHP > 0) {
                return true;
            }
            else {
                return false;
            };

        },
        killEnemy: function () {
            //true if enemy  health is less than/equal to zero
            if (enemyHP <= 0) {
                return true;
            }
            else {
                return false;
            };
        },

        didWeWin: function () {
            //true if enemy kills = 3
            if (kills === 3) {
                return true;
            }
            else {
                return false;
            }
        },

        causeDamage: function () {
            enemyHP = enemyHP - (numOfAttack * baseAttackPower)
        },

        receiveDamage: function () {
            heroHP = heroHP - enemycounterAttack;
        },

        resetGame: function () {
            for (i = 0; i < 4; i++) {
            }
        }
    }

    game.initialSetup()

    $(".card").on("click", function () {
        if (!heroSelected) {
            game.moveUnselected(this.id);
            game.setOnClickListener();
        }
    })

    $("#attackbutton").on("click", function () {

        if (gameOn) {
            game.attack();
        }

    })
    $("#resetbutton").on("click", function () {
        location.reload();
    })

})