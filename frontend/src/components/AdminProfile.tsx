import React, { useEffect, useState } from "react";
import api from "../services/api";  

interface AdminProfile {
    id:string;
  name: string;
  email: string;
  phone: string;
  role:string;
  
}

const AdminProfile: React.FC = () => {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await api.get("/api/admin/profile");
      setProfile(res.data);
    } catch (error) {
      console.error("Failed to load profile", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: 40 }}>Loading...</div>;
  }

  if (!profile) {
    return <div style={{ textAlign: "center", marginTop: 40 }}>Profile not found</div>;
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>My Profile</h2>

      <div style={{ marginBottom: 10 }}>
        <strong>Name:</strong> {profile.name}
      </div>

      <div style={{ marginBottom: 10 }}>
        <strong>Email:</strong> {profile.email}
      </div>

      <div style={{ marginBottom: 10 }}>
        <strong>Phone:</strong> {profile.phone}
      </div>

      <div style={{ marginBottom: 10 }}>
        <strong>Id:</strong> {profile.id}
      </div>

      <div style={{ marginBottom: 10 }}>
        <strong>Role:</strong> {profile.role}
      </div>
    </div>
  );
};

export default AdminProfile;
