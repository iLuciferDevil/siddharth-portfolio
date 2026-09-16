'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Analytics() {
  const pathname = usePathname();
  const measurementId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    if (!measurementId || pathname.startsWith('/dashboard')) return;

    const gtag = (...args: unknown[]) => {
      const fn = (window as typeof window & {gtag?: (...args: unknown[]) => void}).gtag;
      if (fn) fn(...args);
    };

    const pageType = pathname.startsWith('/resources/')
      ? 'resource_view'
      : pathname.startsWith('/blog/')
        ? 'article_view'
        : pathname === '/book'
          ? 'book_view'
          : null;

    if (pageType) gtag('event', pageType, {page_path: pathname});

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest('a');
      if (!link) return;

      const href = link.getAttribute('href') || '';
      const text = (link.textContent || '').trim().slice(0, 100);

      if (href.includes('gumroad.com') || href.includes('amazon.')) {
        gtag('event', 'book_click', {destination: href, link_text: text});
      } else if (href.startsWith('#booking')) {
        gtag('event', 'booking_start', {link_text: text});
      } else if (href.startsWith('https://wa.me/') || href.startsWith('whatsapp:')) {
        gtag('event', 'contact_click', {channel: 'whatsapp', link_text: text});
      } else if (href.startsWith('mailto:')) {
        gtag('event', 'contact_click', {channel: 'email', link_text: text});
      } else if (href.startsWith('tel:')) {
        gtag('event', 'contact_click', {channel: 'phone', link_text: text});
      }
    };

    const onSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement | null;
      if (!form) return;

      if (form.classList.contains('resource-gate')) {
        gtag('event', 'resource_gate_submit', {page_path: pathname});
      }

      if (form.classList.contains('lead-form')) {
        gtag('event', 'consulting_enquiry_submit', {page_path: pathname});
      }
    };

    document.addEventListener('click', onClick);
    document.addEventListener('submit', onSubmit);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('submit', onSubmit);
    };
  }, [measurementId, pathname]);

  if (!measurementId || pathname.startsWith('/dashboard')) return null;

  return <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
    <Script id="google-analytics" strategy="afterInteractive">
      {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${measurementId}',{send_page_view:true});`}
    </Script>
  </>;
}
