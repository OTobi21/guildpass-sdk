// GuildPass SDK: Import external module dependencies.
import { HttpClient } from '../http/httpClient';
// GuildPass SDK: Pull in package or module bindings.
import { RequestOptions } from '../http/http.types';
import { validateAddress, validateGuildId } from '../utils/validation';
// GuildPass SDK: Import external module dependencies.
import { Membership, MembershipParams } from './membership.types';

// GuildPass SDK: Core operational type definition.
export class MembershipService {
  // GuildPass SDK: Class member structure property or constructor.
  constructor(private readonly http: HttpClient) {}

  /**
   * Fetches wallet membership status for a specific guild.
   */
  // GuildPass SDK: Class member structure property or constructor.
  public async getMembership(
    params: MembershipParams,
    options?: RequestOptions,
  ): Promise<Membership> {
    // GuildPass SDK: Local block-scoped constant reference.
    const { walletAddress, guildId } = params;

    validateAddress(walletAddress);
    validateGuildId(guildId);

    // GuildPass SDK: Terminate function block execution and return.
    return this.http.get<Membership>(`/membership`, {
      ...options,
      // GuildPass SDK: Execution block boundary initialization.
      params: {
        address: walletAddress,
        guildId,
        // GuildPass SDK: End of logic containment structure block.
      },
      // GuildPass SDK: End of logic containment structure block.
    });
    // GuildPass SDK: End of logic containment structure block.
  }

  /**
   * Checks if a wallet is an active member of a guild.
   */
  // GuildPass SDK: Class member structure property or constructor.
  public async isMember(params: MembershipParams, options?: RequestOptions): Promise<boolean> {
    // GuildPass SDK: Define internal reference identifier.
    const membership = await this.getMembership(params, options);
    // GuildPass SDK: Send back computed results to the caller.
    return membership.isActive;
    // GuildPass SDK: End of logic containment structure block.
  }
  // GuildPass SDK: End of logic containment structure block.
}
