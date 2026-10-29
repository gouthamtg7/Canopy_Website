---
title: Views and Changes
description: Exploring architecture slices, filtering graph views, and tracking visual diffs between commits.
slug: views-and-changes
order: 3
---

# Views and Changes

Canopy provides multiple lenses to examine your codebase depending on the question you need to answer.

---

## 1. Graph Views

### Architectural Overview
Displays high-level subsystems (UI layer, API routers, database entities, background workers) and their interconnecting traffic. Ideal for onboarding new engineers and architectural reviews.

### Endpoint-Centric View
Groups the entire application around API routes and entrypoints. Clicking an endpoint expands all downstream execution paths down to the underlying SQL queries or MongoDB collections touched.

### Component Dependency Tree
Focuses on UI components, React hooks, and shared client libraries, identifying cycles, circular imports, and deep prop-drilling trees.

---

## 2. Tracking Changes (Visual Git Diffs)

When refactoring or reviewing large pull requests, looking at raw unified diffs (`git diff`) doesn't show ripple effects across distant modules.

Canopy integrates directly with git to compute visual diff maps:

```bash
# Compare working tree against main branch
canopy diff --base main

# Compare two explicit commit hashes
canopy diff --base e9f22a1 --head 8c1c4b9
```

### Visual Diff Indicators
- **Green Nodes/Edges**: Newly added functions, endpoints, or dependencies.
- **Red Nodes/Edges**: Removed symbols or dead dependencies.
- **Amber Nodes**: Modified internal logic with unchanged signatures.
- **Blue Ripple Pulse**: Unchanged files that directly consume a modified symbol, highlighting where downstream regression testing is required.

---

## 3. Filtering and Focus Mode

Use the canvas filter bar to isolate subgraphs:
- `tag:auth`: Only show nodes connected to authentication.
- `depth:3`: Restrict view to 3 degrees of separation from selected node.
- `confidence:exact`: Hide inferred edges to focus on explicit relationships.
- `hide:external`: Omit `node_modules` and external vendor calls.
