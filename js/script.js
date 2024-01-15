function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();
  translate(width / 2, height / 2);
  scr = new thunder(15);
  scr.Generate_the_thunderList();
}

setInterval(function () {
  scr.Traverse_the_List();
  scr.Refresh_the_List();
}, 50);

class thunder {
  constructor(thunderNum) {
    this.tn = thunderNum;
    this.thunderList = new Array();
  }
  Generate_the_thunderList() {
    for (let i = 0; i < this.tn; i++) {
      let wid = random(Array.from({ length: 4 }, (item, index) => index + 5));
      let thunder = new Array();
      for (let j = 0; j < wid * 2 - 2; j++) {
        let angle = random(TWO_PI);
        let len = random(100);
        let section = [angle, len, wid - 0.5 * j];
        thunder.push(section);
      }
      this.thunderList.push(thunder);
    }
  }

  //refresh
  Refresh_the_List() {
    this.thunderList.shift();
    let wid = random(Array.from({ length: 4 }, (item, index) => index + 5));
    let thunder = new Array();
    for (let j = 0; j < wid * 2 - 2; j++) {
      let angle = random(TWO_PI);
      let len = random(100);
      let section = [angle, len, wid - 0.5 * j];
      thunder.push(section);
    }
    this.thunderList.push(thunder);
  }

  //color
  Traverse_the_List() {
    for (let thunder of this.thunderList) {
      push();
      for (let section of thunder) {
        fill(
          max(
            ((this.thunderList.indexOf(thunder) - 1) /
              this.thunderList.length) *
              255 +
              (1 -
                (thunder.indexOf(section) + thunder.length - 2) /
                  thunder.length) *
                150,
            0
          )
        );
        rotate(section[0]);
        rect(0, -section[2] / 2, section[1], section[2]);
        translate(section[1], 0);
        ellipse(0, 0, section[2]);
      }
      pop();
    }
  }
}
