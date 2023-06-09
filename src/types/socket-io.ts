import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Subscription } from 'rxjs';
import { ChatMessageEvent } from 'src/types/events/chat.events';
import { LocationEventEvent } from 'src/types/events/location.events';
import StatusEvent from './events/status.events';
import { Prisma, Session, User } from '@prisma/client';

export type SocketData = {
  sessionId: string;
  subscriptions: Subscription[];
};

export interface ServerToUserEvents {
  'location-tracking': (isTrackingLocation: boolean) => void;
  'chat-message': (msg: ChatMessageEvent) => void;
  nickname: (nick: string) => void;
  session: (session: Partial<Session & { user?: Partial<User> }>) => void;
}

export interface ServerToAdminEvents {
  'chat-message': (msg: ChatMessageEvent) => void;
  'locations-update': (batch: LocationEventEvent[]) => void;
  status: (status: StatusEvent) => void;
}

export interface ServerToVolunteerEvents {
  'location-tracking': (isTrackingLocation: boolean) => void;
  'chat-message': (msg: ChatMessageEvent) => void;
  user: (user: Partial<Session & { user?: Partial<User> }>) => void;
  status: (status: StatusEvent) => void;
}

export type UserSocket = Socket<
  DefaultEventsMap,
  ServerToUserEvents,
  DefaultEventsMap,
  SocketData
>;

export type AdminSocket = Socket<
  DefaultEventsMap,
  ServerToAdminEvents,
  DefaultEventsMap,
  SocketData
>;

export type VolunteerSocket = Socket<
  DefaultEventsMap,
  ServerToVolunteerEvents,
  DefaultEventsMap,
  SocketData
>;

export type CustomServer = Server<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  SocketData
>;
