export class ChatChannel {
  public id!: string;
  public name!: string;
  public controlsVisible!: boolean;

  constructor(id: string, name: string, controlsVisible: boolean) {
    this.id = id;
    this.name = name;
    this.controlsVisible = controlsVisible;
  }
}
