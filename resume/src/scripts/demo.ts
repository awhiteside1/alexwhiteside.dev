import e from '../dbschema/edgeql-js/index.ts'

e.insert(e.Jobs.JobPosting, {
  raw: "",
  title: "",
  url: ""
}).run