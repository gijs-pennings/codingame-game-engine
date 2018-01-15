import { TextureBasedEntity } from './TextureBasedEntity.js';
import { ErrorLog } from '../core/ErrorLog.js';
import { MissingImageError } from './errors/MissingImageError.js';
import { unlerp, unlerpUnclamped } from '../core/utils.js';

export class SpriteAnimation extends TextureBasedEntity {

  constructor() {
    super();
    Object.assign(this.defaultState, {
      images: '',
      loop: false,
      duration: 1000,
      started: null
    });
  }

  initDisplay() {
    super.initDisplay();
    this.graphics = new PIXI.Sprite(PIXI.Texture.EMPTY);
  }

  updateDisplay(state, changed, globalData, frame, progress) {
    super.updateDisplay(state, changed, globalData);

    if (state.images && state.started) {
      const duration = state.duration;
      const date = frame.date + progress * frame.frameDuration;
      const startDate = state.started.date;
      const images = state.images.split(',');

      const animationProgress = (state.loop ? unlerpUnclamped : unlerp)(startDate, startDate + duration, date);
      const animationIndex = Math.floor(images.length * animationProgress);
      const image = state.loop ? images[animationIndex % images.length] : (images[animationIndex] || images[images.length - 1]);

      this.graphics.texture = PIXI.Texture.fromFrame(image);
    }
  }
}
