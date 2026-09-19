'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    lintrk?: (...args: unknown[]) => void;
    trackMarketingEvent?: (eventName: string, params?: Record<string, unknown>) => void;
  }
}

export default function Analytics() {
  const pathname = usePathname();
  const measurementId = process.env.NEXT_PUBLIC_GA_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const linkedInPartnerId = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;

  useEffect(() => {
    if (pathname.startsWith('/dashboard')) return;

    const track = (eventName: string, params: Record<string, unknown> = {}) => {
      window.gtag?.('event', eventName, { page_path: pathname, ...params });
      window.fbq?.('trackCustom', eventName, params);
    };

    window.trackMarketingEvent = track;

    if (pathname === '/marketing-growth-diagnostic') {
      track('diagnostic_view');
    }

    if (pathname === '/book') {
      track('book_landing_view', { book: 'the_sovereign_brand' });
    }

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest('a');
      if (!link) return;

      const href = link.getAttribute('href') || '';
      const text = (link.textContent || '').trim().slice(0, 100);

      if (href.includes('gumroad.com') || href.includes('amazon.')) {
        const eventName = href.includes('gumroad.com') ? 'book_gumroad_click' : 'book_amazon_click';
        event.preventDefault();
        window.gtag?.('event', eventName, {
          destination: href,
          link_text: text,
          book: 'the_sovereign_brand',
          transport_type: 'beacon',
          event_callback: () => window.open(href, '_blank', 'noopener,noreferrer'),
          event_timeout: 1500,
        });
      } else if (href.startsWith('#booking')) {
        track('booking_start', { link_text: text });
      } else if (href.startsWith('https://wa.me/') || href.startsWith('whatsapp:')) {
        track('contact_click', { channel: 'whatsapp', link_text: text });
      } else if (href.startsWith('mailto:')) {
        track('contact_click', { channel: 'email', link_text: text });
      } else if (href.startsWith('tel:')) {
        track('contact_click', { channel: 'phone', link_text: text });
      }

      if (pathname === '/marketing-growth-diagnostic' && href === '#apply') {
        track('diagnostic_apply_click', { link_text: text });
      }
    };

    const onSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement | null;
      if (!form) return;
      if (form.classList.contains('resource-gate')) {
        track('resource_gate_submit');
      }
      if (form.classList.contains('lead-form')) {
        const eventName = form.classList.contains('diagnostic-form')
          ? 'marketing_growth_diagnostic_submit'
          : 'consulting_enquiry_submit';
        track(eventName, { form_id: form.id || undefined });
      }
    };

    document.addEventListener('click', onClick);
    document.addEventListener('submit', onSubmit);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('submit', onSubmit);
      delete window.trackMarketingEvent;
    };
  }, [pathname]);

  if (pathname.startsWith('/dashboard')) return null;

  return <>
    {measurementId && <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${measurementId}',{send_page_view:true});`}
      </Script>
    </>}

    {metaPixelId && <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
      </Script>
    </>}

    {linkedInPartnerId && <>
      <Script id="linkedin-insight" strategy="afterInteractive">
        {`_linkedin_partner_id = "${linkedInPartnerId}"; window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []; window._linkedin_data_partner_ids.push(_linkedin_partner_id); (function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];var b=document.createElement("script");b.type="text/javascript";b.async=true;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";s.parentNode.insertBefore(b,s)})(window.lintrk);`}
      </Script>
    </>}
  </>;
}
