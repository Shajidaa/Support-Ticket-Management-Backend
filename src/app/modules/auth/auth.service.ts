import bcrypt from "bcryptjs";
import { User } from "../user/user.model";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";
import { SignOptions } from "jsonwebtoken";
import { IUser } from "../user/user.interface";
import { IUserLogin } from "./auth.interface";
import { AppError } from "../../errors/AppError";

const register = async (payload: IUser) => {
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

const login = async (payload: IUserLogin) => {
  const { email, password } = await payload;

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new AppError(404, "Account does not create with this email. ");
  }
  const hashedPassword = await bcrypt.compare(password, existingUser?.password);
  if (!hashedPassword) {
    throw new AppError(404, "Password is not correct");
  }
  const jwtPayload = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
    role: existingUser.role,
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
  login,
};
