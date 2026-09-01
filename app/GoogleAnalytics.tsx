'use client';

import Script from 'next/script';

const MEASUREMENT_ID = 'G-MF7RZTLQWW';

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${MEASUREMENT_ID}', {
            send_page_view: true,
            anonymize_ip: true
          });
        `}
      </Script>
      <Script id="site-polish-and-form" strategy="afterInteractive">
        {`
          (function () {
            function track(name, params) {
              if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
            }

            var style = document.createElement('style');
            style.textContent = '\n              .book-actions .button.alt{background:transparent!important;color:#11110f!important;border:1px solid #11110f!important}\n              .book-actions .button.alt:hover{background:#11110f!important;color:#fff!important}\n              .cta-box>div:last-child>.button{margin-top:22px}\n              .cta-box>div:last-child>p+.button{margin-top:22px}\n              .form-success{display:none;min-height:520px;position:relative;overflow:hidden;border-radius:20px;background:#171714;color:#fff;padding:48px;align-items:center;justify-content:center;text-align:center}\n              .form-success.is-visible{display:flex;animation:successIn .55s cubic-bezier(.2,.8,.2,1) both}\n              .success-orbit{position:absolute;width:360px;height:360px;border:1px solid rgba(223,255,79,.22);border-radius:50%;animation:orbitSpin 16s linear infinite}\n              .success-orbit:before,.success-orbit:after{content:"";position:absolute;width:7px;height:7px;border-radius:50%;background:#dfff4f;box-shadow:0 0 18px rgba(223,255,79,.7)}\n              .success-orbit:before{left:18%;top:7%}.success-orbit:after{right:10%;bottom:18%}\n              .success-core{position:relative;z-index:2;max-width:510px}\n              .success-mark{width:76px;height:76px;border:1px solid #dfff4f;border-radius:50%;display:grid;place-items:center;margin:0 auto 28px;color:#dfff4f;font-size:34px;animation:markPop .65s .12s cubic-bezier(.2,1.4,.4,1) both}\n              .success-kicker{font-size:11px;text-transform:uppercase;letter-spacing:.18em;color:#dfff4f;font-weight:700}\n              .success-title{font:600 clamp(42px,6vw,70px)/.9 "Space Grotesk";letter-spacing:-.06em;margin:14px 0 16px}\n              .success-copy{color:#aaa;line-height:1.6;max-width:460px;margin:0 auto}\n              .success-next{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin:26px 0 30px}.success-next span{border:1px solid #393933;border-radius:999px;padding:8px 11px;font-size:11px;text-transform:uppercase;letter-spacing:.07em;color:#ddd}\n              .success-reset{border:1px solid #dfff4f;background:#dfff4f;color:#171714;border-radius:999px;padding:13px 18px;font:700 13px "DM Sans";cursor:pointer}\n              .lead-form.is-hidden{display:none}\n              .form-status{font-size:12px;min-height:18px;margin:0;color:#8b6b24}\n              @keyframes successIn{from{opacity:0;transform:translateY(18px) scale(.985)}to{opacity:1;transform:none}}\n              @keyframes markPop{from{opacity:0;transform:scale(.4) rotate(-20deg)}to{opacity:1;transform:none}}\n              @keyframes orbitSpin{to{transform:rotate(360deg)}}\n              @media(max-width:700px){.form-success{min-height:500px;padding:30px 20px}.success-orbit{width:270px;height:270px}}\n            ';
            document.head.appendChild(style);

            document.addEventListener('click', function (event) {
              var target = event.target && event.target.closest ? event.target.closest('a') : null;
              if (!target) return;
              var href = target.getAttribute('href') || '';
              var text = (target.textContent || '').trim().slice(0, 100);
              var bookCta = target.getAttribute('data-book-cta');
              if (bookCta === 'gumroad') track('book_gumroad_click', {link_text: text});
              else if (bookCta === 'amazon') track('book_amazon_click', {link_text: text});
              else if (href.indexOf('mailto:') === 0) track('contact_email_click', {link_text: text});
              else if (href.indexOf('tel:') === 0) track('contact_phone_click', {link_text: text});
              else if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp') !== -1) track('contact_whatsapp_click', {link_text: text});
              else if (href.indexOf('#contact') !== -1 || href.indexOf('#book') !== -1) track('contact_cta_click', {link_text: text});
            }, true);

            function enhanceForms() {
              var forms = document.querySelectorAll('.lead-form');
              forms.forEach(function(form) {
                if (form.dataset.enhanced === 'true') return;
                form.dataset.enhanced = 'true';
                var success = document.createElement('div');
                success.className = 'form-success';
                success.innerHTML = '<div class="success-orbit"></div><div class="success-core"><div class="success-mark">✓</div><div class="success-kicker">Brief received</div><h3 class="success-title">Now we can talk about the interesting part.</h3><p class="success-copy">Thanks. Your brief is in. I\'ll review the context first, then get back to you with the best way to take this forward.</p><div class="success-next"><span>Reviewing your brief</span><span>Practical next steps</span><span>No sales pitch</span></div><button class="success-reset" type="button">Send another brief</button></div>';
                form.parentNode.insertBefore(success, form);
                var reset = success.querySelector('.success-reset');
                reset.addEventListener('click', function(){ success.classList.remove('is-visible'); form.classList.remove('is-hidden'); form.reset(); window.setTimeout(function(){ form.querySelector('input') && form.querySelector('input').focus(); }, 80); });
                form.addEventListener('submit', function(event){
                  event.preventDefault();
                  var honeypot = form.querySelector('[name="website"]');
                  if (honeypot && honeypot.value) return;
                  var button = form.querySelector('button[type="submit"]');
                  var original = button ? button.innerHTML : '';
                  if (button) { button.disabled = true; button.innerHTML = 'Sending your brief…'; }
                  var formData = new FormData(form);
                  var action = form.getAttribute('action') || '';
                  var ajaxAction = action.replace('https://formsubmit.co/', 'https://formsubmit.co/ajax/');
                  fetch(ajaxAction, {method:'POST', body:formData, headers:{'Accept':'application/json'}})
                    .then(function(response){ if (!response.ok) throw new Error('Submission failed'); return response.json().catch(function(){ return {success:true}; }); })
                    .then(function(){
                      track('contact_form_submit', {method:'formsubmit_ajax'});
                      form.classList.add('is-hidden');
                      success.classList.add('is-visible');
                      success.scrollIntoView({behavior:'smooth',block:'center'});
                    })
                    .catch(function(){
                      if (button) { button.disabled = false; button.innerHTML = original; }
                      var status = form.querySelector('.form-note');
                      if (status) { status.textContent = 'Something went wrong while sending. Please try again, or email me directly.'; status.style.color = '#b33a2b'; }
                    });
                });
              });
            }

            if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', enhanceForms); else enhanceForms();
          })();
        `}
      </Script>
    </>
  );
}
