// Psuedo Code
// 
// ==================================================
// GLOBAL VARIABLES
// ==================================================

// Character objects
// [X] Name
// [X] HP
// [X] Attack Power (base)
// [X] Counter Attack Power (enemy)
// [X] Attack Power (updated)

var hero = "";
var heroID = "";
var heroStats = {};

var enemy = "";
var remEnemies = 0;
var enemyID = "";

var defender = "";
var defenderID = "";
var defenderStats = {};

var chars = {
	char1: {
		name: "Rey",
		origHP: 120,
		origAP: 8,
		hp: 120,
		ap: 8,
		cap: 24
	},
	char2: {
		name: "Boba Fett",
		origHP: 100,
		origAP: 10,
		hp: 100,
		ap: 10,
		cap: 5
	},
	char3: {
		name: "Count Dooku",
		origHP: 150,
		origAP: 10,
		hp: 150,
		ap: 10,
		cap: 20
	},
	char4: {
		name: "Darth Maul",
		origHP: 180,
		origAP: 12,
		hp: 180,
		ap: 12,
		cap: 25
	}
}

// ==================================================
// FUNCTIONS
// ==================================================

// Start game
// [X] Move all characters back to Select Char Div
// [X] Reset character formatting
// [X] Reset all character stats
// [X] Starting instructions
// [X] Disable Attack button
// [X] Hide Fight description
// [X] Disable Restart button

function startGame() {
	// Move all characters back to Select Char Div
	for (var i = 1; i < 5; i++) {
		char = $("#char" + [i]);
		$("#select-char-div").append(char);
	}

	// Reset character formatting
	$(".select-char")
		.removeClass("btn-success btn-primary btn-danger")
		.removeAttr("disabled style");

	// Reset all character stats
	hero = "";
	heroID = "";
	heroStats = {};

	enemy = "";
	remEnemies = 0;
	enemyID = "";

	defender = "";
	defenderID = "";
	defenderStats = {};

	for (var i = 1; i < 5; i++) {
		char = ("char"+[i]);
		chars[char].hp = chars[char].origHP;
		chars[char].ap = chars[char].origAP;
		$("#char"+[i]+"-hp").html(chars[char].origHP);
	}
	
	// Starting instructions
	$("#instructions").html("Select a character to begin.")

	// Disable Attack button
	$(".attack").hide();

	// Hide Fight description
	$("#fight-desc").hide();

	// Disable Restart button
	$("#restart").hide();
}

// In-game Function: New round
// [X] Reset defender stats
function newRound() {
	defender = "";
	defenderID = "";
	defenderStats = {};
}

// In-game Functions: Update stats
// [X] Update Hero HP
// [X] Update Hero AP
// [X] Update Defender HP

function updateHeroHP() {
	heroStats.hp = (heroStats.hp - defenderStats.cap);
	$(`#${heroID}-hp`).html(heroStats.hp);
}

function updateHeroAP() {
	heroStats.ap = (heroStats.ap + heroStats.origAP);
}

function updateDefHP() {
	defenderStats.hp = (defenderStats.hp - heroStats.ap);
	$(`#${defenderID}-hp`).html(defenderStats.hp);
}

// End Game
// [X] Hide Attack button
// [X] Display Restart button
// [X] Disable Character buttons
function endGame() {
	$(".attack").hide();
	$("#restart").show();
	$(".select-char").attr("disabled", true);
}

// ==================================================
// GAME PLAY
// ==================================================

