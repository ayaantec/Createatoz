export type TypeHomePageData = {
  id: string;
  name: string;
  displayName: string;
  categories: TypeHomePageTabCategories[];
};

export type TypeHomePageTabCategories = {
  id: number;
  name: string;
  groupId: number;
  coverPhotoUrl: string;
  subCategories: TypeHomePageTabSubCategories[];
};

export type TypeHomePageTabSubCategories = {
  id: number;
  name: string;
  width: string;
  height: string;
  categoryId: number;
  thumbNailUrl: string;
};
