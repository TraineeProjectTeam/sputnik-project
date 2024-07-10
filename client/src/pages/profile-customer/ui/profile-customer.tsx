import { useCustomerStore } from 'entities/customer';
import { useTranslation } from 'react-i18next';
import { IUserProfile, ProfileCard } from 'shared/ui/profile-card';

export const ProfileCustomerPage = () => {
  const { user, setCustomer } = useCustomerStore();
  const { t: tCom } = useTranslation('common');

  const changeCustomerData = (newData: IUserProfile) => {
    setCustomer(newData, true);
  };

  return (
    <ProfileCard title={tCom('Профиль покупателя')} user={user} callback={changeCustomerData} />
  );
};
