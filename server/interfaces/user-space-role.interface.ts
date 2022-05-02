export interface IUserSpaceRole {
  id: number,
  userId: number,
  spaceId: number,
  roleId: number,
}

export interface IIncomingUserSpaceRole {
  user_id: number,
  space_id: number,
  role_id: number,
}
