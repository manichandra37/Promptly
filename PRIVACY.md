# Promptly — Privacy Policy

_Last updated: July 17, 2026_

Promptly is a Chrome extension that shows a live token estimate for LLM
prompts and can optionally rewrite ("optimize") a prompt when you click the
optimize button.

## What data is processed

- **Prompt text (only when you click the optimize button).** The text in the
  chat input box is sent over HTTPS to the Groq API
  (`https://api.groq.com`) so it can be rewritten. This happens only on an
  explicit click — never automatically while you type.
- **Your Groq API key.** Stored locally in your browser using
  `chrome.storage.local`. It is sent only to `api.groq.com` in the
  `Authorization` header of the requests you trigger. It never leaves your
  machine otherwise.
- **Token counting is fully local.** The live token estimate is computed in
  your browser; no text is transmitted while you type.

## What is NOT collected

- No analytics, telemetry, or tracking of any kind.
- No browsing history.
- No personal information.
- Nothing is stored on any server operated by this extension. The extension
  has no server.

## Data sharing

Prompt text you explicitly choose to optimize is shared only with Groq, the
API provider that performs the rewrite. Their handling of that data is
governed by the [Groq privacy policy](https://groq.com/privacy-policy/).
No data is sold, shared with data brokers, or used for advertising.

## Limited Use disclosure

Promptly's use of user data complies with the Chrome Web Store User Data
Policy, including the Limited Use requirements: data is used solely to
provide the extension's single, user-facing purpose (prompt token counting
and prompt optimization), is never sold, and is never used for advertising
or creditworthiness purposes.

## Changes

If data handling ever changes, this policy will be updated and the change
will be disclosed prominently in the extension before it takes effect.

## Contact

Questions? Open an issue at
[github.com/manichandra37/Promptly](https://github.com/manichandra37/Promptly/issues).
