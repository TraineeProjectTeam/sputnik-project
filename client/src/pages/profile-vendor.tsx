import { useVendorStore } from "entities/vendor";
import { IUserProfile, ProfileCard } from "shared/ui/profile-card";

export const ProfileVendor = () => {
  const { user, setUser } = useVendorStore()

  const changeVendorData = (newData: IUserProfile) => {
    const vendorData = {
      ...newData,
      company_name: newData.company_name || "No company name",
      address: {
        region: newData.address?.region || "No region",
        city: newData.address?.city || "No city",
        street_name: newData.address?.street_name || "No street name",
        street_number: newData.address?.street_number || "No street number"
      }
    };
    setUser(vendorData)
  }

  return (
    <ProfileCard
      title="Профиль продавца"
      user={user}
      callback={changeVendorData}
    />
  )
};