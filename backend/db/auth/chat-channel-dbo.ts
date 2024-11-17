export class ChatChannelDBO {
  id?: number;
  channelName: string;
  createdAt: number;
  modifiedAt: number;

  constructor(
    id: number,
    channelName: string,
    createdAt: number,
    modifiedAt: number
  ) {
    this.id = id;
    this.channelName = channelName;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
  }
}
