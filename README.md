# YCCO - Youth Commitment for Change Organisation

## Website Overview

This is the official website for YCCO (Youth Commitment for Change Organisation), a global non-profit organization empowering youth and women through education, advocacy, and economic development across 25+ countries.

## 🌟 Features

### Design & UX
- **Modern Single-Page Design** with smooth scrolling navigation
- **Responsive Layout** optimized for all devices (mobile, tablet, desktop)
- **Accessible Design** with WCAG 2.1 AA compliance
- **High Contrast Mode** support for users with visual impairments
- **Reduced Motion** support for users with motion sensitivity

### Technical Features
- **SEO Optimized** with meta tags, Open Graph, and Schema.org structured data
- **Performance Optimized** with CSS custom properties and efficient animations
- **Progressive Enhancement** - works without JavaScript
- **Semantic HTML5** for better accessibility and SEO

### Interactive Elements
- **Animated SDG Donut Chart** showing UN Sustainable Development Goals
- **Animated Globe** with orbiting dots representing global reach
- **Counter Animations** for impact statistics
- **Scroll-to-Top Button** for better navigation
- **Contact Form** with client-side validation
- **Legal Modals** for Impressum, Datenschutz, AGB, Cookie Policy, and Satzung

## 📁 Project Structure

```
ycco-website/
├── index.html          # Main HTML file
├── style.css           # Complete stylesheet
├── images/
│   └── Design ohne Titel.png   # Organization logo
└── README.md           # This file
```

## 🚀 Deployment

### Option 1: GitHub Pages (Recommended)

1. Push your code to a GitHub repository
2. Go to Repository Settings > Pages
3. Select your branch (main/master) and save
4. Your site will be live at `https://yourusername.github.io/repository-name`

### Option 2: Netlify

1. Drag and drop your project folder to [Netlify Drop](https://app.netlify.com/drop)
2. Or connect your GitHub repository for automatic deployments

### Option 3: Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts to deploy

### Option 4: Traditional Web Hosting

1. Upload all files to your web server via FTP/SFTP
2. Ensure the server supports HTTPS (recommended)
3. Configure proper MIME types for fonts and images

## ⚙️ Server Configuration

### Recommended Headers

Add these headers to your server configuration for security and performance:

```apache
# .htaccess for Apache
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
    Header set Permissions-Policy "camera=(), microphone=(), geolocation=()"
</IfModule>

# Enable GZIP compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

```nginx
# Nginx configuration
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
```

## 📝 Customization

### Updating Content

1. **Organization Details**: Update the Impressum modal with your actual address and registration details
2. **Contact Information**: Change email addresses in the contact form and footer
3. **Social Media Links**: Update the social media URLs in the footer
4. **Statistics**: Modify the counter values in the Impact section
5. **Partner Names**: Add specific partner organization names in the Partners section

### Changing Colors

All colors are defined as CSS custom properties in `:root`:

```css
:root {
  --color-primary: #5D3267;        /* Main brand color */
  --color-primary-light: #8A3B9E;  /* Lighter variant */
  --color-primary-dark: #4f2959;   /* Darker variant */
  --color-accent: #883B9B;         /* CTA buttons */
}
```

### Adding New Sections

1. Add HTML structure in `index.html`
2. Add corresponding CSS in `style.css`
3. Follow the existing naming conventions
4. Add ARIA labels for accessibility

## ♿ Accessibility Features

- **Skip Link**: Press Tab to see "Skip to main content" link
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Indicators**: Visible focus states for all interactive elements
- **Color Contrast**: All text meets WCAG AA contrast requirements
- **Reduced Motion**: Respects user's motion preferences

## 🔒 Security Considerations

1. **HTTPS**: Always use HTTPS in production
2. **Content Security Policy**: Consider adding CSP headers
3. **Form Security**: The contact form uses mailto: for simplicity. For production, consider using a backend service or Formspree
4. **Regular Updates**: Keep dependencies updated

## 📊 Performance Tips

1. **Image Optimization**: Compress images before uploading
2. **Font Loading**: Google Fonts are preconnected for faster loading
3. **CSS Minification**: Consider minifying CSS for production
4. **Lazy Loading**: Images below the fold can be lazy-loaded

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## 📄 Legal Requirements

Before going live, ensure you have:

1. **Impressum**: Complete with actual address and registration details (required in Germany/DACH)
2. **Datenschutzerklärung**: GDPR-compliant privacy policy
3. **Cookie Policy**: If using any cookies beyond essential ones
4. **AGB**: Terms and conditions if applicable
5. **Satzung**: Organization bylaws

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📧 Contact

For questions or support, contact: info@ycco.org

---

**Built with ❤️ for Youth Empowerment**

© 2026 Youth Commitment for Change Organisation. All rights reserved.