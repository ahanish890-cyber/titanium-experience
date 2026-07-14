/**
 * Image Sequence Preloader
 * Preloads all PNG frames before animation starts
 * Prevents flickering and ensures smooth playback
 */

export class SequencePreloader {
  constructor(basePath, frameCount, framePrefix = 'frame_') {
    this.basePath = basePath;
    this.frameCount = frameCount;
    this.framePrefix = framePrefix;
    this.frames = [];
    this.isLoaded = false;
    this.loadingProgress = 0;
  }

  async preload() {
    const promises = [];

    for (let i = 0; i < this.frameCount; i++) {
      const frameNumber = String(i).padStart(4, '0');
      const src = `${this.basePath}/${this.framePrefix}${frameNumber}.png`;

      const promise = new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          this.loadingProgress = ((i + 1) / this.frameCount) * 100;
          resolve(img);
        };
        img.onerror = reject;
        img.src = src;
      });

      promises.push(promise);
    }

    try {
      this.frames = await Promise.all(promises);
      this.isLoaded = true;
      this.loadingProgress = 100;
      return this.frames;
    } catch (error) {
      console.error('Failed to preload sequence:', error);
      throw error;
    }
  }

  getFrame(index) {
    if (index < 0 || index >= this.frames.length) {
      return null;
    }
    return this.frames[Math.floor(index)];
  }

  getProgress() {
    return this.loadingProgress;
  }

  isFullyLoaded() {
    return this.isLoaded;
  }

  clear() {
    this.frames = [];
    this.isLoaded = false;
    this.loadingProgress = 0;
  }
}

/**
 * Canvas Renderer for sequence frames
 * Handles retina displays and proper scaling
 */
export class CanvasSequenceRenderer {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.dpr = window.devicePixelRatio || 1;
    this.setupCanvas();
  }

  setupCanvas() {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * this.dpr;
    this.canvas.height = rect.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
  }

  drawFrame(imageElement, fit = 'contain') {
    const rect = this.canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Clear canvas
    this.ctx.clearRect(0, 0, width, height);

    if (!imageElement) return;

    const imgRatio = imageElement.naturalWidth / imageElement.naturalHeight;
    const canvasRatio = width / height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (fit === 'contain') {
      if (imgRatio > canvasRatio) {
        drawWidth = width;
        drawHeight = width / imgRatio;
      } else {
        drawHeight = height;
        drawWidth = height * imgRatio;
      }
      offsetX = (width - drawWidth) / 2;
      offsetY = (height - drawHeight) / 2;
    }

    this.ctx.drawImage(imageElement, offsetX, offsetY, drawWidth, drawHeight);
  }

  handleResize() {
    this.setupCanvas();
  }
}
