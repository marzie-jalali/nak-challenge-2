
import UserHeading from '../../components/user/UserHeading'
import UserTable from '../../components/user/UserTable';

const UserListPage = () => {
  const users = [
    { item: "1", name: "Nora", userName: "nora123", email: "nora@mail.com", phone: "0912...", status: "active" },
    { item: "2", name: "Sara", userName: "sara88", email: "sara@mail.com", phone: "0913...", status: "not_active" },
  ];

  return (
    <div>
      <UserHeading translationKey="user_list_heading"/>
      <UserTable users={users}/>
      </div>

  )
}

export default UserListPage