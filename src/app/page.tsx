import { redirect } from 'next/navigation'

export default function RootPage() {
  // 기본 언어로 리다이렉트
  redirect('/en')
}
