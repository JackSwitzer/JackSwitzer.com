# Shared Convex Setup

This project uses the **Herd Convex** deployment.

**Deployment:** dev:third-bass-320
**URL:** https://third-bass-320.convex.cloud

## Adding Tables

To add tables for this project:
1. Edit: ~/.claude/command-center/convex/schema.ts
2. Add namespaced tables (e.g., personalWebsite_projects)
3. Run: cd ~/.claude/command-center && bunx convex dev

## Accessing Data

```typescript
import { useQuery } from 'convex/react';
import { api } from 'convex/_generated/api';

// Use Herd's generated API
const data = useQuery(api.yourTable.yourQuery);
```

All types are generated in: ~/.claude/command-center/convex/_generated/
