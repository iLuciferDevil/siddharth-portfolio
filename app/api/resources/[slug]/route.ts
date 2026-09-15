import { NextResponse } from 'next/server';

const resources: Record<string, { title: string; subtitle: string; sections: { heading: string; body: string }[] }> = {
  'marketing-strategy-canvas': { title: 'Marketing Strategy Canvas', subtitle: 'Turn a business problem into a small number of deliberate marketing choices.', sections: [
    { heading: '01 | The business outcome', body: 'What needs to change commercially? Revenue, qualified demand, conversion, activation, retention, pricing, market entry or something else. Write the outcome before choosing a channel.' },
    { heading: '02 | The priority customer', body: 'Who is the customer for whom the problem is urgent and your economics are attractive? Define the situation, trigger, need and buying context, not just demographics.' },
    { heading: '03 | The choice', body: 'What problem are you solving, what alternative is the customer using today, and why should they choose you? Your proposition needs a credible reason to believe.' },
    { heading: '04 | The growth bets', body: 'Choose the few acquisition, conversion, product or lifecycle bets worth testing now. For every bet, define what would make you scale it, change it or stop it.' },
    { heading: '05 | The measurement loop', body: 'Track the behaviour that proves the strategy is working, then connect it to the commercial outcome. Traffic and clicks are diagnostics, not the destination.' },
  ] },
  'landing-page-checklist': { title: 'Landing Page Checklist', subtitle: 'A practical review for pages that need to turn valuable demand into action.', sections: [
    { heading: '01 | Message match', body: 'The visitor should immediately recognise that the page continues the promise that brought them there. Check the source, headline, offer and first call to action as one chain.' },
    { heading: '02 | Relevance', body: 'Can the right customer tell within seconds that this is for them? If the page speaks to everyone, it often persuades nobody strongly.' },
    { heading: '03 | Proof', body: 'Ask what a sceptical buyer would need to believe before acting. Use specific outcomes, customer evidence, demonstrations, credentials or other proof that addresses that doubt.' },
    { heading: '04 | Friction', body: 'Remove decisions the visitor should not have to make. Clarify the offer, reduce unnecessary form fields and make the next step obvious.' },
    { heading: '05 | After the conversion', body: 'A form submission is not the business outcome. Check confirmation, response time, qualification, sales follow-up and whether the converted visitors become valuable customers.' },
  ] },
  'gtm-template': { title: 'GTM Planning Template', subtitle: 'A working structure for launching a product or service with adoption in mind.', sections: [
    { heading: '01 | Launch objective', body: 'Choose one primary job for the launch: validate demand, enter a segment, acquire customers, drive adoption or change the economics of an existing product.' },
    { heading: '02 | Audience and trigger', body: 'Define the situation that makes the product relevant. The strongest launch audience is often a specific problem or trigger rather than a demographic category.' },
    { heading: '03 | Value and positioning', body: 'State the problem, the new way of solving it, the outcome and the evidence. Build the message hierarchy before producing campaign assets.' },
    { heading: '04 | Distribution', body: 'Map how the buyer actually discovers and evaluates the product. Sequence channels around that journey instead of treating every channel as equally important.' },
    { heading: '05 | Adoption', body: 'Plan what happens after launch. Define activation, first value, repeat behaviour, objections and the customer experience that turns trial into adoption.' },
  ] },
  'brand-positioning-worksheet': { title: 'Brand Positioning Worksheet', subtitle: 'Find a clearer reason for customers to choose you in a crowded category.', sections: [
    { heading: '01 | The customer', body: 'Choose the customer whose decision matters most. Define the situation in which your advantage is most valuable.' },
    { heading: '02 | The alternatives', body: 'List direct competitors, incumbents, internal teams, spreadsheets, workarounds and doing nothing. Customers compare you with whatever they believe is the next-best option.' },
    { heading: '03 | The useful difference', body: 'Find the difference that matters to the customer and is credible for you to own. A distinctive claim without evidence is simply advertising.' },
    { heading: '04 | The proof', body: 'List the evidence that makes the position believable: outcomes, expertise, product capabilities, customer stories, data, process or experience.' },
    { heading: '05 | The consequences', body: 'A position should change decisions. What will you say more clearly? What will you stop saying? What should change in product, experience, sales and content?' },
  ] },
  'b2b-marketing-canvas': { title: 'B2B Marketing Canvas', subtitle: 'Build demand around the buying problem, not around a list of channels.', sections: [
    { heading: '01 | Best-fit account', body: 'Define the account characteristics and business situation where your solution creates disproportionate value. Add the trigger that creates urgency.' },
    { heading: '02 | Buying problem', body: 'Translate the marketing problem into business terms: revenue, cost, risk, speed, capacity, compliance or customer experience.' },
    { heading: '03 | Buying group', body: 'Identify the economic buyer, champion, users, blockers and other stakeholders. Each may need a different reason to move.' },
    { heading: '04 | Demand system', body: 'Map where demand comes from today and where the right buyers learn, compare and seek proof. Then choose the few channels worth building.' },
    { heading: '05 | Commercial loop', body: 'Define qualification, handoffs, follow-up and feedback. Measure qualified opportunities, conversion and revenue rather than celebrating raw lead volume.' },
  ] },
  'lifecycle-marketing-map': { title: 'Lifecycle Marketing Map', subtitle: 'Decide what customers need at each stage of their relationship with the business.', sections: [
    { heading: '01 | Acquisition', body: 'Earn attention from the right people and make the first action relevant to the problem they are trying to solve.' },
    { heading: '02 | Activation', body: 'Reduce time to value. Identify the behaviour that tells you the customer has understood the value and make that behaviour easier.' },
    { heading: '03 | First value', body: 'Reinforce the moment where the customer experiences the product or service working for them.' },
    { heading: '04 | Repeat behaviour', body: 'Give customers a useful reason and easy path to return, buy again, expand usage or adopt the next relevant capability.' },
    { heading: '05 | Retention and reactivation', body: 'Find the reasons value weakens, intervene before churn where possible and give lapsed customers a credible reason to return.' },
  ] },
};

