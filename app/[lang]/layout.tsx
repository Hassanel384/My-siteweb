import { Locale } from '@/types'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getDictionary } from '@/lib/dictionaries'

export async function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }]
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  const dict = await getDictionary(params.lang)

  return (
    <>
      <Header lang={params.lang} dict={dict} />
      <main className="min-h-screen">{children}</main>
      <Footer lang={params.lang} dict={dict} />
    </>
  )
}
