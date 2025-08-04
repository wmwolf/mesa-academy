/**
 * MESA Academy Progress Tracker
 * Handles localStorage persistence for learning objectives, tasks, and answers
 * with version-specific isolation.
 */

class ProgressTracker {
  constructor() {
    this.storageKey = 'mesa-academy-progress';
    this.currentVersion = this.getCurrentVersion();
    this.init();
  }

  /**
   * Detect current version from URL pathname
   * CRITICAL: Update the default return value when releasing new versions!
   */
  getCurrentVersion() {
    const path = window.location.pathname;
    const versionMatch = path.match(/^\/([^\/]+)\//);
    
    // If first path segment isn't a content type, it's a version
    if (versionMatch && !['guides', 'examples', 'reference'].includes(versionMatch[1])) {
      return versionMatch[1]; // "1.0", "2024.08.1", etc.
    }
    
    // CRITICAL: Update this default version when creating new releases
    return "2024.08.1";
  }

  /**
   * Get all progress data from localStorage
   */
  getAllProgress() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.warn('Failed to load progress data:', error);
      return {};
    }
  }

  /**
   * Get progress data for current version
   */
  getVersionProgress() {
    const allProgress = this.getAllProgress();
    if (!allProgress[this.currentVersion]) {
      allProgress[this.currentVersion] = {
        'learning-objectives': {},
        'tasks': {},
        'answers': {}
      };
    }
    return allProgress[this.currentVersion];
  }

  /**
   * Save progress data for current version
   */
  saveVersionProgress(versionData) {
    try {
      const allProgress = this.getAllProgress();
      allProgress[this.currentVersion] = versionData;
      localStorage.setItem(this.storageKey, JSON.stringify(allProgress));
    } catch (error) {
      console.warn('Failed to save progress data:', error);
    }
  }

  /**
   * Get checkbox state for a specific item
   */
  getItemState(type, id) {
    const versionProgress = this.getVersionProgress();
    return versionProgress[type][id] || false;
  }

  /**
   * Set checkbox state for a specific item
   */
  setItemState(type, id, checked) {
    const versionProgress = this.getVersionProgress();
    versionProgress[type][id] = checked;
    this.saveVersionProgress(versionProgress);
  }

  /**
   * Initialize progress tracker on page load
   */
  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupPage());
    } else {
      this.setupPage();
    }
  }

  /**
   * Set up progress tracking for the current page
   */
  setupPage() {
    console.log(`MESA Academy Progress Tracker initialized for version: ${this.currentVersion}`);
    
    // Initialize learning objectives
    this.initializeLearningObjectives();
    
    // Populate objectives summary
    this.populateObjectivesSummary();
    
    // Set up event listeners
    this.setupEventListeners();
  }

  /**
   * Initialize learning objective checkboxes
   */
  initializeLearningObjectives() {
    const objectiveCheckboxes = document.querySelectorAll('.learning-objective-checkbox');
    
    objectiveCheckboxes.forEach(checkbox => {
      const id = checkbox.id.replace('learning-objective-', '');
      const checked = this.getItemState('learning-objectives', id);
      checkbox.checked = checked;
    });
  }

  /**
   * Set up event listeners for checkbox interactions
   */
  setupEventListeners() {
    // Learning objective checkboxes
    document.addEventListener('change', (event) => {
      if (event.target.classList.contains('learning-objective-checkbox')) {
        const id = event.target.id.replace('learning-objective-', '');
        this.setItemState('learning-objectives', id, event.target.checked);
        console.log(`Learning objective ${id} ${event.target.checked ? 'completed' : 'unchecked'}`);
      }
    });
  }

  /**
   * Populate the objectives summary at the top of the page
   */
  populateObjectivesSummary() {
    const summaryContainer = document.getElementById('objectives-summary-list');
    if (!summaryContainer) return;
    
    const objectiveCheckboxes = document.querySelectorAll('.learning-objective-checkbox');
    if (objectiveCheckboxes.length === 0) {
      summaryContainer.innerHTML = '<p><em>No learning objectives found on this page.</em></p>';
      return;
    }
    
    const objectivesHtml = Array.from(objectiveCheckboxes).map(checkbox => {
      const label = document.querySelector(`label[for="${checkbox.id}"]`);
      const statementDiv = label.querySelector('.learning-objective-statement');
      const headerDiv = label.querySelector('.learning-objective-header strong');
      
      const statement = statementDiv.textContent.replace('I can ', '');
      const number = headerDiv.textContent.replace('Learning Objective ', '').replace(':', '');
      
      return `
        <div class="objective-item">
          <span class="objective-label">${number}</span>
          <span class="objective-text">${statement}</span>
        </div>
      `;
    }).join('');
    
    summaryContainer.innerHTML = objectivesHtml;
  }

  /**
   * Debug method to view current progress data
   */
  debugProgress() {
    console.log('All Progress Data:', this.getAllProgress());
    console.log('Current Version:', this.currentVersion);
    console.log('Version Progress:', this.getVersionProgress());
  }
}

// Initialize progress tracker when script loads
const progressTracker = new ProgressTracker();

// Make available globally for debugging
window.progressTracker = progressTracker;