namespace DLMT.Common.ViewAction
{
    public class ViewPredicate
    {
        public int StartRow { get; set; }
        public int EndRow { get; set; }
        public FilterModel Filter { get; set; }
        public SortModel Sort { get; set; }
    }
}
