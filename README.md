## Buggy Hop

Buggy Hop is a Frogger clone game. It was built to improve my JavaScript skills as part of Udacity's Front-End Nanodegree.

### Rules

The main objective is to hop your way from the grass to the water while avoiding the enemy bugs. Once the water is reached the player is brought back to the grass for another round of hopping. The player has three lives to work with. The player loses a life each time he/she hops into a square containing a bug. 

#### Gems

Gems can be picked up by walking over them. There are always two gems randomly placed on the stone squares. Whenever a gem is picked up a new gem is generated to replace it. Gems are needed to advance levels.
* Oracle Gem: The most common gem. Worth one point per level
* Green Gem: A rarer gem. Worth two points per level
* Blue Gem: The rarest gem. Worth three points per level 

#### Levels

By picking up at least one of each colored gem a player advances to the next level. The game play difficulty increases with each new level. The points received for hopping and picking up gems increases with each level.

#### Points

A scoreboard at the top of the playing surface keeps track of the total points accumulated by the player. after each level the gem counts a reset, but the total score keeps track of all the points accumulated from past levels.

* A player receives a point for each square advanced multipled by the current level.
* A player receives a point for each orange gem collected multipled by the current level.
* A player receives two points for each green gem collected multipled by the current level.
* A player receives three points for each blue gem collected multipled by the current level.


