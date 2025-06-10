import Navbar from "../components/navbar";
import ProfileForm from "../components/profileForm";

const ProfilePage = () => {
  return (
    <div className="">
      <Navbar />
      <div className="min-h-[calc(100dvh-80px)] bg-gray-100">
        <ProfileForm />
      </div>
    </div>
  );
};

export default ProfilePage;
