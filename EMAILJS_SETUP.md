# EmailJS Configuration Guide

## Template Configuration in EmailJS Dashboard

### Email Template Structure:

**Subject:**
```
New Contact Form Message: {{subject}}
```

**Email Body (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Contact Form Message</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Portfolio Contact Form Message
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">Contact Details:</h3>
            <p><strong>Name:</strong> {{from_name}}</p>
            <p><strong>Email:</strong> {{from_email}}</p>
            <p><strong>Subject:</strong> {{subject}}</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #1f2937;">Message:</h3>
            <p style="white-space: pre-wrap;">{{message}}</p>
        </div>
        
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
            <p>This message was sent from your portfolio website contact form.</p>
            <p>Please reply directly to {{from_email}} to respond to this inquiry.</p>
        </div>
    </div>
</body>
</html>
```

### Template Variables Used:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email address  
- `{{subject}}` - Message subject
- `{{message}}` - Message content

### Email Service Settings:
- **To Email:** Your email (nguyenxuankha5371@gmail.com)
- **From Name:** Portfolio Contact Form
- **Reply To:** {{from_email}}

## Quick Setup Checklist:

1. ✅ Service ID: service_g9ydz19 (you have this)
2. ⏳ Create email template and get Template ID
3. ⏳ Get Public Key from Account settings
4. ⏳ Update .env file with real values
5. ⏳ Test the contact form

## Testing:
After setup, restart your dev server:
```bash
npm run dev
```

The form will automatically use EmailJS if configured, or fallback to mailto if not.
