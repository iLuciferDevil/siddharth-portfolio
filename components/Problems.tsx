'use client';

import { useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

const problems = [
  { id:'01', problem:'We get traffic, but not enough enquiries or sales.', diagnosis:'I start at the conversion point, not the ad account: offer, message match, proof, friction, CTA and the quality of traffic coming in.', approach:['Review the customer journey','Audit the landing page and offer','Find the biggest conversion leaks','Prioritise experiments by impact and effort'], deliverable:'A prioritised conversion roadmap', cta:'Get a conversion review' },
  { id:'02', problem:'We need a marketing strategy, but everything feels scattered.', diagnosis:'I work backwards from the business goal, customer, competitive context and economics, then make a small number of clear marketing choices.', approach:['Clarify the commercial goal','Define priority audiences','Sharpen positioning and messaging','Build a channel and experiment plan'], deliverable:'A practical marketing strategy and 90-day roadmap', cta:'Discuss my marketing strategy' },
  { id:'03', problem:'Our leads are weak, expensive or too dependent on referrals.', diagnosis:'For B2B, I look at positioning, demand creation, acquisition channels, content, conversion and lead quality together instead of treating lead generation as a single channel problem.', approach:['Define the highest-value customer segments','Pressure-test the value proposition','Map the demand journey','Build a qualified-lead acquisition plan'], deliverable:'A B2B demand and acquisition plan', cta:'Talk about B2B growth' },
  { id:'04', problem:'We launched a product, but adoption is slower than expected.', diagnosis:'I connect product value, positioning, launch communication, onboarding, lifecycle messaging and behavioural data to find where adoption is breaking.', approach:['Clarify the job the product solves','Segment launch audiences','Fix product messaging','Design activation and retention journeys'], deliverable:'A product marketing and adoption plan', cta:'Review my product launch' },
  { id:'05', problem:'People understand what we sell, but not why they should choose us.', diagnosis:'That is usually a positioning problem before it is a creative problem. I look at customer alternatives, category expectations, proof and the reason to believe.', approach:['Map alternatives and competitors','Find the strongest customer value','Build positioning territory','Turn it into clear messaging'], deliverable:'A positioning and messaging framework', cta:'Review our positioning' },
  { id:'06', problem:'The marketing team is busy, but growth still feels flat.', diagnosis:'I look for the gap between activity and outcomes: too many priorities, weak measurement, channel dependence, unclear ownership or a strategy that has not kept up with the business.', approach:['Audit current priorities','Identify the few metrics that matter','Cut low-value activity','Create a focused growth backlog'], deliverable:'A prioritised marketing operating plan', cta:'Get an outside perspective' },
  { id:'07', problem:'Customers buy once, then disappear.', diagnosis:'Retention is a customer experience problem as much as a CRM problem. I map the moments that create repeat behaviour and the interventions that can influence them.', approach:['Map the customer lifecycle','Identify churn and drop-off moments','Segment customers by behaviour','Build retention experiments'], deliverable:'A lifecycle and retention plan', cta:'Review retention' },
  { id:'08', problem:'We need to launch something new and do not know where to start.', diagnosis:'A good launch starts long before the campaign. I work through audience, proposition, positioning, competitive context, launch sequencing, channels and measurement.', approach:['Define the launch objective','Choose the audience and proposition','Build the GTM narrative','Create launch, adoption and measurement plans'], deliverable:'A go-to-market blueprint', cta:'Plan a launch' },
];

export default function Problems(){
  const [open,setOpen] = useState('01');
  return <div className="problem-list">
    {problems.map(p=><article className={`problem-item ${open===p.id?'is-open':''}`} key={p.id}>
      <button className="problem-trigger" onClick={()=>setOpen(open===p.id?'':p.id)} aria-expanded={open===p.id}>
        <span className="problem-number">{p.id}</span><span className="problem-title">{p.problem}</span><ChevronDown size={20}/>
      </button>
      <div className="problem-detail" aria-hidden={open!==p.id}>
        <div className="problem-diagnosis"><div className="num">How I would approach it</div><p>{p.diagnosis}</p></div>
        <div className="problem-steps"><div className="num">Typical first steps</div><ul>{p.approach.map(x=><li key={x}>{x}</li>)}</ul></div>
        <div className="problem-output"><div className="num">Likely output</div><strong>{p.deliverable}</strong><a href="#booking">{p.cta} <ArrowUpRight size={15}/></a></div>
      </div>
    </article>)}
  </div>
}
