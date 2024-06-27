const Password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]*$/;
const Name = /^[A-Za-zа-яА-Я]+$/;
const Phone = /^\+\d{10,15}$/;

export const Regulars = {
  Password,
  Name,
  Phone,
};
