type UserRole='owner'|'manager'|'guest'|'notLogin';

interface IDeleteRoleProps{
  userRole:UserRole;
  userId:string;
  userName?:string;
}

interface IDeleteRoleResult{
  success:boolean;
  errorMessage:string;
}
enum OperatePermissionEnum{
 DeletRole='delete.role'
}

const useDeleteRole =({userRole='notLogin',userId,userName}:IDeleteRoleProps)=>{
  if(!userRole){
    return {
      success:false,
      errorMessage:'未获取到用户身份',
    }
  }
  const hasDeletPermission= useRolePermission =({
    userRole,
    permissionCode:OperatePermissionEnum.DeletRole
  })
}