$(document).ready(function () {

	// Start Game
	startGame();

	// Gameplay: Click a character
	// [X] Move clicked character to Your Character section
	// [X] Move remaining characters to Enemies Available to Attack
	// [X] Update instructions
	// [X] Set Hero stats

	$("#select-char-div").on("click", ".select-char", function () {
		if (hero === "") {
			// Move clicked character to Your Character section
			hero = $(this);
			hero.addClass("btn-success").attr("disabled", true);
			$("#your-char").append($(hero));
			heroID = $(hero).attr("id");

			// Move remaining characters to Enemies Available to Attack
			for (var i = 1; i < 5; i++) {
				enemy = $("#char" + [i]);
				enemyID = $(enemy).attr("id");
				if (enemyID !== heroID) {
					enemy.addClass("btn-primary");
					$("#avail-enemies").append(enemy);
					remEnemies++;
				}
			}

			// Update instructions
			$("#instructions").html("Select an enemy to fight!");

			// Set Hero stats
			heroStats = chars[heroID];

			console.log(`heroID = ${heroID} | ${heroStats.name}`);
			console.log(heroStats);
			console.log(`Remaining enemies = ${remEnemies}`);
		}
	});

	// Click enemy to attack
	// [X] Move clicked enemy to Defender 
	// [X] Clear fight description
	// [X] Enable Attack button
	// [X] Set Defender stats

	$("#avail-enemies").on("click", ".select-char", function () {
		if (hero !== "" && defender === "") {
			// Move clicked enemy to Defender 
			defender = $(this);
			defender.addClass("btn-danger").attr("disabled", true);
			$("#defender").append($(defender));
			defenderID = $(defender).attr("id");
			$(".attack").show();
		}

		// Clear fight description
		$("#fight-desc").hide().html("")

		// Enable Attack button
		$("#instructions").html("Attack!");

		// Set Defender stats
		defenderStats = chars[defenderID]

		console.log(`defenderID = ${defenderID} | ${defenderStats.name}`);
		console.log(defenderStats);

	});

	// Click Attack button
	// [X] If no enemy is in Defender area:
	//      [X] Update fight description:
	//          No enemy here.
	// [X] Else if defender exists:
	//      [X] Decrease defender HP by hero attack power + display html
	//      [X] If defender HP is <= 0 (DEFENDER DEFEATED)
	//          [X] Remove defender from defender area
	// 			[X] Decrease Remaining Enemies count
	//          [X] If Enemies Available = 0: (WIN GAME)
	//              [X] Update fight description:
	//                  You won!!! CONGRATULATIONS!!!
	// 				[X] End game: 
	//              	[X] Display "Restart" button
	//              	[X] Disable Attack button
	//          [X] Else: (ENEMIES AVAILABLE)
	//              [X] Update fight description:
	//                  You have defeated DEFENDER NAME, you can choose to fight another enemy.
	// 				[X] Reset Defender stats
	//      [X] Else: (DEFENDER STILL ALIVE)
	//          [X] Decrease hero HP by enemy attack power + display html
	//          [X] If hero HP is <= 0: (HERO DEFEATED)
	// 				[X] Fade hero image
	//              [X] Update fight description:
	//                  You have been defeated...GAME OVER!!!
	// 				[X] End game: 
	//					[X] Display "Restart" button
	// 					[X] Disable Attack button
	//          [X] Else: (HERO STILL ALIVE)
	//              [X] Update fight description with stats:
	//                  You attacked DEFENDER NAME for AP# damage.
	//                  DEFENDER NAME attacked you back for CAP# damage.
	//              [X] Increase hero attack power by base AP

	$(".attack").on("click", function () {
		// If no enemy is in Defender area
		if (hero !== "" && defender === "") {
			// Update fight description
			$("#fight-desc").show().html("No enemy to attack.");
		}

		// Else if defender exists
		else if (hero !== "" && defender !== "") {
			// Decrease defender HP by hero attack power + html
			updateDefHP()

			// If defender HP is <= 0 (DEFENDER DEFEATED)
			if (defenderStats.hp <= 0) {
				// Remove defender from defender area
				$("#" + defenderID).animate({ opacity: "0.5" });

				// Decrease Remaining Enemies count
				remEnemies--;
				console.log("Remaining enemies = " + remEnemies)

				// If Enemies Available = 0: (WIN GAME)
				if (remEnemies === 0) {
					// Update fight description
					$("#fight-desc").html(
						`<p>You won!!! CONGRATULATIONS!!!</p>`
					);
					// End Game
					endGame();
				}
				// Else: (ENEMIES AVAILABLE)
				else {
					// Update fight description
					$("#fight-desc").html(
						`<p>You have defeated ${defenderStats.name}! Choose another enemy to fight.</p>`
					);
					// Reset Defender stats
					newRound();
				}
			}

			// Else: (DEFENDER STILL ALIVE)
			else {
				// Decrease hero HP by enemy attack power + display html
				updateHeroHP();

				// If hero HP is <= 0: (HERO DEFEATED)
				if (heroStats.hp <= 0) {
					// Fade hero image
					$("#" + heroID).animate({ opacity: "0.5" });

					// Update fight description
					$("#fight-desc").show().html(
						`<p>You have been defeated...GAME OVER!!!</p>`
					);
					// End game
					endGame();
				}

				// Else: (HERO STILL ALIVE)
				else {
					// Update fight description with stats
					$("#fight-desc").show().html(
						`<p>You attacked ${defenderStats.name} for ${heroStats.ap} damage.</p>
				<p> ${defenderStats.name} attacked you back for ${defenderStats.cap} damage.</p>`
					);
					// Increase hero attack power by base AP
					updateHeroAP();
				}

			}

			console.log("Hero");
			console.log(heroStats);
			console.log("Defender");
			console.log(defenderStats);

		}
	})

	// Click Restart button
	// [X] Start game function
	$("#restart").on("click", function () {
		startGame();
	})

})
