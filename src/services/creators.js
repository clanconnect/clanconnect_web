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
      "/creators/creatives/by-projects?" + (query && qs.stringify(query)) || ""
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

export class MediaService {
  static async uploadMultiple(files, setProgress) {
    const uploadUrls = await api.get(
      "/creators/media/upload-url?" + qs.stringify({ n: files.length })
    );

    const urls = uploadUrls.data;
    const uploadFile = async (url, file) => {
      try {
        await api.put(url.url, file.originFileObj, {
          headers: { "content-type": file.mimeType },
          onUploadProgress: (e) => {
            setProgress(file.uid, Math.floor((e.loaded / e.total) * 100));
          },
        });

        const res = await api.post("/creators/media/register", {
          key: url.key,
          originalName: file.originFileObj.name,
        });

        return res.data;
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
