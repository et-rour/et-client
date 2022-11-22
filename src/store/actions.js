import { storage } from "../Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import EspacioTemporalAPI from "../Api/index";
const convert = require('heic-convert');

export const uploadImageTofirebase = async (
  { commit },
  { file, directory}
) => {
  commit("cleanImageInfo");
  console.log('%cactions.js line:19 file', 'color: white; background-color: #007acc;', file);

  const dateSaved = new Date().getTime();
  
  
  let imageBuffer = file;
  let imagePath = `${directory}/${dateSaved}_${file.name}`;

  const imageType = file.name.split(".").pop();
  try {
    if (imageType === "heic"||imageType === "HEIC") {
      // alert("Este formato de imagen no muestra una preview.\n Pero se guardara correctamente")
      const buffer = await file.arrayBuffer();
      let byteArray = new Int8Array(buffer);
  
      const outputBuffer = await convert({
        buffer: byteArray,
        format: 'JPEG',
        quality: 0.92
      });
      imageBuffer = outputBuffer
      imagePath = `${directory}/${dateSaved}_${file.name.split(".")[0]}.jpeg`;
    }
  } catch (error) {
    console.log('%cerror actions.js line:36 ', 'color: red; display: block; width: 100%;', error);
  }

  const storageRef = ref(storage, imagePath); //vi_manuel28@hotmail.com/{{directory}}/458845522Image.png 
  const uploadTask = uploadBytesResumable(storageRef, imageBuffer);

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
        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }
  );
  await uploadTask;

  let downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  commit("cleanImageInfo");
  return downloadURL;

};

export const goToLocationCheckoutSession = async (_, reservationData) => {
  const res = await EspacioTemporalAPI.post(
    "/reservation/location/create-checkout-session",
    reservationData
  );
  // console.log("%cTest.vue line:22 res", "color: #007acc;", res);
  // window.location.href = res.url;
  window.open(res.data.url, "_blank");
};

export const goToRoomCheckoutSession = async (
  _,
  { roomId, userId, range, signature }
) => {
  const res = await EspacioTemporalAPI.post(
    "/reservation/room/create-checkout-session",
    {
      roomId,
      userId,
      range,
      signature,
    }
  );
  // console.log("%cTest.vue line:22 res", "color: #007acc;", res);
  // window.location.href = res.url;
  window.open(res.data.url, "_blank");
};

export const fetchCoversData = async ({ commit }) => {
  const res = await EspacioTemporalAPI.get("/general/all");
  commit("fetchCoversData", res.data);
};

export const fetchPersonalMembers = async ({ commit }) => {
  const res = await EspacioTemporalAPI.get("/personal/");
  commit("fetchPersonalMembers", res.data);
};

export const updatePersonalMember = async (
  { commit },
  { personalMemberInfo, id }
) => {
  const res = await EspacioTemporalAPI.put(
    `/personal/${id}`,
    personalMemberInfo
  );
  commit("updatePersonalMember", { updatedPersonal: res.data });
};
