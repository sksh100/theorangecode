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
  networkType?: string;  // Network connection type (wifi, cellular, etc.)
  networkEffectiveType?: string;  // Effective network type (4g, 3g, etc.)
  networkDownlink?: number;  // Network downlink speed in Mbps
  networkRtt?: number;  // Network round-trip time in ms
  // Enhanced location
  isp?: string;  // Internet Service Provider
  org?: string;  // Organization name
  timezone?: string;  // Timezone from IP geolocation
  // Device & Display
  screenWidth?: number;
  screenHeight?: number;
  viewportWidth?: number;
  viewportHeight?: number;
  colorDepth?: number;
  pixelRatio?: number;
  deviceMemory?: number;  // Device memory in GB
  cpuCores?: number;  // CPU core count
  // Language & Locale
  language?: string;
  languages?: string[];
  timezoneBrowser?: string;  // Timezone from browser
  timezoneOffset?: number;  // Timezone offset in minutes
  // Platform
  platform?: string;
  vendor?: string;
  // Battery (mobile)
  batteryLevel?: number;  // Battery percentage
  batteryCharging?: boolean;
  // Privacy
  doNotTrack?: string;
  cookieEnabled?: boolean;
  // Performance
  pageLoadTime?: number;  // Page load time in ms
  domContentLoaded?: number;  // DOM content loaded time in ms
  // Referrer details
  referrerDomain?: string;
  referrerPath?: string;
  searchQuery?: string;  // Search query if from search engine
  // UTM Parameters
  utmParams?: Record<string, string>;
}

interface ConversionEventData {
  event: string;
  element: string;
  location?: string;
  metadata?: Record<string, any>;
}

interface EbookDeliveryData {
  email: string;
  customerName?: string;
  orderId?: string;
}

/**
 * Send a message to Slack
 * @param message - The Slack message to send
 * @param useSalesWebhook - If true, use SLACK_WEBHOOK_URL_SALES, otherwise use SLACK_WEBHOOK_URL
 */
async function sendToSlack(message: SlackMessage, useSalesWebhook: boolean = false): Promise<boolean> {
  // Determine which webhook to use
  const webhookUrl = useSalesWebhook 
    ? process.env.SLACK_WEBHOOK_URL_SALES 
    : process.env.SLACK_WEBHOOK_URL;

  const webhookType = useSalesWebhook ? 'sales' : 'general';

  console.log(`🔍 Slack ${webhookType} webhook status:`, {
    hasWebhook: !!webhookUrl,
    webhookPrefix: webhookUrl ? webhookUrl.substring(0, 30) + '...' : 'none',
    messageType: message.blocks?.[0]?.text?.text || message.text || 'unknown',
    usingSalesWebhook: useSalesWebhook
  });

  if (!webhookUrl) {
    const envVarName = useSalesWebhook ? 'SLACK_WEBHOOK_URL_SALES' : 'SLACK_WEBHOOK_URL';
    console.error(`❌ ${envVarName} not configured - notification not sent`);
    console.error(`❌ Please add ${envVarName} to Vercel environment variables`);
    return false;
  }

  try {
    console.log(`📤 Sending to Slack (${webhookType})...`, { messageType: message.blocks?.[0]?.text?.text || 'unknown' });
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    console.log(`📥 Slack ${webhookType} response:`, {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Slack ${webhookType} notification failed:`, {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      return false;
    }

    console.log(`✅ Slack ${webhookType} notification sent successfully`);
    return true;
  } catch (error) {
    console.error(`❌ Error sending Slack ${webhookType} notification:`, error);
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

  await sendToSlack(message, false); // General notifications use default webhook
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

  await sendToSlack(message, true); // Sales notification - use sales webhook
}

/**
 * Notify about ebook purchase
 */
export async function notifyEbookPurchase(data: {
  customerEmail: string;
  customerName?: string;
  amount: number;
  currency: string;
  orderId: string;
  stripeChargeId: string;
  ebookType?: 'beyond-formalities' | 'uk-to-uae';
}): Promise<void> {
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
          text: '📚 New Ebook Purchase!',
          emoji: true,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Customer:*\n${data.customerName || data.customerEmail}`,
          },
          {
            type: 'mrkdwn',
            text: `*Email:*\n${data.customerEmail}`,
          },
          {
            type: 'mrkdwn',
            text: `*Amount:*\n${formattedAmount}`,
          },
          {
            type: 'mrkdwn',
            text: `*Product:*\n${data.ebookType === 'beyond-formalities' 
              ? 'Beyond Formalities: Understanding Emirati Culture, Local Customs, and Everyday Life'
              : 'UK to UAE Cultural Intelligence Guide'}`,
          },
          {
            type: 'mrkdwn',
            text: `*Order ID:*\n\`${data.orderId}\``,
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
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: '📥 Resend Ebook',
              emoji: true,
            },
            url: `https://www.theorangecode.com/api/send-ebook?email=${encodeURIComponent(data.customerEmail)}&ebookType=${encodeURIComponent(data.ebookType || 'uk-to-uae')}`,
          },
        ],
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: '✅ Ebook will be automatically sent to the customer via email.',
          },
        ],
      },
    ],
  };

  await sendToSlack(message, true); // Sales notification - use sales webhook
}

