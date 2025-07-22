#import "../packages/resume.typ"
#import "../packages/data.typ" as Data

#let data = Data.load("../data")

#show: resume.resume.with(
  author: data.name,
  location: data.location,
  contacts: (data.email),
)

// Experience
= Experience

#for organization in data.experience {

  for position in organization.positions {
    resume.exp(
      title: position.position,
      organization: organization,
      date: position.startDate + " - " + position.endDate,
      location: organization.location,
      details: position.highlights,
    )
  }
}


#Data.DebugData(data)
