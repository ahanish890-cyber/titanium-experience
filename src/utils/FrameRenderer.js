/**
 * FrameRenderer
 * Handles frame index calculation and rendering
 * Tied directly to scroll progress
 */
export class FrameRenderer {
  constructor(totalFrames) {
    this.totalFrames = totalFrames;
    this.currentFrame = 0;
    this.lastRenderedFrame = -1;
    this.image = null;
  }

  /**
   * Update frame based on scroll progress
   * @param {number} progress - Scroll progress 0-1
   * @returns {number} New frame index
   */
  updateFrame(progress) {
    const newFrame = Math.floor(progress * (this.totalFrames - 1));
    this.currentFrame = Math.max(0, Math.min(newFrame, this.totalFrames - 1));
    return this.currentFrame;
  }

  /**
   * Check if frame needs rendering
   * @returns {boolean}
   */
  hasFrameChanged() {
    return this.currentFrame !== this.lastRenderedFrame;
  }

  /**
   * Mark frame as rendered
   */
  markFrameRendered() {
    this.lastRenderedFrame = this.currentFrame;
  }

  /**
   * Get current frame index
   */
  getFrame() {
    return this.currentFrame;
  }

  /**
   * Set image source
   */
  setImage(image) {
    this.image = image;
  }

  /**
   * Get current image
   */
  getImage() {
    return this.image;
  }

  /**
   * Reset renderer
   */
  reset() {
    this.currentFrame = 0;
    this.lastRenderedFrame = -1;
  }

  /**
   * Destroy
   */
  destroy() {
    this.image = null;
    this.currentFrame = 0;
    this.lastRenderedFrame = -1;
  }
}
