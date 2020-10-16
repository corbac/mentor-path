interface IAuthor{
  id : string,
  title : string
}

interface IConfig {
  x: number,
  y: number,
  width: number,
  height: number,
  size: string,
  type: string
}

interface ICase{
  title : string,
  config : IConfig,
  children : Array<ICase>
}

interface IRoadmap{
  root_case : ICase,
  author : IAuthor,
}

export class Roadmap {
  root_case : ICase
  author : IAuthor

    constructor(
      roadmap? : IRoadmap
    ) {
      }
  
  }