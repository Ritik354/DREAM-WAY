import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";

const courses = [
  {
    title: "Frontend Engineering",
    description:
      "Modern web UI design with React, Tailwind, and accessibility best practices.",
    progress: 62,
  },
  {
    title: "Backend APIs",
    description:
      "Build scalable Node.js services with authentication and database design.",
    progress: 41,
  },
  {
    title: "DevOps Workflow",
    description:
      "Deploy your apps with confidence using Git, CI/CD, and cloud principles.",
    progress: 29,
  },
];

function Courses() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-[#94a3b8]">
            Courses
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-white">
            Your curated path
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            Browse premium courses built for the modern developer workflow.
          </p>
        </div>
        <Button variant="secondary">Create new course</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.title} className="space-y-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {course.title}
                </h2>
                <p className="mt-2 text-sm text-muted">{course.description}</p>
              </div>
              <div className="rounded-3xl bg-[#111827] px-3 py-2 text-sm text-[#22c55e]">
                {course.progress}%
              </div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#6366f1] to-[#22c55e]"
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <Button variant="ghost">Continue</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Courses;
