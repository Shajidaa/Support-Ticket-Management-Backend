import { TRole } from "./user.interface";
import { User } from "./user.model";

const getAllStaff = async (role: TRole) => {
  const staffList = await User.find({ role: role }).select("name email");

  return staffList;
};
export const userService = {
  getAllStaff,
};
