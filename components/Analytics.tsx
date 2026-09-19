'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function Analytics() {
  const pathname = usePathname();
  const measurementId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    if (!measurementId || pathname.startsWith('/dashboard')) return;

    const gtag = (...args: unknown[]) => window.gtag?.(...args);

    if (pathname === '/book') {
      gtag('event', 'book_landing_view', { page_path: pathname, book: 'the_sovereign_brand' });
    }

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest('a');
      if (!link) return;

      const href = link.getAttribute('href') || '';
      const text = (link.textContent || '').trim().slice(0, 100);

      if (href.includes('gumroad.com') || href.includes('amazon.')) {
        const eventName = href.includes('gumroad.com') ? 'book_gumroad_click' : 'book_amazon_click';

        // These are outbound links. Use Beacon + callback so the event has a chance to
        // reach GA4 before the browser leaves the page for the external destination.
        event.preventDefault();
        gtag('event', eventName, {
          destination: href,
          link_text: text,
          book: 'the_sovereign_brand',
          transport_type: 'beacon',
          event_callback: () => {
            window.open(href, '_blank', 'noopener,noreferrer');
          },
          event_timeout: 1500,
        });
      } else if (href.startsWith('#booking')) {
        gtag('event', 'booking_start', { link_text: text });
      } else if (href.startsWith('https://wa.me/') || href.startsWith('whatsapp:')) {
        gtag('event', 'contact_click', { channel: 'whatsapp', link_text: text });
      } else if (href.startsWith('mailto:')) {
        gtag('event', 'contact_click', { channel: 'email', link_text: text });
      } else if (href.startsWith('tel:')) {
        gtag('event', 'contact_click', { channel: 'phone', link_text: text });
      }
    };

    const onSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement | null;
      if (!form) return;
      if (form.classList.contains('resource-gate')) {
        gtag('event', 'resource_gate_submit', { page_path: pathname });
      }
      if (form.classList.contains('lead-form')) {
        const eventName = form.classList.contains('diagnostic-form') ? 'marketing_growth_diagnostic_submit' : 'consulting_enquiry_submit';
        gtag('event', eventName, { page_path: pathname, form_id: form.id || undefined });
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
      {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${measurementId}',{send_page_view:true});`}
    </Script>
  </>;
}
