using System;
using System.Collections.Generic;
using System.Text;

namespace DLMT.Common.ViewAction
{
    public class FilterQuery
    {
        public FilterQuery()
        {
            Conditions = new List<FilterCondition>();
        }
        public string FilterOperator { get; set; }
        public string ColumnName { get; set; }
        public string DataType { get; set; }
        public IList<FilterCondition> Conditions { get; set; }
    }
}
