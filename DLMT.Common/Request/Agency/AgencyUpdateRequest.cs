using DLMT.Common.DTO;

namespace DLMT.Common.Request.Agency
{
    public class AgencyUpdateRequest : BaseRequest
    {
        public AgencyDTO Agency { get; set; }
    }
}
