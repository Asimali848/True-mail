// import { useEffect, useState } from "react";
// import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
// import { useSelector } from "react-redux";
// import { toast } from "sonner";
// import { RootState } from "@/store";
// import {
//   useChangePasswordMutation,
//   useProfileQuery,
//   useProfileUpdateMutation,
// } from "@/store/services/profile";
// import CustomToast from "./ui/custom-toast";
// const ProfileForm = () => {
//   const [profileUpdate, { isLoading: updateLoading }] =
//     useProfileUpdateMutation();
//   const { data: profileData, isLoading: profileLoading } = useProfileQuery({});
//   const [changePassword, { isLoading: changePasswordLoading }] =
//     useChangePasswordMutation();
//   const { sso } = useSelector((state: RootState) => state.global);
//   const [password, setPassword] = useState("");
//   const [password2, setPassword2] = useState("");
//   const [eye, setEye] = useState(true);
//   const [eye2, setEye2] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [name, setName] = useState("");
//   const handleEditOrSave = async () => {
//     if (isEditing) {
//       const nameRegex = /^[a-zA-Z\s\-'",.]+$/;
//       if (!name.trim()) {
//         toast.custom(() => (
//           <CustomToast
//             type="error"
//             title="Error"
//             description="Name cannot be empty"
//           />
//         ));
//         return;
//       }
//       if (!nameRegex.test(name)) {
//         toast.custom(() => (
//           <CustomToast
//             type="error"
//             title="Error"
//             description="Name contains invalid characters"
//           />
//         ));
//         return;
//       }
//       try {
//         await profileUpdate({ first_name: name });
//         setIsEditing(false);
//         toast.custom(() => (
//           <CustomToast
//             type="success"
//             title="Success"
//             description="Profile updated successfully"
//           />
//         ));
//       } catch (err) {
//         toast.custom(() => (
//           <CustomToast
//             type="error"
//             title="Error"
//             description="Failed to update profile"
//           />
//         ));
//       }
//     } else {
//       setIsEditing(true);
//     }
//   };
//   const handleChangePassword = async () => {
//     if (!password || !password2) {
//       toast.custom(() => (
//         <CustomToast
//           type="success"
//           title="Success"
//           description="Password update successfully"
//         />
//       ));
//       return;
//     }
//     if (password !== password2) {
//       toast.custom(() => (
//         <CustomToast
//           type="error"
//           title="Error"
//           description="Password do not match"
//         />
//       ));
//       return;
//     }
//     try {
//       const response = await changePassword({ new_password: password });
//       console.log(response);
//       setPassword("");
//       setPassword2("");
//       toast.custom(() => (
//         <CustomToast
//           type="success"
//           title="Success"
//           description="Password update successfully"
//         />
//       ));
//     } catch (err) {
//       toast.custom(() => (
//         <CustomToast
//           type="error"
//           title="Error"
//           description="ailed to change password"
//         />
//       ));
//     }
//   };
//   useEffect(() => {
//     if (!profileLoading && profileData) {
//       setName(profileData.first_name || "");
//     }
//   }, [profileLoading, profileData]);
//   return (
//     <div className="flex h-full w-full flex-col items-center justify-center gap-4 py-6">
//       <div className="w-[80%] rounded-3xl bg-white px-10 py-3 shadow-lg">
//         <div className="border-b border-gray-200">
//           <p className="mb-5 mt-4 text-xl font-semibold">Edit Profile</p>
//         </div>
//         <div className="mt-8 grid grid-cols-2 gap-16">
//           <div className="w-full">
//             <p className="mb-2 mt-5 text-lg font-semibold">Full Name</p>
//             <input
//               type="text"
//               className="w-full rounded-full bg-gray-100 p-4 outline-none"
//               placeholder="Enter your name"
//               value={name}
//               onChange={(e) => {
//                 const value = e.target.value;
//                 const regex = /^[a-zA-Z\s\-'",.]*$/;
//                 if (regex.test(value)) {
//                   setName(value);
//                 }
//               }}
//               disabled={!isEditing}
//             />
//           </div>
//           <div className="w-full">
//             <p className="mb-2 mt-5 text-lg font-semibold">Email</p>
//             <input
//               type="email"
//               className="w-full rounded-full bg-gray-100 p-4 outline-none"
//               placeholder="Enter your email"
//               value={profileData?.email}
//               disabled
//             />
//           </div>
//         </div>
//         <div className="mt-5 flex justify-end">
//           <button
//             onClick={handleEditOrSave}
//             disabled={updateLoading}
//             className="mb-5 cursor-pointer rounded-full border bg-[#3D6BD8] px-7 py-4 text-white hover:border-[#3D6BD8] hover:bg-white hover:text-[#3D6BD8] disabled:opacity-50"
//           >
//             {isEditing ? (updateLoading ? "Saving..." : "Save") : "Edit"}
//           </button>
//         </div>
//       </div>
//       {sso ? null : (
//         <div className="w-[80%] rounded-3xl bg-white px-10 py-3 shadow-lg">
//           <div className="border-b border-gray-200">
//             <p className="mb-5 mt-4 text-xl font-semibold">Change Password</p>
//           </div>
//           <div className="mt-8 grid grid-cols-2 gap-16">
//             <div className="w-full">
//               <p className="mb-2 mt-5 text-lg font-semibold">
//                 Enter New Password
//               </p>
//               <div className="flex w-full items-center rounded-full bg-gray-100 px-3 text-gray-400">
//                 <input
//                   type={eye ? "text" : "password"}
//                   placeholder="Enter Password"
//                   className="w-full rounded-full bg-gray-100 p-4 outline-none"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setEye(!eye)}
//                   className="ml-2 focus:outline-none"
//                   disabled={sso}
//                 >
//                   {eye ? (
//                     <RiEyeOffLine className="text-2xl text-black" />
//                   ) : (
//                     <RiEyeLine className="text-2xl text-black" />
//                   )}
//                 </button>
//               </div>
//             </div>
//             <div className="w-full">
//               <p className="mb-2 mt-5 text-lg font-semibold">
//                 Confirm New Password
//               </p>
//               <div className="flex w-full items-center rounded-full bg-gray-100 px-3 text-gray-400">
//                 <input
//                   type={eye2 ? "text" : "password"}
//                   placeholder="Enter Password"
//                   className="w-full rounded-full bg-gray-100 p-4 outline-none"
//                   value={password2}
//                   onChange={(e) => setPassword2(e.target.value)}
//                   disabled={sso}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setEye2(!eye2)}
//                   className="ml-2 focus:outline-none"
//                 >
//                   {eye2 ? (
//                     <RiEyeOffLine className="text-2xl text-black" />
//                   ) : (
//                     <RiEyeLine className="text-2xl text-black" />
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="mt-5 flex justify-end">
//             <button
//               onClick={handleChangePassword}
//               disabled={changePasswordLoading}
//               className="mb-5 cursor-pointer rounded-full border bg-[#3D6BD8] px-7 py-4 text-white hover:border-[#3D6BD8] hover:bg-white hover:text-[#3D6BD8] disabled:opacity-50"
//             >
//               {changePasswordLoading ? "Saving..." : "Save"}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// export default ProfileForm;
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";

