// Slack notification integration
// Sends real-time notifications to Slack for all website events

interface SlackMessage {
  text?: string;
  blocks?: any[];
  attachments?: any[];
}

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

interface NewsletterData {
  email: string;
  name?: string;
  source: string;
}

interface PaymentData {
  customerEmail: string;
  amount: number;
  currency: string;
  productName: string;
  stripeChargeId: string;
}

interface VisitorData {
  country?: string;
  city?: string;
  area?: string;  // Area/neighborhood (e.g., Al Bateen, Al Khalidiyah)
  postalCode?: string;  // Postal code if available
  device?: string;
  browser?: string;
  page: string;
  ip?: string;
  lat?: number;
  lng?: number;
  source?: string;
  navigationFlow?: string[];
  sessionDuration?: number;
  visitCount?: number;
}

interface ConversionEventData {
  event: string;
  element: string;
  location?: string;
  metadata?: Record<string, any>;
}

/**
 * Send a message to Slack
 */
async function sendToSlack(message: SlackMessage): Promise<boolean> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  console.log('🔍 Slack webhook status:', {
    hasWebhook: !!webhookUrl,
    webhookPrefix: webhookUrl ? webhookUrl.substring(0, 30) + '...' : 'none',
    messageType: message.blocks?.[0]?.text?.text || message.text || 'unknown'
  });

  if (!webhookUrl) {
    console.error('❌ SLACK_WEBHOOK_URL not configured - notification not sent');
    console.error('❌ Please add SLACK_WEBHOOK_URL to Vercel environment variables');
    return false;
  }

  try {
    console.log('📤 Sending to Slack...', { messageType: message.blocks?.[0]?.text?.text || 'unknown' });
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    console.log('📥 Slack response:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Slack notification failed:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      return false;
    }

    console.log('✅ Slack notification sent successfully');
    return true;
  } catch (error) {
    console.error('❌ Error sending Slack notification:', error);
    return false;
  }
}

/**
 * Notify about contact form submission
 */
export async function notifyContactForm(data: ContactFormData): Promise<void> {
  const message: SlackMessage = {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '📧 New Contact Form Submission',
          emoji: true,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Name:*\n${data.name}`,
          },
          {
            type: 'mrkdwn',
            text: `*Email:*\n${data.email}`,
          },
          {
            type: 'mrkdwn',
            text: `*Phone:*\n${data.phone || 'Not provided'}`,
          },
          {
            type: 'mrkdwn',
            text: `*Subject:*\n${data.subject}`,
          },
        ],
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Message:*\n${data.message}`,
        },
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `⏰ ${new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })} (UAE Time)`,
          },
        ],
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: '📧 Reply via Email',
              emoji: true,
            },
            url: `mailto:${data.email}?subject=Re: ${data.subject}`,
            style: 'primary',
          },
        ],
      },
    ],
  };

  await sendToSlack(message);
}

/**
 * Notify about newsletter subscription
 */
export async function notifyNewsletterSubscription(data: NewsletterData): Promise<void> {
  const message: SlackMessage = {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '📰 New Newsletter Subscriber',
          emoji: true,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Email:*\n${data.email}`,
          },
          {
            type: 'mrkdwn',
            text: `*Name:*\n${data.name || 'Not provided'}`,
          },
          {
            type: 'mrkdwn',
            text: `*Source:*\n${data.source}`,
          },
          {
            type: 'mrkdwn',
            text: `*Time:*\n${new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })}`,
          },
        ],
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: '📊 View in MailerLite',
              emoji: true,
            },
            url: 'https://dashboard.mailerlite.com/subscribers',
            style: 'primary',
          },
        ],
      },
    ],
  };

  await sendToSlack(message);
}

/**
 * Notify about successful payment
 */
export async function notifyPayment(data: PaymentData): Promise<void> {
  const formattedAmount = new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: data.currency.toUpperCase(),
  }).format(data.amount / 100); // Stripe amounts are in cents

  const message: SlackMessage = {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '💰 New Payment Received!',
          emoji: true,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Customer:*\n${data.customerEmail}`,
          },
          {
            type: 'mrkdwn',
            text: `*Amount:*\n${formattedAmount}`,
          },
          {
            type: 'mrkdwn',
            text: `*Product:*\n${data.productName}`,
          },
          {
            type: 'mrkdwn',
            text: `*Time:*\n${new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })}`,
          },
        ],
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Stripe Charge ID:*\n\`${data.stripeChargeId}\``,
        },
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: '💳 View in Stripe',
              emoji: true,
            },
            url: `https://dashboard.stripe.com/payments/${data.stripeChargeId}`,
            style: 'primary',
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: '📧 Email Customer',
              emoji: true,
            },
            url: `mailto:${data.customerEmail}`,
          },
        ],
      },
    ],
  };

  await sendToSlack(message);
}

