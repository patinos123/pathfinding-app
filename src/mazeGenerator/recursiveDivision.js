import React from "react";

let grid;
let animateGrid = [];
let gapsArr = [];

class RecursiveDivision extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  generate(props) {
    animateGrid = [];
    props.clearBoard();
    grid = props.grid;
    grid = props.getInitialGrid();
    props.updateGridState(grid);

    this.addOuterWalls();
    this.addInnerWalls(true, 1, grid[0].length - 2, 1, grid.length - 2);
    this.display(props);
  }

  addOuterWalls() {
    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < grid[i].length; j++) {
        if (i === 0 || i === grid.length - 1) {
          animateGrid.push(grid[i][j]);
        } else if (j === 0 || j === grid[i].length - 1) {
          animateGrid.push(grid[i][j]);
        }
      }
    }
  }

  addInnerWalls(h, minX, maxX, minY, maxY) {
    if (h) {
      if (maxX - minX < 2) {
        return;
      }

      var y = Math.floor(this.randomNumber(minY, maxY) / 2) * 2;
      this.addHWall(minX, maxX, y);

      this.addInnerWalls(!h, minX, maxX, minY, y - 1);
      this.addInnerWalls(!h, minX, maxX, y + 1, maxY);
    } else {
      if (maxY - minY < 2) {
        return;
      }

      var x = Math.floor(this.randomNumber(minX, maxX) / 2) * 2;
      this.addVWall(minY, maxY, x);

      this.addInnerWalls(!h, minX, x - 1, minY, maxY);
      this.addInnerWalls(!h, x + 1, maxX, minY, maxY);
    }
  }

  addHWall(minX, maxX, y) {
    var hole = Math.floor(this.randomNumber(minX, maxX) / 2) * 2 + 1;
    gapsArr.push(grid[y][hole]);

    for (var i = minX; i <= maxX; i++) {
      if (i !== hole) {
        animateGrid.push(grid[y][i]);
      }
    }
  }

  addVWall(minY, maxY, x) {
    var hole = Math.floor(this.randomNumber(minY, maxY) / 2) * 2 + 1;
    gapsArr.push(grid[hole][x]);

    for (var i = minY; i <= maxY; i++) {
      if (i !== hole) {
        animateGrid.push(grid[i][x]);
      }
    }
  }

  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async display(props) {
    props.setSerachingState(true);

    // const differenceArray = animateGrid.filter(x => !gapsArr.includes(x));

    for (let i = 0; i < animateGrid.length; i++) {
      await this.task(animateGrid, i);
      animateGrid[i].isWall = true;
    }

    gapsArr.map(el => {
      return (el.isWall = false);
      // document.getElementById(`node-${el.row}-${el.col}`).className = "node ";
    });

    props.setSerachingState(false);
  }

  async task(animateGrid, i) {
    await this.timer(1);
    const node = animateGrid[i];
    document.getElementById(`node-${node.row}-${node.col}`).className =
      "node node__wall";
  }

  timer(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  render() {
    const props = this.props;
    return (
      <button disabled={props.disabled} onClick={() => this.generate(props)}>
        Revursive Division
      </button>
    );
  }
}

export default RecursiveDivision;
