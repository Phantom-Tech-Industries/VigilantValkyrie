# Contributing to Vigilant Valkyrie

Thank you for helping connect female veterans with the resources they need.
The most valuable contributions are accurate, up-to-date organizations.

## Suggesting a resource without editing code

If you are not comfortable editing files, open an issue using the
**Resource request** template and we will add the organization for you.

## Adding or updating an organization

All resource content lives in [`data/resources.json`](data/resources.json).
To propose a change, open a pull request that edits that file.

Each organization is one object in the `organizations` array:

```json
{
  "id": "unique-kebab-case-id",
  "name": "Organization Name",
  "website": "https://example.org/",
  "websiteLabel": "example.org",
  "missionStatement": "One or two sentences describing the organization.",
  "notes": "Optional highlight, or null.",
  "description": "Optional longer description, or null.",
  "primaryLocation": "City, State or Nationwide",
  "tags": ["community", "mental-health"]
}
```

### Requirements

- `id`, `name`, `website`, `missionStatement`, and `primaryLocation` are required.
- `website` must start with `https://` and point to the organization's own site.
- Use `null` (not an empty string) for an absent `notes` or `description`.
- Keep `tags` lowercase and hyphenated (for example, `peer-support`).
- Verify the website opens before submitting.

## Crisis resources

The crisis banner is defined in
[`data/crisis-resources.json`](data/crisis-resources.json). Because these are
safety-critical, changes to it receive extra review. Only add nationally
recognized, 24/7 crisis lines.

## Checklist before opening a pull request

- [ ] The JSON is valid (no trailing commas, balanced brackets).
- [ ] All website URLs use `https://` and load correctly.
- [ ] No secrets, tokens, or personal information are included.
- [ ] The crisis banner still works if you changed `crisis-resources.json`.

Continuous integration validates the JSON and checks links automatically on
every pull request.
