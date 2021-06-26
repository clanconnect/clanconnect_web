export const imageRequirements = [
  {
    socialMedia: "Instagram",
    requirements: [
      "Maximum file size: 8MiB",
      "Aspect ratio: Must be within a 4:5 to 1.91:1 range",
      "Minimum width: 320 (will be scaled up to the minimum if necessary)",
      "Maximum width: 1440 (will be scaled down to the maximum if necessary)",
      "Formats supported: JPEG, PNG",
    ],
  },
];
export const videoRequirements = [
  {
    socialMedia: "Youtube",
    requirements: [
      "Maximum file Size: 120GB",
      "Formats supported: MOV, MPEG-1, MPEG-2, MPEG4, MP4, MPG, AVI, WMV, MPEGPS, FLV, 3GPP, WebM, DNxHR, ProRes, CineForm, HEVC (h265)",
    ],
  },
  {
    socialMedia: "Instagram",
    requirements: [
      "File size: 100MB maximum",
      "Duration: 60 seconds maximum, 3 seconds minimum",
      "Video bitrate: VBR, 5Mbps maximum",
      "Video codec: HEVC or H264, progressive scan, closed GOP, 4:2:0 chroma subsampling",
      "Audio bitrate: 128kbps",
      "Audio codec: AAC, 48khz sample rate maximum, 1 or 2 channels (mono or stereo)",
      "Frame rate: 23-60 FPS.",
      "Aspect ratio: Must be within a 4:5 to 1.91:1 range",
      "Formats supported: MP4, MOV",
    ],
  },
];
