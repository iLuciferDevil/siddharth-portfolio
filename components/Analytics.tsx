'use client';

import Script from 'next/script';
import { useEffect, usePathname } from 'next/navigation';

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
        const provider = href.includes('gumroad.com') ? 'gumroad' : 'amazon';
        gtag('event', 'book_purchase_click', {
          provider,
          destination: href,
          link_text: text,
          book: 'the_sovereign_brand',
        });
        gtag('event', 'begin_checkout', {
          currency: 'USD',
          items: [{item_id: 'the_sovereign_brand', item_name: 'The Sovereign Brand', item_category: 'Book', affiliation: provider, quantity: 1}],
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
        gtag('event', 'consulting_enquiry_submit', { page_path: pathname });
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
