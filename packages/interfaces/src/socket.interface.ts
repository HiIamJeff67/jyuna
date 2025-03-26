import { Socket } from "socket.io";
import { UserPlanType, UserRoleType, UserStatusType } from "@repo/types";

export interface SocketMetaPayloadInterface {
  userName: string;
  status: UserStatusType;
  role: UserRoleType;
  plan: UserPlanType;
  socket: Socket;
}
