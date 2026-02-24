(async () => {
  try {
    await import("./server.js"); // seu server atual (ESM)
  } catch (err) {
    console.error("[boot] failed to import server.js", err);
    process.exit(1);
  }
})();