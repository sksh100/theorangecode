import { redirect } from 'next/navigation'

export default function ComingSoonPage() {
  // Keep desktop and mobile in perfect sync: redirect /coming-soon to the main homepage
  redirect('/')
}
