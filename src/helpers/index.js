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
