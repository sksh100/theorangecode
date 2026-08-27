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
  /** Optional session / visitor context for richer Slack alerts */
  sessionId?: string;
  page?: string;
  country?: string;
  city?: string;
  area?: string;
  region?: string;
  postalCode?: string;
  ip?: string;
  lat?: number;
  lng?: number;
  timezone?: string;
  isp?: string;
  device?: string;
  browser?: string;
  source?: string;
  referrerDomain?: string;
  searchQuery?: string;
  utmParams?: Record<string, string>;
  navigationFlow?: string[];
  sessionDuration?: number;
  visitCount?: number;
  language?: string;
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
  region?: string;
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
  /** When set, formats as engagement/session-end instead of first-land */
  notificationType?: 'new' | 'engaged' | 'session_end';
}

interface ConversionEventData {
  event: string;
  element: string;
  location?: string;
  metadata?: Record<string, any>;
  sessionDuration?: number;
  country?: string;
  city?: string;
  area?: string;
  page?: string;
  source?: string;
  navigationFlow?: string[];
  device?: string;
  browser?: string;
}

interface EbookDeliveryData {
  email: string;
  customerName?: string;
  orderId?: string;
}

const COUNTRY_NAMES: Record<string, string> = {
  AE: 'United Arab Emirates',
  SA: 'Saudi Arabia',
  QA: 'Qatar',
  KW: 'Kuwait',
  BH: 'Bahrain',
  OM: 'Oman',
  US: 'United States',
  GB: 'United Kingdom',
  UK: 'United Kingdom',
  DE: 'Germany',
  FR: 'France',
  NL: 'Netherlands',
  IT: 'Italy',
  ES: 'Spain',
  PT: 'Portugal',
  PL: 'Poland',
  SE: 'Sweden',
  NO: 'Norway',
  DK: 'Denmark',
  FI: 'Finland',
  RU: 'Russia',
  UA: 'Ukraine',
  CN: 'China',
  IN: 'India',
  PK: 'Pakistan',
  EG: 'Egypt',
  TR: 'Turkey',
  CA: 'Canada',
  AU: 'Australia',
  CH: 'Switzerland',
  AT: 'Austria',
  BE: 'Belgium',
  IE: 'Ireland',
  CZ: 'Czech Republic',
  RO: 'Romania',
  GR: 'Greece',
  HU: 'Hungary',
};

function countryLabel(code?: string | null): string {
  if (!code || code === 'Unknown') return 'Unknown';
  const upper = code.toUpperCase();
  return COUNTRY_NAMES[upper] ? `${COUNTRY_NAMES[upper]} (${upper})` : code;
}

/** Human-readable time on site, e.g. "3m 42s" */
export function formatSessionDuration(seconds?: number | null): string {
  if (seconds == null || seconds < 0 || Number.isNaN(seconds)) return 'Just arrived';
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m < 60) return s > 0 ? `${m}m ${s}s` : `${m}m`;
  const h = Math.floor(m / 60);
  const rm = m % 60;
  return rm > 0 ? `${h}h ${rm}m` : `${h}h`;
}

function formatAccurateLocation(data: {
  country?: string | null;
  city?: string | null;
  area?: string | null;
  region?: string | null;
  postalCode?: string | null;
}): string {
  const parts: string[] = [];
  if (data.area) parts.push(data.area);
  if (data.city && data.city !== 'Unknown') parts.push(data.city);
  else if (data.region) parts.push(data.region);
  if (data.postalCode) parts.push(data.postalCode);
  if (data.country && data.country !== 'Unknown') parts.push(countryLabel(data.country));
  return parts.length > 0 ? parts.join(', ') : 'Unknown location';
}

function formatIPAddress(ip: string | undefined | null): string {
  if (!ip) return 'Unknown';
  const knownIPs: Record<string, string> = {
    '94.59.182.192': 'Sunain',
  };
  return knownIPs[ip] || ip;
}

