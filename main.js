// import modules
require('prototype.creep');
require('prototype.tower');
require('prototype.spawn');

var minHarvester = 0;
var minUpgrader = 2;
var minBuilder = 1;
var minRepairer = 1;
var minLorry = 2;
var minClaimer = 0;
var minAttacker = 1;
var minWallRepairer = 1;
var minLongDistanceHarvester = 1;
var minNumberOfNewRoomBuilders = 0;

var Room1 = 'E61S92';
var Room2 = 'E61S91';

module.exports.loop = function() {
  //console.log(Game.spawns.Spawn2.memory);
  //UNCOMMENT THIS TO RESET MEMORY
  //Game.spawns.Spawn1.memory.minCreeps = { harvester: minHarvester, upgrader: minUpgrader, builder: minBuilder, repairer: minRepairer, lorry: minLorry, claimer: minClaimer, attacker: minAttacker };
  //Game.spawns.Spawn2.memory.minCreeps = { harvester: minHarvester, upgrader: minUpgrader, builder: minBuilder, repairer: minRepairer, lorry: minLorry, claimer: minClaimer };
  Game.spawns.Spawn1.memory.roomsMining = {E61S92: '', E62S92: ''};
  //Game.spawns.Spawn2.memory.minLongDistanceHarvesters = {E62S91: minLongDistanceHarvester};
  //Game.spawns.Spawn1.memory.minNewRoomBuilders = {E61S91:minNumberOfNewRoomBuilders };

  // check for memory entries of died creeps by iterating over Memory.creeps
  for (let name in Memory.creeps) {
    // and checking if the creep is still alive
    if (Game.creeps[name] == undefined) {
      // if not, delete the memory entry
      delete Memory.creeps[name];
    }
  }

  // for each creeps
  for (let name in Game.creeps) {
    // run creep logic
    Game.creeps[name].runRole();
  }

  // find all towers
  var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
  // for each tower
  for (let tower of towers) {
    // run tower logic
    tower.defend();
  }

  // for each spawn
  for (let spawnName in Game.spawns) {
    // run spawn logic
    Game.spawns[spawnName].spawnCreepsIfNecessary();
  }
};
