using DLMT.Common.DTO;

namespace DLMT.Common.Request
{
    public class CaseTypeInsertRequest : BaseRequest
    {
        public CaseTypeDTO CaseType { get; set; }
    }
}
