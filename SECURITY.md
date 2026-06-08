# Security Policy & Information

## Security Overview

The YCCO website is built with security as a priority. This document outlines our security measures, policies, and how to report vulnerabilities.

## Security Features Implemented

### 1. Content Security Policy (CSP)
We implement a strict CSP to prevent XSS attacks and data injection:
- Scripts only allowed from `'self'` and trusted CDN (jsDelivr)
- Styles from `'self'` and Google Fonts
- Images from `'self'`, data URIs, and HTTPS sources
- Form submissions restricted to trusted endpoints

### 2. Security Headers
All responses include:
- `X-Content-Type-Options: nosniff` - Prevents MIME sniffing
- `X-Frame-Options: SAMEORIGIN` - Prevents clickjacking
- `X-XSS-Protection: 1; mode=block` - XSS filter
- `Referrer-Policy: strict-origin-when-cross-origin` - Controls referrer info
- `Permissions-Policy` - Restricts browser features

### 3. Subresource Integrity (SRI)
External scripts are loaded with SRI hashes to ensure integrity:
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js" 
        integrity="sha384-ALc35EccAf6RzGw4iNsyj7kTPr33K7RoGzYu+7heZhT8s0GZouafRiCg1qy44AS" 
        crossorigin="anonymous"></script>
```

### 4. Form Security
- **Honeypot Protection**: Hidden fields to detect and block bots
- **Client-side Validation**: Input validation before submission
- **HTTPS Only**: All form submissions use HTTPS
- **Third-party Services**: Web3Forms and EmailJS for secure email delivery

### 5. Cookie Security
- Only essential cookies used
- Cookie consent banner with opt-in/opt-out
- No tracking or advertising cookies
- localStorage used for consent preferences

### 6. Server Security
Choose the appropriate configuration for your server:

#### Apache (.htaccess)
- HTTPS enforcement
- Security headers
- Directory listing prevention
- File access restrictions
- GZIP compression

#### Nginx (nginx.conf)
- SSL/TLS configuration
- Security headers
- Rate limiting support
- Bot blocking
- Cache control

## External Dependencies

| Service | Purpose | Security |
|---------|---------|----------|
| Google Fonts | Typography | HTTPS, reputable CDN |
| jsDelivr | Script delivery | HTTPS, SRI support |
| Web3Forms | Form submission | HTTPS, API key protection |
| EmailJS | Email notifications | HTTPS, domain restrictions |

## Data Protection

### Personal Data Collection
We collect minimal data:
- Contact form: Name, email, message (only for responding to inquiries)
- Technical data: Browser type, OS, referrer (server logs)

### Data Storage
- **No database**: Static site with no data storage
- **Third-party processing**: Form data processed by Web3Forms
- **No cookies**: Only localStorage for consent preferences

### Data Rights
Users have the right to:
- Access their data
- Request deletion
- Object to processing
- Lodge complaints

Contact: contact@infoycco.com

## Known Limitations

### API Keys in Client-Side Code
Some API keys (Web3Forms, EmailJS) are necessarily exposed in client-side code. These services are designed for client-side use and have their own security measures:
- Domain restrictions
- Rate limiting
- Abuse monitoring

### 'unsafe-inline' in CSP
The CSP includes `'unsafe-inline'` for scripts due to inline JavaScript. This is a common trade-off for single-page sites. Future improvements may include:
- Moving scripts to external files
- Using CSP nonces or hashes

## Server Configuration Requirements

### Minimum Requirements
- **HTTPS**: Required (free SSL via Let's Encrypt)
- **Modern TLS**: TLS 1.2 or higher
- **Security Headers**: As configured in .htaccess or nginx.conf

### Recommended
- **HTTP/2**: For performance
- **HSTS**: HTTP Strict Transport Security
- **CDN**: For DDoS protection and performance

## Monitoring & Logging

### Server Logs
Standard access logs are maintained for:
- Security monitoring
- Performance analysis
- Troubleshooting

### What We Don't Log
- Personal data from forms
- Browsing behavior
- IP addresses linked to individuals

## Vulnerability Disclosure

If you discover a security vulnerability, please report it responsibly:

1. **Do not** exploit the vulnerability
2. **Email** us at: contact@infoycco.com
3. **Include** details: affected area, steps to reproduce, potential impact
4. **Allow** reasonable time for response and fix

We will:
- Acknowledge receipt within 48 hours
- Provide updates on fix progress
- Credit responsible disclosure (if desired)

## Security Updates

### Keeping Secure
1. **Regular Audits**: Review code and dependencies quarterly
2. **Monitor Services**: Watch for security updates from third-party services
3. **Update Configurations**: Keep server configurations current
4. **Review Logs**: Check for suspicious activity

### Update Checklist
- [ ] Review and update CSP if needed
- [ ] Check for SRI hash updates for external scripts
- [ ] Verify SSL certificate validity
- [ ] Review third-party service security notices
- [ ] Update server configurations

## Compliance

### GDPR
- Privacy policy provided
- Consent obtained for data processing
- Data minimization practiced
- User rights respected

### International Standards
- Follows OWASP guidelines
- WCAG 2.1 AA accessibility compliance
- Industry best practices

## Contact

For security-related inquiries:
- **Email**: contact@infoycco.com
- **Response Time**: Within 48 hours

---

**Last Updated**: June 2026
**Version**: 1.0