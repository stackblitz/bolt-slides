import Deck from './deck/Deck';
import Slide from './deck/Slide';
import Reveal from './deck/Reveal';
import { LineChart, DonutChart } from './components/Charts';
import Timeline from './components/Timeline';

const aiRoles = [
  ['AI PM', 'Turns business goals into product scope'],
  ['Architect', 'Designs systems, modules, and integrations'],
  ['Database', 'Models data, policies, and storage'],
  ['Backend', 'Builds APIs, jobs, and business logic'],
  ['Frontend', 'Creates responsive product screens'],
  ['UI Designer', 'Crafts premium user experiences'],
  ['QA', 'Tests flows, edge cases, and acceptance'],
  ['Security', 'Reviews auth, privacy, and risk'],
  ['DevOps', 'Packages, previews, and deploys'],
];

const tech = [
  'React',
  'Remix',
  'TypeScript',
  'Tailwind',
  'Supabase',
  'Anthropic',
  'OpenAI',
  'Gemini',
  'DeepSeek',
  'GitHub',
  'Vercel',
  'WebContainers',
];

const features = [
  'Project Dashboard',
  'AI Engineering Team',
  'Reviews',
  'Timeline',
  'BuildersDB',
  'Authentication',
  'Generate Application',
  'Continue Development',
  'Preview',
  'Product Package',
  'Artifacts',
  'Drafts',
  'Approvals',
];

const roadmap = [
  'Current',
  'GitHub',
  'Templates',
  'AI Context Memory',
  'Team Collaboration',
  'CRM',
  'Proposal Generator',
  'Deployment',
  'Marketplace',
  'AI Company Operating System',
];

const websites = [
  'Restaurant',
  'Hotel',
  'Clinic',
  'Hospital',
  'Dental Clinic',
  'Gym',
  'Salon',
  'School',
  'College',
  'Construction',
  'Real Estate',
  'Manufacturer',
  'Travel Agency',
  'Architect',
  'Law Firm',
  'Chartered Accountant',
  'Interior Designer',
  'Consultant',
  'NGO',
  'Startup',
  'Corporate',
  'Portfolio',
  'Landing Pages',
  'Membership Sites',
];

const industries = [
  'Healthcare',
  'Education',
  'Retail',
  'Hospitality',
  'Finance',
  'Insurance',
  'Real Estate',
  'Automotive',
  'Agriculture',
  'Manufacturing',
  'Construction',
  'Food',
  'Travel',
  'Fitness',
  'Beauty',
  'Legal',
  'Accounting',
  'NGO',
  'Government',
  'Textiles',
  'Jewellery',
  'Furniture',
  'Electronics',
  'IT',
  'Startups',
  'Export',
  'Import',
  'Sports',
  'Entertainment',
  'Media',
  'Publishing',
  'Logistics',
  'Transport',
  'Warehousing',
  'Courier',
  'E-commerce',
  'Pharma',
  'Diagnostics',
  'Dental',
  'Wellness',
  'Tourism',
  'Hotels',
  'Restaurants',
  'Catering',
  'Events',
  'Wedding',
  'Architecture',
  'Interior Design',
  'Consulting',
  'Coaching',
  'Training',
  'Recruitment',
  'Security',
  'Cleaning',
  'Facility Management',
  'Printing',
  'Packaging',
  'Chemicals',
  'Plastics',
  'Steel',
  'Foundry',
  'Machinery',
  'Energy',
  'Solar',
  'Water',
  'Waste',
  'Telecom',
  'Internet',
  'Software',
  'Hardware',
  'Gaming',
  'Music',
  'Film',
  'Photography',
  'Design',
  'Advertising',
  'Marketing',
  'PR',
  'Banking',
  'Microfinance',
  'Mutual Funds',
  'Tax',
  'Auditing',
  'Dairy',
  'Poultry',
  'Fisheries',
  'Plantation',
  'Seeds',
  'Fertilizers',
  'Mining',
  'Oil & Gas',
  'Aviation',
  'Railways',
  'Shipping',
  'Ports',
  'Nonprofits',
  'Religious Trusts',
  'Associations',
  'Clubs',
  'Libraries',
  'Labs',
  'Repair Services',
  'Rental Services',
  'Wholesale',
  'Distribution',
  'Franchise',
];

