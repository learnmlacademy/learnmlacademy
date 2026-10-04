// Reading order, not curriculum order. Every existing section, table and figure
// is placed once beside the explanation it supports; lesson data stays intact.
type ReadingBlock = `section:${number}` | `table:${number}` | `visual:${number}` | "process" | "worked";
type ReadingFlow = { introduction: string; process: string; blocks: ReadingBlock[] };

export const agenticReadingFlow: Record<string, ReadingFlow> = {
  "agentic-ai-intro": {
    introduction: "From answering a question to carrying out a task",
    process: "Follow one bounded agent run",
    blocks: ["section:0", "process", "visual:0", "table:0", "section:1", "visual:1"],
  },
  "tool-calling": {
    introduction: "How a model asks software to do something",
    process: "From a proposed tool call to a verified receipt",
    blocks: ["section:0", "visual:0", "table:0", "process", "section:1", "worked", "table:1", "visual:1"],
  },
  "agent-context-engineering": {
    introduction: "Choose what the agent needs for its next decision",
    process: "Assemble a context packet without mixing trust levels",
    blocks: ["section:0", "process", "visual:0", "table:0", "section:1", "worked", "visual:1"],
  },
  "agent-memory": {
    introduction: "What an agent should remember—and when it should forget",
    process: "Write, retrieve and retire a memory",
    blocks: ["section:0", "table:0", "table:1", "process", "visual:0", "worked", "visual:1"],
  },
  "planning-reflection": {
    introduction: "Turn a goal into actions that can be checked",
    process: "Plan, act, observe and decide whether to continue",
    blocks: ["section:0", "table:0", "process", "visual:0", "worked", "table:1", "visual:1"],
  },
  "agent-state-graphs": {
    introduction: "Make the agent's possible next steps explicit",
    process: "Move between states through checked transitions",
    blocks: ["section:0", "table:0", "process", "visual:0", "visual:1"],
  },
  "durable-long-running-agents": {
    introduction: "Keep a task safe across pauses, approvals and failures",
    process: "Checkpoint, wait and resume from recorded state",
    blocks: ["section:0", "process", "visual:0", "table:0", "worked", "table:1", "visual:1"],
  },
  "agentic-rag": {
    introduction: "When retrieval needs more than one search",
    process: "Retrieve, judge the evidence and choose the next search",
    blocks: ["section:0", "table:0", "visual:0", "process", "section:1", "visual:1", "worked"],
  },
  "building-ai-agent": {
    introduction: "Build a small documentation agent with a clear stopping rule",
    process: "Connect the goal, approved tool and stopping condition",
    blocks: ["section:0", "table:0", "process", "visual:0", "section:1", "worked"],
  },
  "multi-agent-systems": {
    introduction: "Divide work without losing control of the result",
    process: "Delegate a task and check what comes back",
    blocks: ["section:0", "table:0", "visual:0", "process", "visual:1", "table:1"],
  },
  "model-context-protocol": {
    introduction: "Connect an agent application to tools through a shared protocol",
    process: "Discover a capability, request it and handle the response",
    blocks: ["section:0", "visual:0", "table:0", "process", "worked", "table:1", "visual:1"],
  },
  "agent-frameworks": {
    introduction: "Choose a framework from the control your application needs",
    process: "Compare frameworks against the same task",
    blocks: ["section:0", "visual:0", "table:0", "table:1", "section:1", "section:2", "process", "visual:1", "table:2", "worked"],
  },
  "browser-computer-use-agents": {
    introduction: "Let an agent operate an interface within a safe boundary",
    process: "Observe the page, take one action and verify the change",
    blocks: ["section:0", "table:0", "process", "visual:0", "visual:1"],
  },
  "agent-security": {
    introduction: "Keep untrusted information from becoming authority",
    process: "Check authority before an action and recover safely afterward",
    blocks: ["section:0", "table:0", "visual:0", "table:1", "process", "section:1", "visual:1"],
  },
  "agent-evaluation-safety": {
    introduction: "Evaluate both the outcome and the actions used to reach it",
    process: "Test the complete trajectory against explicit criteria",
    blocks: ["section:0", "table:0", "process", "visual:0", "worked", "table:1"],
  },
  "agent-observability-deployment": {
    introduction: "Make an agent's behaviour visible before releasing it",
    process: "Trace a run from the user request to its final outcome",
    blocks: ["section:0", "process", "visual:0", "table:0", "section:1", "worked", "visual:1", "table:1"],
  },
};
