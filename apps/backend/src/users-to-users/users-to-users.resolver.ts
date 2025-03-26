/* =============== Main Libraries =============== */
import { Resolver } from '@nestjs/graphql';
/* =============== Main Libraries =============== */

/* =============== Module Dependencies =============== */
import { UsersToUsersService } from './users-to-users.service';
/* =============== Module Dependencies =============== */

@Resolver()
export class UsersToUsersResolver {
  constructor(private readonly usersToUsersService: UsersToUsersService) {}
}
