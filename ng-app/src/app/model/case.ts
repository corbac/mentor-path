interface IAuthor{
  id: string,
  title: string
}

interface IConfig {
  x: number,
  y: number,
  width: number,
  height: number,
  size: string,
  type: string
}

interface ILink{
  url: string,
  title: string
}

interface ICase{
  title: string,
  descriptio: string,
  links: Array<ILink>,
  config: IConfig,
  children: Array<ICase>
}

interface IRoadmap{
  root_case : ICase,
  author : IAuthor
}

export class Case{
  title: string
  description: string
  links: Array<ILink>
  config: IConfig
  children: Array<ICase>

  constructor(
    ca? : ICase
  ){
  }

}

export class Roadmap {
  root_case : ICase
  author : IAuthor

    constructor(
      roadmap? : IRoadmap
    ) {
      }
  
  }