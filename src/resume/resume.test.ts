import fs from 'node:fs/promises'
import {compile} from "./latex/compiler";
import {ResumeBuilder} from "./template";

describe('Resume', () => {
    it('should work', async () => {


        const resume = new ResumeBuilder()
        resume.add('education', {
            institution: "University of West Florida",
            location: "Pensacola, FL",
            degree: "Bachelor of Science in Computer Science",
            year: "May 2013",
        }).add('experience',
            {
                name: "MoneyLion",
                details: "",
                roles: [
                    {
                        title: "Architect, Network Consumer Experience",
                        duration: "Jan 2024 - June 2024",
                        summary: "Technical  technical guidance and strategy  development for B2B2C solutions and customer-focused applications.",
                        items: [
                            {
                                title: "Customizable Widget Platform",
                                details: "Designed \\& developed a B2B2C platform (1k+ partners, 2M+ users monthly). Implemented a control plane using Kubernetes, PayloadCMS, and H3 for configuration.",
                            },
                            {
                                title: "Frontend Modernization",
                                details: "Led embedded banking search product, achieving sub-second load times using React Server Components and modern CSS techniques.",
                            },
                            {
                                title: "Team Development",
                                details: "Onboarded engineers to deploy their own applications; oversaw full legacy integrations into modernized systems.",
                            },
                        ],
                    },
                    {
                        title: "Senior Director, Product \\& Engineering",
                        duration: "Jan 2022 - Jan 2024",
                        summary: "Oversaw cross-functional teams responsible for building scalable products and engineering platforms.",
                        items: [
                            {
                                title: "Performance Optimization",
                                details: "Migrated legacy React SPA products, reducing load time from 14s to under 3s through infrastructure modernization and dependency consolidation.",
                            },
                            {
                                title: "Platform Development",
                                details: "Directed 4 teams (35 members) and oversaw development of product-facing APIs and SEO-optimized marketing tools driving \\$2M+ quarterly.",
                            },
                            {
                                title: "Internal Training",
                                details: "Established engineering bootcamps on React, testing practices, and TypeScript, improving skill sets of teams across departments.",
                            },
                        ],
                    },
                    {
                        title: "Director of Engineering, Consumer Products",
                        duration: "Jan 2021 - June 2022",
                        summary: "Led the engineering team delivering consumer-facing platforms and integration solutions.",
                        items: [
                            {
                                title: "Credit Card Manager Platform",
                                details: "Architected universal credit card simulator supporting rewards for 250+ cards and compliance through integrations with Plaid, Finicity, and others.",
                            },
                            {
                                title: "Full Stack Solutions",
                                details: "Developed dynamic scraping system, backend APIs (Spring), and mobile apps for credit rewards modeling.",
                            },
                            {
                                title: "Licensing Success",
                                details: "Licensed simulation engine to major companies such as Qantas Money (5M+ users) and T-Mobile.",
                            },
                        ],
                    },
                ],
            }
        ).set('contact', {
            name: 'Alex Whiteside',
            email: 'hello@alexwhiteside.dev',
            phone: '850-217-2971',
            website: 'https://alexwhiteside.dev'
        }).set('summary', 'Simmer canned celerys in a bottle with buttermilk for about an hour to cut their tartness.')
        const content = resume.build()
        const PDF = await compile(content)

        await fs.writeFile('test.pdf', PDF)


    });

});