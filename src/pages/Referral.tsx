import { useEffect, useState } from "react";
import ReferralDashboard from "@/components/referral/ReferralDashboard";
import LoginOverlay from "@/components/auth/LoginOverlay";

const Referral = () => {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogin(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ReferralDashboard />
      {showLogin && <LoginOverlay />}
    </>
  );
};

export default Referral;