import { RootState } from "@/store";
import {
  useChangePasswordMutation,
  useProfileQuery,
  useProfileUpdateMutation,
} from "@/store/services/profile";

import CustomToast from "./ui/custom-toast";

// ✅ Zod schema for password validation
const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must include at least one uppercase letter")
      .regex(/[a-z]/, "Must include at least one lowercase letter")
      .regex(/\d/, "Must include at least one number")
      .regex(/[^A-Za-z0-9]/, "Must include at least one symbol"),
    password2: z.string(),
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords do not match",
    path: ["password2"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

const ProfileForm = () => {
  const [profileUpdate, { isLoading: updateLoading }] =
    useProfileUpdateMutation();
  const { data: profileData, isLoading: profileLoading } = useProfileQuery({});
  const [changePassword, { isLoading: changePasswordLoading }] =
    useChangePasswordMutation();
  const { sso } = useSelector((state: RootState) => state.global);

  const [eye, setEye] = useState(true);
  const [eye2, setEye2] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  useEffect(() => {
    if (!profileLoading && profileData) {
      setName(profileData.first_name || "");
    }
  }, [profileLoading, profileData]);

  const handleEditOrSave = async () => {
    const nameRegex = /^[a-zA-Z\s\-'",.]+$/;

    if (isEditing) {
      if (!name.trim()) {
        toast.custom(() => (
          <CustomToast
            type="error"
            title="Error"
            description="Name cannot be empty"
          />
        ));
        return;
      }

      if (!nameRegex.test(name)) {
        toast.custom(() => (
          <CustomToast
            type="error"
            title="Error"
            description="Name contains invalid characters"
          />
        ));
        return;
      }

      try {
        await profileUpdate({ first_name: name });
        setIsEditing(false);
        toast.custom(() => (
          <CustomToast
            type="success"
            title="Success"
            description="Profile updated successfully"
          />
        ));
      } catch (err) {
        toast.custom(() => (
          <CustomToast
            type="error"
            title="Error"
            description="Failed to update profile"
          />
        ));
      }
    } else {
      setIsEditing(true);
    }
  };

  const onSubmitPassword = async (data: PasswordFormData) => {
    try {
      await changePassword({ new_password: data.password });
      reset();
      toast.custom(() => (
        <CustomToast
          type="success"
          title="Success"
          description="Password updated successfully"
        />
      ));
    } catch (err) {
      toast.custom(() => (
        <CustomToast
          type="error"
          title="Error"
          description="Failed to change password"
        />
      ));
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 py-6">
      <div className="w-[80%] rounded-3xl bg-white px-10 py-3 shadow-lg">
        <div className="border-b border-gray-200">
          <p className="mb-5 mt-4 text-xl font-semibold">Edit Profile</p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-16">
          <div className="w-full">
            <p className="mb-2 mt-5 text-lg font-semibold">Full Name</p>
            <input
              type="text"
              className="w-full rounded-full bg-gray-100 p-4 outline-none"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[a-zA-Z\s\-'",.]*$/;
                if (regex.test(value)) {
                  setName(value);
                }
              }}
              disabled={!isEditing}
            />
          </div>
          <div className="w-full">
            <p className="mb-2 mt-5 text-lg font-semibold">Email</p>
            <input
              type="email"
              className="w-full cursor-not-allowed rounded-full bg-gray-100 p-4 outline-none"
              placeholder="Enter your email"
              value={profileData?.email}
              disabled
            />
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <button
            onClick={handleEditOrSave}
            disabled={updateLoading}
            className="mb-5 cursor-pointer rounded-full border bg-[#3D6BD8] px-7 py-4 text-white hover:border-[#3D6BD8] hover:bg-white hover:text-[#3D6BD8] disabled:opacity-50"
          >
            {isEditing ? (updateLoading ? "Saving..." : "Save") : "Edit"}
          </button>
        </div>
      </div>

      {!sso && (
        <div className="w-[80%] rounded-3xl bg-white px-10 py-3 shadow-lg">
          <div className="border-b border-gray-200">
            <p className="mb-5 mt-4 text-xl font-semibold">Change Password</p>
          </div>

          <form onSubmit={handleSubmit(onSubmitPassword)}>
            <div className="mt-8 grid grid-cols-2 gap-16">
              <div className="w-full">
                <p className="mb-2 mt-5 text-lg font-semibold">
                  Enter New Password
                </p>
                <div className="flex w-full items-center rounded-full bg-gray-100 px-3 text-gray-700">
                  <input
                    type={eye ? "text" : "password"}
                    placeholder="Enter Password"
                    className="w-full rounded-full bg-gray-100 p-4 outline-none"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setEye(!eye)}
                    className="ml-2 focus:outline-none"
                  >
                    {eye ? (
                      <RiEyeOffLine className="text-2xl text-black" />
                    ) : (
                      <RiEyeLine className="text-2xl text-black" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <p className="mb-2 mt-5 text-lg font-semibold">
                  Confirm New Password
                </p>
                <div className="flex w-full items-center rounded-full bg-gray-100 px-3 text-gray-700">
                  <input
                    type={eye2 ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="w-full rounded-full bg-gray-100 p-4 outline-none"
                    {...register("password2")}
                  />
                  <button
                    type="button"
                    onClick={() => setEye2(!eye2)}
                    className="ml-2 focus:outline-none"
                  >
                    {eye2 ? (
                      <RiEyeOffLine className="text-2xl text-black" />
                    ) : (
                      <RiEyeLine className="text-2xl text-black" />
                    )}
                  </button>
                </div>
                {errors.password2 && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password2.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="submit"
                disabled={changePasswordLoading}
                className="mb-5 cursor-pointer rounded-full border bg-[#3D6BD8] px-7 py-4 text-white hover:border-[#3D6BD8] hover:bg-white hover:text-[#3D6BD8] disabled:opacity-50"
              >
                {changePasswordLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
