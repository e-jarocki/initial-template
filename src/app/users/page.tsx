import { User } from '@/entities/User/model';

export default async function UsersPage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    next: { revalidate: 60 },
  });
  const users: User[] = await res.json();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-orange-300 justify-center flex">
        Users
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="border bg-white p-4 rounded-lg shadow-sm"
          >
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-gray-500">{user.email}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
