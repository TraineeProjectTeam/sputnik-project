import { useVendorStore } from "entities/vendor";
import { useTranslation } from "react-i18next";
import { IUserProfile, ProfileCard } from "shared/ui/profile-card";

export const ProfileVendor = () => {
  const { t: tUsr } = useTranslation('user')
  const { user, setVendor } = useVendorStore()

  const changeVendorData = (newData: IUserProfile) => {
    const vendorData = {
      ...newData,
      company_name: newData.company_name || '',
      address: {
        region: newData.address?.region || '',
        city: newData.address?.city || '',
        street_name: newData.address?.street_name || '',
        street_number: newData.address?.street_number || ''
      }
    };
    setVendor(vendorData, true)
  }

  return (
    <ProfileCard
      title={tUsr('Профиль продавца')}
      user={user}
      callback={changeVendorData}
    />
  )
};