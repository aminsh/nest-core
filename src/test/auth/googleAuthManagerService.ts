import { AuthGoogleManagerService, GoogleUserProfile } from '../../auth';

export class GoogleTestAuthManagerService implements AuthGoogleManagerService<any> {
  findOrCreateUser(profile: GoogleUserProfile): Promise<any> {
    return Promise.resolve({
      id: 1,
      email: profile.emails[0]
    });
  }

  beforeAuthentication(options: any): void {
  }
}
