/**
 * (C) 2016 printf.jp
 */
import PIXI =     require('pixi.js');
import electron = require('electron');

/**
 * main view
 */
class MainView
{
    private renderer : PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    private stage =    new PIXI.Container();
    private graphics = new PIXI.Graphics();
    private thing =    new PIXI.Graphics();
    private count = 0;

    /**
     * load event
     */
    onLoad()
    {
        // スクロールバーの領域が確保されてしまうことがあるので、最初は小さな領域を指定しておく（すぐにリサイズするので問題なし）
        const width =  10;//document.documentElement.clientWidth; 
        const height = 10;//document.documentElement.clientHeight; 

        const options : PIXI.RendererOptions =
        {
            antialias: true,
            backgroundColor: parseInt('000040', 16)
        };

        this.renderer = PIXI.autoDetectRenderer(width, height, options);
        const canvas = this.renderer.view;
        document.body.appendChild(canvas);

        // create the root of the scene graph
        this.stage.interactive = true;

        // set a fill and line style
        const g = this.graphics;
        g.beginFill(0xFF3300);
        g.lineStyle(10, 0xffd900, 1);

        // draw a shape
        g.moveTo( 50,  50);
        g.lineTo(250,  50);
        g.lineTo(100, 100);
        g.lineTo(250, 220);
        g.lineTo( 50, 220);
        g.lineTo( 50,  50);
        g.endFill();

        // set a fill and line style again
        g.lineStyle(10, 0xFF0000, 0.8);
        g.beginFill(0xFF700B, 1);

        // draw a second shape
        g.moveTo(210, 300);
        g.lineTo(450, 320);
        g.lineTo(570, 350);
        g.quadraticCurveTo(600, 0, 480, 100);
        g.lineTo(330, 120);
        g.lineTo(410, 200);
        g.lineTo(210, 300);
        g.endFill();

        // draw a rectangle
        g.lineStyle(2, 0x0000FF, 1);
        g.drawRect(50, 250, 100, 100);

        // draw a circle
        g.lineStyle(0);
        g.beginFill(0xFFFF0B, 0.5);
        g.drawCircle(470, 200, 100);
        g.endFill();

        g.lineStyle(20, 0x33FF00);
        g.moveTo( 30,  30);
        g.lineTo(600, 300);

        this.stage.addChild(g);

        // let's create a moving shape
        this.stage.addChild(this.thing);
        this.thing.position.x = 620 / 2;
        this.thing.position.y = 380 / 2;

        // Just click on the stage to draw random lines
        this.stage.on('click', this.onClick.bind(this));
        this.stage.on('tap',   this.onClick.bind(this));

        window.addEventListener('resize', this.onResize.bind(this));
        this.onResize();
        this.animate();

        // 起動時のちらつき防止（あまり意味がなかった）
        const wnd = electron.remote.getCurrentWindow();
        wnd.show();

        // 起動時のちらつき防止（フェードインでごまかし）
        setTimeout(() => document.body.classList.add('fade-in'), 0);
    }

    /**
     * click event
     */
    private onClick()
    {
        const g = this.graphics;
        const random = Math.random;

        g.lineStyle(    random() *  30, random() * 0xFFFFFF, 1);
        g.moveTo(       random() * 620, random() * 380);
        g.bezierCurveTo(random() * 620, random() * 380,
                        random() * 620, random() * 380,
                        random() * 620, random() * 380);
    }

    /**
     * resize event
     */
    private onResize()
    {
        const width =  document.documentElement.clientWidth; 
        const height = document.documentElement.clientHeight; 
        this.renderer.resize(width, height);
    }

    /**
     * アニメーション
     */
    private animate()
    {
        this.count += 0.1;
        const count = this.count;

        this.thing.clear();
        this.thing.lineStyle(10, 0xff0000, 1);
        this.thing.beginFill(0xffFF00, 0.5);

        this.thing.moveTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count) * 20);
        this.thing.lineTo( 120 + Math.cos(count) * 20, -100 + Math.sin(count) * 20);
        this.thing.lineTo( 120 + Math.sin(count) * 20,  100 + Math.cos(count) * 20);
        this.thing.lineTo(-120 + Math.cos(count) * 20,  100 + Math.sin(count) * 20);
        this.thing.lineTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count) * 20);

        this.thing.rotation = count * 0.1;
        this.renderer.render(this.stage);
        requestAnimationFrame(this.animate.bind(this));
    }
}

const view = new MainView();
document.addEventListener('DOMContentLoaded', view.onLoad.bind(view));
