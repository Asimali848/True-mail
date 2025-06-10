import { Route, Routes } from "react-router-dom";

import GlobalLayout from "./components/global-layout";
import RouteGuard from "./components/route-guard";
import Billing from "./pages/billing";
import Bulk from "./pages/bulk";
import BuyCredits from "./pages/buy-credit";
import FrogetPage from "./pages/frogetPage";
import HelpPage from "./pages/helpPage";
import Home from "./pages/home";
import Landing from "./pages/landing";
import Login from "./pages/loginPage";
import Overview from "./pages/overview";
import Profile from "./pages/profilePage";
import Records from "./pages/records";
import Signup from "./pages/signupPage";
import Single from "./pages/single";
import ViewEmails from "./pages/view-emails";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot" element={<FrogetPage />} />
      <Route
        element={
          <RouteGuard>
            <GlobalLayout />
          </RouteGuard>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/single" element={<Single />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/helpPage" element={<HelpPage />} />
        <Route path="/bulk" element={<Bulk />} />
        <Route path="/records" element={<Records />} />
        <Route path="/overview/:id" element={<Overview />} />
        <Route path="/view-emails/:id" element={<ViewEmails />} />
        <Route path="/buy-credit" element={<BuyCredits />} />
      </Route>
    </Routes>
  );
};

export default App;
