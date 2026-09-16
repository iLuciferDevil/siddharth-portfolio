'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

export default function Analytics() {
  const pathname = usePathname();
  const measurementId = process.env.NEXT_PUBLIC_GA_ID;
  if (!measurementId || pathname.startsWith('/dashboard')) return null;
  return <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
    <Script id="google-analytics" strategy="afterInteractive">
      {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${measurementId}',{send_page_view:true});`}
    </Script>
  </>;
}
