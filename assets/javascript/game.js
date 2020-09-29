// Psuedo Code
// 

$(document).ready(function () {



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
	var heroStats = {
		name: "",
		hp: "",
		bap: "",
		ap: ""
	};

	var enemy = "";
	var remEnemies = 0;
	var enemyID = "";

	var defender = "";
	var defenderID = "";
	var defenderStats = {
		name: "",
		hp: "",
		cap: ""
	};

	var chars = {
		char1: {
			name: "Rey",
			hp: 120,
			ap: 8,
			counterAP: 24
		},
		char2: {
			name: "Boba Fett",
			hp: 100,
			ap: 10,
			counterAP: 5
		},
		char3: {
			name: "Count Dooku",
			hp: 150,
			ap: 10,
			counterAP: 20
		},
		char4: {
			name: "Darth Maul",
			hp: 100,
			ap: 12,
			counterAP: 25
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
			$("#select-char-div").append(char)
		}

		// Reset character formatting
		$(".select-char")
			.removeClass("btn-success btn-primary btn-danger")
			.removeAttr("disabled style")

		// Reset all character stats
		hero = "";
		heroID = "";
		heroStats = {
			name: "",
			hp: "",
			bap: "",
			ap: ""
		};

		enemy = "";
		remEnemies = 0;
		enemyID = "";

		defender = "";
		defenderID = "";
		defenderStats = {
			name: "",
			hp: "",
			cap: ""
		};

		$("#char1-hp").html(chars.char1.hp);
		$("#char2-hp").html(chars.char2.hp);
		$("#char3-hp").html(chars.char3.hp);
		$("#char4-hp").html(chars.char4.hp);

		// Starting instructions
		$("#instructions").html("Select a character to begin.")

		// Disable Attack button
		$(".attack").hide();

		// Hide Fight description
		$("#fight-desc").hide();

		// Disable Restart button
		$("#restart").hide();
	}

	// New round
	// [X] Reset defender stats
	function newRound() {
		defender = "";
		defenderID = "";
		defenderStats = {};
		console.log(defenderStats)
	}

	// Update stats
	// [X] Update Hero HP
	// [X] Update Hero AP
	// [X] Update Defender HP

	function updateHeroHP() {
		heroStats.hp = (heroStats.hp - defenderStats.cap);
		$("#" + heroID + "-hp").html(heroStats.hp);
		console.log(heroStats.hp);
	}

	function updateHeroAP() {
		heroStats.ap = (heroStats.ap + heroStats.bap)
	}

	function updateDefHP() {
		console.log(heroStats.hp);
		defenderStats.hp = (defenderStats.hp - heroStats.ap);
		$("#" + defenderID + "-hp").html(defenderStats.hp);
		console.log(defenderStats)
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

	// Click a character
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
			console.log("heroID = " + heroID);

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
			console.log(remEnemies)

			// Update instructions
			$("#instructions").html("Select an enemy to fight!");

			// Set Hero stats
			if (heroID === "char1") {
				heroStats.hp = chars.char1.hp;
				heroStats.bap = chars.char1.ap;
				heroStats.ap = heroStats.bap;
			}
			else if (heroID === "char2") {
				heroStats.hp = chars.char2.hp;
				heroStats.bap = chars.char2.ap;
				heroStats.ap = heroStats.bap;
			}
			else if (heroID === "char3") {
				heroStats.hp = chars.char3.hp;
				heroStats.bap = chars.char3.ap;
				heroStats.ap = heroStats.bap;
			}
			else if (heroID === "char4") {
				heroStats.hp = chars.char4.hp;
				heroStats.bap = chars.char4.ap;
				heroStats.ap = heroStats.bap;
			}
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
			console.log("defenderID = " + defenderID);
			$(".attack").show();
		}

		// Clear fight description
		$("#fight-desc").hide().html("")

		// Enable Attack button
		$("#instructions").html("Attack!");

		// Set Defender stats
		if (defenderID === "char1") {
			defenderStats.name = chars.char1.name;
			defenderStats.hp = chars.char1.hp;
			defenderStats.cap = chars.char1.counterAP;
			console.log(defenderStats)
		}
		else if (defenderID === "char2") {
			defenderStats.name = chars.char2.name;
			defenderStats.hp = chars.char2.hp;
			defenderStats.cap = chars.char2.counterAP;
			console.log(defenderStats)
		}
		else if (defenderID === "char3") {
			defenderStats.name = chars.char3.name;
			defenderStats.hp = chars.char3.hp;
			defenderStats.cap = chars.char3.counterAP;
			console.log(defenderStats)
		}
		else if (defenderID === "char4") {
			defenderStats.name = chars.char4.name;
			defenderStats.hp = chars.char4.hp;
			defenderStats.cap = chars.char4.counterAP;
			console.log(defenderStats)
		}

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
				console.log(remEnemies);

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
		}
	})

	// Click Restart button
	// [X] Start game function
	$("#restart").on("click", function () {
		startGame();
	})

	// 
	// Start Game
	startGame();
})
