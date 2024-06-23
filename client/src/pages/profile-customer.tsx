import { ICustomer, changeCustomerRequest } from "entities/customer";
import { IUserProfile, ProfileCard } from "shared/ui/profile-card";

export const ProfileCustomer = () => {
  const user: ICustomer = {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    phone_number: "+1234567890"
  };

  const changeCustomerData = (newData: IUserProfile) => {
    changeCustomerRequest({
      user: newData,
      id: user.id
    })
  }

  return (
    <ProfileCard
      title="Профиль пользователя"
      user={user}
      callback={(newData) => changeCustomerData(newData)}
    />
  )
};