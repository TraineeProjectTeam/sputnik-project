import { useCustomerStore } from "entities/customer";
import { useTranslation } from "react-i18next";
import { IUserProfile, ProfileCard } from "shared/ui/profile-card";

export const ProfileCustomer = () => {
  const { user, setCustomer } = useCustomerStore()
  const { t } = useTranslation('user')

  const changeCustomerData = (newData: IUserProfile) => {
    setCustomer(newData, true)
  }

  return (
    <ProfileCard
      title={t('Профиль покупателя')}
      user={user}
      callback={changeCustomerData}
    />
  )
};