import { ICustomer, useCustomerStore } from 'entities/customer';
import { IVendor } from 'entities/vendor';
import { useTranslation } from 'react-i18next';
import { ProfileCard } from 'widgets/profile-card';

export const ProfileCustomerPage = () => {
  const { user, setCustomer } = useCustomerStore();
  const { t: t } = useTranslation('common');

  const changeCustomerData = (user: ICustomer | IVendor) => {
    if (!('company_name' in user && 'address' in user)) {
      setCustomer(user, true);
    }
  };

  if (!user) {
    return null;
  }

  return <ProfileCard title={t('Профиль покупателя')} user={user} callback={changeCustomerData} />;
};
