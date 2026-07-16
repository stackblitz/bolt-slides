import {
  Deck,
  Cover,
  Slide,
  Agenda,
  Section,
  Split,
  Comparison,
  Steps,
  Timeline,
  StatGrid,
  BigNumber,
  Quote,
} from './deck';

import {
  Pricing,
  Team,
  BrowserFrame,
  Globe,
  TiltCard,
  SpotlightCard,
  Marquee,
} from './components';

export default function App() {
  return (
    <Deck>
      {/* ==================== SLIDE 1: Hero ==================== */}
      <Cover
        kicker="CubicleTech LLP"
        title="BUILDERS"
        subtitle="The AI Software Factory"
        tagline="Build the platform once. Build unlimited software products forever."
        notes="Strong opening. Pause after the tagline."
      />

      {/* ==================== SLIDE 2: Who We Are ==================== */}
      <Slide center nav="Who We Are" notes="Introduce the founding team">
        <h2 className="headline">Who We Are</h2>
        <p className="subhead">
          A 5-member founding team with deep expertise in Project Management, PMO, Agile, Scrum, and Product Delivery.
        </p>
        <p>
          We are not traditional developers — our strength is understanding business problems and delivering value.
          <br />Builders allows us to amplify those strengths using AI.
        </p>
      </Slide>

      {/* ==================== SLIDE 3: Why Builders? ==================== */}
      <Slide nav="Why Builders?">
        <h2 className="headline">Why Builders?</h2>
        <Comparison
          leftTitle="Traditional Development"
          leftItems={["Slow & Expensive", "Requires large engineering teams", "Months to deliver", "High cost"]}
          rightTitle="Builders AI Factory"
          rightItems={["Fast & Affordable", "AI-powered engineering team", "Days to weeks", "Dramatically lower cost"]}
        />
      </Slide>

      {/* ==================== SLIDE 4: The Problem ==================== */}
      <Slide center nav="The Problem">
        <h2 className="headline">The Problem</h2>
        <p className="subhead">Businesses need software — websites, apps, CRM, ERP, AI tools, dashboards...</p>
        <p>But they cannot afford traditional software development companies.</p>
      </Slide>

      {/* ==================== SLIDE 5: Vision ==================== */}
      <Slide nav="Vision">
        <h2 className="headline">Our Vision</h2>
        <p className="subhead">Builders is not another AI chatbot.</p>
        <p>Builders is a complete <strong>AI Software Company</strong> — a virtual engineering organization.</p>
        <Steps
          items={[
            "Customer",
            "AI Product Manager",
            "Architecture & Design",
            "Backend + Frontend",
            "UI/UX + QA + Security",
            "DevOps & Deployment",
            "Working Production-Ready Product",
          ]}
        />
      </Slide>

      {/* ==================== SLIDE 6: Mission ==================== */}
      <Slide center nav="Mission">
        <h2 className="headline">Our Mission</h2>
        <p className="subhead">To make professional software development accessible to every business.</p>
        <p>From a local bakery to a multinational corporation.</p>
      </Slide>

      {/* ==================== SLIDE 7: Core Philosophy ==================== */}
      <Slide center nav="Core Philosophy">
        <h2 className="headline">Core Philosophy</h2>
        <Steps
          items={[
            "One Prompt",
            "Complete AI Engineering Team",
            "Production-Ready Application",
          ]}
        />
      </Slide>

      {/* ==================== SLIDE 8: How Builders Works ==================== */}
      <Slide nav="How It Works">
        <h2 className="headline">How Builders Works</h2>
        <Steps
          items={[
            "Customer Requirements",
            "Requirement Analysis",
            "Product Manager",
            "Architecture",
            "Database + Backend + Frontend",
            "UI/UX + QA + Reviews",
            "Generate Application",
            "Preview & Iterate",
          ]}
        />
      </Slide>

      {/* ==================== SLIDE 9: AI Engineering Team ==================== */}
      <Slide nav="AI Engineering Team">
        <h2 className="headline">Meet Our AI Engineering Team</h2>
        <Team
          members={[
            { name: "Product Manager", role: "Understands requirements & prioritizes features" },
            { name: "Architect", role: "Designs system architecture" },
            { name: "Backend Engineer", role: "Builds APIs & logic" },
            { name: "Frontend Engineer", role: "Creates beautiful interfaces" },
            { name: "UI/UX Designer", role: "Designs user experience" },
            { name: "QA Engineer", role: "Tests & ensures quality" },
            { name: "Security Engineer", role: "Ensures security & compliance" },
            { name: "DevOps Engineer", role: "Handles deployment & infrastructure" },
            { name: "Reviewer", role: "Reviews every step before moving forward" },
          ]}
        />
      </Slide>

      {/* ==================== SLIDE 10: Review Engine ==================== */}
      <Slide nav="Review Engine">
        <h2 className="headline">Review Engine</h2>
        <p>Every AI engineer reviews the previous stage’s work.</p>
        <p>Nothing moves forward without approval — ensuring high quality.</p>
      </Slide>

      {/* ==================== SLIDE 11: BuildersDB ==================== */}
      <Slide nav="BuildersDB">
        <h2 className="headline">BuildersDB</h2>
        <p>Everything is stored and remembered:</p>
        <ul>
          <li>Projects & Requirements</li>
          <li>Reviews & Approvals</li>
          <li>Tasks & Artifacts</li>
          <li>Timeline & History</li>
          <li>Engineering Memory</li>
        </ul>
      </Slide>

      {/* ==================== SLIDE 12: Tech Stack ==================== */}
      <Slide nav="Technology Stack">
        <h2 className="headline">Current Technology Stack</h2>
        <div className="grid grid-cols-3 gap-4">
          {["React", "Remix", "TypeScript", "Tailwind", "Supabase", "Anthropic", "OpenAI", "Gemini", "Vercel", "GitHub", "WebContainers"].map((tech, i) => (
            <div key={i} className="glass p-4 text-center font-medium">{tech}</div>
          ))}
        </div>
      </Slide>

      {/* ==================== SLIDE 13: Current Features ==================== */}
      <Slide nav="Current Features">
        <h2 className="headline">Current Features</h2>
        <StatGrid
          stats={[
            { label: "Project Dashboard", value: "✓" },
            { label: "AI Engineering Team", value: "✓" },
            { label: "Review System", value: "✓" },
            { label: "BuildersDB", value: "✓" },
            { label: "Generate Application", value: "✓" },
            { label: "Preview & Iterate", value: "✓" },
          ]}
        />
      </Slide>

      {/* ==================== SLIDE 14: Roadmap ==================== */}
      <Slide nav="Roadmap">
        <h2 className="headline">Roadmap</h2>
        <Timeline
          items={[
            { title: "Current", description: "Core MVP" },
            { title: "Next", description: "GitHub + Templates" },
            { title: "Q3", description: "Team Collaboration & CRM" },
            { title: "Q4", description: "First SaaS Products" },
            { title: "Future", description: "AI Company Operating System + Marketplace" },
          ]}
        />
      </Slide>

      {/* ==================== SLIDE 15-26: Products We Can Build ==================== */}
      <Slide nav="Products We Can Build">
        <h2 className="headline">Products We Can Build</h2>
        <p>From simple websites to complex enterprise systems — all powered by AI.</p>
      </Slide>

      <Slide nav="Business Websites">
        <h2 className="headline">Business Websites</h2>
        <p>Restaurant • Hotel • Clinic • Hospital • Gym • School • Real Estate • Law Firm • Startup • Portfolio • and more...</p>
      </Slide>

      <Slide nav="Business Management Software">
        <h2 className="headline">Business Management Software</h2>
        <p>CRM • ERP • HRMS • Payroll • Inventory • POS • Invoice • Vendor Portal • Employee Portal...</p>
      </Slide>

      <Slide nav="Healthcare Products">
        <h2 className="headline">Healthcare Products</h2>
        <p>Hospital Management • Appointment System • Patient Portal • Telemedicine • Pharmacy • Diagnostic Lab...</p>
      </Slide>

      <Slide nav="Education Products">
        <h2 className="headline">Education Products</h2>
        <p>School ERP • College ERP • Learning Platform • Exam Management • Student & Parent Portal...</p>
      </Slide>

      <Slide nav="Retail & E-commerce">
        <h2 className="headline">Retail & E-commerce</h2>
        <p>Inventory • POS • Online Store • Order Tracking • Warehouse • Franchise Management...</p>
      </Slide>

      <Slide nav="AI Products">
        <h2 className="headline">AI Products</h2>
        <p>AI Chatbots • AI Customer Support • AI HR Assistant • AI Sales Assistant • AI Proposal Generator • AI Agents...</p>
      </Slide>

      <Slide nav="Mobile Apps">
        <h2 className="headline">Mobile Apps</h2>
        <p>Restaurant • Delivery • Taxi • School • Hospital • Fitness • Booking • Finance • Community...</p>
      </Slide>

      <Slide nav="SaaS Products">
        <h2 className="headline">SaaS Products</h2>
        <p>CRM • Project Management • Helpdesk • Subscription Platform • Analytics • Marketing Platform...</p>
      </Slide>

      {/* ==================== SLIDE 27: Industries ==================== */}
      <Slide nav="Industries">
        <h2 className="headline">Possible Industries</h2>
        <p>Healthcare • Education • Retail • Hospitality • Finance • Real Estate • Manufacturing • Construction • Agriculture • Legal • Government • Logistics • and 80+ more...</p>
      </Slide>

      {/* ==================== SLIDE 28: Market Expansion ==================== */}
      <Slide nav="Market Expansion">
        <h2 className="headline">Our Initial Market</h2>
        <Steps items={["Coimbatore", "Tamil Nadu", "South India", "India", "Global"]} />
      </Slide>

      {/* ==================== SLIDE 29-38: Business & Vision ==================== */}
      <Slide nav="Customer Segments">
        <h2 className="headline">Customer Segments</h2>
        <p>Micro Business • Small Business • Medium Business • Enterprise • Government • Healthcare • Education • Startups • Professionals</p>
      </Slide>

      <Slide nav="Sales Strategy">
        <h2 className="headline">Sales Strategy (Phase 1)</h2>
        <p>₹15,000 – ₹75,000 projects → Build portfolio → Testimonials → Referrals → Repeat customers</p>
      </Slide>

      <Slide nav="Business Model">
        <h2 className="headline">Business Model</h2>
        <p>Custom Development • Websites • Mobile Apps • Annual Maintenance • AI Subscriptions • SaaS • Templates • Consulting • Marketplace</p>
      </Slide>

      <Slide nav="5-Year Vision">
        <h2 className="headline">5-Year Vision</h2>
        <p>Thousands of projects • Hundreds of products • Multiple SaaS offerings • International customers • Global software company</p>
      </Slide>

      <Slide nav="Why We Will Win">
        <h2 className="headline">Why We Will Win</h2>
        <p>Business + PMO expertise • AI-powered engineering • Low operational cost • Fast delivery • Scalable platform • Customer-first approach</p>
      </Slide>

      <Slide nav="12-Month Plan">
        <h2 className="headline">Next 12-Month Execution Plan</h2>
        <Timeline
          items={[
            { title: "Q1", description: "Complete MVP + First 10 customers" },
            { title: "Q2", description: "Templates + Maintenance contracts" },
            { title: "Q3", description: "First SaaS products + Expand in Tamil Nadu" },
            { title: "Q4", description: "South India expansion + Proposal & CRM modules" },
          ]}
        />
      </Slide>

      {/* ==================== FINAL SLIDE: Call to Action ==================== */}
      <Slide center nav="Call to Action">
        <h2 className="headline">"We are not building another software company."</h2>
        <h3 className="accent-text text-4xl mt-6">We are building a Software Factory.</h3>
        <p className="mt-8">CubicleTech LLP • Builders</p>
      </Slide>
    </Deck>
  );
}
