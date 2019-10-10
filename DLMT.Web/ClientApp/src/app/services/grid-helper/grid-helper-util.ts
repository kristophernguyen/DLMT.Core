import { ViewPredicate, SortModel, SortCondition, FilterModel, FilterQuery, FilterCondition } from '../apis/dlmt-api';

export class PredicateMapper {
    public static MapTo(state:any):ViewPredicate{
        let predicate = new ViewPredicate();
        if (state){
            let tempStart = state.skip;
            predicate.startRow = tempStart;
            predicate.endRow = state.skip + state.take;
            if (state.sort && state.sort.length > 0){
                predicate.sort = new SortModel();
                predicate.sort.sortConditions = [];
                for(let i = 0; i < state.sort.length; i++){
                    let tempSort = new SortCondition();
                    tempSort.columnName = state.sort[i].field;
                    tempSort.sortType = state.sort[i].dir;
                    predicate.sort.sortConditions.push(tempSort);
                }
            }
            if (state.filter && state.filter.filters && state.filter.filters.length > 0){
                predicate.filter = new FilterModel();
                predicate.filter.filterQueries= [];
                let stateFilters = state.filter.filters;
                for(let i = 0; i < stateFilters.length; i++){
                    if (stateFilters[i].value && stateFilters[i].value.length > 0){
                        let tempFilter = new FilterQuery();
                        tempFilter.filterOperator = "or";
                        tempFilter.dataType = "string";
                        tempFilter.columnName =  stateFilters[i].field;
                        tempFilter.conditions = [];
                        let tempFilterCondition = new FilterCondition(); 
                        tempFilterCondition.searchKey = stateFilters[i].value;
                        tempFilterCondition.filterType = "contains";
                        tempFilter.conditions.push(tempFilterCondition);
                        predicate.filter.filterQueries.push(tempFilter);
                    }
                } 
            }
        }
        return predicate;
    }
    
}