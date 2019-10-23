import { pbkdf2Sync } from 'crypto';
import { farmersService } from '../farmer/farmers.service';
import { TokenInfo, tokensService } from './tokens.service';

export async function authenticate({
  userId,
  password
}: {
  userId: string;
  password: string;
}): Promise<TokenInfo> {
  const farmer = farmersService.getFarmer({ farmerId: userId });

  const passwordHash = pbkdf2Sync(
    password,
    userId,
    1000,
    32,
    'sha512'
  ).toString('base64');

  if (farmer == null || farmer.passwordHash !== passwordHash) {
    return null;
  }

  return tokensService.create({ userId });
}
