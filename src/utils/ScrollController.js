/**
 * ScrollController
 * Manages scroll state and progress
 * Single source of truth for scroll position
 */
export class ScrollController {
  constructor() {
    this.progress = 0;
    this.lastProgress = 0;
    this.isReversing = false;
    this.listeners = new Set();
  }

  /**
   * Update progress from scroll position
   * @param {number} current - Current scroll progress (0-1)
   */
  updateProgress(current) {
    this.lastProgress = this.progress;
    this.progress = Math.max(0, Math.min(1, current));
    this.isReversing = this.progress < this.lastProgress;

    this.notify();
  }

  /**
   * Subscribe to progress updates
   */
  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  /**
   * Notify all listeners of progress change
   */
  notify() {
    this.listeners.forEach((callback) => {
      callback({
        progress: this.progress,
        isReversing: this.isReversing,
      });
    });
  }

  /**
   * Get current progress
   */
  getProgress() {
    return this.progress;
  }

  /**
   * Check if user is scrolling backward
   */
  getIsReversing() {
    return this.isReversing;
  }

  /**
   * Clear all listeners
   */
  destroy() {
    this.listeners.clear();
  }
}