function buildMapLink(lat?: number, lng?: number): string | null {
  if (lat == null || lng == null) return null;
  return `https://www.google.com/maps?q=${lat},${lng}`;
}

function buildContextBlocks(data: {
  country?: string | null;
  city?: string | null;
  area?: string | null;
  region?: string | null;
  postalCode?: string | null;
  ip?: string | null;
  lat?: number | null;
  lng?: number | null;
  timezone?: string | null;
  isp?: string | null;
  device?: string | null;
  browser?: string | null;
  source?: string | null;
  referrerDomain?: string | null;
  searchQuery?: string | null;
  utmParams?: Record<string, string> | null;
  navigationFlow?: string[] | null;
  sessionDuration?: number | null;
  visitCount?: number | null;
  language?: string | null;
  page?: string | null;
  networkType?: string | null;
}): any[] {
  const blocks: any[] = [];
  const location = formatAccurateLocation(data);
  const mapLink = buildMapLink(data.lat ?? undefined, data.lng ?? undefined);
  const duration = formatSessionDuration(data.sessionDuration);

  blocks.push({
    type: 'section',
    fields: [
      { type: 'mrkdwn', text: `*📍 Location:*\n${location}` },
      { type: 'mrkdwn', text: `*⏱️ Time on site:*\n${duration}` },
      { type: 'mrkdwn', text: `*🌐 IP:*\n\`${formatIPAddress(data.ip)}\`` },
      {
        type: 'mrkdwn',
        text: `*💻 Device / Browser:*\n${data.device || 'Unknown'} · ${data.browser || 'Unknown'}`,
      },
    ],
  });

  const extras: string[] = [];
  if (data.timezone) extras.push(`*🕐 Timezone:* ${data.timezone}`);
  if (data.isp) extras.push(`*🏢 ISP:* ${data.isp}`);
  if (data.language) extras.push(`*🗣️ Language:* ${data.language}`);
  if (data.networkType) extras.push(`*📶 Network:* ${data.networkType}`);
  if (data.visitCount) extras.push(`*🔄 Visit #:* ${data.visitCount}`);
  if (data.page) extras.push(`*📄 Page:* \`${data.page}\``);
  if (data.source) extras.push(`*🔗 Source:* ${data.source}`);
  if (data.referrerDomain) extras.push(`*↩️ Referrer:* ${data.referrerDomain}`);
  if (data.searchQuery) extras.push(`*🔍 Search query:* ${data.searchQuery}`);

  if (extras.length > 0) {
    blocks.push({
      type: 'section',
      fields: extras.slice(0, 10).map((text) => ({ type: 'mrkdwn', text })),
    });
  }

  if (data.utmParams && Object.keys(data.utmParams).length > 0) {
    const utmText = Object.entries(data.utmParams)
      .map(([k, v]) => `*${k}:* ${v}`)
      .join('\n');
    blocks.push({
      type: 'section',
      text: { type: 'mrkdwn', text: `*📣 UTM / campaign:*\n${utmText}` },
    });
  }

  if (data.navigationFlow && data.navigationFlow.length > 0) {
    const flowText = data.navigationFlow
      .slice(-12)
      .map((p, i) => `${i + 1}. \`${p}\``)
      .join('\n');
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*🧭 Pages visited (${data.navigationFlow.length}):*\n${flowText}`,
      },
    });
  }

  if (data.lat != null && data.lng != null) {
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*🗺️ Coordinates:* \`${data.lat.toFixed(5)}, ${data.lng.toFixed(5)}\` _(IP/city-level approximation)_`,
      },
    });
  }

  if (mapLink) {
    blocks.push({
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: { type: 'plain_text', text: '🗺️ Open map', emoji: true },
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

  return blocks;
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
 * Notify about contact form submission (includes visitor location + time on site)
 */
export async function notifyContactForm(data: ContactFormData): Promise<void> {
  const blocks: any[] = [
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
        { type: 'mrkdwn', text: `*Name:*\n${data.name}` },
        { type: 'mrkdwn', text: `*Email:*\n${data.email}` },
        { type: 'mrkdwn', text: `*Phone:*\n${data.phone || 'Not provided'}` },
        { type: 'mrkdwn', text: `*Subject:*\n${data.subject}` },
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
      type: 'divider',
    },
    ...buildContextBlocks({
      country: data.country,
      city: data.city,
      area: data.area,
      region: data.region,
      postalCode: data.postalCode,
      ip: data.ip,
      lat: data.lat,
      lng: data.lng,
      timezone: data.timezone,
      isp: data.isp,
      device: data.device,
      browser: data.browser,
      source: data.source,
      referrerDomain: data.referrerDomain,
      searchQuery: data.searchQuery,
      utmParams: data.utmParams,
      navigationFlow: data.navigationFlow,
      sessionDuration: data.sessionDuration,
      visitCount: data.visitCount,
      language: data.language,
      page: data.page,
    }),
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: { type: 'plain_text', text: '📧 Reply via Email', emoji: true },
          url: `mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject)}`,
          style: 'primary',
        },
      ],
    },
  ];

  if (data.sessionId) {
    blocks.push({
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `Session \`${data.sessionId.slice(0, 24)}…\``,
        },
      ],
    });
  }

  await sendToSlack({ blocks });
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
 * Notify about visitors: first land, engaged (time on site), or session end summary
 */
