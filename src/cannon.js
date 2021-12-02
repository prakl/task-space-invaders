import Rectangle from "./geometryObject/rectangle";
import Point from "./geometryObject/Point";

export default class Cannon {
  constructor(x, y, sprite,hp = 3) {
    this.x = x;
  	this.y = y;
    this._sprite = sprite;
    this.hp = hp;
  }

  get Boundary(){
    let [boundaryWidth,boundaryHeight] = this._sprite.size;
    return new Rectangle(this.x,this.y,boundaryWidth,boundaryHeight);
  }

  center() {
    let [w,h] = this._sprite.size;
    return new Point(this.x + w / 2, this.y + h / 2, this)
  }



  draw(ctx, time) {
    ctx.drawImage(
      this._sprite.img,
      this._sprite.x, this._sprite.y, this._sprite.w, this._sprite.h,
      this.x, this.y, this._sprite.w, this._sprite.h
    );
  }
}
