
$(document).ready(function () {
    var heroSelected = false;
    var lukeHP = 100;
    var obiHP = 120;
    var maulHP = 180;
    var sidHP = 150;
    // var attackPower;

    var enemycounterAttack;
    var baseAttackPower;
    var numOfAttack = 0;

    var hero;
    var enemyChar;
    var heroHP = 0;
    var enemyHP = 0;


    var game = {

        charArr: ["obi", "luke", "maul", "sid"],
        imgArr: ["assets/images/obi-wan.JPG", "assets/images/LukeSkywalker.JPG", "assets/images/darthMaul.JPG", "assets/images/darthSid.JPG"],
        attackPower: [8,6,2,4],
        counterAttack: {
            enemyobi: 10,
            enemyluke: 5,
            enemymaul: 25,
            enemysid: 20
        },
        charStartingHPArr: {
            "enemyobi": 120, 
            "enemyluke": 100,
            "enemymaul": 180, 
            "enemysid" :150
        },
        startingHP: [120,100,180,150],
        moveUnselected: function (selectedchar) {
            heroSelected = true;

            for (i = 0; i < game.charArr.length; i++) {
                
                if (selectedchar != game.charArr[i]) {

                    //Turn the active instructions to white, inactive instructions to gray
                    $("#CharacterText").css("color", "gray");
                    $("#enemyHeader").css("color", "white");

                    //make the non-selected characters invisible
                    document.getElementById(game.charArr[i]).style.display = "none"

                    //create an enemy div, give it the class "card" and set id to "enemy" + char name
                    var enemyCardDiv = document.createElement("div");
                    enemyCardDiv.classList.add("card");
                    enemyCardDiv.classList.add("enemy");
                    enemyCardDiv.setAttribute("id", "enemy" + game.charArr[i]);

                    //create an img, set the class to "card-img-top", and set image source
                    var enemyImgDiv = document.createElement("img");
                    enemyImgDiv.classList.add("card-img-top");
                    enemyImgDiv.setAttribute("src", game.imgArr[i]);

                    //create card body div, give it the "card-body" class and an id with small 'score'
                    var enemyCardBody = document.createElement("div");
                    enemyCardBody.classList.add("card-body");
                    enemyCardBody.setAttribute("id", "enemy" + game.charArr[i] + "score");
                   
                    //create a card title div, give it the "card-title" class
                    var enemyCardTitle = document.createElement("div");
                    enemyCardTitle.classList.add("card-title");

                    //append the card title tot he card body
                    enemyCardBody.appendChild(enemyCardTitle);

                    //append the card image to the enemy div
                    enemyCardDiv.appendChild(enemyImgDiv);

                    //append the card body to the enemy div
                    enemyCardDiv.appendChild(enemyCardBody);
       
                    //append the entire enemy div to enemies class
                    $(".enemies").append(enemyCardDiv);

                    game.resetDisplay()
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
            $(".enemy").on("click", function () {
                game.moveFighter(this.id);
            })
            // return setOnClickListener
        },
        moveFighter: function (fighterId) { //enemyluke

            //mark the fighter as thisfighter
            // var tempName = fighterId + "Score"; //enemylukeScore
          
            // var tempHolder = document.getElementById(tempName);
            // tempHolder.classList.add("thisfighter");
            
alert("fighter id: " + fighterId)
            //move to the cage
            var fighter = document.getElementById(fighterId);
            // fighter.append("#" + fighterId + "score")
            $("#cage").append(fighter)
            
            game.resetDisplay()

            enemyChar = fighterId
            //load the counter attack variable
            switch (fighterId) {
                case "enemyluke":
                    enemycounterAttack = game.counterAttack.enemyluke;
                    enemyHP=game.charStartingHPArr.enemyluke;
                    break;
                case "enemymaul":
                    enemycounterAttack = game.counterAttack.enemymaul;
                    enemyHP=game.charStartingHPArr.enemymaul;
                    break;
                case "enemyobi":
                    enemycounterAttack = game.counterAttack.enemyobi;
                    enemyHP=game.charStartingHPArr.enemyobi;
                    break;
                case "enemysid":
                    enemycounterAttack = game.counterAttack.enemysid;
                    enemyHP=game.charStartingHPArr.enemysid;
                    break;
            }

            
            // enemyHP=charStartingHPArr enemymaul
            $("#enemyHeader").css("color", "gray");
            $("#cageHeader").css("color", "white");


        },

        updateDisplay: function () {


            // $("#lukeScore").replaceWith(lukeHP);
            // $("#obiScore").replaceWith(obiHP);
            // $("#maulScore").replaceWith(maulHP);
            // $("#sidScore").replaceWith(sidHP);

            // $("#enemylukeScore").replaceWith(lukeHP);
            // $("#enemyobiScore").replaceWith(obiHP);
            // $("#enemymaulScore").replaceWith(maulHP);
            // $("#enemysidScore").replaceWith(sidHP);

            //update the hero
            var herotemp="#" + hero + "score"
            $(herotemp).html(heroHP);

            //updates the fighter's HP
            var enemytemp="#" + enemyChar + "score"  //#enemylukescore
            $(enemytemp).html(enemyHP);
        alert(enemyChar)
        },

        resetDisplay: function() {

            // for (i=0; i<4;i++) {
            //     if (game.charArr[i]==hero){
            //     }
            //     else if (game.charArr[i]==enemyChar) {
            //     }
            //     else {
            //         var enemytemp="#enemy" + game.charArr[i] + "score"
            //         alert(enemytemp)
            //         $(enemytemp).replaceWith(game.startingHP[i]);
            //         alert(game.startingHP[i])
            //     }
            // }
            $("#lukeScore").replaceWith(lukeHP);
            $("#obiScore").replaceWith(obiHP);
            $("#maulScore").replaceWith(maulHP);
            $("#sidScore").replaceWith(sidHP);

            $("#enemylukescore").replaceWith(lukeHP);
            $("#enemyobiscore").replaceWith(obiHP);
            $("#enemymaulscore").replaceWith(maulHP);
            $("#enemysidscore").replaceWith(sidHP);
            
        },
        updateScore: function () {


        },
        initialSetup: function(){
            $("#lukeScore").replaceWith(lukeHP);
            $("#obiScore").replaceWith(obiHP);
            $("#maulScore").replaceWith(maulHP);
            $("#sidScore").replaceWith(sidHP);

            $("#enemylukescore").replaceWith(lukeHP);
            $("#enemyobiscore").replaceWith(obiHP);
            $("#enemymaulscore").replaceWith(maulHP);
            $("#enemysidscore").replaceWith(sidHP);
        },
        attack: function (id, enemy) {
            this.causeDamage();
            this.receiveDamage();
            this.stillAlive();
            this.killEnemy();

        },
        stillAlive: function (hero) {
            var HP = hero + "HP";

            if (HP > 0) {
                return true;
            }
            else {
                return false;
            };

        },
        killEnemy: function (enemyChar) {
            var HP = enemyChar + "HP";

            if (HP <= 0) {
                return true;
            }
            else {
                return false;
            };

        },

        causeDamage: function () {
            enemyHP = enemyHP - (numOfAttack * baseAttackPower)
        },

        receiveDamage: function () {
            heroHP = heroHP-enemycounterAttack;
        },

        recalculateAttackPower: function () {


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
        //increment the number of attacks
        numOfAttack++

        game.causeDamage();
        game.receiveDamage();

        // game.stillAlive(activeChar)
        // game.killEnemy(enemyChar)


        // game.updateScore();
        game.updateDisplay();

    })

})