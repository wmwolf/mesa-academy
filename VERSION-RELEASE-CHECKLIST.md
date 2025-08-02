# MESA Academy Version Release Checklist

This checklist ensures all necessary steps are completed when releasing a new version of MESA Academy documentation.

## Pre-Release Preparation

### 1. Content Preparation
- [ ] All new content for the version is written and reviewed
- [ ] Images and assets are optimized and placed in version-specific directories
- [ ] All Task and LearningObjective components have correct guide/task numbering
- [ ] Content has been tested locally

### 2. Version Configuration
- [ ] Update `astro.config.mjs` to add new version to `starlightVersions` plugin
- [ ] Create new version directory structure in `src/content/docs/[version]/`
- [ ] Create corresponding sidebar configuration in `src/content/versions/[version].json`
- [ ] Copy and update assets to `src/assets/[version]/` if needed

## Critical Interactive Features Update

### 3. Progress Tracking System
- [ ] **CRITICAL**: Update `getCurrentVersion()` function in `src/scripts/progress-tracker.js`
  - Change the default return value to the new version number
  - Example: `return "2024.08.1";` → `return "2024.11.1";`
- [ ] Test that progress from previous versions remains isolated
- [ ] Verify new version starts with clean progress state

## Testing & Validation

### 4. Functionality Testing
- [ ] Test version switching between old and new versions
- [ ] Verify all interactive components (Tasks, LearningObjectives, Answers) work
- [ ] Confirm progress tracking works correctly for new version
- [ ] Test localStorage isolation between versions
- [ ] Check sidebar progress indicators function properly

### 5. Cross-Browser Testing
- [ ] Test in Chrome/Chromium
- [ ] Test in Firefox
- [ ] Test in Safari (if on macOS)
- [ ] Test on mobile devices

### 6. Content Validation
- [ ] All links work correctly
- [ ] Images display properly
- [ ] Navigation functions correctly
- [ ] Search functionality includes new content

## Deployment

### 7. Build & Deploy
- [ ] Run `npm run build` successfully
- [ ] Test production build with `npm run preview`
- [ ] Deploy to production environment
- [ ] Verify deployment is accessible

### 8. Post-Deployment Verification
- [ ] Test live site functionality
- [ ] Verify version selector works
- [ ] Check that analytics/tracking works for new version
- [ ] Confirm all interactive features function on live site

## Documentation Updates

### 9. Update Documentation
- [ ] Update any version-specific documentation
- [ ] Add release notes if needed
- [ ] Update README.md if version affects setup/development

## Cleanup

### 10. Repository Maintenance
- [ ] Tag the release in git
- [ ] Update any CI/CD configurations if needed
- [ ] Archive or clean up any temporary files

---

## Important Notes

- **Progress Isolation**: The most critical step is updating the `getCurrentVersion()` function. Failure to do this will cause progress from the previous "latest" version to bleed into the new version.

- **Testing Priority**: Focus testing on the interactive features (Tasks, LearningObjectives, sidebar progress) as these are the most complex parts of the system.

- **Rollback Plan**: Keep the previous version's configuration handy in case a rollback is needed.

## Version History

| Version | Release Date | Notes |
|---------|-------------|--------|
| 2024.08.1 | TBD | First official release |

---

*Last updated: 2025-08-02*