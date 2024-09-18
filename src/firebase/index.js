import { app, firestore, storage, auth } from "../firebase.config";
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

// Signup with email and password

export const EMAILSIGNUP = async (email, password) => {
  const firebaseAuth = getAuth(app);
  const result = await createUserWithEmailAndPassword(
    firebaseAuth,
    email,
    password
  );
  return result;
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
