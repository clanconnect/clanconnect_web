import api, {
  axiosInstanceMediaUpload as apiMediaUpload,
} from "./configureAxios";
import * as qs from "query-string";

export class ProjectService {
  static index({ query }) {
    return api.get(
      "/creators/projects?" + (query && qs.stringify(query)) || ""
    );
  }
}

export class ProjectServiceById {
  static index({ query,id }) {
    return api.get(
      `/creators/projects/${id}?` + (query && qs.stringify(query)) || ""
    );
  }
}

export class CreativeService {
  static index({ query }) {
    return api.get(
      "/creators/creatives/by-projects?" + (query && qs.stringify(query)) || ""
    );
  }
  
  static byProjectId({ query, id}) {
    return api.get(
      `/creators/creatives/by-projects/${id}?` + (query && qs.stringify(query)) || ""
    );
  }

  static addNew({ query, body }) {
    return api.post(
      "/creators/creatives?" + (query && qs.stringify(query)) || "",
      body
    );
  }

  static update({ query, body, path }) {
    return api.patch(
      `/creators/creatives/${path.id}?` + (query && qs.stringify(query)) || "",
      body
    );
  }

  static updateAttachments({ query, body, path }) {
    return api.patch(
      `/creators/creatives/${path.id}/attachments?` +
        (query && qs.stringify(query)) || "",
      body
    );
  }

  static getAll({ query }) {
    return api.get(
      "/creators/creatives?" + (query && qs.stringify(query)) || ""
    );
  }

  static bulkDelete({ query, body }) {
    return api.post(
      `/creators/creatives/bulk-delete?` + (query && qs.stringify(query)) || "",
      body
    );
  }
}

export class YoutubeService {
  static index({ query }) {
    // /creators/socials/youtube?creativeId=6043533e6d206f62c8236b71
    console.log("query===.>", query);
    return api.get(
      "/creators/socials/youtube?" + (query && qs.stringify(query)) || ""
    );
  }
  static addNewOrUpdate({ body }) {
    // /creators/socials/youtube/schedule
    return api.post("/creators/socials/youtube/schedule", body);
  }
  static cancel({ query }) {
    // /creators/socials/youtube/cancel?socialId=60a398a099458eb97c58b076
    return api.patch(
      "/creators/socials/youtube/cancel?" + (query && qs.stringify(query)) || ""
    );
  }
  static finalApprove({ query }) {
    // /creators/socials/youtube/approve?socialId=60a398a099458eb97c58b076
    return api.patch(
      "/creators/socials/youtube/approve?" + (query && qs.stringify(query)) ||
        ""
    );
  }
  static getCategories({ query }) {
    // /creators/socials/youtube/categories?regionCode=IN
    return api.get(
      "/creators/socials/youtube/categories?" +
        (query && qs.stringify(query)) || ""
    );
  }
}

export class InstagramService {
  static index({ query }) {
    // /creators/socials/instagram?creativeId=6043533e6d206f62c8236b71
    return api.get(
      "/creators/socials/instagram?" + (query && qs.stringify(query)) || ""
    );
  }
  static addNewOrUpdate({ body }) {
    // /creators/socials/instagram/schedule
    return api.post("/creators/socials/instagram/schedule", body);
  }
  static cancel({ query }) {
    // /creators/socials/instagram/cancel?socialId=60a398a099458eb97c58b076
    return api.patch(
      "/creators/socials/instagram/cancel?" + (query && qs.stringify(query)) ||
        ""
    );
  }
  static finalApprove({ query }) {
    // /creators/socials/instagram/approve?socialId=60a398a099458eb97c58b076
    return api.patch(
      "/creators/socials/instagram/approve?" + (query && qs.stringify(query)) ||
        ""
    );
  }
}

export class UserService {
  static fetchFbPages() {
    // /users/fb-pages
    return api.get("/users/fb-pages");
  }
  static fetchIgUserId({ path }) {
    // /users/fb-pages/:fbId/ig-user-id
    return api.get(`/users/fb-pages/${path.fbId}/ig-user-id`);
  }
}
export class MediaService {
  static async uploadMultiple(files, setProgress) {
    const uploadUrls = await api.get(
      "/creators/media/upload-url?" + qs.stringify({ n: files.length })
    );

    const urls = uploadUrls.data;
    const uploadFile = async (url, file, meta) => {
      try {
        await apiMediaUpload.put(url.url, file.originFileObj, {
          headers: { "content-type": file.mimeType },
          onUploadProgress: (e) => {
            setProgress(file.uid, Math.floor((e.loaded / e.total) * 100));
          },
        });

        const res = await api.post("/creators/media/register", {
          meta,
          key: url.key,
          originalName: file.originFileObj.name,
        });

        return { server: res.data, local: file };
      } catch (e) {
        console.log(e);
      }
    };

    const uploadImage = async (url, file) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        const that = this;
        console.log(that);
        img.onload = async function () {
          var sizes = { width: this.width, height: this.height };
          URL.revokeObjectURL(this.src);
          resolve(
            await uploadFile(url, file, { ...sizes, mimeType: file.type })
          );
        };

        const objectURL = URL.createObjectURL(file.originFileObj);
        img.src = objectURL;
      });
    };

    const uploadVideo = async (url, file) => {
      return new Promise((resolve) => {
        const video = document.createElement("video");
        video.addEventListener(
          "loadedmetadata",
          function () {
            const meta = {
              width: this.videoWidth,
              height: this.videoHeight,
              mimeType: file.type,
              duration: parseInt(this.duration),
            };
            URL.revokeObjectURL(this.src);
            resolve(uploadFile(url, file, { ...meta }));
          },
          false
        );

        video.src = URL.createObjectURL(file.originFileObj);
      });
    };

    const promises = [];
    for (const index in urls) {
      const file = files[index];
      console.log(file.type);
      if (file.type.includes("image/")) {
        promises.push(uploadImage(urls[index], file));
      } else if (file.type.includes("video/")) {
        promises.push(uploadVideo(urls[index], file));
      } else {
        promises.push(uploadFile(urls[index], file, {}));
      }
    }

    return Promise.all(promises);
  }

  static async uploadSingle(files, setProgress) {
    const uploadUrls = await api.get(
      "/creators/media/upload-url?" + qs.stringify({ n: files.length })
    );

    const urls = uploadUrls.data;
    const uploadFile = async (url, file) => {
      console.log(file);
      try {
        // await api.put(url.url, file, {
        //   headers: { "content-type": file.type },
        //   onUploadProgress: (e) => {
        //     setProgress(file.uid, Math.floor((e.loaded / e.total) * 100));
        //   },
        // });

        console.log(file);

        const res = await api.post("/creators/media/register", {
          key: url.key,
          originalName: file.name,
        });

        return { server: res.data, local: file };
      } catch (e) {
        console.log(e);
      }
    };

    const promises = [];
    for (const index in urls) {
      promises.push(uploadFile(urls[index], files[index]));
    }

    return Promise.all(promises);
  }

  static async;
}
