import bcrypt from "bcryptjs";
import { User } from "../user/user.model";
import config from "../../config";

const register = async (payload: any) => {
  const { name, email, password, role } = await payload;

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "Customer",
  });

  return user;
};

export const authService = {
  register,
};
