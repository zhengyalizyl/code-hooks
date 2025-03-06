// interface IPermissionsProps{
//   type:'page'|'slot',
//   /**对应访问的权限功能 */
//   authCode?:string
// }

// const useRolePersmission=async ()=>{
//   return  await useRequest(async ()=>{
//     const  {authCodes=[]} =await api.getPermissions();
//     return authCodes;
//   })
// }

// const usePermissions = async (props:IPermissionsProps) => {
// const { type='page',authCode } = props;
// let hasPermissions =false;
// const authCodes = await useRolePersmission();
// return authCodes? authCodes?.includes(authCode):true;
// }