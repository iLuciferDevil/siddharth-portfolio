'use client';

import Script from 'next/script';

const MEASUREMENT_ID = 'G-MF7RZTLQWW';

export default function GoogleAnalytics() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${MEASUREMENT_ID}', {send_page_view:true, anonymize_ip:true});
      `}</Script>
      <Script id="conversion-tracking" strategy="afterInteractive">{`
        (function(){
          function track(name,params){if(typeof window.gtag==='function')window.gtag('event',name,params||{});}
          document.addEventListener('click',function(event){
            var target=event.target&&event.target.closest?event.target.closest('a'):null;
            if(!target)return;
            var href=target.getAttribute('href')||'',text=(target.textContent||'').trim().slice(0,100),bookCta=target.getAttribute('data-book-cta');
            if(bookCta==='gumroad')track('book_gumroad_click',{link_text:text});
            else if(bookCta==='amazon')track('book_amazon_click',{link_text:text});
            else if(href.indexOf('mailto:')===0)track('contact_email_click',{link_text:text});
            else if(href.indexOf('tel:')===0)track('contact_phone_click',{link_text:text});
            else if(href.indexOf('wa.me')!==-1||href.indexOf('whatsapp')!==-1)track('contact_whatsapp_click',{link_text:text});
            else if(href.indexOf('#contact')!==-1||href.indexOf('#book')!==-1)track('contact_cta_click',{link_text:text});
          },true);
          document.addEventListener('submit',function(event){
            var form=event.target;
            if(form&&form.tagName==='FORM')track('contact_form_submit');
          },true);
        })();
      `}</Script>
    </>
  );
}
