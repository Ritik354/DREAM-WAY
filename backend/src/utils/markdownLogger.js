import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logDirectory = path.join(__dirname, "..", "..", "progress-logs");
const logFilePath = path.join(logDirectory, "phase-completions.md");

const ensureLogDirectory = async () => {
  try {
    await fs.mkdir(logDirectory, { recursive: true });
  } catch (error) {
    console.error("Unable to create progress log directory:", error);
  }
};

const ensureLogFile = async () => {
  try {
    await ensureLogDirectory();
    await fs.access(logFilePath);
  } catch (error) {
    const header = "# Phase Completion Log\n\n";
    await fs.writeFile(logFilePath, header, "utf8");
  }
};

const formatLogEntry = ({
  userId,
  roadmapTitle,
  moduleTitle,
  topicTitle,
  totalTopics,
  completedAt,
}) => {
  return `## Phase completed\n
- **User ID:** ${userId}\n- **Roadmap:** ${roadmapTitle}\n- **Phase / Module:** ${moduleTitle}\n- **Topic completed:** ${topicTitle}\n- **Total topics in module:** ${totalTopics}\n- **Completed at:** ${completedAt.toISOString()}\n\n`;
};

export const appendPhaseCompletionEntry = async (entry) => {
  try {
    await ensureLogFile();
    const logEntry = formatLogEntry(entry);
    await fs.appendFile(logFilePath, logEntry, "utf8");
  } catch (error) {
    console.error("Unable to write progress markdown log:", error);
  }
};
