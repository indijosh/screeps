var roleBuilder = require('role.lorry');

module.exports = {
  // a function to run the logic for this role
  /** @param {Creep} creep */
  run: function(creep) {
    // if creep is bringing minerals to a structure but has no minerals left
    if (creep.memory.working == true && _.sum(creep.carry) == 0) {
      // switch state
      creep.memory.working = false;
    }

    // if creep is harvesting minerals but is full
    else if (creep.memory.working == false && _.sum(creep.carry) == creep.carryCapacity) {
      // switch state
      if (creep.ticksToLive > 99) {
        creep.memory.working = true;
      }
    }

    // if creep is supposed to transfer minerals to a structure
    if (creep.memory.working == true) {
      let mineralSources = creep.room.find(FIND_MINERALS);
      var mineral = mineralSources[0].mineralType;

      // find out if the terminal needs resources
      var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: s => (s.structureType == STRUCTURE_TERMINAL)
      });

      // if (structure == undefined) {
      //   // find closest lab, extend to container later?
      //   structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
      //     filter: (s) => (s.structureType == STRUCTURE_LAB) &&
      //       s.mineralAmount < s.mineralCapacity
      //   });
      // }

      // if we found one
      if (structure != undefined) {
        // try to transfer minerals, if it is not in range
        if (creep.transfer(structure, mineral) == ERR_NOT_IN_RANGE) {
          // move towards it
          creep.travelTo(structure);
        }
      }
    }

    // if creep is supposed to harvest minerals from source
    else {
      // find out if the container by the extractor is empty
      let mineralSources = creep.room.find(FIND_MINERALS);
      let source = Game.getObjectById(mineralSources[0].id);
      if (source != undefined) {
        // find container next to source if it has hydrogen
        let container = source.pos.findInRange(FIND_STRUCTURES, 1, {
          filter: s => (s.structureType == STRUCTURE_CONTAINER)
        })[0];
        if(container != undefined){
          var mineral = mineralSources[0].mineralType;
          // withdraw mineral from container
          if (container.store[mineral] > 0) {
            if (creep.withdraw(container, mineral) == ERR_NOT_IN_RANGE) {
              creep.travelTo(container);
            }
          }
          else {
            if (container) {
              if (creep.pos.isEqualTo(container.pos)) {
                // harvest source
                creep.harvest(source)
              }
              // if creep is not on top of the container
              else {
                // move towards it
                creep.travelTo(container);
              }
            }
          }
        }
      }
    }
  }
};
