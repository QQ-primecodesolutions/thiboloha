# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Thiboloha Special School website - a static HTML/CSS/JavaScript website for a special needs school in Free State, South Africa. The school serves deaf, blind, autistic, and intellectually impaired learners.

## Project Structure

The codebase is primarily static HTML/CSS with some PHP backend functionality:

- **Static HTML Pages**: Main content pages (index.html, about.html, programs.html, etc.)
- **Assets**: Organized under `/assets/` with separate CSS and JS files for different programs
- **PHP Backend**: Basic PHP files for contact forms and admin functionality (currently minimal)
- **React**: Empty `/react/` folder indicating planned future React implementation

## Key Architecture Decisions

### Multi-Program Design
The site serves four distinct special needs programs, each with its own styling:
- `autistic-style.css` - Autism program styling
- `blind-style.css` - Blind learners program styling  
- `deaf-style.css` - Deaf learners program styling
- `inter-style.css` - Intellectual barriers program styling
- `style.css` - Main site styling

### Accessibility-First Approach
The site is built with accessibility in mind, featuring:
- Skip links for screen readers
- ARIA labels and semantic HTML
- High contrast styling options
- Multiple font and styling options for different disabilities

### Development Commands

This is a static website with no build process. Development workflow:

```bash
# No package.json - this is a static HTML site
# Simply open index.html in a browser or serve with a local server

# For PHP functionality testing, use a local server like XAMPP or:
php -S localhost:8000

# For static development, you can use:
python -m http.server 8000
# or
npx serve .
```

### File Organization

- `/assets/css/` - All stylesheets including program-specific styles
- `/assets/js/` - JavaScript files (contact.js, scripts.js)
- `/assets/images/` - Image assets
- `/admin/` - PHP admin panel (minimal implementation)
- `/contact/` - PHP contact form handler
- `/images/` - Additional image assets (legacy structure)
- `/css/` and `/js/` - Legacy asset directories with Bootstrap

### Content Structure

The website contains comprehensive information about:
- Four specialized education programs
- 50-year school history and achievements
- 100% NSC pass rate statistics
- Alumni success stories
- Detailed admissions process
- Contact information and location details

### Future Development Plans

According to README.md, the site is planned for multi-phase development:
- **Phase 1**: Static pages (current state)
- **Phase 2**: React components for gallery and interactive features
- **Phase 3**: PHP/MySQL backend for content management
- **Phase 4**: Advanced features like multi-language support

### Testing

No automated testing framework is currently in place. Manual testing involves:
- Cross-browser compatibility testing
- Accessibility compliance testing
- Mobile responsiveness verification
- PHP form functionality testing (when using local server)