/**
 * Notify about Payhip ebook purchase
 */
export async function notifyPayhipEbookPurchase(data: {
  customerEmail: string;
  customerName?: string;
  amount: number;
  currency: string;
  orderId: string;
  productName: string;
}): Promise<void> {
  const formattedAmount = new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: data.currency.toUpperCase(),
  }).format(data.amount);

  const message: SlackMessage = {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '📚 New Ebook Purchase (Payhip)!',
          emoji: true,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Customer:*\n${data.customerName || data.customerEmail}`,
          },
          {
            type: 'mrkdwn',
            text: `*Email:*\n${data.customerEmail}`,
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
            text: `*Order ID:*\n\`${data.orderId}\``,
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
          text: `*Platform:*\nPayhip`,
        },
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: '💳 View in Payhip',
              emoji: true,
            },
            url: `https://payhip.com/dashboard/sales`,
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
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: '✅ Ebook will be automatically sent to the customer via Payhip.',
          },
        ],
      },
    ],
  };

  await sendToSlack(message, true); // Sales notification - use sales webhook
}

/**
 * Notify about ebook delivery
 */
export async function notifyEbookDelivery(data: EbookDeliveryData & { ebookType?: 'beyond-formalities' | 'uk-to-uae' }): Promise<void> {
  const message: SlackMessage = {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '📚 Ebook Delivered Successfully!',
          emoji: true,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Customer:*\n${data.customerName || 'Customer'}`,
          },
          {
            type: 'mrkdwn',
            text: `*Email:*\n${data.email}`,
          },
          {
            type: 'mrkdwn',
            text: `*Order ID:*\n\`${data.orderId || 'N/A'}\``,
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
          text: `✅ *${data.ebookType === 'beyond-formalities' 
            ? 'Beyond Formalities: Understanding Emirati Culture, Local Customs, and Everyday Life'
            : 'UK to UAE Cultural Intelligence Guide'}* has been sent to the customer via email.`,
        },
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: '📧 The ebook PDF was attached to the email or a download link was provided.',
          },
        ],
      },
    ],
  };

  await sendToSlack(message, true); // Sales notification - use sales webhook
}

/**
 * Format IP address for display (with custom names for known IPs)
 */
function formatIPAddress(ip: string | undefined | null): string {
  if (!ip) return 'Unknown';
  
  // Custom IP address mappings
  const knownIPs: Record<string, string> = {
    '94.59.182.192': 'Sunain',
  };
  
  return knownIPs[ip] || ip;
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
  
  // Format coordinates if available
  const coordinates = data.lat && data.lng 
    ? `${data.lat.toFixed(8)}, ${data.lng.toFixed(8)}`
    : null;
  
  // Create Google Maps link if coordinates are available
  const mapLink = coordinates 
    ? `https://www.google.com/maps?q=${data.lat},${data.lng}`
    : null;
  
  // Format IP address with custom name if applicable
  const displayIP = formatIPAddress(data.ip);

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
          text: `*📍 Location:*\n${location}`,
        },
        {
          type: 'mrkdwn',
          text: `*🌐 IP Address:*\n\`${displayIP}\``,
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

  // Add Connection (network type only)
  if (data.networkType) {
    const networkEmoji = data.networkType === 'wifi' ? '📶' : 
                        data.networkType === 'cellular' ? '📱' : 
                        data.networkType === 'ethernet' ? '🔌' : '🌐';
    blocks.push({
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*${networkEmoji} Connection:* ${data.networkType.charAt(0).toUpperCase() + data.networkType.slice(1)}`,
        },
      ],
    });
  }

  // Add Visit Count
  if (data.visitCount) {
    blocks.push({
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*🔄 Visit Count:* ${data.visitCount}${data.visitCount === 1 ? ' (First visit)' : ' (Returning visitor)'}`,
        },
      ],
    });
  }

  // Add Coordinates
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

  // Add ISP and Timezone
  const locationDetails: string[] = [];
  if (data.isp) {
    locationDetails.push(`*🏢 ISP:* ${data.isp}`);
  }
  if (data.timezone) {
    locationDetails.push(`*🕐 Timezone:* ${data.timezone}`);
  }
  
  if (locationDetails.length > 0) {
    blocks.push({
      type: 'section',
      fields: locationDetails.map(info => ({
        type: 'mrkdwn',
        text: info,
      })),
    });
  }

  // Add Languages
  if (data.languages && data.languages.length > 0) {
    blocks.push({
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*🗣️ Languages:* ${data.languages.join(', ')}`,
        },
      ],
    });
  }

  // Add Pages Visited (Navigation Flow)
  if (data.navigationFlow && data.navigationFlow.length > 0) {
    const flowText = data.navigationFlow
      .map((page, index) => `${index + 1}. \`${page}\``)
      .join('\n');
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*🧭 Pages Visited:*\n${flowText}`,
      },
    });
  }

  // Add Traffic Source
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

  await sendToSlack(message, false); // General notification - use default webhook
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

  await sendToSlack(message, false); // General notification - use default webhook
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

  await sendToSlack(message, false); // General notification - use default webhook
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

  await sendToSlack(message, false); // General notification - use default webhook
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

  return await sendToSlack(message, false); // Test uses default webhook
}

