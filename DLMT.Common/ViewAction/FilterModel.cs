using System.Collections.Generic;

namespace DLMT.Common.ViewAction
{
    public class FilterModel
    {
        public FilterModel()
        {
            FilterQueries = new List<FilterQuery>();
        }
        public IList<FilterQuery> FilterQueries { get; set; }
    }
}
