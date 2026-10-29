# Privacy

Analysis runs locally using Tree-sitter. Canopy stores analysis state in `~/.canopy/store`, outside the repository.

## Engine telemetry

Tier 0 is enabled by default: crash events, CLI command invocations, Node runtime version, and anonymized execution time buckets. It excludes paths, repository names, code, commit messages, usernames, and environment variables. Tier 1 diagnostic stack traces are opt-in.

Disable telemetry with `canopy telemetry off`, `CANOPY_TELEMETRY=0`, or `DO_NOT_TRACK=1`.

## Ask AI

Canopy uses your own provider keys or subscription. Review the provider's data practices before sharing context with an AI provider.

## Website forms

Submitted waitlist details and feedback are stored in MongoDB when the service is available. If storage is unavailable, the form reports failure and does not claim your information was saved. Website access logs include request metadata; avoid putting personal information in URLs.

TODO(founder): supply the data controller, privacy contact, retention period, hosting details, and deletion-request procedure before public launch.
