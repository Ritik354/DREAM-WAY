import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";

const bookmarks = [
  {
    title: "React Router deep dive",
    subtitle: "Current lesson",
    tag: "Frontend",
  },
  {
    title: "API authentication pattern",
    subtitle: "Back-end reference",
    tag: "Backend",
  },
  {
    title: "Responsive dashboard design",
    subtitle: "UI inspiration",
    tag: "Design",
  },
];

function Bookmarks() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-[#94a3b8]">
            Bookmarks
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-white">
            Saved lessons
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            Pin the topics you want to revisit later and pick up your pace from
            where you left off.
          </p>
        </div>
        <Button variant="secondary">Manage bookmarks</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {bookmarks.map((item) => (
          <Card key={item.title} className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm text-muted">{item.subtitle}</p>
              </div>
              <span className="rounded-3xl bg-[#111827] px-3 py-2 text-sm text-[#94a3b8]">
                {item.tag}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <Button variant="ghost">Resume</Button>
              <Button variant="secondary">Remove</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Bookmarks;
