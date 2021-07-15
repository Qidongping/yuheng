import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../../service.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public service:ServiceService) { }

  ngOnInit(): void {
    this.getCanvas()
  }
  getCanvas(){
    let canvas=document.getElementById('canvas') as HTMLCanvasElement;
    let ctx:any;
    if(canvas!=null){
       ctx=canvas.getContext('2d')
    }
   let width=window.innerWidth;
   let height=window.innerHeight;
   let dotsNum=80;
   let radius=1
   console.log(radius);
   
   let fillStyle='rgba(255,255,255,0.5)';
   let linWidth=radius*2;
   let connection=120;
   let followLength=80;
    let dots:any[]=[];
    let animationFrame:any
    let mouseX: number | null=null;
    let mouseY:number| null=null;
    function addCanvasSize(){
      width=window.innerWidth;
      height=window.innerHeight;
      canvas.width=width;
      canvas.height=height;
      ctx.clearRect(0,0,width,height)
      dots=[];
      if(animationFrame) window.clearTimeout(animationFrame)
      initDots(dotsNum)
      moveDots()
    }
    class Dot{
      x:any;
      y:any;
      speedX:any;
      speedY:any;
      follow:boolean | undefined
      constructor(x:any,y:any){
        this.x=x;
        this.y=y;
        this.speedX=Math.random()*2-1;
        this.speedY=Math.random()*2-1
        this.follow=false;
      }
      draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,radius,0,2*Math.PI)
        ctx.fill();
        ctx.closePath();
      }
      move(){
        if(this.x>=width||this.x<=0) this.speedX=-this.speedX;
        if(this.y>=height||this.y<=0) this.speedY=-this.speedY;
        this.x+=this.speedX;
        this.y+=this.speedY;
        if(this.speedX>=20) this.speedX--;
        if(this.speedX<=-20) this.speedX++;
        if(this.speedY>=20) this.speedY--;
        if(this.speedY<=-20) this.speedY++;
        this.correct();
        this.connectMouse();
        this.draw()
      }
      correct(){
        if(!mouseX||!mouseY) return;
        let lengthX=mouseX-this.x;
        let lengthY=mouseY-this.y;
        const distance=Math.sqrt(lengthX **2+lengthY**2)
        if(distance<=followLength) this.follow=true;
        else if(this.follow==true&&distance>followLength&&distance<=followLength+8){
          let proportion=followLength/distance;
          lengthX*=proportion;
          lengthY*=proportion;
          this.x=mouseX-lengthX;
          this.y=mouseY-lengthY;

        }else this.follow=false;
      }
      connectMouse(){
        if(mouseX&&mouseY){
          let lengthX=mouseX-this.x;
          let lengthY=mouseY-this.y;
          const distance=Math.sqrt(lengthX**2+lengthY**2)
          if(distance<=connection){
            var opacity=(1-distance/connection)*0.5;
            ctx.strokeStyle=`rgba(255,255,255,${opacity})`
            ctx.beginPath();
            ctx.moveTo(this.x,this.y)
            ctx.lineTo(mouseX,mouseY)
            ctx.stroke();
            ctx.closePath();

          }
        }
      }
      elastic(){
        if(!mouseX||!mouseY) return;
       let lengthX=mouseX-this.x;
       let lengthY=mouseY-this.y;
       const distance=Math.sqrt(lengthX**2+lengthY**2)
       if(distance>=connection) return;
       const rate=1-distance/connection;
       this.speedX=40*rate*-lengthX/distance;
       this.speedY=40*rate-lengthY/distance;
      }
    }
    function initDots(num:any){
      ctx.fillStyle=fillStyle;
      ctx.lineWidth=linWidth;
      for(let i=0;i<num;i++){
        const x=Math.floor(Math.random()*width)
        const y=Math.floor(Math.random()*height)
        const dot=new Dot(x,y)
        dot.draw();
        dots.push(dot)
      }
    }
    function moveDots(){
      ctx.clearRect(0,0,width,height)
      for(const dot of dots){
        dot.move()
      }
      // for(let i=0;i<dots.length;i++){
      //   for(let j=0;j<dots.length;j++){
      //     const distance=Math.sqrt((dots[i].x-dots[j].x)**2+(dots[i].y-dots[j].y)**2)
      //     if(distance<=connection){
      //       var opacity=(1-distance/connection)*0.5;
      //       ctx.strokeStyle=`rgba(255,255,255,${opacity})`
      //       ctx.beginPath();
      //       ctx.moveTo(dots[i].x,dots[i].y)
      //       ctx.lineTo(dots[j].x,dots[j].y)
      //       ctx.stroke();
      //       ctx.closePath()
      //     }
      //   }
      // }
      // animationFrame=window.requestAnimationFrame(moveDots)
      animationFrame=setTimeout(() => {
        moveDots()
      }, 40);
    }
    addCanvasSize();
    initDots(dotsNum)
    moveDots();
    function mouseMove(e:any){
      mouseX=e.clientX;
      mouseY=e.clientY;

    }
    function mouseOut(e:any){
      mouseX=null;
      mouseY=null;
    }
    function mouseClick(){
      for(const dot of dots) dot.elastic()
    }
    document.onmousemove = mouseMove
  document.onmouseout = mouseOut
  document.onclick = mouseClick
  window.onresize = addCanvasSize
    
  }
  login(){
    this.service.loginflag=true;
  }
}
