import { useEffect, useState } from "react";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";

function Notes() {
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("dream-way-notes");
    if (stored) {
      setNotes(stored);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("dream-way-notes", notes);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-[#94a3b8]">
            Notes
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-white">
            Your learning notes
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            Capture insights, save ideas, and keep notes for every topic in one
            polished place.
          </p>
        </div>
        <div className="rounded-3xl bg-[#111827] px-4 py-3 text-sm text-muted">
          Organized and saved locally
        </div>
      </div>

      <Card className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-[#94a3b8]">
                Quick note
              </p>
              <p className="mt-2 text-sm text-muted">
                Type anything that helps you learn faster.
              </p>
            </div>
            <span className="rounded-3xl bg-[#111827] px-4 py-2 text-sm text-[#22c55e]">
              Draft mode
            </span>
          </div>

          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={10}
            className="w-full rounded-[1.5rem] border border-white/10 bg-[#111827] px-5 py-5 text-text outline-none transition duration-200 focus:border-[#6366f1] resize-none"
            placeholder="Write your note here..."
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
          <div className="text-sm text-muted">
            Your notes are stored locally on this device.
          </div>
          <Button
            variant="primary"
            className="w-full sm:w-auto"
            onClick={handleSave}
          >
            {saved ? "Saved" : "Save note"}
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Notes;
