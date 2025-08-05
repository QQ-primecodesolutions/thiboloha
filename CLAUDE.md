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

# For Windows development (Git Bash/MinGW):
# Navigate to project directory and serve with Python
cd "/c/Users/Admin1/Desktop/Thiboloha School/thiboloha"
python -m http.server 8000
```

### File Organization

- `/assets/css/` - All stylesheets including program-specific styles
- `/assets/js/` - JavaScript files (contact.js, scripts.js)
- `/assets/images/` - Image assets (currently missing)
- `/admin/` - PHP admin panel (minimal implementation)
- `/contact/` - PHP contact form handler (currently minimal)
- `/images/` - Additional image assets (legacy structure)
- `/css/` and `/js/` - Legacy asset directories with Bootstrap

### CSS Architecture

The site uses a theme-based CSS architecture with CSS custom properties:

- **Main stylesheet** (`style.css`): Base styles with CSS variables for colors
- **Program-specific stylesheets**: Each program has dedicated styling
  - `autistic-style.css` - Autism program theming
  - `blind-style.css` - Blind learners program theming  
  - `deafstyle.css` - Deaf learners program theming (note: filename inconsistency)
  - `inter-style.css` - Intellectual barriers program theming
- **Contact styling** (`contact.css`): Dedicated contact page styles
- **Bootstrap integration**: Uses Bootstrap 5 CDN with custom overrides

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

### JavaScript Architecture

The codebase uses vanilla JavaScript with a focus on accessibility and progressive enhancement:

- **contact.js**: Comprehensive multi-step contact form with validation
  - Form validation with real-time feedback
  - Multi-step wizard interface with progress tracking
  - Phone number formatting for South African numbers
  - Modal dialogs for scheduling visits
  - FAQ accordion functionality
  - Ripple effects and smooth animations
  - Keyboard navigation support (Alt+Arrow keys for form steps)
  - Error handling with user-friendly messages

- **scripts.js**: Main site functionality (currently minimal)

### PHP Components

Minimal PHP backend with placeholder implementations:

- **admin/login.php** and **admin/dashboard.php**: Empty admin panel files
- **contact/contact.php**: Contact form handler (currently minimal)

These files need implementation for a fully functional backend.

### Development Notes

- **Asset Structure**: Dual asset directories (`/assets/` and legacy `/css/`, `/js/`)
- **Image Handling**: Logo referenced as `/assets/images/logo.png` but stored in `/images/`
- **CSS Naming**: Inconsistent naming (e.g., `deafstyle.css` vs `deaf-style.css`)
- **React Preparation**: Empty `/react/` directory structure exists for future implementation

### Testing

No automated testing framework is currently in place. Manual testing involves:
- Cross-browser compatibility testing
- Accessibility compliance testing (WCAG 2.1 AA standards)
- Mobile responsiveness verification
- PHP form functionality testing (when using local server)
- Screen reader testing for accessibility features
- Multi-program theme testing