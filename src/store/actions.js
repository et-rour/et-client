import { storage } from "../Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import EspacioTemporalAPI from "../Api/index";

export const uploadImageTofirebase = async (
  { commit },
  { user, file, directory, id = "0", specificDirectory = null }
) => {
  commit("cleanImageInfo");
  commit("changeLastUsedBy", id);

  const dateSaved = new Date().getTime();
  const storageRef = ref(
    storage,
    specificDirectory
      ? specificDirectory
      : `${user}/${directory}/${dateSaved}_${file.name}`
  );
  const metadata = {
    contentType: "image/jpeg",
  };
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      commit("imageUploadedState", progress);
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }
  );
  await uploadTask;

  let downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

  console.log("File available at", downloadURL);
  commit("imageUploaded", { id, downloadURL });
  return downloadURL;
};
export const goToLocationCheckoutSession = async (
  _,
  { locationId, userId, range }
) => {
  const res = await EspacioTemporalAPI.post(
    "/reservation/location/create-checkout-session",
    {
      locationId,
      userId,
      range,
    }
  );
  // console.log("%cTest.vue line:22 res", "color: #007acc;", res);
  // window.location.href = res.url;
  window.open(res.data.url, "_blank");
};

export const goToRoomCheckoutSession = async (_, { roomId, userId, range }) => {
  const res = await EspacioTemporalAPI.post(
    "/reservation/room/create-checkout-session",
    {
      roomId,
      userId,
      range,
    }
  );
  // console.log("%cTest.vue line:22 res", "color: #007acc;", res);
  // window.location.href = res.url;
  window.open(res.data.url, "_blank");
};

export const fetchHomeCoverImage = async ({ commit }) => {
  const res = await EspacioTemporalAPI.get("/general/coverImage");
  commit("fetchHomeCoverImage", res.data);
};

export const updateHomeCoverImage = async ({ commit }, imageUrl) => {
  const res = await EspacioTemporalAPI.post("/general/coverImage", {
    imageUrl,
  });
  console.log({ newImage: res.data });
  commit("updateHomeCoverImage", res.data);
};

export const updateHomeCoverText = async ({ commit }, text) => {
  const res = await EspacioTemporalAPI.post("/general/text", {
    text,
  });
  console.log({ text: res.data });
  commit("updateHomeCoverText", res.data);
};
