---
url: 'https://alexwhiteside.dev/background'

---

Career & Background \| Alex Whiteside

Career &

Background

Menu

- [About Me](/)
- [Writing](/blog)
- [Career](/background)
- [Inspirations](/recommendations)

Over the last decade I’ve spent most of my time in Fintech and
Edtech as a (very) hands on technical leader.

![MoneyLion](https://alexwhiteside.dev/cdn-cgi/image/width=500,quality=80,format=avif/https://asset.brandfetch.io/idsfleZtdK/idcMViISrZ.png?updated=1668515673414)

MoneyLion Jan 2022 - Jul 2024

Architect

Jan 2023 - Jul 2024

Designed and led development on a platform to support our B2B2C customizable widgets and affiliate pages (1k+ partners,
2m+ monthly users)

- Determined biggest bottleneck to be managing configuration schemas and app isolation
- Defined a standards based protocol for docker apps to attach their schemas as OCI Artifacts
- Implemented a control plane using PayloadCMS, kubernetes and H3 for configuration, which would discover Apps in the
  registry and load their schemas for use.
- Implemented a lightweight routing service typescript which would resolve and forward the correct configuration to the
  appropriate app
- Onboarded 10+ FE Eng to deploy using the system and deploy their own apps, as well as Product / Account Managers to
  migrate partners

Sr. Director of Engineering & Product

Jan 2022 - Jan 2023

Led design and development of our banking product search

- Leveraged ReactReact Server Components to achieve <1s FCP and <2s LCP (p75) on dynamic load
- Decided on using Reshaped as primary design system base, getting buy in from designers and developers
- Achieved fully adaptive design without breakpoints, using container queries and modern css
- Piloted embedded version with multiple partners
- Fully migrated all partners from legacy savings products

![Even Financial](https://alexwhiteside.dev/cdn-cgi/image/width=500,quality=80,format=avif/https://ffnews.com/wp-content/uploads/2021/12/1607358369354.jpg)

Even Financial

Acquired by MoneyLion

Aug 2018 - Jan 2022

Sr. Director of Engineering & Product

Feb 2021 - Jan 2022

Led migration of legacy B2B2C codebases (React SPA)

- Determined we were losing 10-15% of traffic before load by setting up network level measurments
- Years of bad practices and poor architecture had load times up to 14s (p75)
- Led consolidation of dependencies and setup nx monorepo
- Setup new infrastructure layer to allow incremental migration
- Oversaw team migrating in-place all network traffic

Ran a bootcamp for all Frontend Developers

- 4 hours a week for 6 months
- Workshops focused on testing, modern react patterns, typescript

Director of Engineering

Oct 2019 - Feb 2021

Directed 4 teams (35 total staff) responsible for all direct to consumer products (fiona.com, leaplife.com,
birchfinance.com)

- Refactored legacy codebases (nextjs) so that all content was CMS driven and exceeded core web vitals
- Led development of a dyanmic web form for loan / credit card applications integrated with the Even API
- Led creation of frictionless user accounts implementing OIDC using Keycloak
- Oversaw development of multiple backend services for search, email & sms marketing, credit score linking
- Rebuilt an SEO optimized content and marketing experience driving $2m+ in revenue quarterly

Team/Tech Lead

Aug 2018 - Oct 2019

Led and grew the frontend team

- Led migration of product from Angular to React
- Oversaw features for two major verticals (Savings + Credit Cards)
- Grew team from 2 to 6 engineers
- Drafted baseline career ladder

Established org wide “Launch Ops” process

- Acted as chair and engineering representative until 2022
- Together, we coordinated 80% of releases across all departments

![Birch Finance](https://alexwhiteside.dev/cdn-cgi/image/width=500,quality=80,format=avif/https://s3-us-west-2.amazonaws.com/cbi-image-service-prd/modified/f2c14924-384c-4ca6-b8b7-118455a81c22.png?w=96)

Birch Finance

Acquired by Even

Oct 2016 - Aug 2018

Cofounder & CTO

Oct 2016 - Aug 2018

Developed and maintained all software for Birch Finance, a Credit Card Rewards focused PFM (Personal Finance Manager)

- Administrative backend for customer support, card data entry and compliance management
- Medium scale (500 GB+) dynamic web scraping platform for flights, hotels, and other reward point valuations
- SpringSpring API Backend which allowed for account creation, simulation of transactions for reward value, and all
  released features
- Responsive web application using jquery
- Native iOS App using swift
- flutter based Android App and select iOS Views

Architected a universal credit card data model and transaction simulation engine that supported the 250+ most popular
credit cards

- Included over 400 parameters which could be provided via reference and updated in real time for compliance
- Supported all forms of earning caps, multipliers, benefits and other complex features, aligned by MCCs (Merchant
  Category Code)
- Integrated transaction aggregation via Yodlee, Plaid, Finicity and Basiq
- Evolved recommendation engine from single card (103 combinations) to full wallet (1017 combinations) and real time

    - leveraged Redis for incremental caching of results
    - distributed compute via Amazon Web ServicesLambda
    - created testing infrastructure for analyts to validate model changes

Decoupled the Birch simulation engine and licensed/exposed it to multiple large clients

- Quantas Money (SaaS, 5 million+ users)
- Success.ly (full whitelabel)
- T-Mobile (manual analysis)

![Ultimate Software](https://alexwhiteside.dev/cdn-cgi/image/width=500,quality=80,format=avif/https://www.hrvirginia.org/wp-content/uploads/2020/02/Ultimate-Software-Logo.png)

Ultimate Software May 2014 - Jan 2015

Software Developer

May 2014 - Jan 2015

Contributed to internal testing framework and DSLs to support test case automation via a gherkin like syntax.

- Developed requested control models and grammars for the framework, using C# and Selenium.
- Improved automated developer environment setup using Ansible Playbooks and custom tooling

Developer and Test Engineer - Tactical Integration Strike Team (TwIST)

- Contributed to custom integrations between UltiPro and SaaS systems such as Informatica and NetSuite
- Designed and implemented integration test plans across the C# codebase
- Contributed to a prototype microservice in Go to replace legacy monolith features.

![Robotic Interactive Learning Environment](/_astro/rile.Cj5USOl7.jpg)

Robotic Interactive Learning Environment Dec 2013 - Jan 2015

Founder / CTO

Dec 2013 - Jan 2015

RILE is a [robotic interactive learning environment](https://www.facebook.com/rileinc/) that integrates an e-textbook,
video lectures, activities, simulations, and demonstrations, classroom (non-robotic) activities, robotic activities, and
homework activities, all in one. It was a joint venture which grew out of my research at UWF, collaboration with the
Physics Dept, and investment from iSpace Inc. RILE, including spinoff “Discovery Spot”, was used by tens of thousands of
secondary school students in dozens of schools across the USA, UAE, and India.

I was responsible for developing the foundational technology for the platform, including the hardware design process and
software architecture, allowing for precise manipulation and real time data analysis from 5+ robots in a classroom, each
operated by students on their laptops over a web application and video streams.

- Developed custom Java based Server and Web Application software
- Developed initial hardware prototypes using VEX Robotics Cortex Microcontrollers which would join the network over
  wifi and managed by the server.
- Worked with founding team to design and implement initial integrated textbook material and experiments to best
  leverage the hardware.

Oversaw the Expansion of RILE materials, platform capabilities, and deployment into schools.

- Hired 4-5 part time staff from the university community and managed their contributions
- Contracted with IHMC (Institute of Human Machine Cognition) engineers to develop custom PCBs to allow for more
  economical production of hardware.
- Coordinated demonstrations, presented at conferences and trade shows, and deployed the platform into schools in the
  USA, UAE and India.

![American Express (AET)](https://alexwhiteside.dev/cdn-cgi/image/width=500,quality=80,format=avif/https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/2560px-American_Express_logo_%282018%29.svg.png)

American Express (AET)  Apr 2013 - Aug 2013

Developer

Apr 2013 - Aug 2013

I was the project lead and primary contributor for an internal tool to automate the deployment of custom PEGA based
applications (WAR Packages) within both sandbox and production environments.

- Gathered requirements and shadowed the current process to understand system goals
- Drafted a complete requirements document and implementation plan which was reviewed by AMEX Architects
- Implemented a prototype of the system using Web Sphere, F5, DB2 and J2EE technologies

![Air Force Research Lab](https://alexwhiteside.dev/cdn-cgi/image/width=500,quality=80,format=avif/https://upload.wikimedia.org/wikipedia/commons/c/c0/Air_Force_Research_Laboratory.png)

Air Force Research Lab Apr 2012 - Aug 2012

Research Assistant (Civilian)

Apr 2012 - Aug 2012

I assisted in research and development of new designs for fixed wing aircraft prototypes at Eglin Air Force Base.

- Created computational fluid dynamics models in MatLab based on team defined algorithms
- Extended a vortex based CFD solver in C++ to run more complete simulation trials
- Helped manage a small custer of servers used by the team on site

![Whiteside Photography](/_astro/whitesidephoto.C4rFaT44.png)

Whiteside Photography Jan 2010 - May 2012

Owner / Photographer

Jan 2010 - May 2012

I started Whiteside Photography after being ask to photograph families or graduation milestones, and over time expanded
into weddings and selling wildlife prints.

- Provided on location photography services, editing and drop shipment of prints
- Partnered with a local beach wedding planner and local venues
- Created a custom webapp to allow for password protected viewing and ordering of prints

Interested in

making a dent in the universe?

changingtheworld?

I am, [let's talk](/cdn-cgi/l/email-protection#a4ccc1c8c8cbe4c5c8c1dcd3cccdd0c1d7cdc0c18ac0c1d2).

© 2025 • Alex Whiteside