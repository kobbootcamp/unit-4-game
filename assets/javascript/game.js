
$(document).ready(function () {
    var charselected = false;

    var game = {

        charArr: ["obi", "luke", "maul", "sid"],
        imgArr: ["assets/images/obi-wan.JPG", "assets/images/LukeSkywalker.JPG",  "assets/images/darthMaul.JPG" ,"assets/images/darthSid.JPG"],

        moveUnselected: function (selectedchar) {
            charselected = true;
            for (i = 0; i < game.charArr.length; i++) {
                // alert(selectedchar)
                if (selectedchar != game.charArr[i]) {
                
                    //Turn the active instructions to white, inactive instructions to gray
                    $("#CharacterText").css( "color", "gray" );
                    $("#enemyHeader").css( "color", "white");

                    //make the non-selected characters invisible
                    document.getElementById(game.charArr[i]).style.display = "none"

                    //create an enemy div, give it the class "card" and set id
                    var enemyCardDiv = document.createElement( "div" );
                    enemyCardDiv.classList.add("card");
                    enemyCardDiv.classList.add("enemy");
                    enemyCardDiv.setAttribute("id","enemy"+game.charArr[i]);

                    //create an img, set the class to "card-img-top", and set image source
                    var enemyImgDiv = document.createElement( "img" );
                    enemyImgDiv.classList.add("card-img-top");
                    enemyImgDiv.setAttribute("src", game.imgArr[i]);
 
                    //create card body div, give it the "card-body" class
                    var enemyCardBody = document.createElement( "div" );
                    enemyCardBody.classList.add("card-body");

                    //create a card title div, give it the "card-title" class
                    var enemyCardTitle = document.createElement( "div");
                    enemyCardTitle.classList.add("card-title");

                    //append the card title tot he card body
                    enemyCardBody.appendChild(enemyCardTitle);

                    //append the card image to the enemy div
                    enemyCardDiv.appendChild(enemyImgDiv);

                    //append the card body to the enemy div
                    enemyCardDiv.appendChild(enemyCardBody);
                    // enemyCardDiv.appendto("enemyImgDiv");
    
                    //append the entire enemy div to enemies class
                    $(".enemies").append(enemyCardDiv); 

                };
            }

        },
        setOnClickListener: function() {
            $(".enemy").on("click", function () {
                game.moveFighter(this.id);
            })
            // return setOnClickListener
        },
        moveFighter: function(fighterId) {

            //move to the cage
            var fighter = document.getElementById(fighterId)
            $("#cage").append(fighter)

            $("#enemyHeader").css( "color", "gray");
            $("#cageHeader").css( "color", "white");
        }

    }
    $(".card").on("click", function () {
        if (!charselected) {
            game.moveUnselected(this.id);
            game.setOnClickListener();
        }
    })

  
    $("#attackbutton").on("click", function () {
        alert("Attack!")
    })

})