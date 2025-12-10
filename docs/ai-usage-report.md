# AI Usage Report

Transparent log of where AI tools helped during Assignment 4 and how their output was reviewed before inclusion.

## Tools Used
- ChatGPT (GPT-5) for ideation, copy edits, and quick code reviews.
- GitHub Copilot for inline JavaScript/CSS suggestions while coding in VS Code.

## Assignment 4 (Final Polish)
- Prompt: "Rewrite the README for a final portfolio handoff with setup, testing, and deployment notes. Keep it concise and professional."
  - Output: A structured outline for the README.
  - Edits: Reworded several bullets for accuracy, replaced non-ASCII characters, and added repo-specific commands.
  - Learning: Clear prompts speed up documentation, but every command example must be verified against the actual project paths.
- Prompt: "Clean up corrupted characters in HTML/JS text labels and replace them with simple ASCII copy." 
  - Output: List of target strings to replace (menu icon, loading text, select placeholders).
  - Edits: Manually applied replacements and re-tested the UI so aria-live messaging still worked.
  - Learning: Keeping UI strings simple avoids encoding surprises across platforms.
- Prompt: "Suggest accessible defaults for star/favorite icons without pulling in an icon font."
  - Output: Use Unicode stars or HTML entities.
  - Edits: Implemented `\u2605`/`\u2606` and added aria state updates already present in the code.
  - Learning: Entities keep the source ASCII-only while preserving recognizable icons.

## Earlier Work (Assignments 1-3 Recap)
- Used ChatGPT and Copilot to brainstorm layout, ARIA attributes, filter/search logic, and the GitHub fetch/caching flow.
- Asked AI to outline the AI Career Coach dataset, then curated and rewrote the final JSON entries manually.
- Requested reduced-motion and accessibility best practices, then verified them in the testing plan.

## Responsible Use
- All AI outputs were reviewed, edited, and tested before committing.
- No generated code was accepted without understanding how it worked; logic was adjusted to match the project structure and course requirements.
