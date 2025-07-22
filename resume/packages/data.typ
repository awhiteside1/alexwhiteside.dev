#import "utils.typ" as Utils

#let load(path) = {
  let resolve(file) = {
   let p= (path, file).join("/")
   return yaml(p)
  }
  let personal = resolve("personal.yaml")
  let work = resolve("work.yaml")
  let projects = resolve("projects.yaml")
  return personal+work+projects
}

#import "@preview/codly:1.3.0": *
#import "@preview/codly-languages:0.1.1": *
#show: codly-init.with()
#codly(languages: codly-languages)

#let DebugData(data)={
  
  let string = "```YAML\n"+yaml.encode(data)+"```\n"
  return pagebreak()+eval(string)
}