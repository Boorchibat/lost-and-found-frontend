"use client";

import { useState } from "react";
import { verifyCode } from "../../../lib/auth/verify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "../../context/UserContext";
import { useRouter } from "next/navigation";

interface VerificationModalProps {
  email: string;
  open: boolean;
  onClose: () => void;
}

export const VerificationModal = ({
  email,
  open,
  onClose,
}: VerificationModalProps) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser, setToken } = useUser();
  const router = useRouter();

  if (!open) return null;

  const handleVerify = async () => {
    try {
      setLoading(true);

      const data = await verifyCode({ email, code });

      setUser(data.user);
      setToken(data.token);

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      onClose();
      router.push("/");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-[400px]">
        <h2 className="text-xl font-bold mb-4">Enter Verification Code</h2>

        <Input
          placeholder="6-digit code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <Button
          onClick={handleVerify}
          className="mt-4 w-full"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify"}
        </Button>
      </div>
    </div>
  );
};
