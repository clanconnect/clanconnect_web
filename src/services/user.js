import api from "./configureAxios";

export class UserService {
  static index() {
    return api.get("/users/profile");
  }
}
