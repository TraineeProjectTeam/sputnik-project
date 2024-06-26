import { useCustomerStore } from "entities/customer";
import { IUserProfile, ProfileCard } from "shared/ui/profile-card";

export const ProfileCustomer = () => {
  const { user, setUser } = useCustomerStore()

  const changeCustomerData = (newData: IUserProfile) => {
    setUser(newData)
  }

  return (
    <ProfileCard
      title="Профиль покупателя"
      user={user}
      callback={changeCustomerData}
    />
  )
};