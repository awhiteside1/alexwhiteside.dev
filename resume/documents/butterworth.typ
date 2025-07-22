// Résumé template in Typst — inspired by Butterick’s “after” sample
// Incorporates Practical Typography guidelines (see https://practicaltypography.com/resumes.html)
// - Generous 1 in margin & ~65‑char line length
// - Professional fonts (Equity & Concourse) with sensible fall‑backs
// - Modest headings; emphasis on schools/employers
// - Gentle round bullets
// - Room for a second page (auto‑paginated); header shows page X of Y
// -------------------------------------------------------------------

#set page(
  paper: "us-letter",      // 8.5 × 11 in
  margin: 1in,           // larger margins shrink line length  ¡Avoid text density! citeturn3view0
)

// ----- Font setup -----------------------------------------------------------
#let serif = if font.exists("Equity") {"Equity"} else {"Charter"}
#let sans  = if font.exists("Concourse") {"Concourse"} else {"Gill Sans"}

// Global text defaults (body text is what matters most) citeturn2search6
#set text(
  font: serif,
  size: 10.5pt,          // 10–12 pt recommended for print citeturn2search6
  leading: 1.32,         // ≈ 130 % line‑spacing citeturn2search6
)

// Section headings — small caps, subtle
#show heading: set text(
  font: sans,
  size: 12pt,
  weight: 700,
  tracking: 20%,
  variant: "small-caps",
  align: left,
)

// Gentle bullet style
#let bullet-char = "•"    // round bullet, not the default ugly disc citeturn3view0
#show bullet-list: list(
  bullet: bullet(bullet-char),
  bullet-indent: 0.18in,
  indent: 0.18in,
  spacing: 3pt,
)

// ---- Header & footer -------------------------------------------------------
#page-header: center(top: 0.2in)[
  text(
    font: sans,
    variant: "small-caps",
    size: 9pt,
    weight: 300,
    tracking: 30%,
  )["RÉSUMÉ — PAGE " + page() + " OF " + pages()]
  rule(width: 100%, y: 8pt, stroke: 0.4pt)
]

#page-footer: align(center)[
  text(font: sans, size: 8pt)["© " + date().year + " Your Name"]
]

// ---- Building blocks -------------------------------------------------------
#let name-block(name, address, contacts) = align(center)[
  text(font: sans, size: 24pt, weight: 700, tracking: 15%, variant: "small-caps")[name]
  text(font: sans, size: 10pt, variant: "small-caps")[address]
  text(font: sans, size: 10pt, variant: "small-caps")[contacts]
  gap(0.25in)
]

#let resume-section(title)=[
  heading(title)
  gap(3pt)
  content()
]

#let resume-entry(institution, dates, role)=[
  line(
    align(left)[text(font: serif, variant: "small-caps")[institution]],
    align(right)[text(font: serif, variant: "small-caps")[dates]],
  )
  text(italic: role)
  content()
  gap(0.14in)
]

// ---- Example content (replace with your own) ------------------------------
#name-block(
  "TRIXIE B. ARGON",
  "5419 HOLLYWOOD BLVD STE C731, LOS ANGELES CA 90027",
  "(323) 555‑1435 • TRIXIEARGON@GMAIL.COM",
)

#resume-section("education")[
  #resume-entry("UCLA Anderson School of Management", "2011–13", "MBA")[
    bullet-list[
      "Cumulative GPA: 3.98",
      "Academic interests: real‑estate financing, corporations, money",
      "Henry Murtaugh Award",
    ]
  ]
  #resume-entry("Hartford University", "2003–07", "B.A. Economics")[
    bullet-list[
      "Summa cum laude",
      "Extensive coursework in Astrophysics, Statistics",
      "Van Damme Scholarship",
    ]
  ]
]

#resume-section("business experience")[
  #resume-entry("Boxer Bedley & Ball Capital Advisors", "2008–11", "Equity analyst")[
    bullet-list[
      "Performed independent research on numerous American industries, including:",
      "Steelmaking, croquet, semiotics, and butterscotch manufacturing",
      "Led company in equities analyzed in two quarters",
    ]
  ]
]

#resume-section("other work experience")[
  #resume-entry("Proximate Cause", "2007–08", "Assistant to the director")[
    bullet-list[
      "Helped devise fundraising campaigns for this innovative nonprofit",
      "Handled lunch orders and general errands",
    ]
  ]
  #resume-entry("Hot Topic", "2004–06", "Retail‑sales associate")[
    bullet-list[
      "Consistently exceeded sales targets",
      "Trained new team members in customer service",
    ]
  ]
]

// ---- End of template -------------------------------------------------------
