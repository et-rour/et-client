import EspacioAPI from "../../../Api/index";
import { storage } from "../../../Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const getOwnerslocations = async ({ commit }, idOwner) => {
  const res = await EspacioAPI.get(`/locations/${idOwner}`);
  const ownersLocations = res.data.locations;
  console.log(
    "%cactions.js line:8 ownersLocations",
    "color: #007acc;",
    ownersLocations
  );
  commit("getOwnersLocations", ownersLocations);
};

export const uploadfile = async ({ commit }, { user, file }) => {
  commit("resetImageInfo");

  const dateSaved = new Date().getTime();
  const storageRef = ref(storage, `${user}/images3d/${dateSaved}_${file.name}`);
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
      commit("image3dUploadedState", progress);
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
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        commit("image3dUploaded", downloadURL);
      });
    }
  );
};

export const createNewImage = async ({ commit }, imageData) => {
  console.log({ imageData, EspacioAPI });
  const res = await EspacioAPI.post("/image3d/", imageData);
  const savedImage = res.data;
  commit("resetImageInfo");
  commit("propertiesStore/createNewImage", savedImage, { root: true });
};

export const updateLocationLease = async ({ commit }, data) => {
  console.log("%cactions.js line:68 data", "color: #007acc;", data);
  const res = await EspacioAPI.put("/locations/lease", data);
  const newLocationInfo = res.data;
  commit("propertiesStore/updateLocationLease", newLocationInfo, {
    root: true,
  });
};
