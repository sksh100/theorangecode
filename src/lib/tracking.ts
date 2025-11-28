// Enhanced tracking utilities for conversion, engagement, and business metrics

export type TrackingEvent = 
  | 'cta_click'
  | 'form_start'
  | 'form_complete'
  | 'form_abandon'
  | 'page_view'
  | 'scroll_depth'
  | 'exit_intent'
  | 'conversion_funnel'
  | 'masterclass_view'
  | 'masterclass_interest';

export interface TrackingData {
  event: TrackingEvent;
  element?: string; // Button name, form name, etc.
  location?: string; // Page path, section name
  value?: string | number; // Additional data
  metadata?: Record<string, any>; // Extra context
}

/**
 * Track any event to the backend
 */
export async function trackEvent(data: TrackingData): Promise<void> {
  try {
    const sessionId = localStorage.getItem('visitor_session_id') || 
                     `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    await fetch('/api/track-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        ...data,
        timestamp: Date.now(),
        path: window.location.pathname,
        referrer: document.referrer || null,
      }),
    });
  } catch (error) {
    console.warn('Tracking failed:', error);
  }
}

/**
 * Track CTA button clicks
 */
export function trackCTAClick(buttonName: string, location?: string, metadata?: Record<string, any>): void {
  trackEvent({
    event: 'cta_click',
    element: buttonName,
    location: location || window.location.pathname,
    metadata,
  });
}

/**
 * Track form start
 */
export function trackFormStart(formName: string, location?: string): void {
  trackEvent({
    event: 'form_start',
    element: formName,
    location: location || window.location.pathname,
  });
}

/**
 * Track form completion
 */
export function trackFormComplete(formName: string, location?: string, metadata?: Record<string, any>): void {
  trackEvent({
    event: 'form_complete',
    element: formName,
    location: location || window.location.pathname,
    metadata,
  });
}

/**
 * Track form abandonment
 */
export function trackFormAbandon(formName: string, location?: string, fieldsFilled?: number): void {
  trackEvent({
    event: 'form_abandon',
    element: formName,
    location: location || window.location.pathname,
    value: fieldsFilled,
  });
}

/**
 * Track masterclass page view
 */
export function trackMasterclassView(masterclassId: string, masterclassName: string): void {
  trackEvent({
    event: 'masterclass_view',
    element: masterclassId,
    location: window.location.pathname,
    metadata: { masterclassName },
  });
}

/**
 * Track masterclass interest (clicking payment link, booking button)
 */
export function trackMasterclassInterest(masterclassId: string, masterclassName: string, action: string): void {
  trackEvent({
    event: 'masterclass_interest',
    element: masterclassId,
    location: window.location.pathname,
    value: action, // 'payment_link_click', 'book_button_click', etc.
    metadata: { masterclassName },
  });
}

/**
 * Track conversion funnel step
 */
export function trackFunnelStep(step: string, stepNumber: number, metadata?: Record<string, any>): void {
  trackEvent({
    event: 'conversion_funnel',
    element: step,
    value: stepNumber,
    location: window.location.pathname,
    metadata,
  });
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(depth: number, page: string): void {
  if (depth % 25 === 0) { // Only track at 25%, 50%, 75%, 100%
    trackEvent({
      event: 'scroll_depth',
      element: page,
      value: depth,
    });
  }
}

/**
 * Track exit intent
 */
export function trackExitIntent(page: string): void {
  trackEvent({
    event: 'exit_intent',
    element: page,
    location: window.location.pathname,
  });
}