const s = {
  shell: {
    position: 'relative',
    overflow: 'hidden',
  } as React.CSSProperties,
  center: {
    textAlign: 'center',
    maxWidth: 1040,
    margin: '0 auto',
  } as React.CSSProperties,
  kicker: {
    color: '#5b5fed',
    textTransform: 'uppercase',
    letterSpacing: '.14em',
    fontSize: 12,
    fontWeight: 800,
    marginBottom: 14,
  } as React.CSSProperties,
  title: {
    fontSize: 'clamp(42px,7vw,96px)',
    lineHeight: 0.9,
    letterSpacing: '-.07em',
    margin: 0,
    color: '#070812',
  } as React.CSSProperties,
  h: {
    fontSize: 'clamp(34px,5vw,70px)',
    lineHeight: 0.94,
    letterSpacing: '-.055em',
    margin: 0,
    color: '#070812',
  } as React.CSSProperties,
  lead: {
    fontSize: 'clamp(18px,2.2vw,27px)',
    lineHeight: 1.34,
    color: '#4b5567',
    margin: '22px auto 0',
    maxWidth: 860,
  } as React.CSSProperties,
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
    gap: 16,
    marginTop: 34,
  } as React.CSSProperties,
  card: {
    border: '1px solid rgba(60,70,110,.13)',
    borderRadius: 28,
    padding: 24,
    background: 'rgba(255,255,255,.72)',
    boxShadow: '0 24px 70px rgba(32,42,80,.10)',
    backdropFilter: 'blur(18px)',
  } as React.CSSProperties,
  pill: {
    border: '1px solid rgba(74,85,130,.13)',
    borderRadius: 999,
    padding: '10px 14px',
    background: 'rgba(255,255,255,.72)',
    fontWeight: 700,
    color: '#22283b',
  } as React.CSSProperties,
};

function Aura() {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          inset: '-25%',
          background:
            'radial-gradient(circle at 25% 15%, rgba(66,120,255,.20), transparent 30%), radial-gradient(circle at 80% 30%, rgba(154,76,255,.18), transparent 28%), radial-gradient(circle at 50% 90%, rgba(0,205,255,.12), transparent 30%)',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg,rgba(255,255,255,.15),#fff 82%)',
          zIndex: 0,
        }}
      />
    </>
  );
}

function Wrap({
  kicker,
  title,
  children,
  wide = false,
}: {
  kicker?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <Reveal>
      <div
        style={{
          ...s.center,
          maxWidth: wide ? 1180 : 1040,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {kicker && <div style={s.kicker}>{kicker}</div>}
        <h2 style={s.h}>{title}</h2>
        {children}
      </div>
    </Reveal>
  );
}

function Factory() {
  return (
    <div style={{ ...s.card, margin: '40px auto 0', maxWidth: 900, padding: 30 }}>
      <svg viewBox="0 0 900 320" style={{ width: '100%', height: 'auto' }}>
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop stopColor="#2563eb" />
            <stop offset="1" stopColor="#9333ea" />
          </linearGradient>
          <filter id="blur">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>

        <rect
          x="60"
          y="165"
          width="520"
          height="95"
          rx="24"
          fill="#f8fbff"
          stroke="#dbe5ff"
        />
        <path
          d="M85 165v-52l86 52v-52l86 52v-52l86 52"
          fill="#eef4ff"
          stroke="#b9c8ef"
        />
        <rect x="110" y="195" width="54" height="42" rx="12" fill="url(#g)" opacity=".9" />
        <rect x="195" y="195" width="54" height="42" rx="12" fill="url(#g)" opacity=".75" />
        <rect x="280" y="195" width="54" height="42" rx="12" fill="url(#g)" opacity=".6" />

        <circle cx="682" cy="152" r="86" fill="url(#g)" opacity=".16" filter="url(#blur)" />
        <circle cx="682" cy="152" r="62" fill="#fff" stroke="#d8e1ff" />
        <path
          d="M652 158c-22-22 2-55 30-39 23-19 59 6 43 36 19 22-5 53-32 39-24 19-59-5-41-36z"
          fill="url(#g)"
          opacity=".9"
        />
        <path
          d="M580 210c80 50 160 50 240 0"
          fill="none"
          stroke="url(#g)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="12 14"
        />
      </svg>
    </div>
  );
}

function Pipeline({ items }: { items: string[] }) {
  return (
    <div style={{ ...s.card, margin: '32px auto 0', maxWidth: 760 }}>
      {items.map((it, i) => (
        <div
          key={it}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            margin: '8px 0',
          }}
        >
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: 12,
              display: 'grid',
              placeItems: 'center',
              background: 'linear-gradient(135deg,#2563eb,#8b5cf6)',
              color: '#fff',
              fontWeight: 800,
            }}
          >
            {i + 1}
          </span>
          <b style={{ fontSize: 18 }}>{it}</b>
          <div
            style={{
              flex: 1,
              height: 1,
              background: 'linear-gradient(90deg,#dbe5ff,transparent)',
            }}
          />
        </div>
      ))}
    </div>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: 'center',
        marginTop: 30,
      }}
    >
      {items.map((x) => (
        <span key={x} style={s.pill}>
          {x}
        </span>
      ))}
    </div>
  );
}

