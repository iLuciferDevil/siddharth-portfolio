import { NextResponse } from 'next/server';

const resources: Record<string, { title: string; items: string[] }> = {
  'marketing-strategy-canvas': {
    title: 'Marketing Strategy Canvas',
    items: [
      'What business outcome needs to change?',
      'Who is the highest-value customer?',
      'What problem or job are they trying to solve?',
      'Why should they choose you over the alternatives?',
      'Which acquisition and retention levers matter most?',
      'What will you measure in the next 90 days?',
    ],
  },
  'landing-page-checklist': {
    title: 'Landing Page Checklist',
    items: [
      'Is the promise obvious in the first few seconds?',
      'Does the headline match the traffic source?',
      'Is the audience clear?',
      'Is there enough proof?',
      'Are objections answered?',
      'Is the CTA specific and visible?',
    ],
  },
  'gtm-template': {
    title: 'GTM Planning Template',
    items: [
      'Define the launch objective.',
      'Choose the priority audience.',
      'Write the value proposition.',
      'Define positioning and message.',
      'Plan launch channels and sequencing.',
      'Define adoption and success metrics.',
    ],
  },
  'brand-positioning-worksheet': {
    title: 'Brand Positioning Worksheet',
    items: [
      'Who is the priority customer?',
      'What alternatives do they consider?',
      'What do those alternatives own in the customer’s mind?',
      'What can you credibly own?',
      'What proof makes the position believable?',
      'How should the position change your marketing?',
    ],
  },
  'b2b-marketing-canvas': {
    title: 'B2B Marketing Canvas',
    items: [
      'Define the best-fit account.',
      'Identify the buying problem.',
      'Clarify the business value.',
      'Map demand sources.',
      'Design content and sales handoffs.',
      'Choose lead and revenue metrics.',
    ],
  },
  'lifecycle-marketing-map': {
    title: 'Lifecycle Marketing Map',
    items: ['Acquisition', 'Activation', 'First value', 'Repeat behaviour', 'Retention', 'Reactivation'],
  },
};

function escapePdfText(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function buildPdf(title: string, items: string[]) {
  const lines = [
    title,
    'Siddharth Bhattacharjee | Marketing Strategy',
    'Use this framework to work through the problem in your own business.',
    ...items.map((item, index) => `${index + 1}. ${item}`),
  ];

  const commands = [
    'BT',
    '/F1 20 Tf',
    '54 780 Td',
    `(${escapePdfText(lines[0])}) Tj`,
    '/F1 10 Tf',
    '0 -26 Td',
    `(${escapePdfText(lines[1])}) Tj`,
    '0 -22 Td',
    `(${escapePdfText(lines[2])}) Tj`,
    '/F1 12 Tf',
    '0 -40 Td',
    ...lines.slice(3).flatMap((line) => [`0 -22 Td`, `(${escapePdfText(line)}) Tj`]),
    'ET',
  ];

  const stream = commands.join('\n');
  const objects = [
    '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj',
    '2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj',
    '3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj',
    '4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj',
    `5 0 obj << /Length ${Buffer.byteLength(stream, 'utf8')} >> stream\n${stream}\nendstream endobj`,
  ];

  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  for (const object of objects) {
    offsets.push(Buffer.byteLength(pdf, 'utf8'));
    pdf += `${object}\n`;
  }

  const xrefOffset = Buffer.byteLength(pdf, 'utf8');
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i < offsets.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return Buffer.from(pdf, 'utf8');
}

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = resources[slug];

  if (!resource) {
    return new NextResponse('Not found', { status: 404 });
  }

  const pdf = buildPdf(resource.title, resource.items);

  return new NextResponse(pdf, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${slug}.pdf"`,
      'Content-Length': String(pdf.length),
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
