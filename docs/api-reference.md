# API Reference

## Import Paths

The SDK supports tree-shakeable subpath imports. You can import focused modules directly to minimize your bundle size:

- `@guildpass/sdk/client`: Main `GuildPassClient` class.
- `@guildpass/sdk/errors`: Error classes and codes (`GuildPassError`, `GuildPassErrorCode`).
- `@guildpass/sdk/utils`: Utility functions (`normaliseAddress`, `validateAddress`, `formatIsoDate`, etc.).
- `@guildpass/sdk/types`: TypeScript definitions.

You can also import everything from the root `@guildpass/sdk`.

## GuildPassClient

The main constructor.

```typescript
new GuildPassClient(config: GuildPassClientConfig)
```

### Methods

- `getConfig()`: Returns the current configuration.

---

## Access Module (`client.access`)

### `checkAccess(params: AccessCheckParams)`

Checks if a wallet can access a resource.

- **Returns**: `Promise<AccessCheckResult>`

### `checkAccessBatch(items: AccessCheckParams[], options?: AccessCheckBatchOptions)`

Checks access for multiple resources or wallets concurrently.

- **Returns**: `Promise<AccessCheckBatchResult[]>`

### `checkRoleAccess(params: RoleAccessCheckParams)`

Checks if a wallet has a specific role.

- **Returns**: `Promise<boolean>`

---

## Membership Module (`client.membership`)

### `getMembership(params: MembershipParams)`

Fetches detailed membership status.

- **Returns**: `Promise<Membership>`

### `isMember(params: MembershipParams)`

Quick check for active membership.

- **Returns**: `Promise<boolean>`

---

## Roles Module (`client.roles`)

### `getRoles(params: GetRolesParams)`

Fetches all roles for a guild.

- **Returns**: `Promise<GuildRole[]>`

### `getUserRoles(params: GetUserRolesParams)`

Fetches roles assigned to a user.

- **Returns**: `Promise<GuildRole[]>`

---

## Guilds Module (`client.guilds`)

### `getGuild(params: GetGuildParams)`

Fetches basic guild metadata.

- **Returns**: `Promise<Guild>`

### `getGuildConfig(params: GetGuildParams)`

Fetches full guild configuration.

- **Returns**: `Promise<GuildConfig>`
