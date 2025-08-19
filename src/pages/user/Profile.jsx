import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // kalau pakai JWT
          },
        });

        if (!res.ok) {
          throw new Error("Gagal mengambil data user");
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="space-y-4">
        <div>
          <p className="text-gray-500 text-sm">Nama</p>
          <p className="text-lg">{user.name}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Email</p>
          <p className="text-lg">{user.email}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Bergabung sejak</p>
          <p className="text-lg">{new Date(user.created_at).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