function IconGrid({ items }: { items: string[] }) {
  return (
    <div style={s.grid}>
      {items.map((x, i) => (
        <div key={x} style={s.card}>
          <div style={{ fontSize: 30, marginBottom: 12 }}>
            {['✦', '◈', '⬡', '⌁', '◎', '▣'][i % 6]}
          </div>
          <b>{x}</b>
        </div>
      ))}
    </div>
  );
}

function AvatarTeam() {
  return (
    <div style={s.grid}>
      {aiRoles.map(([r, d], i) => (
        <div key={r} style={s.card}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: 22,
              background: `linear-gradient(135deg,hsl(${220 + i * 16} 90% 58%),hsl(${
                270 + i * 10
              } 90% 62%))`,
              margin: '0 auto 14px',
              display: 'grid',
              placeItems: 'center',
              color: '#fff',
              fontSize: 24,
            }}
          >
            🤖
          </div>
          <h3 style={{ margin: '0 0 8px' }}>{r}</h3>
          <p
            style={{
              margin: 0,
              color: '#657084',
              fontSize: 14,
              lineHeight: 1.45,
            }}
          >
            {d}
          </p>
        </div>
      ))}
    </div>
  );
}

function SimpleSlide({
  nav,
  kicker,
  title,
  body,
  children,
}: {
  nav: string;
  kicker?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <Slide nav={nav} style={s.shell}>
      <Aura />
      <Wrap kicker={kicker} title={title} wide>
        {body && <p style={s.lead}>{body}</p>}
        {children}
      </Wrap>
    </Slide>
  );
}

