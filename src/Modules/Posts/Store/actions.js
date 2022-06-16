import EspacioAPI from "../../../Api/index";
import { storage } from "../../../Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const loadPosts = ({ commit }) => {
  commit("changeLoadingPosts", true);
  EspacioAPI.get("/publications/verified").then((response) => {
    commit("loadPosts", response.data.publications);
  });
};

export const uploadfile = async ({ commit }, { user, file }) => {
  commit("cleanImageInfo");

  const dateSaved = new Date().getTime();
  const storageRef = ref(storage, `${user}/Posts/${dateSaved}_${file.name}`);
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
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        commit("imageUploaded", downloadURL);
      });
    }
  );
};

export const createNewPost = async ({ commit }, postData) => {
  await EspacioAPI.post("/publications", postData);
  // const post = res.data;
  commit("cleanImageInfo");
};

export const loadCurrencies = async ({ commit }) => {
  const response = await EspacioAPI.get("/currency");
  commit("loadCurrencies", response.data);
};
