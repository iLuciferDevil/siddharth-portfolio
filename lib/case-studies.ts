export type CaseStudy={
 slug:string;
 title:string;
 category:string;
 type:'Siddharth experience'|'Illustrative strategy';
 summary:string;
 lesson:string;
 proof:string;
 problem:string;
 diagnosis:string;
 approach:string[];
 measurement:string[];
 outcome:string[];
 caveat?:string;
 principles:string[];
};

export const caseStudies:CaseStudy[]=[
 {
  slug:'amazon-pay-push-notification-engine',title:"Building Amazon Pay's push notification engine to 5MM MAU",category:'Lifecycle · Fintech',type:'Siddharth experience',
  summary:'A first-hand look at turning push notifications from campaign execution into a lifecycle marketing system across a large Amazon Pay customer base.',
  lesson:'Lifecycle marketing becomes a growth system when eligibility, relevance, timing, frequency and measurement are designed together.',
  proof:'Built and scaled the push notification engine to a 5MM MAU customer base over six months.',
  problem:'Amazon Pay had a large and growing set of customer use cases. The marketing challenge was not simply sending more messages. It was building a repeatable way to reach the right customer with the right use case without turning the channel into noise.',
  diagnosis:'The constraint was relevance at scale. A broadcast model treats customers as one audience. A useful lifecycle system needs to recognise where a customer is in their journey, what they have already used, what they may need next, and how much communication they can reasonably absorb.',
  approach:['Mapped use cases and customer journeys across payments, bills, travel, entertainment, insurance and mobility.','Built audience and eligibility logic around customer behaviour rather than one-size-fits-all campaign calendars.','Created message and offer structures for acquisition, first use, repeat use and cross-sell moments.','Worked across marketing, product, analytics and technology teams to make the operating model repeatable.','Used frequency controls, campaign prioritisation and performance feedback to protect customer experience while increasing useful reach.'],
  measurement:['Reach and eligible audience','Open and click behaviour','First-use and repeat-use actions','Cross-use-case adoption','Incremental impact through controlled testing where applicable'],
  outcome:['A push marketing engine scaled to a 5MM MAU customer base within six months.','The work established a lifecycle foundation that could support multiple Amazon Pay use cases instead of treating every campaign as a one-off execution.'],
  principles:['The best CRM programme is not the one that sends the most messages. It is the one that makes the next message more useful.','Scale should come from decision rules and reusable systems, not campaign volume.']
 },
 {
  slug:'amazon-pay-next-best-use-case',title:'Designing a next-best-use-case programme for Amazon Pay cross-sell',category:'Lifecycle · ML · Product Marketing',type:'Siddharth experience',
  summary:'How a cross-sell problem became a customer-decision problem, leading to a next-best-use-case approach built with the ML team.',
  lesson:'Cross-sell works when the recommendation follows the customer journey rather than the company product catalogue.',
  proof:'Identified cross-selling friction and worked with the ML team on a next-best-use-case programme for push notifications.',
  problem:'Customers often adopted one Amazon Pay use case without naturally discovering adjacent services. The obvious response would have been more cross-sell campaigns. The better question was which next use case was most relevant for each customer and when that recommendation should appear.',
  diagnosis:'A product-level view asks, “How do we sell service B to users of service A?” A customer-level view asks, “Given what this customer has already done, what is the next useful job Amazon Pay can help them complete?” That shift changes targeting, creative, timing and measurement.',
  approach:['Defined behavioural signals that could indicate readiness for an adjacent use case.','Partnered with ML stakeholders to translate those signals into next-best-use-case recommendations.','Designed push communication around relevance, not catalogue breadth.','Created eligibility and suppression rules so recommendations did not compete with higher-priority customer journeys.','Structured measurement around adoption and incremental cross-sell rather than message engagement alone.'],
  measurement:['Eligible customer cohorts','Recommendation exposure','Cross-sell adoption','Repeat behaviour','Incremental adoption versus an appropriate control or comparison cohort'],
  outcome:['Created a marketing and ML framework for recommending the next useful Amazon Pay use case.','The programme was designed to improve cross-sell adoption through relevance rather than increasing broadcast volume.'],
  caveat:'The exact incremental uplift is not published here because a defensible number should come from the underlying experiment or reporting rather than be reconstructed from memory.',
  principles:['Next-best-action is a marketing problem before it is a machine-learning problem.','The model is only valuable if marketing can turn its output into a useful customer decision.']
 },
 {
  slug:'amazon-pay-product-launch-system',title:'Launching new consumer services inside Amazon Pay',category:'GTM · Product Marketing',type:'Siddharth experience',
  summary:'A product marketing view of launching flight tickets, movie tickets, credit-card bill payments, insurance premiums and bus tickets inside an existing ecosystem.',
  lesson:'A launch is not an announcement. It is the beginning of a customer adoption system.',
  proof:'Worked on launches including flight ticket booking, movie ticket booking, credit-card bill payment, insurance premium payment and bus tickets.',
  problem:'Each new service had to earn attention inside an ecosystem where customers already had established habits. The marketing task was to connect a new use case to an existing customer need and then turn trial into repeat behaviour.',
  diagnosis:'The distribution advantage was existing customer reach. The risk was assuming awareness would automatically become adoption. Each use case needed a clear job, a reason to try, an easy first transaction and a reason to return.',
  approach:['Translated product functionality into customer use cases and decision moments.','Designed launch communication across push, email, in-product surfaces and promotional moments.','Used existing customer behaviour to identify relevant audiences for each service.','Supported first-use and repeat-use journeys instead of stopping after launch communication.','Fed adoption data back into targeting and communication priorities.'],
  measurement:['Reach and awareness signals','First transaction','Repeat transaction','Use-case adoption','Cross-use-case behaviour','Campaign efficiency and engagement'],
  outcome:['Supported the marketing of multiple new consumer services inside an established fintech ecosystem.','The work reinforced a reusable launch principle: distribution creates the opportunity, but adoption requires a complete journey.'],
  principles:['Product marketing is the bridge between what a product can do and why a customer should care now.','The launch calendar should follow the adoption journey, not replace it.']
 },
 {
  slug:'amazon-mx-player-gateway-growth',title:'Turning Amazon MX Player’s homepage into a growth surface',category:'Growth · Entertainment · Merchandising',type:'Siddharth experience',
  summary:'How homepage merchandising, audience targeting, creative cadence and cross-viewership were treated as a connected growth system rather than isolated content placements.',
  lesson:'A homepage is not a shelf. It is a portfolio of decisions about what the customer should see, understand and watch next.',
  proof:'Streamer DAU increased 173% between August 2023 and March 2024. Hours from existing streamers increased 89%, and cross-viewership increased 180%.',
  problem:'Amazon MX Player needed the Gateway experience to do more than display content. Every placement had to compete for attention while helping different audience cohorts discover something worth watching.',
  diagnosis:'The constraint was not simply a lack of content. It was the efficiency of the decision surface: which content appeared where, for whom, with what creative, and how quickly the system learned from performance.',
  approach:['Managed the Gateway as a structured set of surfaces including Hero, xBiz, grids, mATF and below-the-fold placements.','Used CTR, streamer DAU, hours, minutes per customer, minutes per 1K impressions and streamers per 1K impressions as connected signals.','Established a regular creative refresh cadence and used P0 reporting to prioritise changes.','Used Prime Video partnership inventory, display, midrolls, quad cards, category cards and mobile carousel cards to support discovery.','Focused on cross-viewership so growth did not depend only on acquiring new streamers.'],
  measurement:['CTR and placement efficiency','Streamer DAU','Hours','Minutes per customer','Minutes per 1K impressions','Streamers per 1K impressions','Cross-viewership'],
  outcome:['+173% streamer DAU from August 2023 to March 2024.','+89% hours from existing streamers.','+180% cross-viewership.'],
  principles:['Growth often comes from improving the decision surface for existing users, not only buying more users.','A placement metric becomes useful when connected to a customer outcome.']
 },
 {
  slug:'amazon-mx-player-acquisition-campaign',title:'Driving 1.2MM Amazon MX Player installs through integrated media',category:'Acquisition · Entertainment',type:'Siddharth experience',
  summary:'A campaign case study on using multiple Amazon-owned and paid surfaces to move audiences from awareness into app installation.',
  lesson:'Acquisition works better when media, proposition and product destination are designed as one journey.',
  proof:'Drove 1.2MM installs in three months through an integrated acquisition programme.',
  problem:'The acquisition challenge was to convert attention into a measurable app action without treating every media placement as an isolated campaign.',
  diagnosis:'The campaign needed consistent proposition and creative logic across surfaces, while the measurement system had to connect exposure to the install outcome.',
  approach:['Coordinated display and video inventory across relevant Amazon surfaces.','Used Prime Video partnership display and midroll inventory as part of the media mix.','Adapted creative formats to placement context rather than simply resizing one master asset.','Monitored response by placement and creative to inform optimisation.','Kept the destination experience aligned with the promise made in the acquisition creative.'],
  measurement:['Installs','Placement response','Creative CTR','Media efficiency','Post-install engagement'],
  outcome:['1.2MM installs in three months.'],
  principles:['Media efficiency is partly a creative and product-destination problem.','The unit of optimisation should be the customer journey, not the ad format.']
 },
 {
  slug:'amazon-marketplace-brand-management',title:'Managing consumer brands inside Amazon Marketplace',category:'Brand · Commerce · Marketplace',type:'Siddharth experience',
  summary:'What changes when brand management happens inside a marketplace where search, retail execution, price, content and advertising all shape the customer decision.',
  lesson:'Brand strategy has to survive the point of purchase, not just the campaign.',
  proof:'Managed marketplace marketing work across brands including Reckitt Benckiser, Bombay Shaving Company and Liberty.',
  problem:'Marketplace growth is shaped by more than awareness. Customers encounter brands through search results, product detail pages, pricing, reviews, retail availability and promotional moments.',
  diagnosis:'The marketing problem was to connect brand intent with the actual purchase environment. A strong campaign cannot compensate for weak product content, poor discoverability or an unclear value proposition at the point of decision.',
  approach:['Reviewed customer-facing brand and product presentation across marketplace surfaces.','Worked with brand and commercial stakeholders on visibility, proposition and promotional priorities.','Connected brand messaging to product-level purchase decisions.','Used marketplace performance signals to identify where customer understanding or conversion could be improved.'],
  measurement:['Discoverability','Product detail engagement','Conversion','Promotional response','Category and brand performance'],
  outcome:['Built experience in managing the intersection of brand strategy, marketplace mechanics and commercial execution across multiple consumer brands.'],
  principles:['Brand is tested most honestly at the point where money changes hands.','Marketplace marketing requires commercial literacy, not just communications skill.']
 },
 {
  slug:'b2b-technology-demand-generation',title:'Building B2B technology lead-generation systems before marketing automation was fashionable',category:'B2B · Demand Generation',type:'Siddharth experience',
  summary:'Lessons from early B2B technology roles spanning prospecting, email marketing, lead generation and CRM-led follow-up.',
  lesson:'B2B demand generation improves when targeting, proposition, proof and follow-up are designed as one system.',
  proof:'Worked across business development and lead-generation roles serving technology companies and international prospects.',
  problem:'B2B lead generation can become a volume exercise: more lists, more emails, more follow-ups. The real constraint is usually the quality of the market hypothesis and the relevance of the proposition.',
  diagnosis:'A prospect has to recognise the problem, believe the company understands it, see evidence of capability and have a low-friction next step. Lead volume without those ingredients creates activity, not pipeline.',
  approach:['Built prospecting and email workflows around defined segments and buyer problems.','Tested messaging and offers instead of relying on one generic proposition.','Used CRM processes to track follow-up and lead progression.','Learned to separate response rate from commercial quality.'],
  measurement:['Target-account coverage','Response rate','Qualified conversations','Lead progression','Commercial follow-up'],
  outcome:['Built foundational experience in B2B demand generation, outbound, email marketing and CRM-led pipeline creation.'],
  principles:['A reply is not a pipeline opportunity.','The quality of the problem hypothesis determines the quality of the outreach.']
 },
 {
  slug:'illustrative-b2b-saas-pipeline',title:'Illustrative: fixing a B2B SaaS pipeline that depends on founder referrals',category:'B2B · Demand Generation',type:'Illustrative strategy',
  summary:'A hypothetical strategy case showing how I would diagnose a B2B SaaS company with strong founder-led sales but weak repeatable pipeline.',
  lesson:'The first growth problem is often not lead generation. It is turning an unscalable source of trust into a repeatable buying system.',
  proof:'Illustrative scenario. Company, data and outcomes are hypothetical and included to demonstrate the approach.',
  problem:'Assume a 120-person B2B SaaS company generates 70% of qualified opportunities through founder referrals. Marketing produces 18,000 monthly sessions but fewer than 20 sales-qualified opportunities.',
  diagnosis:'The business does not have a traffic problem. It has a trust-transfer and qualification problem. The founder is acting as the missing proof layer between market awareness and commercial confidence.',
  approach:['Segment the highest-value referral customers by industry, trigger and buying committee.','Extract the founder’s strongest proof points into customer-specific messaging and evidence.','Build high-intent pages around the actual buying questions, not generic category keywords.','Create a qualification path that distinguishes information seekers from active buying teams.','Run a 90-day programme across positioning, proof, demand capture and sales follow-up.'],
  measurement:['Increase qualified opportunities from 20 to a hypothetical 45 per month.','Reduce founder-sourced opportunity share from 70% to a hypothetical 40% while maintaining opportunity quality.','Track pipeline contribution rather than traffic as the primary outcome.'],
  outcome:['Illustrative target: create a more diversified pipeline engine without assuming that more traffic equals more revenue.'],
  caveat:'All numbers in this case are hypothetical. They are not client results.',
  principles:['Build the trust mechanism before scaling acquisition.','Measure marketing against commercial movement, not activity volume.']
 },
 {
  slug:'illustrative-consumer-app-cross-sell',title:'Illustrative: turning a consumer app into a next-best-action engine',category:'Lifecycle · Growth',type:'Illustrative strategy',
  summary:'A hypothetical case showing how behavioural signals, experimentation and lifecycle marketing could increase adoption of adjacent product use cases.',
  lesson:'The next-best-use-case problem sits at the intersection of customer insight, product data, marketing and experimentation.',
  proof:'Illustrative scenario. Company, data and outcomes are hypothetical.',
  problem:'Assume a consumer app has 4MM monthly active users, but 72% use only one core feature. The company keeps launching cross-sell campaigns with low incremental adoption.',
  diagnosis:'The campaign system is product-centric. It starts with the feature the company wants to sell rather than the customer signal that indicates readiness.',
  approach:['Map feature sequences and identify behavioural paths associated with second-use adoption.','Create propensity cohorts with product and data science partners.','Build next-best-action rules with suppression and frequency logic.','Test recommendations against holdout groups.','Optimise for incremental second-use adoption and downstream retention, not CTR.'],
  measurement:['Hypothetical second-use adoption increase from 28% to 34%.','Incremental adoption versus holdout','90-day retained multi-use customers','Revenue or contribution from additional use cases'],
  outcome:['Illustrative target: move the customer base from single-use behaviour toward multi-use behaviour without increasing message volume indiscriminately.'],
  caveat:'All numbers are hypothetical. The case demonstrates the method, not a historical result.',
  principles:['Relevance beats volume.','Incrementality matters more than engagement theatre.']
 },
 {
  slug:'illustrative-ai-startup-positioning',title:'Illustrative: positioning an AI startup when every competitor sounds identical',category:'Positioning · AI · Brand',type:'Illustrative strategy',
  summary:'A hypothetical positioning exercise for an AI company whose category language has collapsed into the same claims about speed, automation and intelligence.',
  lesson:'When technology becomes easier to copy, positioning has to move from capability claims toward a distinctive customer outcome and point of view.',
  proof:'Illustrative scenario. Company, market data and outcomes are hypothetical.',
  problem:'Assume an AI startup has strong product capability but its homepage says the same things as 30 competitors: automate workflows, save time, increase productivity and use AI agents.',
  diagnosis:'The company is positioning around what the technology can do. Buyers need a reason to believe why this company is the right choice for a particular problem, team and risk profile.',
  approach:['Interview customers around the job they hired the product to perform.','Separate category table stakes from distinctive product truth.','Choose a narrow strategic audience where the product advantage matters most.','Build a positioning system with problem, promise, proof and point of view.','Rebuild the website around buying decisions rather than product features.'],
  measurement:['Hypothetical increase in qualified demo conversion from 2.1% to 3.5%.','Share of high-intent traffic','Message recall in customer interviews','Qualified pipeline from target segments'],
  outcome:['Illustrative target: make the company recognisable for a specific problem rather than another generic AI capability.'],
  caveat:'All numbers are hypothetical. The company is fictional.',
  principles:['Differentiation is a choice about what not to compete on.','A positioning statement is useful only if it changes commercial behaviour.']
 },
 {
  slug:'illustrative-d2c-growth-efficiency',title:'Illustrative: diagnosing a D2C brand that is spending more but growing less',category:'Growth · Ecommerce · Performance',type:'Illustrative strategy',
  summary:'A hypothetical commercial diagnosis showing why increasing paid media budget can hide a deteriorating growth system.',
  lesson:'When marginal growth gets expensive, the answer is often upstream of media buying.',
  proof:'Illustrative scenario. Company, data and outcomes are hypothetical.',
  problem:'Assume a D2C brand has doubled monthly paid media spend from ₹40 lakh to ₹80 lakh while revenue increased only 18%. CAC is rising and repeat purchase is flat.',
  diagnosis:'The business is treating acquisition as the growth lever even though the economics point toward proposition, landing-page conversion, merchandising and retention constraints.',
  approach:['Decompose growth into traffic, conversion, average order value, first-to-second purchase and contribution margin.','Separate incremental from blended CAC.','Identify products and cohorts with strong repeat economics.','Test landing-page and offer architecture before scaling spend further.','Build a lifecycle programme around the first 30 days after purchase.'],
  measurement:['Hypothetical reduction in incremental CAC','First-to-second purchase rate','Contribution margin after marketing','Landing-page conversion','Repeat revenue share'],
  outcome:['Illustrative target: restore profitable growth by fixing the economic bottleneck instead of simply buying more traffic.'],
  caveat:'All numbers are hypothetical and not client results.',
  principles:['Growth is an economic system, not a media dashboard.','The cheapest acquisition is useless if the customer does not create durable value.']
 },
 {
  slug:'illustrative-content-to-pipeline',title:'Illustrative: turning a content library into a B2B demand system',category:'Content · SEO · AEO · B2B',type:'Illustrative strategy',
  summary:'A hypothetical case showing how an existing content library can be redesigned around buyer questions, evidence and commercial intent.',
  lesson:'Content becomes a demand asset when it answers a real buying question better than the alternatives.',
  proof:'Illustrative scenario. Company, traffic and outcomes are hypothetical.',
  problem:'Assume a B2B company has 300 published articles, 150,000 monthly organic sessions and only 0.4% of organic sessions reach a commercial action.',
  diagnosis:'The library is optimised for traffic volume rather than decision usefulness. Search demand and buying intent are being treated as the same thing.',
  approach:['Cluster existing content by buyer problem and commercial stage.','Consolidate overlapping pages and strengthen canonical topic ownership.','Create answer-first sections with evidence, definitions, frameworks and examples.','Connect informational pages to diagnostic resources and commercial proof.','Measure assisted pipeline and high-intent actions, not pageviews alone.'],
  measurement:['Hypothetical commercial-action rate from 0.4% to 1.0%.','Qualified organic leads','Assisted pipeline','AI citations or mentions where observable','Topical coverage of priority buyer questions'],
  outcome:['Illustrative target: turn an under-monetised content archive into a connected demand and authority system.'],
  caveat:'All numbers are hypothetical. The case demonstrates a methodology.',
  principles:['Search traffic is an input. Buyer understanding is the asset.','A strong content system has a path from question to decision.']
 }
];
