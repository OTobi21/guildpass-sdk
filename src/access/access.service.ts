// GuildPass SDK: Import external module dependencies.
import { HttpClient } from '../http/httpClient';
// GuildPass SDK: Pull in package or module bindings.
import { RequestOptions } from '../http/http.types';
import {
  validateAddress,
  validateGuildId,
  validateResourceId,
  validateRoleId,
} from '../utils/validation';
// GuildPass SDK: Import external module dependencies.
import { AccessCheckParams, AccessCheckResult, RoleAccessCheckParams } from './access.types';

// GuildPass SDK: Exported component definition.
export class AccessService {
  // GuildPass SDK: Class member structure property or constructor.
  constructor(private readonly http: HttpClient) {}

  /**
   * Checks whether a wallet has access to a gated resource.
   */
  // GuildPass SDK: Class member structure property or constructor.
  public async checkAccess(
    params: AccessCheckParams,
    options?: RequestOptions,
  ): Promise<AccessCheckResult> {
    // GuildPass SDK: Variable binding initialization.
    const { walletAddress, guildId, resourceId } = params;

    validateAddress(walletAddress);
    validateGuildId(guildId);
    validateResourceId(resourceId);

    // GuildPass SDK: Return evaluated output value.
    return this.http.get<AccessCheckResult>(`/access/check`, {
      ...options,
      // GuildPass SDK: Execution block boundary initialization.
      params: {
        address: walletAddress,
        guildId,
        resourceId,
        // GuildPass SDK: End of logic containment structure block.
      },
      // GuildPass SDK: End of logic containment structure block.
    });
    // GuildPass SDK: End of logic containment structure block.
  }

  /**
   * Checks whether a wallet has a specific role in a guild.
   */
  // GuildPass SDK: Class member structure property or constructor.
  public async checkRoleAccess(
    params: RoleAccessCheckParams,
    options?: RequestOptions,
  ): Promise<boolean> {
    // GuildPass SDK: Local block-scoped constant reference.
    const { walletAddress, guildId, roleId } = params;

    validateAddress(walletAddress);
    validateGuildId(guildId);
    validateRoleId(roleId);

    // GuildPass SDK: Define internal reference identifier.
    const result = await this.http.get<{ hasRole: boolean }>(`/access/role-check`, {
      ...options,
      // GuildPass SDK: Execution block boundary initialization.
      params: {
        address: walletAddress,
        guildId,
        roleId,
        // GuildPass SDK: End of logic containment structure block.
      },
      // GuildPass SDK: End of logic containment structure block.
    });

    // GuildPass SDK: Terminate function block execution and return.
    return result.hasRole;
    // GuildPass SDK: End of logic containment structure block.
  }
  // GuildPass SDK: End of logic containment structure block.
}
