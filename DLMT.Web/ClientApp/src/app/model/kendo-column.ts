export interface IColumn{
    field: string,
    title: string,
    type: string,
    isSortable: boolean,
    isFilterable: boolean,
    isHidden: boolean,
    width:number,
    format:string,
    groupable:string
}