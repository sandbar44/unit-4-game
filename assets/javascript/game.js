// Psuedo Code
// 

$(document).ready(function() {


// Character objects
// [] Name
// [] Image
// [] HP
// [] Attack Power (base)
// [] Counter Attack Power (enemy)
// [] Attack Power (updated)
// 

// GLOBAL VARIABLES

var hero = "";
var defender = "";
var enemy = [];
var enemy1 = "";
var enemy2 = "";
var enemy3 = "";

var heroID = "";
var enemyID = "";

var baseAP = 10;
var counterAP = 5;
var updateAP = 20;

var chars = {

	char1: {
		name: "Rey"
	},

	char2: {
		name: "Boba Fett"
	},

	char3: {
		name: "Count Dooku"
	},

	char4: {
		name: "Darth Maul"
	}

}


// Start game
// [] All characters available
// [] Full health
// [] Reset hero attack power = base attack power
// [] Starting instructions
// [] Disable Attack button

	// console.log(chars)
	// console.log(chars.length)

	// for (var i = 0; i < chars.length; i++) {
	// 	alert("for loop")
	// 	var charBtn = $("<button>");
	// 	charBtn.attr("char-name", chars[i]);
	// 	charBtn.text(chars[i]);
 //        $("#select-char-div").append(charBtn);
 //        console.log(charBtn);
	// };


// Click a character
// [] Move clicked character to Your Character section
// [] Move remaining characters to Enemies Available to Attack
// [] Update instructions

$("#select-char-div").on("click", ".select-char", function() {
	if(hero == "") {
		hero = $(this);
		$(hero).appendTo($("#your-char"));
		heroID = $(hero).attr("id");
		console.log("heroID = " + heroID);

		for (var i = 1; i < 5; i++) {
			var enemy = $("#char"+[i]);
			enemyID = $(enemy).attr("id");
			if (enemyID != heroID) {
				$("#avail-enemies").append(enemy);
				console.log(enemy)
			} 
		}

		$("#instructions").html("Select an enemy to fight!");

	}
});

// Click enemy to attack
// [] Move clicked enemy to Defender 
// [] Clear fight description
// [] Enable Attack button

$("#avail-enemies").on("click", ".select-char", function() {
	alert("enemy clicked!");
	if(hero != "" && defender == "") {
		defender = $(this);
		$(defender).appendTo($("#defender"));
		defenderID = $(defender).attr("id");
		console.log("defenderID = " + defenderID);
		}

		$("#instructions").html("Attack!");

		$("#fight").append("<button>Attack</button>");
});

// 
// Click Attack button
// [] If no enemy is in Defender area:
//      [] Update fight description:
//          No enemy here.
// [] Else if enemy exists:
//      [] Decrease defender HP by hero attack power
//      [] If defender HP is <= 0 (DEFENDER DEFEATED)
//          [] Remove defender from defender area
//          [] If Enemies Available = 0: (WIN GAME)
//              [] Update fight description:
//                  You won!!! GAME OVER!!!
//              [] Display "Restart" button
//              [] Disable Attack button
//          [] Else: (ENEMIES AVAILABLE)
//              [] Update fight description:
//                  You have defeated DEFENDER NAME, you can choose to fight another enemy.
//              [] Enable user to choose a new enemy
//      [] Else: (DEFENDER STILL ALIVE)
//          [] Display updated defender HP
//          [] Decrease hero HP by enemy attack power
//          [] If hero HP is <= 0: (HERO DEFEATED)
//              [] Update fight description:
//                  You have been defeated...GAME OVER!!!
//              [] Display "Restart" button
//          [] Else: (HERO STILL ALIVE)
//              [] Display updated hero HP
//              [] Increase hero attack power by base AP
//              [] Update fight description with stats:
//                  You attacked DEFENDER NAME for AP# damage.
//                  DEFENDER NAME attacked you back for CAP# damage.
// 
// Click Restart button
// [] Start game function
// 
// 
})
