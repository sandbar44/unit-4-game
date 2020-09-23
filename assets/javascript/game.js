// Psuedo Code
// 
// Start game
// [] All characters available
// [] Full health
// [] Reset hero attack power = base attack power
// [] Starting instructions
// [] Disable Attack button
// 
// Click a character
// [] Move clicked character to Your Character section
// [] Move remaining characters to Enemies Available to Attack
// [] Update instructions
// 
// Click enemy to attack
// [] Move clicked enemy to Defender 
// [] Clear fight description
// [] Enable Attack button
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
// Character objects
// [] Name
// [] Image
// [] HP
// [] Attack Power (base)
// [] Counter Attack Power (enemy)
// [] Attack Power (updated)
// 
// 
// 
