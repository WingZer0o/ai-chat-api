export class UserDBO {
  public email: string;
  public password: string;
  public tokenRsaPublicKey: string | null;

  constructor(
    email: string,
    password: string,
    tokenRsaPublicKey: string | null
  ) {
    this.email = email;
    this.password = password;
    this.tokenRsaPublicKey = tokenRsaPublicKey;
  }
}
