class Sqrt {
    constructor(x, y, color, size, fColor) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.fColor = fColor;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.stroke();
    }

    flash() {
        ctx.fillStyle = this.fColor;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.stroke();

        setTimeout(this.draw(), 10000);
    }

    connect(target) {
        ctx.beginPath();
        ctx.moveTo(this.x + (this.size/2), this.y + (this.size/2));
        ctx.lineTo(target.x + (target.size/2), target.y + (target.size/2));
        ctx.stroke;
    }
}
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var squereOne = new Sqrt(25, 25, "#FF0000", 100, "#FF6666");
var squereTwo = new Sqrt(150, 25, "#FF0000", 100, "#FF6666");
squereOne.draw();
squereTwo.draw();
