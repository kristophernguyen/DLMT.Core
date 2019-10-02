using System.Collections.Generic;

namespace DLMT.Common.ViewAction
{
    public class SortModel
    {
        public SortModel()
        {
            SortConditions = new List<SortCondition>();
        }
        public IList<SortCondition> SortConditions { get; set; }
    }
}
