using DLMT.Common.ViewAction;
using System.Linq;

namespace DLMT.Common.Utilities
{
    public static class ViewPredicateMapper
    {
        public static string ConvertToString(this ViewPredicate obj)
        {
            string query = string.Empty;
            if (obj == null)
            {
                return query;
            }
            if (obj.Filter != null)
            {
                if (obj.Filter.FilterQueries != null && obj.Filter.FilterQueries.Any())
                {
                    int totalfilterQueries = obj.Filter.FilterQueries.Count;
                    //query = " AND ";
                    foreach (var filterQuery in obj.Filter.FilterQueries)
                    {
                        totalfilterQueries--;
                        string item = string.Empty;
                        string startDelimiter = string.Empty;
                        string endDelimiter = string.Empty;

                        if (filterQuery.Conditions != null && filterQuery.Conditions.Any())
                        {
                            switch (filterQuery.DataType.ToUpper())
                            {
                                case "STRING":
                                    startDelimiter = "'";
                                    endDelimiter = "'";
                                    break;
                                case "DATETIME":
                                    startDelimiter = "'";
                                    endDelimiter = "'";
                                    break;
                            }

                            string filterType = string.Empty;
                            switch (filterQuery.Conditions[0].FilterType.ToUpper())
                            {
                                case "EQUALS":
                                    filterType = " = ";
                                    break;
                                case "STARTWITH":
                                    filterType = " LIKE ";
                                    startDelimiter = "'";
                                    endDelimiter = "%'";
                                    break;
                                case "ENDWITH":
                                    filterType = " LIKE ";
                                    startDelimiter = "'%";
                                    endDelimiter = "'";
                                    break;
                                case "CONTAINS":
                                    filterType = " LIKE ";
                                    startDelimiter = "'%";
                                    endDelimiter = "%'";
                                    break;
                                case "GREATERTHAN":
                                    filterType = " > ";
                                    break;
                                case "LESSTHAN":
                                    filterType = " < ";
                                    break;
                            }

                            item = string.Format(" ( {0} {1} {2}{3}{4} ) ", filterQuery.ColumnName, filterType, startDelimiter, filterQuery.Conditions[0].SearchKey, endDelimiter);

                        }

                        if (totalfilterQueries > 0)
                        {
                            if (item != string.Empty && filterQuery.FilterOperator.ToUpper() == "AND")
                            {
                                item = item + " AND ";
                            }
                            else if (item != string.Empty)
                            {
                                item = item + " OR ";
                            }
                        }

                        query = query + item;
                    }
                    if (!string.IsNullOrEmpty(query))
                    {
                        query = " AND (" + query + ") ";
                    }
                }
            }

            if (obj.Sort != null)
            {
                if (obj.Sort.SortConditions != null && obj.Sort.SortConditions.Any())
                {
                    query = string.Format("{0} {1} {2} {3}", query, " ORDER BY ", obj.Sort.SortConditions[0].ColumnName, obj.Sort.SortConditions[0].SortType);
                }
            }

            return query;
        }
        public static string ConvertToStringWithNoOrder(this ViewPredicate obj)
        {
            string query = string.Empty;
            if (obj == null)
            {
                return query;
            }
            if (obj.Filter != null)
            {
                if (obj.Filter.FilterQueries != null && obj.Filter.FilterQueries.Any())
                {
                    int totalfilterQueries = obj.Filter.FilterQueries.Count;
                    //query = " AND ";
                    foreach (var filterQuery in obj.Filter.FilterQueries)
                    {
                        totalfilterQueries--;
                        string item = string.Empty;
                        string startDelimiter = string.Empty;
                        string endDelimiter = string.Empty;

                        if (filterQuery.Conditions != null && filterQuery.Conditions.Any())
                        {
                            switch (filterQuery.DataType.ToUpper())
                            {
                                case "STRING":
                                    startDelimiter = "'";
                                    endDelimiter = "'";
                                    break;
                                case "DATETIME":
                                    startDelimiter = "'";
                                    endDelimiter = "'";
                                    break;
                            }

                            string filterType = string.Empty;
                            switch (filterQuery.Conditions[0].FilterType.ToUpper())
                            {
                                case "EQUALS":
                                    filterType = " = ";
                                    break;
                                case "STARTWITH":
                                    filterType = " LIKE ";
                                    startDelimiter = "'";
                                    endDelimiter = "%'";
                                    break;
                                case "ENDWITH":
                                    filterType = " LIKE ";
                                    startDelimiter = "'%";
                                    endDelimiter = "'";
                                    break;
                                case "CONTAINS":
                                    filterType = " LIKE ";
                                    startDelimiter = "'%";
                                    endDelimiter = "%'";
                                    break;
                                case "GREATERTHAN":
                                    filterType = " > ";
                                    break;
                                case "LESSTHAN":
                                    filterType = " < ";
                                    break;
                            }

                            item = string.Format(" ( {0} {1} {2}{3}{4} ) ", filterQuery.ColumnName, filterType, startDelimiter, filterQuery.Conditions[0].SearchKey, endDelimiter);

                        }

                        if (totalfilterQueries > 0)
                        {
                            if (item != string.Empty && filterQuery.FilterOperator.ToUpper() == "AND")
                            {
                                item = item + " AND ";
                            }
                            else if (item != string.Empty)
                            {
                                item = item + " OR ";
                            }
                        }

                        query = query + item;
                    }
                    if (!string.IsNullOrEmpty(query))
                    {
                        query = " AND (" + query + ") ";
                    }
                }
            }
            return query;
        }
    }
}
