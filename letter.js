const PI2 = Math.PI * 2;

export class Letter {
    constructor(x,y,radius,sides) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.sides = sides;
        this.rotate = 0;
        this.isHovered = false;
        this.isClicked = false;

        this.canvas = document.querySelector('canvas');
        this.canvas.addEventListener('pointerenter', this.onEnter.bind(this), false);
        this.canvas.addEventListener('pointerleave', this.onLeave.bind(this), false);
    }

    animate(ctx, moveX) {
        ctx.save();
        ctx.fillStyle = this.isClicked ? '#F9B1B1' : (this.isHovered ? '#F05959' : '#F9B1B1');
        ctx.beginPath();
    
        const angle = PI2 / this.sides;
        const angle2 = PI2 / 4;
        

        ctx.translate(this.x , this.y);

        this.rotate += moveX * 0.004;
        ctx.rotate(this.rotate);
        

        for (let i = 0; i <this.sides; i++) {
            const x = this.radius * Math.cos(angle * i);
            const y = this.radius * Math.sin(angle * i);

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(((360 / this.sides) * i + 45) * Math.PI / 180);
            ctx.beginPath();
            for (let j = 0; j < 4; j++) {
                const x2 = 80 * Math.cos(angle2 * j);
                const y2 = 80 * Math.sin(angle2 * j);
                (j == 0) ? ctx.moveTo(x2,y2) : ctx.lineTo(x2,y2);
            }
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }

        
        ctx.restore();
    }

    onEnter() {
        this.isHovered = true;
    }

    onLeave() {
        this.isHovered = false;
    }

    checkClick(x, y) {
        this.isClicked = this.buttonRectangles.some(rect => x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height);
        if (this.isClicked) {
            console.log('Button Clicked!');
            // 여기에서 클릭된 버튼에 대한 동작을 수행하면 됩니다.
        }
    }
}
