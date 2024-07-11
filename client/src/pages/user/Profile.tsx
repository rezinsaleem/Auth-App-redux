import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { RootState } from "../../redux/store";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from "../../redux/user/userSlice";
import { useFormik } from "formik";
import * as yup from "yup";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector(
    (state: RootState) => state.user
  );

  const fileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imgErr, setImgErr] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const validationSchema = yup.object({
    username: yup
      .string()
      .min(3, 'Username should be at least 3 characters')
      .required('Username is required'),
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password should be at least 6 characters'),
  });

  const formik = useFormik({
    initialValues: {
      username: currentUser?.username || "",
      email: currentUser?.email || "",
      password: "",
      profilePicture: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(updateUserStart());
        const res = await fetch(`/api/user/update/${currentUser?.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to update user");
        }
        dispatch(updateUserSuccess(data));
        setUpdateSuccess(true);
        toast.success("User updated successfully!");
      } catch (error) {
        console.error("Error updating user:", error);
        dispatch(updateUserFailure());
        toast.error("Failed to update user");
      }
    },
  });

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image: File) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        setImgErr(true);
        console.log(error, imgErr);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          formik.setFieldValue("profilePicture", downloadURL);
          toast.success("Image changed successfully");
        });
      }
    );
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser?.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure());
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut())
    } catch (error) {
      console.log(error);
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 text-slate-700">
        Profile
      </h1>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <ToastContainer />
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
              setImage(e.target.files[0]);
            }
          }}
        />
        <img
          src={formik.values.profilePicture || currentUser.profilePicture}
          alt="profile"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => fileRef.current?.click()}
        />
        <p className="text-sm self-center">
          {imgErr && (
            <span className="text-red-700">
              Error uploading image (file size must be less than 2 MB)
            </span>
          )}
        </p>
        <input
          value={formik.values.username}
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          className="bg-slate-200 p-3 rounded-lg font-medium text-slate-700"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="text-red-500 text-sm">{formik.errors.username}</div>
        ) : null}
        <input
          value={formik.values.email}
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="bg-slate-200 p-3 rounded-lg font-medium text-slate-700"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        ) : null}
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className="bg-slate-200 p-3 rounded-lg font-medium text-slate-700"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        ) : null}
        <button
          type="submit"
          className="bg-slate-700 text-white p-2 rounded-lg uppercase font-medium hover:opacity-95 disabled:opacity-80 "
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-3 mx-2">
        <span
          className="text-red-700 cursor-pointer font-medium"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer font-medium">
          Sign out
        </span>
      </div>
    </div>
  );
};

export default Profile;