export async function notifyNewVisitor(data: VisitorData): Promise<void> {
  const type = data.notificationType || 'new';
  const location = formatAccurateLocation(data);
  const duration = formatSessionDuration(data.sessionDuration);

  let headerText = '👤 New Visitor on Website';
  if (type === 'engaged') {
    headerText = `🔥 Engaged Visitor · ${duration} on site`;
  } else if (type === 'session_end') {
    headerText = `👋 Session Ended · ${duration} on site`;
  } else if (data.visitCount && data.visitCount > 1) {
    headerText = `👤 Returning Visitor (Visit #${data.visitCount})`;
  }

  const blocks: any[] = [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: headerText,
        emoji: true,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text:
          type === 'engaged'
            ? `Still browsing — *${duration}* · *${location}*`
            : type === 'session_end'
              ? `Left after *${duration}* · *${location}*`
              : `Just landed · *${location}*`,
      },
    },
  ];

  blocks.push(...buildContextBlocks(data));

  if (data.languages && data.languages.length > 1) {
    // Insert languages before the final context block
    const contextIdx = blocks.findIndex((b) => b.type === 'context');
    const langBlock = {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*🗣️ Languages:* ${data.languages.join(', ')}`,
        },
      ],
    };
    if (contextIdx >= 0) blocks.splice(contextIdx, 0, langBlock);
    else blocks.push(langBlock);
  }

  await sendToSlack({ blocks }, false);
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

  const geoLocation = formatAccurateLocation(data);
  const duration = formatSessionDuration(data.sessionDuration);
  const pagePath = data.page || data.location || 'Unknown';

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
        { type: 'mrkdwn', text: `*Element:*\n${data.element}` },
        { type: 'mrkdwn', text: `*📄 Page:*\n\`${pagePath}\`` },
        { type: 'mrkdwn', text: `*📍 Location:*\n${geoLocation}` },
        { type: 'mrkdwn', text: `*⏱️ Time on site:*\n${duration}` },
      ],
    },
  ];

  if (data.device || data.browser || data.source) {
    blocks.push({
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*💻 Device:*\n${data.device || 'Unknown'} · ${data.browser || 'Unknown'}`,
        },
        {
          type: 'mrkdwn',
          text: `*🔗 Source:*\n${data.source || 'Unknown'}`,
        },
      ],
    });
  }

  if (data.navigationFlow && data.navigationFlow.length > 0) {
    const flowText = data.navigationFlow
      .slice(-12)
      .map((p, i) => `${i + 1}. \`${p}\``)
      .join('\n');
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*🧭 Pages visited:*\n${flowText}`,
      },
    });
  }

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

  await sendToSlack({ blocks }, false);
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

