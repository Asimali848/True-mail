import { TbAlertTriangleFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";

interface LogoutModalProps {
  showLogoutModal: boolean;
  setShowLogoutModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutModal = ({
  showLogoutModal,
  setShowLogoutModal,
}: LogoutModalProps) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  return (
    <Dialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
      <DialogContent className="h-[320px] max-w-sm md:h-[270px]">
        <DialogHeader>
          <DialogTitle className="text-center">Confirm Logout</DialogTitle>
        </DialogHeader>
        <p className="itesm-center flex flex-col gap-3 pt-3 text-center text-gray-600">
          <TbAlertTriangleFilled className="mx-auto size-20 w-full fill-red-500" />
          Are you sure you want to log out?
        </p>
        <DialogFooter className="flex justify-end gap-2 pt-4">
          <Button variant="ghost" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutModal;
