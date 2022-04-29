export interface IUser{
  id: number,
  email: string,
  emailVerified: boolean,
  username: string,
  pictureUrl: string,
  sub:string,
  createdAt: Date
}
