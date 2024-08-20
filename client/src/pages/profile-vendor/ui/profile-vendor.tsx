import { ICustomer } from 'entities/customer';
import { IVendor, useVendorStore } from 'entities/vendor';
import { useTranslation } from 'react-i18next';
import { ProfileCard } from 'widgets/profile-card';

export const ProfileVendorPage = () => {
  const { t: t } = useTranslation();
  const { user, setVendor } = useVendorStore();

  const changeVendorData = (user: IVendor | ICustomer) => {
    if ('company_name' in user && 'address' in user) {
      setVendor(
        {
          ...user,
          company_name: user.company_name,
          address: {
            region: user.address?.region,
            city: user.address?.city,
            street_name: user.address?.street_name,
            street_number: user.address?.street_number,
          },
        },
        true,
      );
    }
  };

  if (!user) {
    return null;
  }

  return <ProfileCard title={t('Профиль продавца')} user={user} callback={changeVendorData} />;
};
