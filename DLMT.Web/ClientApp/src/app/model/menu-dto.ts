export class MenuDTO{
    menuId!:number;
    name?: string | undefined;
    menuItem?: MenuItemDTO[] | undefined;
}
export class MenuItemDTO{
    itemId!: number;
    menuId!: number;
    parentItemId!: number;
    name?: string | undefined;
    uri?: string | undefined;
    icon?: string | undefined;
    routeName?: string | undefined;
    isExternalLink!: boolean;
    hasChild!: boolean;
    itemOrder!: number;
    showChildDsp!: boolean;
    isActiveDsp!: boolean;
    childMenuItems?: MenuItemDTO[] | undefined;
    attributes?: MenuItemAttributeDTO[] | undefined;
    roles?: MenuItemRoleDTO[] | undefined;
}
export class MenuItemAttributeDTO{
    itemId: number;
    menuId: number;
    parentItemId: number;
    name?: string | undefined;
    uri?: string | undefined;
    icon?: string | undefined;
    routeName?: string | undefined;
    isExternalLink: boolean;
    hasChild: boolean;
    itemOrder: number;
    showChildDsp: boolean;
    isActiveDsp: boolean;
    childMenuItems?: MenuItemDTO[] | undefined;
    attributes?: MenuItemAttributeDTO[] | undefined;
    roles?: MenuItemRoleDTO[] | undefined;
}
export class MenuItemRoleDTO{
    itemId!: number;
    claimId!: number;
    claimValue?: string | undefined;
}