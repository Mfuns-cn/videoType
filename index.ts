function getTypeFromBinaryData(binaryData: Uint8Array) {
  if (
    binaryData[4] === 0x66 &&
    binaryData[5] === 0x74 &&
    binaryData[6] === 0x79 &&
    binaryData[7] === 0x70
  ) {
    return "mp4";
  } else if (
    binaryData[0] === 0x46 &&
    binaryData[1] === 0x4c &&
    binaryData[2] === 0x56
  ) {
    return "flv";
  } else if (
    binaryData[0] === 0x23 &&
    binaryData[1] === 0x48 &&
    binaryData[2] === 0x54 &&
    binaryData[3] === 0x54
  ) {
    return "m3u8";
  } else if (
    binaryData[0] === 0x44 &&
    binaryData[1] === 0x44 &&
    binaryData[2] === 0x53 &&
    binaryData[3] === 0x4d
  ) {
    return "dash";
  }
}

async function getVideoType(
  video: string | File
): Promise<"mp4" | "flv" | "m3u8" | "dash" | undefined> {
  if (typeof video === "string") {
    return fetch(video)
      .then(async (res) => {
        const arrayBuffer = await res.arrayBuffer();
        const binaryData = new Uint8Array(arrayBuffer);
        return getTypeFromBinaryData(binaryData);
      })
      .catch(() => {
        return undefined;
      });
  } else {
    const arrayBuffer = await video.arrayBuffer();
    const binaryData = new Uint8Array(arrayBuffer);
    return getTypeFromBinaryData(binaryData);
  }
}

async function getVideoDuration(video: string | File): Promise<number> {
  const el = document.createElement("video");
  el.src = typeof video === "string" ? video : URL.createObjectURL(video);
  return new Promise((resolve, reject) => {
    el.addEventListener("loadedmetadata", () => {
      if (el.duration === Infinity) {
        el.currentTime = Number.MAX_SAFE_INTEGER;
        el.ontimeupdate = () => {
          el.ontimeupdate = null;
          resolve(el.duration);
          el.currentTime = 0;
        };
      } else resolve(el.duration);
    });
    el.onerror = (event) => {
      reject(event);
    };
  });
}

async function getVideoSize(video: string | File): Promise<number> {
  if (typeof video === "string") {
    return fetch(video, { method: "HEAD" }).then((res) => {
      return parseInt(res.headers.get("Content-Length") || "0");
    });
  } else {
    return video.size;
  }
}

export default {
  getVideoType,
  getVideoDuration,
  getVideoSize,
};
