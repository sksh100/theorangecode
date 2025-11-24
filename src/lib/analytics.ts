// Analytics utility functions for custom event tracking

declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string | Date,
      config?: Record<string, any>
    ) => void
  }
}

export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'user_interaction',
      ...eventParams,
      page_path: window.location.pathname,
      page_url: window.location.href,
      timestamp: new Date().toISOString(),
    })
  }
}

export const trackButtonClick = (
  buttonName: string,
  location?: string,
  additionalData?: Record<string, any>
) => {
  trackEvent('button_click', {
    event_label: buttonName,
    button_location: location || 'unknown',
    ...additionalData,
  })
}

export const trackLinkClick = (
  linkText: string,
  linkUrl: string,
  linkLocation?: string
) => {
  trackEvent('link_click', {
    event_label: linkText,
    link_url: linkUrl,
    link_location: linkLocation || 'unknown',
  })
}

export const trackFormStart = (formName: string, formLocation?: string) => {
  trackEvent('form_start', {
    event_label: formName,
    form_location: formLocation || 'unknown',
  })
}

export const trackFormComplete = (
  formName: string,
  formLocation?: string,
  additionalData?: Record<string, any>
) => {
  trackEvent('form_complete', {
    event_label: formName,
    form_location: formLocation || 'unknown',
    ...additionalData,
  })
}

export const trackMasterclassView = (
  masterclassName: string,
  masterclassId?: string
) => {
  trackEvent('masterclass_view', {
    event_label: masterclassName,
    masterclass_id: masterclassId,
  })
}

export const trackMasterclassSelect = (
  masterclassName: string,
  masterclassId?: string,
  price?: number
) => {
  trackEvent('masterclass_select', {
    event_label: masterclassName,
    masterclass_id: masterclassId,
    value: price,
    currency: 'AED',
  })
}

export const trackTimeSlotSelect = (
  date: string,
  time: string,
  type: 'online' | 'offline'
) => {
  trackEvent('time_slot_select', {
    event_label: `${date} ${time}`,
    slot_date: date,
    slot_time: time,
    slot_type: type,
  })
}

export const trackCheckoutStart = (
  masterclassName: string,
  price: number,
  date?: string,
  time?: string
) => {
  trackEvent('begin_checkout', {
    event_label: masterclassName,
    value: price,
    currency: 'AED',
    items: [
      {
        item_name: masterclassName,
        item_category: 'masterclass',
        price: price,
        quantity: 1,
      },
    ],
    ...(date && { booking_date: date }),
    ...(time && { booking_time: time }),
  })
}

export const trackPageView = (pageName: string, pagePath?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: pageName,
      page_path: pagePath || window.location.pathname,
      page_location: window.location.href,
    })
  }
}

export const trackSearch = (searchTerm: string, resultsCount?: number) => {
  trackEvent('search', {
    event_label: searchTerm,
    search_term: searchTerm,
    results_count: resultsCount,
  })
}

export const trackVideoPlay = (videoTitle: string, videoUrl?: string) => {
  trackEvent('video_play', {
    event_label: videoTitle,
    video_title: videoTitle,
    video_url: videoUrl,
  })
}

export const trackVideoComplete = (videoTitle: string, videoUrl?: string) => {
  trackEvent('video_complete', {
    event_label: videoTitle,
    video_title: videoTitle,
    video_url: videoUrl,
  })
}

export const trackDropdownOpen = (dropdownName: string) => {
  trackEvent('dropdown_open', {
    event_label: dropdownName,
    dropdown_name: dropdownName,
  })
}

export const trackDropdownItemClick = (
  dropdownName: string,
  itemName: string,
  itemUrl?: string
) => {
  trackEvent('dropdown_item_click', {
    event_label: itemName,
    dropdown_name: dropdownName,
    item_name: itemName,
    item_url: itemUrl,
  })
}

