class Elevator {
  constructor(id) {
    this.id = id;
    this.currentFloor = 0;
    this.targetFloors = [];
    this.direction = 'idle';
  }

  addTarget(floor) {
    if (!this.targetFloors.includes(floor)) {
      this.targetFloors.push(floor);
      this.sortTargets();
    }
  }

  sortTargets() {
    if (this.direction === 'up') {
      this.targetFloors.sort((a, b) => a - b);
    } else if (this.direction === 'down') {
      this.targetFloors.sort((a, b) => b - a);
    } else {
      if (this.targetFloors.length > 0) {
        const next = this.targetFloors[0];
        this.direction = next > this.currentFloor ? 'up' : 'down';
        this.sortTargets();
      }
    }
  }

  step() {
    if (this.targetFloors.length === 0) {
      this.direction = 'idle';
      return;
    }

    const target = this.targetFloors[0];
    if (this.currentFloor === target) {
      this.targetFloors.shift();
      if (this.targetFloors.length === 0) {
        this.direction = 'idle';
      } else {
        this.sortTargets(); // 继续排序
      }
    } else {
      this.direction = this.currentFloor < target ? 'up' : 'down';
      this.currentFloor += this.direction === 'up' ? 1 : -1;
    }
  }

  isIdle() {
    return this.targetFloors.length === 0;
  }
}

class Controller {
  constructor(numElevators) {
    this.elevators = Array.from({ length: numElevators }, (_, i) => new Elevator(i));
    this.pendingRequests = [];
  }

  handleRequest(floor) {
    const elevator = this.assignElevator(floor);
    if (elevator) {
      elevator.addTarget(floor);
    } else {
      this.pendingRequests.push(floor); // 无法立即分配
    }
  }

  assignElevator(floor) {
    // 最简单策略：选第一个空闲的
    return this.elevators.find(e => e.isIdle());
  }

  tick() {
    this.elevators.forEach(e => e.step());
  }
}

// const e = new Elevator(1);
// e.currentFloor = 0;
// e.addTarget(3);
// for (let i = 0; i < 5; i++) {
//   console.log(`Step ${i}: Floor = ${e.currentFloor}, Direction = ${e.direction}`);
//   e.step();
// }

// const e2 = new Elevator(2);
// e2.currentFloor = 1;
// e2.addTarget(4);
// e2.addTarget(2);

// for (let i = 0; i < 7; i++) {
//   console.log(`Step ${i}: Floor = ${e2.currentFloor}, Targets = ${e2.targetFloors}`);
//   e2.step();
// }

// const c = new Controller(2);
// c.elevators[0].currentFloor = 0;
// c.elevators[1].currentFloor = 5;

// c.handleRequest(3); // 用户请求前往 3 楼

// for (let i = 0; i < 5; i++) {
//   console.log(`Step ${i}`);
//   c.elevators.forEach(e => {
//     console.log(`Elevator ${e.id}: Floor = ${e.currentFloor}, Targets = ${e.targetFloors}`);
//   });
//   c.tick();
// }

// const c2 = new Controller(2);
// c2.elevators[0].currentFloor = 0;
// c2.elevators[1].currentFloor = 10;

// c2.handleRequest(2);
// c2.handleRequest(8);

// for (let i = 0; i < 10; i++) {
//   console.log(`Step ${i}`);
//   c2.elevators.forEach(e => {
//     console.log(`Elevator ${e.id}: Floor = ${e.currentFloor}, Targets = ${e.targetFloors}`);
//   });
//   c2.tick();
// }

const e = new Elevator(1);
e.currentFloor = 1;
e.addTarget(5);
e.addTarget(3);  // 应该排在 5 前

for (let i = 0; i < 10; i++) {
  console.log(`Step ${i}: Floor = ${e.currentFloor}, Targets = [${e.targetFloors}], Direction = ${e.direction}`);
  e.step();
}