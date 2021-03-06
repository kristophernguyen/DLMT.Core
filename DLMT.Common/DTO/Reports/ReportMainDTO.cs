﻿using System;

namespace DLMT.Common.DTO.Reports
{
    public class ReportMainDTO : BaseDTO
    {
        public int Id { get; set; }
        public string ADPNumber { get; set; }
        public string ADPName { get; set; }
        public Decimal Rate { get; set; }
        public string RateName { get; set; }
        public DateTime EffectiveDate { get; set; }
        public string EffectiveDateStr { get; set; }
    }
}
