"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth-context";
import { useRouter } from "next/navigation";

export default function AdminUsers() {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!user) return;
    if (user.role !== "admin") router.push("/");

    fetchUsers();
  }, [user]);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setUsers(data.users || []);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Users</h1>

      <div className="space-y-4">
        {users.map((u) => (
          <div
            key={u._id}
            className="bg-white p-4 shadow border rounded-xl"
          >
            <p><strong>Name:</strong> {u.name}</p>
            <p><strong>Email:</strong> {u.email}</p>
            <p><strong>Role:</strong> {u.role}</p>
            <p><strong>Joined:</strong> {new Date(u.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
