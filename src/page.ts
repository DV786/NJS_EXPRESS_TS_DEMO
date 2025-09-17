import { User } from "./user";
import { injectable, inject } from "inversify";

@injectable()
export class Page {
  constructor(@inject(User) private user: User) { }

  public createPage(url: string) {
    return {
      pageUrl: url,
      user: this.user
    }
  }
}