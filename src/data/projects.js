// data/projects.js
//
// Shape reference for each project object.
// Add / edit projects here — both the list page and detail page read from this file.
//
// {
//   slug: "unique-url-safe-id",     // used in the route: /projects/:slug
//   title: "Project Name",
//   subtitle: "One-line role or category",
//   summary: "1-2 sentence summary shown on the card in the list view.",
//   date: "Jan 2025 – Mar 2025",    // or a single date, whatever reads best
//   technologies: ["React", "Node.js", "PostgreSQL"],
//   thumbnail: "/media/project/cover.jpg",   // shown in the list view
//   media: [                         // full gallery, shown on the detail page
//     { src: "/media/project/1.jpg", label: "Dashboard view" },
//   ],
//   problem: "What problem existed and why it needed solving.",
//   development: [                   // how it was built — bullet list or paragraphs
//     "Started with a spike to validate the approach.",
//     "Built the core pipeline, then layered the UI on top.",
//   ],
//   impact: [
//     "Reduced processing time by 40%.",
//   ],
//   whatILearned: [
//     "Learned how to profile and optimize database queries under load.",
//   ],
// }

export const projects = [
  {
    slug: "example-project",
    title: "Example Project",
    subtitle: "Full-stack web app",
    summary: "A short, punchy summary of what this project is and who it's for.",
    date: "Jan 2025 – Mar 2025",
    technologies: ["React", "Node.js", "PostgreSQL"],
    thumbnail: "/media/example-project/cover.jpg",
    media: [
      { src: "/media/example-project/1.jpg", label: "Dashboard view" },
      { src: "/media/example-project/2.jpg", label: "Mobile layout" },
    ],
    problem:
      "Describe the problem or gap that motivated the project — what wasn't working, or what didn't exist yet.",
    development: [
      "Describe how the project came together: the approach, key decisions, and any pivots along the way.",
      "Mention notable technical challenges and how you solved them.",
    ],
    impact: [
      "Quantify the outcome where you can — usage, performance, revenue, time saved.",
    ],
    whatILearned: [
      "Name the concrete skill or lesson you took away from building this.",
    ],
  },
]
