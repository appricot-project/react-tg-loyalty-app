import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@/store/hooks";

export const HomePage = () => {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div>
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          {user.photoUrl && (
            <img
              alt={user.firstName}
              src={user.photoUrl}
              style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }}
            />
          )}
          <div>
            <div style={{ fontWeight: 600, fontSize: 18 }}>Привет, {user.firstName}!</div>
            {user.username && <div style={{ color: "#888" }}>@{user.username}</div>}
          </div>
        </div>
      )}

      <h1>Новости</h1>
      {/* блок новостей */}
    </div>
  );
};
