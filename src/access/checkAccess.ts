import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 检查权限，判断当前用户是否具有某个权限
 * @param userLogin 当前登录用户
 * @param needAccess 需要有的权限
 * @return boolean 有无权限
 */
const checkAccess = (
  userLogin: API.LoginUserVO,
  needAccess = ACCESS_ENUM.NOT_LOGIN,
) => {
  // 获取当前登录用户具有的权限，loginUser 为空，则表示未登录
  const loginUserAccess = userLogin?.userRole ?? ACCESS_ENUM.NOT_LOGIN;
  // 需要登录才能访问
  if (needAccess === ACCESS_ENUM.USER) {
    // 如果用户未登录，则表示无权限
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }
  // 需要管理员权限才能访问
  if (needAccess === ACCESS_ENUM.ADMIN) {
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }
  return true;
};

export default checkAccess;