function esc(value: string) { return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/–|—/g, '-'); }
function wrap(text: string, max = 78) { const words = text.split(/\s+/); const out: string[] = []; let line = ''; for (const word of words) { if ((line + ' ' + word).trim().length > max) { out.push(line.trim()); line = word; } else line += ` ${word}`; } if (line.trim()) out.push(line.trim()); return out; }

function pageStream(title: string, subtitle: string, sections: { heading: string; body: string }[], page: number) {
  const cmds = [
    'q 0.039 0.063 0.094 rg 0 0 595 842 re f Q',
    'q 0.776 0.608 0.306 RG 42 792 511 0 re S Q',
    'BT /F2 9 Tf 42 812 Td 0.776 0.608 0.306 rg (SIDDHARTH BHATTACHARJEE) Tj ET',
  ];
  if (page === 1) {
    cmds.push('BT /F2 11 Tf 42 750 Td 0.776 0.608 0.306 rg (FREE WORKING RESOURCE) Tj ET');
    cmds.push(`BT /F2 31 Tf 42 700 Td 0.95 0.96 0.97 rg (${esc(title)}) Tj ET`);
    let y = 650;
    for (const line of wrap(subtitle, 62)) { cmds.push(`BT /F1 13 Tf 42 ${y} Td 0.58 0.63 0.69 rg (${esc(line)}) Tj ET`); y -= 20; }
    y -= 24;
    for (const s of sections.slice(0, 3)) {
      cmds.push(`BT /F2 13 Tf 42 ${y} Td 0.776 0.608 0.306 rg (${esc(s.heading)}) Tj ET`); y -= 23;
      for (const line of wrap(s.body, 78)) { cmds.push(`BT /F1 10 Tf 42 ${y} Td 0.88 0.9 0.92 rg (${esc(line)}) Tj ET`); y -= 15; }
      y -= 18;
    }
  } else {
    cmds.push(`BT /F2 19 Tf 42 748 Td 0.95 0.96 0.97 rg (${esc(title)}) Tj ET`);
    let y = 700;
    for (const s of sections.slice(3)) {
      cmds.push(`BT /F2 13 Tf 42 ${y} Td 0.776 0.608 0.306 rg (${esc(s.heading)}) Tj ET`); y -= 23;
      for (const line of wrap(s.body, 78)) { cmds.push(`BT /F1 10 Tf 42 ${y} Td 0.88 0.9 0.92 rg (${esc(line)}) Tj ET`); y -= 15; }
      y -= 22;
    }
    cmds.push('q 0.776 0.608 0.306 rg 42 230 511 1 re f Q');
    cmds.push('BT /F2 13 Tf 42 205 Td 0.95 0.96 0.97 rg (A useful next step) Tj ET');
    for (const [i, line] of wrap('Take the completed worksheet into a real business decision. If you want an experienced marketer to challenge the assumptions with you, get in touch.', 78).entries()) cmds.push(`BT /F1 10 Tf 42 ${184 - i * 15} Td 0.58 0.63 0.69 rg (${esc(line)}) Tj ET`);
  }
  cmds.push(`BT /F1 8 Tf 42 38 Td 0.45 0.5 0.56 rg (siddharthbhattacharjee.in | email@siddharthbhattacharjee.in | +91 70931 42389) Tj ET`);
  cmds.push(`BT /F1 8 Tf 520 38 Td 0.45 0.5 0.56 rg (${page}) Tj ET`);
  return cmds.join('\n');
}

function buildPdf(resource: typeof resources[string]) {
  const streams = [pageStream(resource.title, resource.subtitle, resource.sections, 1), pageStream(resource.title, resource.subtitle, resource.sections, 2)];
  const objects: string[] = [];
  objects.push('1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj');
  objects.push(`2 0 obj << /Type /Pages /Kids [3 0 R 5 0 R] /Count 2 >> endobj`);
  objects.push('3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 6 0 R >> >> /Contents 7 0 R >> endobj');
  objects.push('4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj');
  objects.push('5 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 6 0 R >> >> /Contents 8 0 R >> endobj');
  objects.push('6 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> endobj');
  objects.push(`7 0 obj << /Length ${Buffer.byteLength(streams[0], 'utf8')} >> stream\n${streams[0]}\nendstream endobj`);
  objects.push(`8 0 obj << /Length ${Buffer.byteLength(streams[1], 'utf8')} >> stream\n${streams[1]}\nendstream endobj`);
  let pdf = '%PDF-1.4\n'; const offsets = [0];
  for (const object of objects) { offsets.push(Buffer.byteLength(pdf, 'utf8')); pdf += `${object}\n`; }
  const xref = Buffer.byteLength(pdf, 'utf8'); pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i < offsets.length; i++) pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(pdf, 'utf8');
}

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = resources[slug];
  if (!resource) return new NextResponse('Not found', { status: 404 });
  const pdf = buildPdf(resource);
  return new NextResponse(pdf, { status: 200, headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': `attachment; filename="${slug}.pdf"`, 'Content-Length': String(pdf.length), 'Cache-Control': 'private, max-age=3600' } });
}
