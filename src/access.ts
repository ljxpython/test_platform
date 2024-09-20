/**
 * @see https://umijs.org/docs/max/access#access
 * */

// 此处可以自定义权限,比如设置用户组,设置普通用户和超级管理员等
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  console.log('currentUser', currentUser);
  return {
    canAdmin: currentUser && currentUser.access === 1,
    canTest: currentUser && currentUser.access === 0,
    test: false,


  };
}