/**
 * Notify about new visitor (when someone first lands on the site)
 */
export async function notifyNewVisitor(data: VisitorData): Promise<void> {
  // Build location string with area if available
  let location = data.country && data.country !== 'Unknown' 
    ? `${data.country}${data.city && data.city !== 'Unknown' ? `, ${data.city}` : ''}`
    : 'Unknown location';
  
  // Add area/neighborhood if available (e.g., "UAE, Abu Dhabi, Al Bateen")
  if (data.area) {
    location += `, ${data.area}`;
  }
  
  // Format coordinates if available (with more precision to show differences)
  const coordinates = data.lat && data.lng 
    ? `${data.lat.toFixed(8)}, ${data.lng.toFixed(8)}`
    : null;
  
  // Create Google Maps link if coordinates are available
  const mapLink = coordinates 
    ? `https://www.google.com/maps?q=${data.lat},${data.lng}`
    : null;
  
  // Note: IP geolocation coordinates are city-level approximations
  // Multiple IPs in the same city may show the same coordinates
  // This is normal behavior for IP-based geolocation services

  // Format session duration
  const formatDuration = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes < 60) return `${minutes}m ${remainingSeconds}s`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const blocks: any[] = [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: data.visitCount && data.visitCount > 1 ? `👤 Returning Visitor (Visit #${data.visitCount})` : '👤 New Visitor on Website',
        emoji: true,
      },
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*📍 Location:*\n${location}${data.postalCode ? `\n_Postal: ${data.postalCode}_` : ''}`,
        },
        {
          type: 'mrkdwn',
          text: `*🌐 IP Address:*\n\`${data.ip || 'Unknown'}\``,
        },
        {
          type: 'mrkdwn',
          text: `*💻 Device:*\n${data.device || 'Unknown'}`,
        },
        {
          type: 'mrkdwn',
          text: `*🔍 Browser:*\n${data.browser || 'Unknown'}`,
        },
      ],
    },
  ];
  
  // Add visit count and session duration if available
  if (data.visitCount || data.sessionDuration) {
    const visitInfo: string[] = [];
    if (data.visitCount) {
      visitInfo.push(`*🔄 Visit Count:* ${data.visitCount}${data.visitCount === 1 ? ' (First visit)' : ' (Returning visitor)'}`);
    }
    if (data.sessionDuration !== undefined && data.sessionDuration > 0) {
      visitInfo.push(`*⏱️ Time on Site:* ${formatDuration(data.sessionDuration)}`);
    }
    
    if (visitInfo.length > 0) {
      blocks.push({
        type: 'section',
        fields: visitInfo.map(info => ({
          type: 'mrkdwn',
          text: info,
        })),
      });
    }
  }

  // Add coordinates field if available
  if (coordinates) {
    blocks.push({
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*🗺️ Coordinates:*\n\`${coordinates}\`\n_*Note:* City-level approximation (IP geolocation)_`,
        },
      ],
    });
  }

  // Add traffic source
  blocks.push({
    type: 'section',
    fields: [
      {
        type: 'mrkdwn',
        text: `*📄 Landing Page:*\n\`${data.page}\``,
      },
      {
        type: 'mrkdwn',
        text: `*🔗 Traffic Source:*\n${data.source || 'Direct'}`,
      },
    ],
  });
  
  // Add navigation flow if available
  if (data.navigationFlow && data.navigationFlow.length > 1) {
    const flowText = data.navigationFlow
      .map((page, index) => `${index + 1}. \`${page}\``)
      .join('\n');
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*🧭 Navigation Flow:*\n${flowText}`,
      },
    });
  }

  // Add map link button if coordinates are available
  if (mapLink) {
    blocks.push({
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: '🗺️ View on Map',
            emoji: true,
          },
          url: mapLink,
          style: 'primary',
        },
      ],
    });
  }

  blocks.push({
    type: 'context',
    elements: [
      {
        type: 'mrkdwn',
        text: `⏰ ${new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })} (UAE Time)`,
      },
    ],
  });

  const message: SlackMessage = {
    blocks,
  };

  await sendToSlack(message);
}

/**
 * Send daily summary
 */
export async function sendDailySummary(stats: {
  visitors: number;
  pageViews: number;
  contactForms: number;
  newsletterSignups: number;
  payments: number;
  totalRevenue: number;
}): Promise<void> {
  const message: SlackMessage = {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '📊 Daily Website Summary',
          emoji: true,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*👥 Visitors:*\n${stats.visitors}`,
          },
          {
            type: 'mrkdwn',
            text: `*📄 Page Views:*\n${stats.pageViews}`,
          },
          {
            type: 'mrkdwn',
            text: `*📧 Contact Forms:*\n${stats.contactForms}`,
          },
          {
            type: 'mrkdwn',
            text: `*📰 Newsletter Signups:*\n${stats.newsletterSignups}`,
          },
          {
            type: 'mrkdwn',
            text: `*💰 Payments:*\n${stats.payments}`,
          },
          {
            type: 'mrkdwn',
            text: `*💵 Revenue:*\nAED ${stats.totalRevenue.toFixed(2)}`,
          },
        ],
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `📅 ${new Date().toLocaleDateString('en-AE', { timeZone: 'Asia/Dubai', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`,
          },
        ],
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: '📊 View Analytics',
              emoji: true,
            },
            url: 'https://cloud.umami.is',
            style: 'primary',
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: '🎛️ Admin Dashboard',
              emoji: true,
            },
            url: 'https://theorangecode.com/admin',
          },
        ],
      },
    ],
  };

  await sendToSlack(message);
}

