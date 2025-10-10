# Security Policy

## Supported Versions

We actively support the following versions of OneWords with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of OneWords seriously. If you discover a security vulnerability, please follow these guidelines:

### How to Report

1. **DO NOT** create a public GitHub issue for security vulnerabilities
2. Email us directly at: **shahidaktarmir@gmail.com**
3. Include "SECURITY" in the subject line
4. Provide detailed information about the vulnerability

### What to Include

Please include the following information in your security report:

- **Description** of the vulnerability
- **Steps to reproduce** the issue
- **Potential impact** of the vulnerability
- **Suggested fix** (if you have one)
- **Your contact information** for follow-up

### Response Timeline

- **Acknowledgment**: We'll acknowledge receipt within 48 hours
- **Initial Assessment**: We'll provide an initial assessment within 5 business days
- **Status Updates**: We'll keep you informed of our progress
- **Resolution**: We aim to resolve critical vulnerabilities within 30 days

### Security Best Practices

#### For Users

- Keep your Node.js and npm versions up to date
- Regularly update OneWords to the latest version
- Use strong authentication credentials
- Don't store sensitive data in question files
- Be cautious when importing question sets from unknown sources

#### For Developers

- Follow secure coding practices
- Validate all user inputs
- Use HTTPS for all external communications
- Keep dependencies updated
- Run security audits regularly:
  ```bash
  npm audit
  npm audit fix
  ```

### Disclosure Policy

- We follow **responsible disclosure** practices
- We'll work with you to understand and resolve the issue
- We'll acknowledge your contribution (with your permission)
- We'll coordinate the timing of public disclosure

### Security Updates

Security updates will be released as patch versions and announced through:

- GitHub Security Advisories
- Release notes
- Email notifications to maintainers

### Hall of Fame

We recognize and thank security researchers who help improve OneWords:

*No reports yet - be the first to help secure OneWords!*

## Contact

For any security-related questions or concerns:

- **Email**: shahidaktarmir@gmail.com
- **Subject**: SECURITY - OneWords

Thank you for helping keep OneWords safe and secure! 🔒