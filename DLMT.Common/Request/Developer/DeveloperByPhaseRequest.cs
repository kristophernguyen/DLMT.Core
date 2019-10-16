namespace DLMT.Common.Request.Developer
{
    public class DeveloperByPhaseRequest : BaseRequest
    {
        public string CaseNumber { get; set; }
        public string PhaseNo { get; set; }
    }
}
