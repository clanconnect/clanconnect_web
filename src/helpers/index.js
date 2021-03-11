import axios from "axios";

export const downloadMedia = (slug) => {
  const url = `${
    process.env.REACT_APP_MEDIA_ORIGINAL_URL
  }/${slug}?${new Date().getTime()}`;

  axios({ url, method: "GET", responseType: "blob" }).then((response) => {
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(
      new Blob([response.data], { type: response.data.type })
    );
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
  });
};

export const convertSizeForHuman = (bytes) => {
  const sizes = ["KBs", "MBs", "GBs"];
  let fileSize = bytes;
  for (const size of sizes) {
    fileSize = fileSize / 1024;
    if (fileSize > 1024) {
      continue;
    }

    return `${Math.floor(fileSize)} ${size}`;
  }

  return `${bytes} Bytes`;
};

export const getImageUrl = (slug) => {
  return process.env.REACT_APP_MEDIA_ORIGINAL_URL + "/" + slug;
};
