'use client';

import { useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

const problems = [
  { id:'01', problem:'We get traffic, but not enough enquiries or sales.', diagnosis:'I start at the conversion point, not the ad account: the offer, message match, proof, friction, CTA and the quality of the traffic coming in.', approach:['Review the customer journey','Audit the landing page and offer','Find the biggest conversion leaks','Prioritise experiments by impact and effort'], deliverable:'A prioritised conversion roadmap', cta:'Get a conversion review' },
  { id:'02', problem:'We need a marketing strategy, but everything feels scattered.', diagnosis:'I work backwards from the business goal, the customer, the competitive context and the economics, then make a small number of clear choices.', approach:['Clarify the commercial goal','Define priority audiences','Sharpen positioning and messaging','Build a channel and experiment plan'], deliverable:'A marketing strategy and 90-day roadmap', cta:'Discuss my strategy' },
  { id:'03', problem:'Our leads are weak, expensive, or too dependent on referrals.', diagnosis:'For B2B, positioning, demand creation, channels, content, conversion and lead quality have to be looked at together. Lead generation is rarely a single-channel problem.', approach:['Define the highest-value segments','Pressure-test the value proposition','Map the demand journey','Build a qualified-lead acquisition plan'], deliverable:'A B2B demand and acquisition plan', cta:'Talk about B2B growth' },
  { id:'04', problem:'We launched something, but adoption is slower than expected.', diagnosis:'I connect product value, positioning, launch communication, onboarding and lifecycle messaging to find exactly where adoption is breaking.', approach:['Clarify the job the product solves','Segment launch audiences','Fix product messaging','Design activation and retention journeys'], deliverable:'A launch and adoption plan', cta:'Review my launch' },
  { id:'05', problem:'People understand what we sell, but not why they should choose us.', diagnosis:'That is a positioning problem before it is a creative problem. I look at the alternatives customers already have, category expectations, and the proof you can credibly claim.', approach:['Map alternatives and competitors','Find the strongest customer value','Build the positioning territory','Turn it into clear messaging'], deliverable:'A positioning and messaging framework', cta:'Review our positioning' },
  { id:'06', problem:'Customers buy once, then disappear.', diagnosis:'Retention is a customer experience problem as much as a CRM problem. I map the moments that create repeat behaviour and the interventions that can influence them.', approach:['Map the customer lifecycle','Identify churn and drop-off moments','Segment customers by behaviour','Build retention experiments'], deliverable:'A lifecycle and retention plan', cta:'Review retention' },
];

export default function Problems(){
  const [open,setOpen] = useState('01');
  return <div className="problem-list">
    {problems.map(p=>(
      <article className={`problem-item ${open===p.id?'is-open':''}`} key={p.id}>
        <button className="problem-trigger" onClick={()=>setOpen(open===p.id?'':p.id)} aria-expanded={open===p.id} aria-controls={`panel-${p.id}`}>
          <span className="problem-title">{p.problem}</span>
          <ChevronDown size={20}/>
        </button>
        <div className="problem-detail" id={`panel-${p.id}`} aria-hidden={open!==p.id}>
          <div className="problem-diagnosis"><div className="num">How I would approach it</div><p>{p.diagnosis}</p></div>
          <div className="problem-steps"><div className="num">First steps</div><ul>{p.approach.map(x=><li key={x}>{x}</li>)}</ul></div>
          <div className="problem-output"><div className="num">What you get</div><strong>{p.deliverable}</strong><a href="#booking">{p.cta} <ArrowUpRight size={15}/></a></div>
        </div>
      </article>
    ))}
  </div>
}
