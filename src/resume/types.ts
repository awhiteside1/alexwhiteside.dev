type Education = {
    institution: string;
    year: string;
    degree: string;
    location: string;
};

// Base type for general info
type ContactInfo = {
    name: string;
    email: string;
    website: string;
    phone: string;
};

type JobExperience = {
    name: string; // Company name
    details?: string; // Additional details like acquisitions or special notes
    roles: JobRole[]; // List of roles within the company
};

type JobRole = {
    title: string;
    duration: string;
    summary?: string; // A brief description of the role
    items?: RoleItem[]; // Specific achievements or tasks under the role
};

type RoleItem = {
    title: string; // The short description or title of the achievement/task
    details?: string; // More details about the achievement/task
};


type Project = {
    name: string;
    description: string;
};

type SkillCategory = {
    category: string;
    skills: string[];
};

export type Resume = {
    summary: string;
    contact: ContactInfo;
    education: Education[];
    experience: JobExperience[];
    projects: Project[];
    skills: SkillCategory[];
};

export const alexWhitesideResume: Resume = {
    summary: '',
    contact: {
        name: "Alex Whiteside",
        email: "alex@example.com",
        website: "https://alexwhiteside.dev",
        phone: "123-456-7890",
    },
    education: [
        {
            institution: "University of West Florida",
            location: "Pensacola, FL",
            degree: "Bachelor of Science in Computer Science",
            year: "May 2013",
        },
        {
            institution: "Independent Study",
            location: "Online",
            degree: "Self-taught in software development, product design, and leadership",
            year: "Ongoing",
        },
    ],
    experience: [
        {
            name: "MoneyLion",
            details: "Includes acquisitions of Even Financial and Birch Finance",
            roles: [
                {
                    title: "Architect, Network Consumer Experience",
                    duration: "Jan 2024 - June 2024",
                    summary: "Responsible for ensuring seamless integration between B2B2C solutions and customer-focused applications.",
                    items: [
                        {
                            title: "Customizable Widget Platform",
                            details: "Designed & developed a B2B2C platform (1k+ partners, 2M+ users monthly). Implemented a control plane using Kubernetes, PayloadCMS, and H3 for configuration.",
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
                    title: "Senior Director, Product & Engineering",
                    duration: "Jan 2022 - Jan 2024",
                    summary: "Oversaw cross-functional teams responsible for building scalable products and engineering platforms.",
                    items: [
                        {
                            title: "Performance Optimization",
                            details: "Migrated legacy React SPA products, reducing load time from 14s to under 3s through infrastructure modernization and dependency consolidation.",
                        },
                        {
                            title: "Platform Development",
                            details: "Directed 4 teams (35 members) and oversaw development of product-facing APIs and SEO-optimized marketing tools driving $2M+ quarterly.",
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
        },
        {
            name: "Robotic Interactive Learning Environment",
            details: "Founded to innovate educational technology for classrooms worldwide.",
            roles: [
                {
                    title: "Founder & CTO",
                    duration: "Dec 2013 - Jan 2015",
                    summary: "Pioneered a robotics platform for innovative learning and real-time analytics.",
                    items: [
                        {
                            title: "Educational Robotics Platform",
                            details: "Developed hardware-software systems for classrooms. Expanded deployments to schools in the USA, UAE, and India.",
                        },
                        {
                            title: "Core Technology",
                            details: "Designed Java-based server systems managing 5+ robots, coupled with a web app offering real-time analytics.",
                        },
                    ],
                },
            ],
        },
        {
            name: "American Express (AET)",
            details: "",
            roles: [
                {
                    title: "Developer",
                    duration: "Apr 2013 - Aug 2013",
                    summary: "",
                    items: [
                        {
                            title: "Internal Automation Tooling",
                            details: "Developed a PEGA-based application deployment automation tool, reducing manual deployment errors.",
                        },
                    ],
                },
            ],
        },
    ],
    projects: [
        {
            name: "Universal Credit Card Engine",
            description: "Designed a recommendation engine supporting over 400 unique credit card scenarios through automated transaction simulations.",
        },
        {
            name: "Educational Robotics Expansion",
            description: "Scaled RILE’s robotic platform for classrooms worldwide, incorporating cost-effective PCB designs for schools.",
        },
        {
            name: "React Modernization Bootcamp",
            description: "Trained engineering team on React Server Components, boosting team productivity and product performance.",
        },
    ],
    skills: [
        {
            category: "Languages",
            skills: ["JavaScript", "TypeScript", "Java", "Swift", "Python", "Go", "C++"],
        },
        {
            category: "Technology",
            skills: ["React", "Kubernetes", "Docker", "AWS", "PayloadCMS", "Spring Boot"],
        },
        {
            category: "Leadership",
            skills: ["Team building", "bootcamp-style training", "product design"],
        },
    ],
};