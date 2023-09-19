import { useState, useEffect } from "react";
import { auth, fireStore } from "../firebaseDatabase/config";
import { useAuthContext } from "./useAuthContext";
//storage
export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (
    {
      email,
      password,
      displayName,
      registerNumber,
      department,
      year,
      section,
      semester,
      isEnroll,
    },
    handleDownloadPassword
  ) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);

      if (!res) {
        throw new Error("Could not complete signup");
      }
      console.log(department, year, section);
      handleDownloadPassword();

      //const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
      // console.log(uploadPath);
      // const img = await storage.ref(uploadPath).put(thumbnail);
      // console.log(img);
      //  const imgUrl = await img.ref.getDownloadURL();
      //  console.log(imgUrl);

      await res.user.updateProfile({ displayName });

      //craeting user document for uwu
      await fireStore.collection("users").doc(res.user.uid).set({
        online: true,
        displayName: displayName,
        email: email,
        registerNumber: registerNumber,
        department: department,
        isEnroll: isEnroll,
        section: section,
        semester: semester,
        year: year,
        //   photoURL: imgUrl,
      });

      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(false);
  }, []);

  return { signup, error, isPending };
};
