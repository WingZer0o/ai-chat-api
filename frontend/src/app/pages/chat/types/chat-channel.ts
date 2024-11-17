export class ChatChannel {
  public id: number;
  public name: string;
  public controlsVisible: boolean;
  public createdAt: number;
  public modifiedAt: number;

  constructor(
    id: number,
    name: string,
    controlsVisible: boolean,
    createdAt: number,
    modifiedAt: number
  ) {
    this.id = id;
    this.name = name;
    this.controlsVisible = controlsVisible;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
  }
}
