#import "../packages/resume.typ"
#import "../packages/data.typ" as Data

#let data = Data.load("../data")

#show: resume.resume.with(
  author: data.name,
  location: data.location,
  contacts: (data.email)
)

// Experience
= Experience

#for organization in data.experience {

 for position in organization.positions {

resume.exp(
  title: position.position,
  organization: organization.organization,
  date: position.startDate + " - " + position.endDate,
  location: organization.location,
  details: [
    - Designed and deployed a real-time telemetry pipeline for edge network routers using Go and Protobuf.
    - Developed high-throughput sync agents across distributed nodes using gRPC and Redis streams.
    - Created Verilog modules to validate MAC-level packet timings on custom FPGA NICs for load testing.
  ]
)
 }
}


#Data.DebugData(data)