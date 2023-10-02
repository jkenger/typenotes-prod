export interface IChildren {
  children: React.ReactNode | React.ReactNode[];
}

export interface INote {
  _id: string;
  user?: { username: string };
  title: string;
  text: string;
  completed?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface INoteResult {
  data?: {
    data: string;
  };
  error?: {
    data: {
      error: string;
    };
  };
}

// User Types
export interface IUser {
  active: true;
  roles: string[];
  _id: string;
  username: string;
  password?: string;
}

export interface IUserResult {
  data?: {
    data: string;
  };
  error?: {
    data: {
      error: string;
    };
  };
}

export interface IRefreshResult {
  data?: {
    data: string;
  };
  error?: {
    status: number;
    data: {
      error: string;
    };
  };
}

export type TToken = {
  token: string;
};

export interface IAuth {
  auth: TToken;
}

export interface IUserInfo {
  id: string;
  username: string;
  roles: string[];
}

export interface IDecodedToken {
  userInfo: IUserInfo;
}

export interface RefreshResult {
  data: {
    accessToken: string;
  };
  error: string;
}

// enums
export enum Keys {
  ESCAPE = "Escape",
}
export enum UserRoles {
  EMPLOYEE = "Employee",
  ADMIN = "Admin",
  MANAGER = "Manager",
}

export enum HTTPMethods {
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  GET = "GET",
}
export enum TagTypes {
  NOTE = "Note",
  USER = "User",
}

export enum Links {
  HOME = "/",
  LOGIN = "/login",
  DASHBOARD = "/dashboard",
  USERS = "/dashboard/users",
  NOTES = "/dashboard/notes",
}

export enum SocialLinks {
  GITHUB = "https://github.com/jkenger",
}
