export type User = {
  id: number;
  name: string;
  email: string;
};

type Props = {
  users: User[];
};

export default function UserList({ users }: Props) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
}
