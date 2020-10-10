interface IUser {
  id : string,
  email : string,
  pwd : string,
  name : string,
  biography? : string,
  tag : string
}

export class User {

  id : string
  email : string
  pwd : string
  name : string
  biography? : string
  tag : string

    constructor(
      iuser? : IUser
    ) {
      }
  
  }