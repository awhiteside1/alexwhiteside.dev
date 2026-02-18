/**
 * Alexander Whiteside's Resume - JSX Version
 *
 * Run with: bun run playground/resume.tsx
 */

import { render, Doc, Section, Bullets, Item, DebugOutlines, DebugMeasure } from "typstkit/jsx"
import { Heading, Company, Role, Education, Publication, Skills } from "typstkit"

/** Toggle to visualize all bounding boxes in the PDF */
const DEBUG_LAYOUT = false

// =============================================================================
// Resume Sections
// =============================================================================

function WorkExperience() {
	return (
		<Section title="Work Experience">
			<Company name="Birch Finance, LLC" location="San Jose, CA">
				<Role title="Chief Technology Officer / Founder" dates="2016 - Present">
					<Bullets>
						<Item>Architected, designed, implemented and operated API and UI platforms (J2EE, Swift, Flutter)</Item>
						<Item>Developed core data models to allow product agnostic computations (MySQL/Java)</Item>
						<Item>Created a deep integration into aggregators (Plaid/Finicity), as well as consuming affiliate APIs into the data model</Item>
						<Item>Architected an environment (EC2/Lambda/VPC) to allow services to scale to 30k+ users</Item>
						<Item>Managed and implemented platform changes to integrate with Success.ly and Qantas Loyalty</Item>
						<Item>Developed analytics and marketing tools to allow deep linking, notifications and tracking across web and mobile</Item>
						<Item>Organized product management, technical documentation and various internal tools</Item>
					</Bullets>
				</Role>
			</Company>

			<Company name="Ultimate Software" location="Weston, FL">
				<Role title="Architect" dates="Jan 2016 - Mar 2016">
					<Bullets>
						<Item>Led architecture initiatives for integration platform modernization</Item>
					</Bullets>
				</Role>
				<Role title="Software Engineer - Tactical Integration Strike Team" dates="Apr 2015 - Jan 2016">
					<Bullets>
						<Item>Expanded core APIs within primary product, Ulti-Pro (C#)</Item>
						<Item>Built microservices to allow Ulti-Pro events to be subscribed to by external parties (Node.js / Go)</Item>
						<Item>Implemented unit and integration test plans for API and UI components (Selenium/CSharp)</Item>
						<Item>Developed an Informatica connector for Ulti-Pro to integrate with Netsuite (Java)</Item>
					</Bullets>
				</Role>
			</Company>

			<Company name="Robotic Interactive Learning Environment" location="Pensacola, FL">
				<Role title="Chief Technology Officer / Founder" dates="Apr 2012 - Jan 2016">
					<Bullets>
						<Item>Developed RILE, a robotics based teaching platform designed for middle/high school students</Item>
						<Item>Programmed autonomous robots (C/C++), motion-tracking systems (C), server based applications (Java) and graphical user interfaces (PHP/JavaScript/JavaFX)</Item>
						<Item>Designed custom control hardware based on ATMEL processors (Altium), developed a base chassis (AutoDesk Inventor) and worked with international injection molding plastics companies for production</Item>
						<Item>Created marketing, web and lecture resources for multi-national conferences, trade-shows, and business events</Item>
						<Item>Managed employees, including physics and technical teams, in India and the United States</Item>
					</Bullets>
				</Role>
			</Company>

			<Company name="University of West Florida" location="Pensacola, FL">
				<Role title="Researcher and Project Manager - Applied Science and Technologies" dates="Jan 2013 - Jan 2016">
					<Bullets>
						<Item>Worked as a consultant/developer for various projects (Robotic Arm Painter, Tour Robot)</Item>
						<Item>Built online laboratory experiments for IT classes (Sites Networking)</Item>
					</Bullets>
				</Role>
			</Company>

			<Company name="American Express Technologies" location="Weston, FL">
				<Role title="Technical Analyst/Developer - Global Infrastructure" dates="Jun 2013 - Aug 2013">
					<Bullets>
						<Item>Developed a web based portal and deployment system (J2EE / Spring) for PEGA users to test their applications in real environments, provide resource auditing and enforce security/software design life-cycle protocols</Item>
						<Item>Created documentation and followed software development lifecycles</Item>
					</Bullets>
				</Role>
			</Company>

			<Company name="Air Force Research Lab" location="Eglin Air Force Base, FL">
				<Role title="Developer - Computational Fluid Dynamics" dates="Jun 2012 - Aug 2012">
					<Bullets>
						<Item>Extended a Fluid/Structural Dynamics Vortex Solver (C++/Fortran) to allow physics based flexible wing simulations and 3-D simulation (Maya).</Item>
						<Item>Managed a military grade mid-sized network enclave</Item>
						<Item>Developed LaTeX templates/resources for engineering teams</Item>
					</Bullets>
				</Role>
			</Company>

			<Company name="Whiteside Photography" location="Navarre, FL">
				<Role title="Photographer/Owner" dates="Jan 2009 - Mar 2012">
					<Bullets>
						<Item>Professional photography services for events and portraits</Item>
					</Bullets>
				</Role>
			</Company>
		</Section>
	)
}

function EducationSection() {
	return (
		<Section title="Education">
			<Education
				institution="University of Florida"
				area="Software Engineering"
				studyType="B.S."
				startDate="Aug 2012"
				endDate="May 2016"
				location="Gainesville, FL"
			/>
			<Education
				institution="University of West Florida"
				area="Computer Science"
				studyType="Non-Degree Seeking Student"
				startDate="Aug 2010"
				endDate="May 2012"
				location="Pensacola, FL"
			/>
		</Section>
	)
}

function Publications() {
	return (
		<Section title="Published Works">
			<Publication name="A comparison of Computer Vision Techniques for Indoor Robot Localization" publisher="International Journal of Computer Science" location="New Delhi, IN" releaseDate="Dec 2016" />
			<Publication name="An Exploration In The Use Of Minecraft To Teach Digital Logic To Secondary School Students" publisher="International Journal of Information Technology" releaseDate="Nov 2016" />
			<Publication name="The Development of Online Laboratory Experiments for College Level IT Students" publisher="EdMedia World Conference On Media and Technology" location="Tampere, FI" releaseDate="Jun 2014" />
			<Publication name="The Design and Implementation of Tele-Robotics in Education" publisher="Consortium of Computer Sciences in Colleges" location="Greenville, SC" releaseDate="Nov 2013" />
			<Publication name="Android App Inventor for the Absolute Beginner" publisher="Cengage Learning" location="New York, NY" releaseDate="Jun 2013" />
			<Publication name="Robotics: A Project Based Approach" publisher="Cengage Learning" location="New York, NY" releaseDate="Oct 2014" />
			<Publication name="RILE - A Remote Robotic Interactive Learning Environment" publisher="IEEE Robotics in Education Conference" location="Prague, CZ" releaseDate="Sep 2012" />
		</Section>
	)
}

function Competencies() {
	return (
		<Section title="Competencies">
			<Skills category="Programming Languages (and Common Libraries/Frameworks)">
				<Item>Java (J2EE, Spring)</Item>
				<Item>C/C++ (OpenCV, ROS)</Item>
				<Item>C Sharp (.NET)</Item>
				<Item>Python (Django)</Item>
				<Item>Swift</Item>
				<Item>Dart (Flutter)</Item>
				<Item>Go</Item>
				<Item>PHP</Item>
				<Item>JavaScript (Node.js, Express, JQuery, Redux)</Item>
				<Item>MySQL</Item>
				<Item>HTML/CSS</Item>
			</Skills>
			<Skills category="Platforms and Professional Applications">
				<Item>UNIX/Linux</Item>
				<Item>Most AWS Offerings (Networking, DB/Cache, SQS, Routing, Orchestration)</Item>
				<Item>Docker</Item>
				<Item>Apache/Tomcat</Item>
				<Item>REDIS</Item>
				<Item>Kafka</Item>
				<Item>LaTeX</Item>
				<Item>Altium</Item>
				<Item>AutoDesk Inventor</Item>
				<Item>IntelliJ</Item>
				<Item>JIRA</Item>
				<Item>Jenkins</Item>
				<Item>TeamCity</Item>
				<Item>YouTrack</Item>
			</Skills>
		</Section>
	)
}

// =============================================================================
// Main Document
// =============================================================================

export const doc = render(
	<Doc settings={{
		page: {
			paper: "us-letter",
			margin: "0.6in"
		},
		text: {
			size: "10pt"
		},
		paragraph: {
			justify: false
		}
	}}>
		<Heading
			personal={{
				name: "Alex Whiteside",
				titles: ["Software Engineer", "Architect", "Entrepreneur"],
				location: { city: "New York", region: "NY" },
				phone: "(850) 217-2971",
				email: "hello@alexwhiteside.dev",
				url: "https://alexwhiteside.dev",
				profiles: [
					{ network: "GitHub", username: "awhiteside1", url: "https://github.com/awhiteside1" },
					{ network: "LinkedIn", username: "alexwhiteside", url: "https://linkedin.com/in/alexwhiteside" },
				],
			}}
			options={{headingSmallCaps:true, showPhone:false}}
		/>
		<DebugOutlines enabled={DEBUG_LAYOUT}>
			<WorkExperience />
			<EducationSection />
			<Publications />
		</DebugOutlines>
		<Competencies />
	</Doc>
)
