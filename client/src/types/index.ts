export interface JWTTokenPayload {
  user: {
    id: number;
    username: string;
    isAdmin: boolean;
  };
}
