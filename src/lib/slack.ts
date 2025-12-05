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
 * Notify about ebook purchase
 */
export async function notifyEbookPurchase(data: {
  customerEmail: string;
  customerName?: string;
  amount: number;
  currency: string;
  orderId: string;
  stripeChargeId: string;
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
            text: `*Product:*\nUK to UAE Cultural Intelligence Ebook`,
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
            url: `https://www.theorangecode.com/api/send-ebook?email=${encodeURIComponent(data.customerEmail)}&product=${encodeURIComponent('UK to UAE Cultural Intelligence Ebook')}`,
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

  await sendToSlack(message);
}

/**
 * Notify about ebook delivery
 */
export async function notifyEbookDelivery(data: EbookDeliveryData): Promise<void> {
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
          text: '✅ *UK to UAE Cultural Intelligence Guide* has been sent to the customer via email.',
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

  await sendToSlack(message);
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
          text: `*📍 Location:*\n${location}${data.postalCode ? `\n_Postal: ${data.postalCode}_` : ''}`,
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

  // Add network information if available
  if (data.networkType || data.networkEffectiveType) {
    const networkInfo: string[] = [];
    
    if (data.networkType) {
      const networkEmoji = data.networkType === 'wifi' ? '📶' : 
                          data.networkType === 'cellular' ? '📱' : 
                          data.networkType === 'ethernet' ? '🔌' : '🌐';
      networkInfo.push(`*${networkEmoji} Connection:* ${data.networkType.charAt(0).toUpperCase() + data.networkType.slice(1)}`);
    }
    
    if (data.networkEffectiveType) {
      networkInfo.push(`*⚡ Network Speed:* ${data.networkEffectiveType.toUpperCase()}`);
    }
    
    if (data.networkDownlink) {
      networkInfo.push(`*⬇️ Downlink:* ${data.networkDownlink.toFixed(2)} Mbps`);
    }
    
    if (data.networkRtt) {
      networkInfo.push(`*⏱️ Latency:* ${data.networkRtt}ms`);
    }
    
    if (networkInfo.length > 0) {
      blocks.push({
        type: 'section',
        fields: networkInfo.map(info => ({
          type: 'mrkdwn',
          text: info,
        })),
      });
    }
  }

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

  // Add enhanced location information (ISP, Organization, Timezone)
  const locationDetails: string[] = [];
  if (data.isp) {
    locationDetails.push(`*🏢 ISP:* ${data.isp}`);
  }
  if (data.org && data.org !== data.isp) {
    locationDetails.push(`*🏛️ Organization:* ${data.org}`);
  }
  if (data.timezone) {
    locationDetails.push(`*🕐 Timezone:* ${data.timezone}`);
  }
  if (data.timezoneBrowser && data.timezoneBrowser !== data.timezone) {
    locationDetails.push(`*🌍 Browser TZ:* ${data.timezoneBrowser}`);
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

  // Add device & display information
  const deviceInfo: string[] = [];
  if (data.screenWidth && data.screenHeight) {
    deviceInfo.push(`*📺 Screen:* ${data.screenWidth}×${data.screenHeight}px`);
  }
  if (data.viewportWidth && data.viewportHeight) {
    deviceInfo.push(`*👁️ Viewport:* ${data.viewportWidth}×${data.viewportHeight}px`);
  }
  if (data.colorDepth) {
    deviceInfo.push(`*🎨 Color Depth:* ${data.colorDepth}-bit`);
  }
  if (data.pixelRatio && data.pixelRatio !== 1) {
    deviceInfo.push(`*🔍 Pixel Ratio:* ${data.pixelRatio}x`);
  }
  if (data.deviceMemory) {
    deviceInfo.push(`*💾 Memory:* ${data.deviceMemory}GB`);
  }
  if (data.cpuCores) {
    deviceInfo.push(`*⚙️ CPU Cores:* ${data.cpuCores}`);
  }
  if (data.batteryLevel !== undefined) {
    const batteryEmoji = data.batteryCharging ? '🔌' : '🔋';
    deviceInfo.push(`*${batteryEmoji} Battery:* ${data.batteryLevel}%${data.batteryCharging ? ' (Charging)' : ''}`);
  }
  
  if (deviceInfo.length > 0) {
    blocks.push({
      type: 'section',
      fields: deviceInfo.map(info => ({
        type: 'mrkdwn',
        text: info,
      })),
    });
  }

  // Add language & locale information
  if (data.language || data.languages) {
    const langInfo: string[] = [];
    if (data.language) {
      langInfo.push(`*🌐 Language:* ${data.language}`);
    }
    if (data.languages && data.languages.length > 1) {
      langInfo.push(`*🗣️ Languages:* ${data.languages.join(', ')}`);
    }
    if (data.timezoneOffset !== undefined) {
      const offsetHours = Math.abs(data.timezoneOffset / 60);
      const offsetMins = Math.abs(data.timezoneOffset % 60);
      const offsetSign = data.timezoneOffset <= 0 ? '+' : '-';
      langInfo.push(`*⏰ TZ Offset:* UTC${offsetSign}${offsetHours}:${offsetMins.toString().padStart(2, '0')}`);
    }
    
    if (langInfo.length > 0) {
      blocks.push({
        type: 'section',
        fields: langInfo.map(info => ({
          type: 'mrkdwn',
          text: info,
        })),
      });
    }
  }

  // Add platform information
  if (data.platform || data.vendor) {
    const platformInfo: string[] = [];
    if (data.platform) {
      platformInfo.push(`*💿 Platform:* ${data.platform}`);
    }
    if (data.vendor) {
      platformInfo.push(`*🏷️ Vendor:* ${data.vendor}`);
    }
    
    if (platformInfo.length > 0) {
      blocks.push({
        type: 'section',
        fields: platformInfo.map(info => ({
          type: 'mrkdwn',
          text: info,
        })),
      });
    }
  }

  // Add performance metrics
  if (data.pageLoadTime || data.domContentLoaded) {
    const perfInfo: string[] = [];
    if (data.pageLoadTime) {
      perfInfo.push(`*⚡ Page Load:* ${(data.pageLoadTime / 1000).toFixed(2)}s`);
    }
    if (data.domContentLoaded) {
      perfInfo.push(`*📄 DOM Ready:* ${(data.domContentLoaded / 1000).toFixed(2)}s`);
    }
    
    if (perfInfo.length > 0) {
      blocks.push({
        type: 'section',
        fields: perfInfo.map(info => ({
          type: 'mrkdwn',
          text: info,
        })),
      });
    }
  }

  // Add privacy settings
  if (data.doNotTrack || data.cookieEnabled !== undefined) {
    const privacyInfo: string[] = [];
    if (data.doNotTrack && data.doNotTrack !== 'unknown') {
      privacyInfo.push(`*🔒 Do Not Track:* ${data.doNotTrack === '1' ? 'Enabled' : 'Disabled'}`);
    }
    if (data.cookieEnabled !== undefined) {
      privacyInfo.push(`*🍪 Cookies:* ${data.cookieEnabled ? 'Enabled' : 'Disabled'}`);
    }
    
    if (privacyInfo.length > 0) {
      blocks.push({
        type: 'section',
        fields: privacyInfo.map(info => ({
          type: 'mrkdwn',
          text: info,
        })),
      });
    }
  }

  // Add traffic source with enhanced details
  const trafficInfo: string[] = [];
  trafficInfo.push(`*📄 Landing Page:*\n\`${data.page}\``);
  trafficInfo.push(`*🔗 Traffic Source:*\n${data.source || 'Direct'}`);
  
  if (data.referrerDomain) {
    trafficInfo.push(`*🌐 Referrer:*\n${data.referrerDomain}${data.referrerPath ? data.referrerPath : ''}`);
  }
  if (data.searchQuery) {
    trafficInfo.push(`*🔍 Search Query:*\n"${data.searchQuery}"`);
  }
  
  if (data.utmParams && Object.keys(data.utmParams).length > 0) {
    const utmText = Object.entries(data.utmParams)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
    trafficInfo.push(`*📊 UTM Params:*\n${utmText}`);
  }
  
  blocks.push({
    type: 'section',
    fields: trafficInfo.map(info => ({
      type: 'mrkdwn',
      text: info,
    })),
  });
  
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

