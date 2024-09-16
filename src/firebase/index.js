import { app, firestore, storage } from "../firebase.config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  addDoc,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { toast } from "react-toastify";

// export const firebaseUploadImage = (
//   imageFile,
//   promise,
//   progressHandler,
//   action,
//   to
// ) => {
//   promise(true);
//   // progressHandler(0)
//   toast.info(`Upload started.....`, {
//     icon: <MdOutlineCloudUpload className="text-blue-600" />,
//   });
//   const storageRef = ref(
//     storage,
//     `Images/${to}/${Date.now()}-${imageFile.name}`
//   );
//   const uploadPhoto = uploadBytesResumable(storageRef, imageFile);
//   uploadPhoto.on(
//     "state_changed",
//     (snapshot) => {
//       progressHandler(
//         `Upload status: ${Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         )}%`
//       );
//     },
//     (error) => {
//       console.log(error);
//       toast.error("Error while uploading, Try again🤗");
//       action(null);
//       setTimeout(() => {
//         promise(false);
//       }, 3000);
//     },
//     () => {
//       getDownloadURL(uploadPhoto.snapshot.ref).then((downloadUrl) => {
//         action(downloadUrl);
//         promise(false);
//         toast.success("Photo Uploaded Successfully😊");
//       });
//     }
//   );
// };

// export const firebaseRemoveUploadedImage = (
//   ImageFile,
//   imageHandler,
//   promise
// ) => {
//   const dummy =
//     "https://firebasestorage.googleapis.com/v0/b/Foodify-restaurant.appspot.com/o/Images";
//   promise(true);
//   toast.info(`Removing Image.....`, {
//     icon: <MdOutlineCloudUpload className="text-blue-600" />,
//     autoClose: 1500,
//     toastId: "remove-image",
//   });
//   if (ImageFile.includes(dummy)) {
//     const deleteRef = ref(storage, ImageFile);
//     deleteObject(deleteRef).then(() => {
//       imageHandler(null);
//       promise(false);
//       toast.success("Photo removed Successfully😊", {
//         autoClose: 2000,
//         toastId: "remove-image",
//       });
//     });
//   } else {
//     imageHandler(null);
//     promise(false);
//     toast.success("Photo removed Successfully😊", {
//       autoClose: 2000,
//       toastId: "remove-image",
//     });
//   }
// };
// export const silentRemoveUploadedImage = (ImageFile) => {
//   const deleteRef = ref(storage, ImageFile);
//   deleteObject(deleteRef).then(() => {});
// };

// export const firebaseSaveProduct = async (data) => {
//   await setDoc(doc(firestore, "Food", `${Date.now()}`), data, {
//     merge: true,
//   });
// };

// Authenticate user using PROVIDER
export const AUTHPROVIDER = async (provider) => {
  const firebaseAuth = getAuth(app);
  const {
    user: { refreshToken, providerData },
  } = await signInWithPopup(firebaseAuth, provider);

  // add provider data to user
  await firebaseAddUser(providerData[0]);
  let userData = await firebaseGetUser(providerData[0].uid);
  return { refreshToken, userData };
};

// Signup with email and password
export const EMAILSIGNUP = async (email, password) => {
  const firebaseAuth = getAuth(app);
  console.log(firebaseAuth);
  return createUserWithEmailAndPassword(firebaseAuth, email, password);
};

//  Signin with email and password
export const EMAILSIGNIN = async (email, password) => {
  const firebaseAuth = getAuth(app);
  const result = await signInWithEmailAndPassword(
    firebaseAuth,
    email,
    password
  );
  let user = result.user.providerData[0];

  return await firebaseGetUser(user.uid);
};

// Fetch All Food Products  from Firestore

// Logout user
export const firebaseLogout = async () => {
  await getAuth(app).signOut();
};

// ADMIN USER MANAGEMENT

// // firestore add to users collection
export const firebaseAddUser = async (data) => {
  // check if user already exists
  const user = await firebaseGetUser(data.uid);
  if (user.length === 0) {
    await setDoc(doc(firestore, "Users", `${data.uid}`), data, {
      merge: true,
    });
  }
};
// export const firebaseDeleteUser = async (uid) => {
//   await deleteDoc(doc(firestore, "Users", `${uid}`)).then(() => {
//     toast.success("User deleted successfully");
//   });
// };

// get user
export const firebaseGetUser = async (uid) => {
  const user = await getDocs(query(collection(firestore, "Users")));
  let users = user.docs.map((doc) => doc.data());
  return users.filter((user) => user.uid === uid);
};

// update user
export const firebaseUpdateUser = async (data) => {
  await setDoc(doc(firestore, "Users", `${data.uid}`), data, {
    merge: true,
  });
};

// // firebase get all users
// export const firebaseGetAllUsers = async () => {
//   const users = await getDocs(query(collection(firestore, "Users")));
//   let usersData = users.docs.map((doc) => doc.data());
//   return usersData;
// };

// // delete food
// export const firebaseDeleteFood = async (id) => {
//   await deleteDoc(doc(firestore, "Food", `${id}`));
// };
// export const firebaseAddOrder = async (data) => {
//   await addDoc(collection(firestore, "Orders"), data).then(() => {
//     console.log("Order added");
//   });
// };
// export const firebaseFetchAllOrders = async () => {
//   let orders = await getDocs(query(collection(firestore, "Orders")));
//   orders = orders.docs.map((doc) => doc.data());
//   return orders;
// };
// export const firebaseFetchFoodDetails = async () => {
//   const foods = await getDocs(query(collection(firestore, "Food")));
//   let food = foods.docs.map((doc) => doc.data());

//   return food;
// };
// try {
//   // Fetch the document from the "Food" collection with the given id
//   const docRef = doc(firestore, "Food", id);
//   const docSnap = await getDoc(docRef);
//   console.log(docSnap);
//   // Check if the document exists
//   if (docSnap.exists()) {
//     // Extract the 'name' field from the document data
//     const foodName = docSnap.data().name;
//     return foodName;
//   } else {
//     console.log("No such document!");
//     return null;
//   }
// } catch (error) {
//   console.error("Error fetching food details:", error);
//   throw error;
// }