export default function App() {
  return (
    <Deck>
      <Slide nav="BUILDERS" center style={s.shell}>
        <Aura />
        <Reveal>
          <div style={{ ...s.center, position: 'relative', zIndex: 1 }}>
            <div style={s.kicker}>CubicleTech LLP · Founding Team</div>
            <h1 style={s.title}>BUILDERS</h1>
            <p
              style={{
                ...s.lead,
                fontSize: 'clamp(25px,3.6vw,44px)',
                color: '#111827',
              }}
            >
              The AI Software Factory
            </p>
            <p style={s.lead}>
              Build the platform once.
              <br />
              Build unlimited software products forever.
            </p>
            <Factory />
          </div>
        </Reveal>
      </Slide>

      <SimpleSlide
        nav="Who We Are"
        kicker="Who we are"
        title="A five-member founding team amplified by AI."
        body="Strong experience in Project Management, PMO, Agile, Scrum, Product Delivery, and Software Coordination — converted into software delivery power."
      >
        <Factory />
      </SimpleSlide>

      <SimpleSlide
        nav="Why Builders"
        kicker="Why builders"
        title="Traditional software is slow, expensive, and specialist-heavy."
      >
        <div style={s.grid}>
          {[
            'Traditional Company: months, many engineers, high cost',
            'Builders AI Company: prompt to coordinated AI engineering team',
          ].map((x) => (
            <div style={s.card} key={x}>
              <h3>{x}</h3>
            </div>
          ))}
        </div>
      </SimpleSlide>

      <SimpleSlide
        nav="Problem"
        kicker="Problem statement"
        title="Every business needs software. Most cannot afford it."
      >
        <Chips
          items={[
            'Websites',
            'Mobile Apps',
            'CRM',
            'ERP',
            'Automation',
            'AI',
            'Dashboards',
            'Portals',
          ]}
        />
      </SimpleSlide>

      <SimpleSlide
        nav="Vision"
        kicker="Vision"
        title="Not a chatbot. A complete AI software company."
      >
        <Pipeline
          items={[
            'Customer',
            'AI Product Manager',
            'Architect',
            'Database',
            'Backend',
            'Frontend',
            'UI',
            'QA',
            'Security',
            'DevOps',
            'Working Product',
          ]}
        />
      </SimpleSlide>

      <SimpleSlide
        nav="Mission"
        kicker="Mission"
        title="Make software development available to every business."
        body="From a bakery to a multinational company."
      >
        <IconGrid items={['Bakery', 'Clinic', 'Factory', 'School', 'Enterprise', 'Global brand']} />
      </SimpleSlide>

      <SimpleSlide
        nav="Philosophy"
        kicker="Core philosophy"
        title="One prompt becomes a complete engineering team."
      >
        <Pipeline items={['One prompt', 'Complete Engineering Team', 'Production-ready application']} />
      </SimpleSlide>

      <SimpleSlide
        nav="How it works"
        kicker="How Builders works"
        title="A beautiful vertical pipeline from idea to preview."
      >
        <Pipeline
          items={[
            'Customer Requirements',
            'Requirement Analysis',
            'Product Manager',
            'Architecture',
            'Database',
            'Backend',
            'Frontend',
            'UI',
            'QA',
            'Reviews',
            'Package',
            'Generate Application',
            'Preview',
            'Continue Development',
          ]}
        />
      </SimpleSlide>

      <SimpleSlide
        nav="AI Team"
        kicker="Meet our AI engineering team"
        title="Nine AI engineers. One coordinated factory."
      >
        <AvatarTeam />
      </SimpleSlide>

      <SimpleSlide
        nav="Review Engine"
        kicker="Review engine"
        title="Every engineer reviews previous work. Nothing moves without approval."
      >
        <Pipeline items={['Create', 'Review', 'Approve', 'Improve', 'Release']} />
      </SimpleSlide>

      <SimpleSlide
        nav="BuildersDB"
        kicker="BuildersDB"
        title="The engineering memory layer where everything is stored."
      >
        <Chips
          items={[
            'Projects',
            'Reviews',
            'Tasks',
            'Artifacts',
            'Timeline',
            'History',
            'Packages',
            'Authentication',
            'Engineering memory',
          ]}
        />
      </SimpleSlide>

      <SimpleSlide
        nav="Stack"
        kicker="Current technology stack"
        title="Modern foundations for an AI software factory."
      >
        <IconGrid items={tech} />
      </SimpleSlide>

      <SimpleSlide
        nav="Features"
        kicker="Current features"
        title="The MVP already behaves like a product studio."
      >
        <Chips items={features} />
      </SimpleSlide>

      <SimpleSlide
        nav="Roadmap"
        kicker="Roadmap"
        title="From current platform to AI company operating system."
      >
        <Pipeline items={roadmap} />
      </SimpleSlide>

      <SimpleSlide
        nav="Business Need"
        kicker="Why businesses need Builders"
        title="Lower cost. Higher speed. Professional workflow."
      >
        <IconGrid
          items={[
            'Cost Reduction',
            'Speed',
            'AI Engineering',
            'Documentation',
            'Scalability',
            'Professional workflow',
          ]}
        />
      </SimpleSlide>

      <SimpleSlide
        nav="Product Range"
        kicker="Products we can build"
        title="One factory. Many categories."
      >
        <IconGrid
          items={[
            'Websites',
            'Management Software',
            'Healthcare',
            'Education',
            'Retail',
            'AI Products',
            'Mobile Apps',
            'SaaS',
            'Government',
            'Internal Tools',
          ]}
        />
      </SimpleSlide>

      <SimpleSlide
        nav="Websites"
        kicker="Business websites"
        title="Premium web presence for every local business."
      >
        <Chips items={websites} />
      </SimpleSlide>

      {[
        [
          'Management',
          'Business management software',
          [
            'CRM',
            'ERP',
            'Inventory',
            'HRMS',
            'Payroll',
            'Attendance',
            'Visitor Management',
            'Invoice',
            'Quotation',
            'POS',
            'Accounts',
            'Purchase',
            'Sales',
            'Vendor Portal',
            'Employee Portal',
            'Customer Portal',
          ],
        ],
        [
          'Healthcare',
          'Healthcare products',
          [
            'Hospital Management',
            'Dental Clinic',
            'Appointment System',
            'Patient Portal',
            'Medical Store',
            'Diagnostic Lab',
            'Pharmacy',
            'Healthcare CRM',
            'Telemedicine',
          ],
        ],
        [
          'Education',
          'Education products',
          [
            'School ERP',
            'College ERP',
            'Learning Platform',
            'Exam Management',
            'Attendance',
            'Fee Management',
            'Student Portal',
            'Parent Portal',
            'Library',
            'Hostel',
            'Transport',
          ],
        ],
        [
          'Retail',
          'Retail products',
          [
            'Inventory',
            'POS',
            'Billing',
            'Online Store',
            'Order Tracking',
            'Warehouse',
            'Franchise Management',
            'Customer Loyalty',
          ],
        ],
        [
          'AI Products',
          'AI products',
          [
            'AI Chatbots',
            'AI Customer Support',
            'AI Knowledge Base',
            'AI HR Assistant',
            'AI Sales Assistant',
            'AI Proposal Generator',
            'AI Content Generator',
            'AI Analytics',
            'AI Agents',
            'AI Automation',
          ],
        ],
        [
          'Mobile Apps',
          'Mobile apps',
          [
            'Restaurant',
            'Delivery',
            'Taxi',
            'School',
            'Hospital',
            'Retail',
            'Fitness',
            'Booking',
            'Events',
            'Travel',
            'Finance',
            'Community',
          ],
        ],
        [
          'SaaS',
          'SaaS products',
          [
            'CRM',
            'HRMS',
            'Project Management',
            'Task Management',
            'Bug Tracking',
            'Helpdesk',
            'Subscription Platform',
            'Marketing Platform',
            'Email Platform',
            'Analytics',
          ],
        ],
        [
          'Public Sector',
          'Government & public sector',
          [
            'Citizen Portal',
            'Complaint Portal',
            'Village Portal',
            'Municipality Portal',
            'Utility Management',
          ],
        ],
        [
          'Internal',
          'Internal company products',
          [
            'Builders',
            'Proposal Generator',
            'Lead Manager',
            'CRM',
            'Employee Portal',
            'Knowledge Base',
            'Training Platform',
            'Sales Dashboard',
            'Project Dashboard',
            'Support Desk',
            'Marketing Automation',
          ],
        ],
      ].map(([nav, title, items]) => (
        <SimpleSlide
          key={nav as string}
          nav={nav as string}
          kicker="Product factory"
          title={title as string}
        >
          <Chips items={items as string[]} />
        </SimpleSlide>
      ))}

      <SimpleSlide
        nav="Industries"
        kicker="Possible industries"
        title="Built for 100+ industries from Coimbatore to global markets."
      >
        <Chips items={industries} />
      </SimpleSlide>

      <SimpleSlide
        nav="Initial Market"
        kicker="Our initial market"
        title="Start local. Compound outward."
      >
        <Pipeline items={['Coimbatore', 'Tamil Nadu', 'South India', 'India', 'Global']} />
      </SimpleSlide>

      <SimpleSlide
        nav="Segments"
        kicker="Customer segments"
        title="A platform for every buyer size and sector."
      >
        <IconGrid
          items={[
            'Micro Business',
            'Small Business',
            'Medium Business',
            'Enterprise',
            'Government',
            'Educational Institutions',
            'Healthcare',
            'NGOs',
            'Startups',
            'Professionals',
          ]}
        />
      </SimpleSlide>

      <SimpleSlide
        nav="Sales"
        kicker="Sales strategy"
        title="Phase 1: ₹15,000–₹75,000 projects for local proof."
        body="Build portfolio, testimonials, referrals, repeat customers — no expensive ERP initially."
      >
        <Factory />
      </SimpleSlide>

      <SimpleSlide
        nav="Business Model"
        kicker="Business model"
        title="Multiple revenue streams around one reusable factory."
      >
        <Chips
          items={[
            'Custom Software',
            'Website Development',
            'Annual Maintenance',
            'Hosting',
            'AI Subscription',
            'SaaS',
            'Templates',
            'Consulting',
            'Training',
            'Support',
            'Licensing',
            'Marketplace',
          ]}
        />
      </SimpleSlide>

      <SimpleSlide
        nav="Structure"
        kicker="Company structure"
        title="CubicleTech LLP becomes a compounding product engine."
      >
        <Pipeline items={['CubicleTech LLP', 'Builders', 'Products', 'Clients', 'Recurring Revenue']} />
      </SimpleSlide>

      <SimpleSlide
        nav="Founders"
        kicker="Founding team structure"
        title="Five founders aligned as one operating system."
      >
        <IconGrid
          items={[
            'CEO / Strategy',
            'Operations & PMO',
            'Sales & Business Development',
            'Customer Success & Delivery',
            'AI Platform & Product Management',
          ]}
        />
      </SimpleSlide>

      <SimpleSlide
        nav="5-Year Vision"
        kicker="5-year vision"
        title="Thousands of projects. Hundreds of products. Global reach."
      >
        <Chips
          items={[
            'Multiple SaaS offerings',
            'International customers',
            'Marketplace',
            'AI agents',
            'Global software company',
          ]}
        />
      </SimpleSlide>

      <SimpleSlide
        nav="Revenue"
        kicker="Revenue vision"
        title="Recurring revenue grows as the factory learns."
      >
        <div style={{ ...s.card, marginTop: 32 }}>
          <LineChart points={[5, 8, 14, 22, 38, 64, 96, 132]} height={180} />
        </div>
        <Chips
          items={[
            'Custom software',
            'Websites',
            'Mobile apps',
            'SaaS',
            'AMC',
            'AI automation',
            'Hosting',
            'Support retainers',
            'White-label',
            'Marketplace',
            'Consulting',
            'Training',
          ]}
        />
      </SimpleSlide>

      <SimpleSlide
        nav="Why Win"
        kicker="Why we will win"
        title="Operator discipline plus AI-powered engineering."
      >
        <IconGrid
          items={[
            'Business experience',
            'PMO expertise',
            'Agile mindset',
            'AI-powered engineering',
            'Low operational cost',
            'Fast delivery',
            'Scalable platform',
            'Customer-first approach',
            'Reusable product factory',
          ]}
        />
      </SimpleSlide>

      <Slide nav="12 Months" style={s.shell}>
        <Aura />
        <Wrap
          kicker="Next 12-month execution plan"
          title="Four quarters to prove, package, and expand."
          wide
        >
          <Timeline
            items={[
              {
                time: 'Q1',
                title: 'Complete MVP',
                body: 'Deliver first projects, build portfolio, acquire first 10 customers.',
              },
              {
                time: 'Q2',
                title: 'Reusable templates',
                body: 'GitHub integration, AI memory, recurring maintenance contracts.',
              },
              {
                time: 'Q3',
                title: 'First SaaS products',
                body: 'Expand Tamil Nadu, referrals, standardized delivery.',
              },
              {
                time: 'Q4',
                title: 'South India expansion',
                body: 'Proposal + CRM modules, hire as needed, prepare national expansion.',
              },
            ]}
          />
        </Wrap>
      </Slide>

      <Slide nav="Call to Action" center style={s.shell}>
        <Aura />
        <Reveal>
          <div style={{ ...s.center, position: 'relative', zIndex: 1 }}>
            <div style={s.kicker}>Call to action</div>
            <h2 style={s.title}>“We are not building another software company.”</h2>
            <p
              style={{
                ...s.lead,
                fontSize: 'clamp(26px,4vw,48px)',
                color: '#111827',
              }}
            >
              We are building a Software Factory.
            </p>
            <div style={{ marginTop: 34 }}>
              <DonutChart value={100} label="BUILDERS" size={190} />
            </div>
          </div>
        </Reveal>
      </Slide>
    </Deck>
  );
}