/**
 * Send error notification
 */
export async function notifyError(error: {
  message: string;
  stack?: string;
  url?: string;
  userId?: string;
}): Promise<void> {
  const message: SlackMessage = {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '🚨 Website Error',
          emoji: true,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Error:*\n\`\`\`${error.message}\`\`\``,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*URL:*\n${error.url || 'Unknown'}`,
          },
          {
            type: 'mrkdwn',
            text: `*Time:*\n${new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })}`,
          },
        ],
      },
    ],
  };

  if (error.stack) {
    message.blocks?.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Stack Trace:*\n\`\`\`${error.stack.substring(0, 500)}\`\`\``,
      },
    });
  }

  await sendToSlack(message);
}

/**
 * Notify about conversion events (form completions, masterclass interest, etc.)
 */
export async function notifyConversionEvent(data: ConversionEventData): Promise<void> {
  const eventEmoji = data.event === 'form_complete' ? '✅' : 
                     data.event === 'masterclass_interest' ? '🎓' : 
                     data.event === 'cta_click' ? '👆' : '📊';

  const eventTitle = data.event === 'form_complete' ? 'Form Completed' :
                     data.event === 'masterclass_interest' ? 'Masterclass Interest' :
                     data.event === 'cta_click' ? 'CTA Clicked' :
                     'Conversion Event';

  const blocks: any[] = [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: `${eventEmoji} ${eventTitle}`,
        emoji: true,
      },
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*Element:*\n${data.element}`,
        },
        {
          type: 'mrkdwn',
          text: `*Location:*\n\`${data.location || 'Unknown'}\``,
        },
      ],
    },
  ];

  if (data.metadata && Object.keys(data.metadata).length > 0) {
    const metadataText = Object.entries(data.metadata)
      .map(([key, value]) => `*${key}:* ${value}`)
      .join('\n');
    
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Details:*\n${metadataText}`,
      },
    });
  }

  blocks.push({
    type: 'context',
    elements: [
      {
        type: 'mrkdwn',
        text: `⏰ ${new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })} (UAE Time)`,
      },
    ],
  });

  const message: SlackMessage = {
    blocks,
  };

  await sendToSlack(message);
}

/**
 * Test Slack connection
 */
export async function testSlackConnection(): Promise<boolean> {
  const message: SlackMessage = {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '✅ Slack Integration Test',
          emoji: true,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Your Slack notifications are working perfectly! You will now receive notifications for:\n\n• 📧 Contact form submissions\n• 📰 Newsletter subscriptions\n• 💰 Payment completions\n• 👤 New visitors (optional)\n• 🚨 Website errors',
        },
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `⏰ Test sent at: ${new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })} (UAE Time)`,
          },
        ],
      },
    ],
  };

  return await sendToSlack(message);
}

