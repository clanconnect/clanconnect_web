import api from "./configureAxios";
import * as qs from "query-string";

export class ProjectService {
  static index({ query }) {
    return api.get(
      "/creators/projects?" + (query && qs.stringify(query)) || ""
    );
  }
}

export class CreativeService {
  static index({ query }) {
    return api.get(
      "/creators/creatives?" + (query && qs.stringify(query)) || ""
    );
  }
}
