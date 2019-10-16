namespace DLMT.Common.DTO
{
    public class DlmtCaseDetailsDTO : BaseDTO
    {
        public int Id { get; set; }
        public string CaseNumber { get; set; }
        public string CaseTypeDsp { get; set; }
        public int CaseTypeId { get; set; }
        public int PlanningOfficeId { get; set; }
        public string PlanningOfficeDsp { get; set; }
        public int ZoneId { get; set; }
        public string ZoneDsp { get; set; }
        public int AgencyId { get; set; }
        public string AgencyDsp { get; set; }
    }
}
