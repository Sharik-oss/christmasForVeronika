import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Application,
  Assets,
  BlurFilter,
  Container,
  Graphics,
  Sprite,
} from 'pixi.js';
import { ScrollSectionComponent } from '../scroll-section/scroll-section.component';
import { texture } from '../second-page.contant';

@Component({
  selector: 'app-second-page',
  imports: [ScrollSectionComponent],
  templateUrl: './second-page.component.html',
  styleUrl: './second-page.component.scss',
})
export class SecondPageComponent implements AfterViewInit, OnInit {
  @ViewChild('secondpage', { static: true })
  canvasElement?: ElementRef<HTMLCanvasElement>;
  private app = new Application();
  private groundContainer: Container = new Container();
  fullMoonContainer: Container = new Container();
  fullMoon: Sprite = new Sprite();

  private config = {
    canvas: {
      width: 800,
      height: 600,
      backgroundColor: '#001f3f',
    },
    snowflakes: {
      count: 200,
      properties: {
        minSize: 2,
        maxSize: 8,
        speedRange: [1, 3],
        color: '#ffffff',
        opacityRange: [0.5, 1.0],
      },
    },
    animation: {
      wind: {
        min: -0.5,
        max: 0.5,
      },
    },
  };
  snowflakes: any = [];
  constructor() { }

  ngAfterViewInit(): void {
    this.initPixi();
    this.playSong()

  }

  ngOnInit(): void {
  }

  async initPixi() {
    Assets.loadBundle([]).then(async (ids: any) => {
      await this.app.init({
        height: this.canvasElement?.nativeElement.offsetHeight ?? 0,
        width: this.canvasElement?.nativeElement.offsetWidth ?? 0,
        antialias: true,
        backgroundAlpha: 0,
        resizeTo: this.canvasElement?.nativeElement,
      });
      this.canvasElement?.nativeElement.appendChild(this.app.canvas);
      this.createSnowflakes();
      (globalThis as any).__PIXI_APP__ = this.app;
      this.app.ticker.add(() => this.animateSnowflakes());
    });
  }

  async init() {
    await Assets.load(['snowfall.json']);
    const animations = Assets.cache.get('snowfall.json');
  }

  createSnowflakes() {
    for (let i = 0; i < this.config.snowflakes.count; i++) {
      const size =
        Math.random() *
        (this.config.snowflakes.properties.maxSize -
          this.config.snowflakes.properties.minSize) +
        this.config.snowflakes.properties.minSize;

      const speed =
        Math.random() *
        (this.config.snowflakes.properties.speedRange[1] -
          this.config.snowflakes.properties.speedRange[0]) +
        this.config.snowflakes.properties.speedRange[0];

      const opacity =
        Math.random() *
        (this.config.snowflakes.properties.opacityRange[1] -
          this.config.snowflakes.properties.opacityRange[0]) +
        this.config.snowflakes.properties.opacityRange[0];

      const snowflake: any = new Graphics();
      snowflake
        .circle(0, 0, size)
        .fill(this.config.snowflakes.properties.color, opacity);

      if (size > this.config.snowflakes.properties.maxSize * 0.7) {
        const blurFilter = new BlurFilter();
        blurFilter.strength = size / 3;
        snowflake.filters = [blurFilter];
      }

      snowflake.x =
        Math.random() * (this.app.canvas.width || window.innerWidth);
      snowflake.y =
        Math.random() * (this.app.canvas.height || window.innerHeight);

      snowflake['size'] = size;
      snowflake['speed'] = speed;
      snowflake['wind'] =
        Math.random() *
        (this.config.animation.wind.max - this.config.animation.wind.min) +
        this.config.animation.wind.min;

      this.snowflakes.push(snowflake);
      this.snowflakes.eventMode = 'auto';
      this.app.stage.addChild(snowflake);
    }
  }

  animateSnowflakes() {
    this.snowflakes.forEach((snowflake: any) => {
      snowflake.y += snowflake['speed'];
      snowflake.x += snowflake['wind'];

      if (snowflake.y > this.app.canvas.height) {
        snowflake.y = -snowflake['size'];
        snowflake.x = Math.random() * this.app.canvas.width;
      }
      if (snowflake.x > this.app.canvas.width) {
        snowflake.x = -snowflake['size'];
      } else if (snowflake.x < -snowflake['size']) {
        snowflake.x = this.app.canvas.width;
      }
    });
  }


  playSong() {
    const firstSong = new Audio();
    firstSong.src = 'ABBA - Happy New Year (Video).mp3';
    firstSong.loop = true;
    firstSong.muted = true; // Start muted
  
    firstSong.load();
    firstSong.play()
      .then(() => {
        // Automatically unmute after a delay (e.g., 2 seconds)
        setTimeout(() => {
          firstSong.muted = false;
        }, 2000);
      })
      .catch((error) => {
        console.error('Autoplay failed:', error);
      });
  }
}
