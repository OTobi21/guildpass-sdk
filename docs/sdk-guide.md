# SDK Guide

This guide covers advanced usage and patterns for the GuildPass SDK.

## Error Handling

The SDK uses a custom `GuildPassError` class. You should always wrap SDK calls in try-catch blocks.

```typescript
import { GuildPassClient, GuildPassErrorCode } from "@guildpass/sdk";

try {
  await client.access.checkAccess({...});
} catch (error) {
  if (error instanceof GuildPassError) {
    switch (error.code) {
      case GuildPassErrorCode.UNAUTHORISED:
        // Handle invalid API key
        break;
      case GuildPassErrorCode.NOT_FOUND:
        // Handle missing guild or resource
        break;
      case GuildPassErrorCode.TIMEOUT:
        // Handle network timeout
        break;
    }
  }
}
```

## Environment Support

### Node.js

The SDK works in Node.js 18+. If you are on an older version, you may need to polyfill `fetch`.

### Browser

The SDK is tree-shakeable and optimized for modern browsers. It does not include any Node-only dependencies.

## Address Normalization

The SDK automatically normalizes addresses to lowercase for consistency. You can also use the exported utility:

```typescript
import { normaliseAddress } from '@guildpass/sdk';

const clean = normaliseAddress('0xABC...');
```

## Timeouts

The default timeout is 10 seconds. You can override this globally or per request (in future versions):

```typescript
const client = new GuildPassClient({
  apiUrl: '...',
  timeoutMs: 5000, // 5 seconds
});
```

## Retry Policy

By default the SDK makes a single attempt and throws on failure. You can enable automatic retries with exponential backoff via the `retry` option.

### Global configuration

```typescript
const client = new GuildPassClient({
  apiUrl: 'https://api.guildpass.xyz',
  retry: {
    maxRetries: 3,        // number of retries after the initial attempt
    baseDelayMs: 200,     // starting backoff delay, doubles each attempt
    maxDelayMs: 5000,     // backoff ceiling
    retryableStatuses: [429, 500, 502, 503, 504], // default
  },
});
```

### Per-request override

Pass `retry` inside any request options to override the global policy for that call:

```typescript
const data = await client.access.checkAccess(params, {
  retry: { maxRetries: 1 },
});
```

### Defaults and safe usage

| Option | Default | Notes |
| :--- | :--- | :--- |
| `maxRetries` | `0` | Set to `0` to disable retries entirely. |
| `baseDelayMs` | `200` | Backoff starts here and doubles each attempt. |
| `maxDelayMs` | `5000` | Backoff will never exceed this value. |
| `retryableStatuses` | `[429, 500, 502, 503, 504]` | 4xx errors other than 429 are not retried. |
| `allowMutatingRetry` | `false` | POST/PUT/PATCH/DELETE are **not** retried unless this is `true`. |

The SDK respects the `Retry-After` response header on 429 responses, waiting the server-specified duration before retrying rather than using the computed backoff.

Non-idempotent methods (POST, PATCH) are never retried unless you explicitly set `allowMutatingRetry: true`. Only enable this when you are certain the operation is safe to repeat.
