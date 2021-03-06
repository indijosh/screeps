// create a new function for StructureTower
StructureLink.prototype.findLinkType = function() {
  let isMinerLink = this.pos.findInRange(FIND_SOURCES, 2)[0];
  if (isMinerLink != undefined) {
    if (this.energy == this.energyCapacity && this.cooldown == 0) {
      var controllerLink = this.findControllerLink();
      if (controllerLink != undefined || controllerLink.energy == storageLink.energyCapacity ){
        var availableStorageSpace = controllerLink.energyCapacity - controllerLink.energy;
        this.transferEnergy(controllerLink, availableStorageSpace);
      }
      else{
        var storageLink = this.findStorageLink();
        if (storageLink != undefined) {
          var availableStorageSpace = storageLink.energyCapacity - storageLink.energy;
          this.transferEnergy(storageLink, availableStorageSpace);
        }
      }
    }
  } else {
    let isStorageLink = this.pos.findInRange(FIND_STRUCTURES, 2, {
      filter: s => s.structureType == STRUCTURE_STORAGE
    })[0];

    if (isStorageLink != undefined) {
      if (this.room.energyAvailable == this.room.energyCapacityAvailable && this.energy > 0 && this.cooldown == 0) {
        var controllerLink = this.findControllerLink();
        if (controllerLink != undefined) {
          var availableStorageSpace = controllerLink.energyCapacity - controllerLink.energy;
          this.transferEnergy(controllerLink, availableStorageSpace);
        }
      }
    }
  }
};
StructureLink.prototype.findStorageLink = function() {
  var links = _.filter(this.room.find(FIND_STRUCTURES), s => s.structureType == STRUCTURE_LINK);
  // for each link in the room
  for (let link of links) {
    let isStorageLink = link.pos.findInRange(FIND_STRUCTURES, 2, {
      filter: s => s.structureType == STRUCTURE_STORAGE
    })[0];
    if (isStorageLink != undefined) {
      return link
    }
  }
};
StructureLink.prototype.findControllerLink = function() {
  var links = _.filter(this.room.find(FIND_STRUCTURES), s => s.structureType == STRUCTURE_LINK);
  // for each link in the room
  for (let link of links) {
    let isControllerLink = link.pos.findInRange(FIND_STRUCTURES, 2, {
      filter: s => s.structureType == STRUCTURE_CONTROLLER
    })[0];
    if (isControllerLink != undefined) {
      return link
    }
  }
};
