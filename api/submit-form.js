// Vercel serverless function to handle form submissions
export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { firstName, lastName, email, phone, eventDate, timestamp, source } = req.body;

        // Basic validation
        if (!firstName || !lastName || !email || !phone) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Create submission data
        const submission = {
            id: Date.now().toString(),
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            eventDate: eventDate || '2025-10-09',
            timestamp: timestamp || new Date().toISOString(),
            source: source || 'Your Luxury Agent Coming Soon Page',
            ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            userAgent: req.headers['user-agent']
        };

        // Log the submission (in production, you'd save to a database)
        console.log('New form submission:', JSON.stringify(submission, null, 2));

        // Send email notification (optional - using a free service)
        await sendEmailNotification(submission);

        // Return success response
        res.status(200).json({
            success: true,
            message: 'Thank you for your interest! We\'ll be in touch soon.',
            submissionId: submission.id
        });

    } catch (error) {
        console.error('Form submission error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Optional: Send email notification using a free service
async function sendEmailNotification(submission) {
    try {
        // Using EmailJS (free service) - you can set this up later
        // For now, we'll just log it
        console.log('Email notification would be sent for:', submission.email);
        
        // You can integrate with:
        // - EmailJS (free, 200 emails/month)
        // - SendGrid (free tier)
        // - Mailgun (free tier)
        // - Or just check the Vercel function logs
        
    } catch (error) {
        console.error('Email notification error:', error);
        // Don't fail the form submission if email fails
    }
}

