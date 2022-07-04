import { storage } from "../Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import EspacioTemporalAPI from "../Api/index";

export const uploadImageTofirebase = async (
  { commit },
  { user, file, directory, id }
) => {
  commit("cleanImageInfo");
  commit("changeLastUsedBy", id);

  const dateSaved = new Date().getTime();
  const storageRef = ref(
    storage,
    `${user}/${directory}/${dateSaved}_${file.name}`
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
export const goToCheckoutSession = async (
  _,
  { locationId, userId, isLocation }
) => {
  const res = await EspacioTemporalAPI.post(
    "/locations/create-checkout-session",
    {
      locationId,
      userId,
      isLocation,
    }
  );
  // console.log("%cTest.vue line:22 res", "color: #007acc;", res);
  // window.location.href = res.url;
  window.open(res.data.url, "_blank");
};
