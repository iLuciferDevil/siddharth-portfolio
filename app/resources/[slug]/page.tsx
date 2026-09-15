import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ResourceGate from '../../../components/ResourceGate';

const data: Record<string, { title: string; desc: string; intro: string; steps: string[] }> = {
  'marketing-strategy-canvas': { title: 'Marketing Strategy Canvas', desc: 'A working canvas for turning a business problem into a small number of deliberate marketing choices.', intro: 'Use this when the business is doing plenty of marketing but nobody is quite sure which activity is supposed to move the business forward.', steps: ['Define the commercial outcome that needs to change.', 'Choose the customer or segment where the economics and need are strongest.', 'Describe the problem, trigger and buying situation.', 'Make the proposition and proof specific enough to change a decision.', 'Choose the few growth levers worth testing now, and decide what not to do.', 'Set measures that connect activity to customer behaviour and commercial impact.'] },
  'landing-page-checklist': { title: 'Landing Page Checklist', desc: 'A practical review framework for finding the reasons a landing page may be losing otherwise valuable demand.', intro: 'Use this before increasing traffic. A better page can make the traffic you already have worth more.', steps: ['Check message match between the source, headline and offer.', 'Make the intended customer obvious.', 'Make the value of the offer concrete, not merely descriptive.', 'Add proof where a sceptical buyer would naturally hesitate.', 'Remove friction, ambiguity and unnecessary form fields.', 'Check what happens after conversion, not only the conversion itself.'] },
  'gtm-template': { title: 'GTM Planning Template', desc: 'A practical structure for deciding who a new product is for, why they should care and how the launch should create adoption.', intro: 'A launch is not a communications calendar. It is a coordinated plan for creating understanding, trial and repeat behaviour.', steps: ['Choose one primary launch objective.', 'Define the audience by situation and buying trigger.', 'Write the value proposition around the problem and outcome.', 'Translate positioning into a small message hierarchy.', 'Plan channels and sequencing around how the buyer actually discovers and evaluates the product.', 'Define activation, adoption and commercial measures before launch day.'] },
  'brand-positioning-worksheet': { title: 'Brand Positioning Worksheet', desc: 'A practical worksheet for finding a clearer reason for customers to choose you when the category sounds crowded.', intro: 'Good positioning does not require a clever slogan. It requires a credible choice about what you want to mean to a valuable customer.', steps: ['Define the customer whose choice matters most.', 'List the alternatives, including doing nothing and internal workarounds.', 'Identify what those alternatives already own in the customer’s mind.', 'Find the difference that matters to the customer and is credible for you.', 'Collect the proof that makes the position believable.', 'Turn the position into decisions about product, message, experience and priorities.'] },
  'b2b-marketing-canvas': { title: 'B2B Marketing Canvas', desc: 'A working canvas for building a B2B demand system around the buying problem rather than around channels.', intro: 'Use this when growth has become dependent on referrals, a few salespeople or a handful of channels that are getting harder to scale.', steps: ['Define the best-fit account and the situation that creates urgency.', 'Map the problem in business terms, including cost, risk, revenue or speed.', 'Clarify the value proposition for each important buying stakeholder.', 'Map where demand comes from before choosing more channels.', 'Define the handoff between marketing, sales and customer success.', 'Measure qualified pipeline, conversion and revenue, not just lead volume.'] },
  'lifecycle-marketing-map': { title: 'Lifecycle Marketing Map', desc: 'A simple map for deciding what customers need from marketing at different points in their relationship with the business.', intro: 'The same message rarely makes sense for a new visitor, a newly activated customer and someone who has stopped buying.', steps: ['Acquisition: create relevance and earn the first action.', 'Activation: help the customer reach value quickly.', 'First value: reinforce the behaviour that proves the product works.', 'Repeat behaviour: make the next useful action easier.', 'Retention: identify and address the reasons value may be weakening.', 'Reactivation: give lapsed customers a credible reason to return.'] },
};

export async function generateStaticParams() { return Object.keys(data).map(slug => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return { title: `${data[slug]?.title || 'Marketing Resource'} | Siddharth Bhattacharjee`, description: data[slug]?.desc }; }

export default async function Resource({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = data[slug];
  if (!r) return null;
  return (
    <main className="surface-pearl">
      <article className="container resource-detail">
        <div className="resource-detail-head">
          <div>
            <p className="label">Free working resource</p>
            <h1 className="display h-lg">{r.title}</h1>
            <p className="resource-lead">{r.desc}</p>
            <ResourceGate slug={slug} title={r.title} />
          </div>
          <aside className="resource-aside"><div className="eyebrow">Why this exists</div><p>{r.intro}</p><span>Created by Siddharth Bhattacharjee</span></aside>
        </div>
        <section className="resource-preview">
          <div><div className="eyebrow">Inside the resource</div><h2>Questions worth answering before you spend more money on marketing.</h2></div>
          <div>{r.steps.map((x, i) => <div className="resource-step" key={x}><span className="num">{String(i + 1).padStart(2, '0')}</span><p>{x}</p></div>)}</div>
        </section>
        <section className="resource-cta"><div><div className="eyebrow">If the worksheet exposes a bigger problem</div><h2>That is usually where I come in.</h2></div><div><p>I work with founders, business owners and marketing teams on strategy, positioning, growth and go-to-market problems that need senior thinking and practical execution.</p><Link className="button" href="/#booking">Talk about your business <ArrowUpRight size={16} /></Link></div></section>
      </article>
    </main>
  );
}
