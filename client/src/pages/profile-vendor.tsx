import { IVendor, changeVendorRequest } from "entities/vendor";
import { IUserProfile, ProfileCard } from "shared/ui/profile-card";

export const ProfileVendor = () => {
  const user: IVendor = {
    id: "1",
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    company_name: "Doe Enterprises",
    phone_number: "+1234567890",
    address: {
      region: "California",
      city: "Los Angeles",
      street_name: "Sunset Blvd",
      street_number: "1234"
    }
  };

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
    changeVendorRequest({ user: vendorData });
  }

  return (
    <ProfileCard
      title="Профиль продавца"
      user={user}
      callback={(newData) => changeVendorData(newData)}
    />
  )
};