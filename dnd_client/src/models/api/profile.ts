export type ApiSchemaUserRole = {
  roleId: string;
  userId: string;
  role: {
    id: string;
    name: string;
  };
};

export type ApiSchemaProfileData = {
  id: string;
  name: string;
  userName: string;
  email: string;
  profileImageS3Key: string;
  profileImageUrl: string;
  package: number;
  permissionList: number[];
  permissions: string;
  address?: string;
  userRoles: ApiSchemaUserRole[];
};

export type TypeSelectedUser = {
  id: string;
  name: string;
};
