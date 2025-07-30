import { redirect } from 'next/navigation'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 기본 언어로 리다이렉트
  redirect('/en')
}
