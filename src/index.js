class ticTacToe {
  constructor(target) {
    this.target = document.getElementById(target);
    this.table = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    this.numberOfTurns = 1;
    this.image = "cross";
  }
  render() {
    this.renderTable();
    this.renderImagesContainter();
    this.renderImage(this.image);
    this.renderImage("zero");
    this.dragAndDrop(this.image);
    this.renderRestartButton();
  }
  renderTable = () => {
    const table = document.createElement("table");
    table.classList.add("tic-tac-toe");
    for (let i = 0; i < 3; i++) {
      const tr = document.createElement("tr");
      for (let j = 0; j < 3; j++) {
        const td = document.createElement("td");
        td.classList.add(`${i}${j}`);
        tr.append(td);
      }
      table.append(tr);
    }
    this.target.append(table);
  };

  renderImagesContainter = () => {
    const div = document.createElement("div");
    div.classList = "images-container";
    this.target.append(div);
  };
  renderRestartButton = () => {
    const button = document.createElement("button");
    button.classList = "restart-button";
    button.addEventListener("click", this.restart);
    button.textContent = "restart";
    this.target.append(button);
  };
  toggleImage = () => {
    if (this.image === "cross") {
      this.image = "zero";
    } else {
      this.image = "cross";
    }
  };
  fillTable = (i, j) => {
    if (this.image === "cross") {
      this.table[i][j] = 1;
    } else {
      this.table[i][j] = 2;
    }
  };

  renderImage = className => {
    const image = document.createElement("img");
    const container = this.target.getElementsByClassName("images-container")[0];
    image.classList.add(className);
    image.width = 50;
    if (className === "cross") {
      image.src = "./cross.jpg";
      container.prepend(image);
    } else {
      image.src = "./zero.jpg";
      container.append(image);
    }
  };
  dragAndDrop = className => {
    let image = Array.from(this.target.getElementsByClassName(className))[0];
    let clone = false;
    image.onmousedown = e => {
      const getCoords = elem => {
        let box = elem.getBoundingClientRect();
        return {
          top: box.top + pageYOffset,
          left: box.left + pageXOffset
        };
      };
      var coords = getCoords(image);
      var shiftX = e.pageX - coords.left;
      var shiftY = e.pageY - coords.top;
      image.style.position = "absolute";
      if (!clone) {
        this.renderImage(this.image);
        clone = true;
      }

      const moveAt = e => {
        image.style.left = e.pageX - shiftX + "px";
        image.style.top = e.pageY - shiftY + "px";
      };

      moveAt(e);

      image.style.zIndex = 1000;

      document.onmousemove = e => {
        moveAt(e);
      };

      image.onmouseup = () => {
        document.onmousemove = null;
        image.onmouseup = null;

        this.checkPosition(image);
      };
      image.ondragstart = () => {
        return false;
      };
    };
  };
  restart = () => {
    Array.from(this.target.getElementsByTagName("td")).map(elem => {
      while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
      }
    });
    this.table = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    this.numberOfTurns = 1;
    this.image = "cross";
    const container = this.target.getElementsByClassName("images-container")[0];
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    this.renderImage(this.image);
    this.renderImage("zero");
    this.dragAndDrop(this.image);
  };
  checkPosition = image => {
    const table = Array.from(
      this.target.getElementsByClassName("tic-tac-toe")
    )[0];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const td = table.getElementsByClassName(`${i}${j}`)[0];
        if (
          Math.abs(parseInt(image.style.left) - td.offsetLeft) < 20 &&
          Math.abs(parseInt(image.style.top) - td.offsetTop) < 20 &&
          !td.firstChild
        ) {
          this.fillTable(i, j);
          this.toggleImage();
          image.style.position = "";
          image.classList = "";
          td.append(image.cloneNode(true));
          image.remove();
          if (this.numberOfTurns < 9) {
            this.dragAndDrop(this.image);
            this.numberOfTurns++;
          }
          return true;
        }
      }
    }
  };
}

const ticTac = new ticTacToe("target");
ticTac.render();
