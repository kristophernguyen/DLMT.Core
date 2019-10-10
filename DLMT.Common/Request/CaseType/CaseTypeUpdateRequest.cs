using DLMT.Common.DTO;

namespace DLMT.Common.Request
{
    public class CaseTypeUpdateRequest : BaseRequest
    {
        public CaseTypeDTO CaseType { get; set; }
    }
}
