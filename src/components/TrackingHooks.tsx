'use client'

import { useScrollTracking, useTimeTracking } from './Analytics'

export function TrackingHooks() {
  useScrollTracking()
  useTimeTracking()
  return null
}
