import { AuthUserSerializationService } from '../../auth';

export class UserSerializationService implements AuthUserSerializationService<User> {
  transform(user: User) {
    return user
  }
}

interface User {
  id: number;
  email: string;
}
