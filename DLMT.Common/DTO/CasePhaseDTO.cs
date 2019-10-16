using System;

namespace DLMT.Common.DTO
{
    public class CasePhaseDTO : BaseDTO
    {
        public int Id { get; set; }
        public int CaseMainId { get; set; }
        public string PhaseNo { get; set; }
        public int Lots { get; set; }
        public int Spaces { get; set; }
        public Decimal GrossAcres { get; set; }
        public Decimal NetAcres { get; set; }
        public Boolean EncrPermitExpected { get; set; }
        public int EncrPermitNumber { get; set; }
        public string Comment { get; set; }
        public bool IsActive { get; set; }
    }
}
