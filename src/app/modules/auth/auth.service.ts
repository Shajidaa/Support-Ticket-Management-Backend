import bcrypt from "bcryptjs";
import { User } from "../user/user.model";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";
import { SignOptions } from "jsonwebtoken";

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

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions,
  );

  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions,
  );
  return { accessToken, refreshToken };
};

export const authService = {
  register,
};
