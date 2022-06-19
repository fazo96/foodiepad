const packageFiles = [
  {
    filename: "package.json",
    type: "json"
  },
]

module.exports = {
  noVerify: true,
  types: [
    { type: "feat", section: "Features"},
    { type: "fix", section: "Bug Fixes"},
    { type: "refactor", section: "Refactors"},
    { type: "perf", section: "Performance"},
    { type: "test", section: "Tests"},
    { type: "docs", section: "Documentation" },
    { type: "style", section: "Code Style" },
    { type: "wip", section: "Work in Progress" },
    { type: "deps", section: "Tech Stack" },
    { type: "ci", section: "CI Pipeline" },
    { type: "chore", hidden: true },
  ],
  packageFiles,
  bumpFiles: packageFiles,
}
