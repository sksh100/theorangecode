import { redirect } from 'next/navigation'

export default function WorkshopsPage() {
  // Permanent redirect (301) from /workshops to /masterclasses
  redirect('/masterclasses')
}
