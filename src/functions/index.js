import Moment from "moment";

export function DateThai(date, status) {
  var now = new Date(date);
  if (date !== "0000-00-00" && date !== null && date !== "0000-00-00 00:00:00" && date) {
    var thday = [
      "อาทิตย์",
      "จันทร์",
      "อังคาร",
      "พุธ",
      "พฤหัส",
      "ศุกร์",
      "เสาร์",
    ];
    var thmonth = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];
    var sothmonth = [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ];

    if (status === "full") {
      return (
        "วัน" +
        thday[now.getDay()] +
        "ที่ " +
        now.getDate() +
        " " +
        thmonth[now.getMonth()] +
        " " +
        (1 * now.getFullYear() + 543)
      );
    } else if (status === "monthyear") {
      return thmonth[now.getMonth()] + " " + (1 * now.getFullYear() + 543);
    } else if (status === "sortmonthyear") {
      return sothmonth[now.getMonth()] + " " + (1 * now.getFullYear() + 543);
    } else if (status === "day") {
      return thday[now.getDay()];
    } else if (status === "datefull") {
      return (
        ("0" + now.getDate()).slice(-2) +
        " " +
        thmonth[now.getMonth()] +
        " " +
        (1 * now.getFullYear() + 543)
      );
    } else if (status === "sortdate") {
      return (
        ("0" + now.getDate()).slice(-2) +
        " " +
        sothmonth[now.getMonth()] +
        " " +
        (1 * now.getFullYear() + 543)
      );
    } else if (status === "monthfullonly") {
      return thmonth[now.getMonth()];
    } else if (status === "monthsortonly") {
      return sothmonth[now.getMonth()];
    } else if (status === "daymonth") {
      return now.getDate() + " " + thmonth[now.getMonth()];
    } else if (status === "year") {
      return now.getFullYear() + 543;
    } else if (status === "datetime") {
      return (
        now.getDate() +
        " " +
        thmonth[now.getMonth()] +
        " " +
        (1 * now.getFullYear() + 543) +
        " " +
        ("0" + now.getHours()).slice(-2) +
        ":" +
        ("0" + now.getMinutes()).slice(-2) +
        " น."
      );
    }
  } else {
    return " - ";
  }
}

export function DateThaiBetween(date1, date2) {
  var n1 = new Date(date1);
  var n2 = new Date(date2);
  if (date1 !== "0000-00-00" && date2 !== "0000-00-00") {
    var sothmonth = [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ];
    if (
      n1.getDate() === n2.getDate() &&
      n1.getMonth() === n2.getMonth() &&
      n1.getFullYear() === n2.getFullYear()
    ) {
      return (
        n1.getDate() +
        " " +
        sothmonth[n1.getMonth()] +
        " " +
        (1 * n1.getFullYear() + 543)
      );
    } else if (
      n1.getMonth() === n2.getMonth() &&
      n1.getFullYear() === n2.getFullYear()
    ) {
      return (
        n1.getDate() +
        "-" +
        n2.getDate() +
        " " +
        sothmonth[n1.getMonth()] +
        " " +
        (1 * n1.getFullYear() + 543)
      );
    } else if (n1.getFullYear() === n2.getFullYear()) {
      return (
        n1.getDate() +
        " " +
        sothmonth[n1.getMonth()] +
        " - " +
        n2.getDate() +
        " " +
        sothmonth[n2.getMonth()] +
        " " +
        (1 * n1.getFullYear() + 543)
      );
    } else {
      return (
        n1.getDate() +
        " " +
        sothmonth[n1.getMonth()] +
        " " +
        (1 * n1.getFullYear() + 543) +
        " - " +
        n2.getDate() +
        " " +
        sothmonth[n2.getMonth()] +
        " " +
        (1 * n2.getFullYear() + 543)
      );
    }
  } else {
    return " - ";
  }
}

export function ThaiNumberToText(Number) {
  Number = Number.replace(/๐/gi, "0");
  Number = Number.replace(/๑/gi, "1");
  Number = Number.replace(/๒/gi, "2");
  Number = Number.replace(/๓/gi, "3");
  Number = Number.replace(/๔/gi, "4");
  Number = Number.replace(/๕/gi, "5");
  Number = Number.replace(/๖/gi, "6");
  Number = Number.replace(/๗/gi, "7");
  Number = Number.replace(/๘/gi, "8");
  Number = Number.replace(/๙/gi, "9");
  return ArabicNumberToText(Number);
}

export function ArabicNumberToText(Number) {
  Number = Number?Number:0
  var _Number = CheckNumber(Number);
  var NumberArray = [
    "ศูนย์",
    "หนึ่ง",
    "สอง",
    "สาม",
    "สี่",
    "ห้า",
    "หก",
    "เจ็ด",
    "แปด",
    "เก้า",
    "สิบ",
  ];
  var DigitArray = ["", "สิบ", "ร้อย", "พัน", "หมื่น", "แสน", "ล้าน"];
  var BahtText = "";
  if (isNaN(_Number)) {
    return "ข้อมูลนำเข้าไม่ถูกต้อง";
  } else {
    if (_Number - 0 > 9999999.9999) {
      return "ข้อมูลนำเข้าเกินขอบเขตที่ตั้งไว้";
    } else {
      _Number = _Number.split(".");
      if (_Number[1].length > 0) {
        _Number[1] = _Number[1].substring(0, 2);
      }
      var NumberLen = _Number[0].length - 0;
      for (var i = 0; i < NumberLen; i++) {
        var tmp = _Number[0].substring(i, i + 1) - 0;
        if (tmp !== 0) {
          if (i === NumberLen - 1 && tmp === 1) {
            BahtText += "เอ็ด";
          } else if (i === NumberLen - 2 && tmp === 2) {
            BahtText += "ยี่";
          } else if (i === NumberLen - 2 && tmp === 1) {
            BahtText += "";
          } else {
            BahtText += NumberArray[tmp];
          }
          BahtText += DigitArray[NumberLen - i - 1];
        }
      }
      BahtText += "บาท";
      if (_Number[1] === "0" || _Number[1] === "00") {
        BahtText += "ถ้วน";
      } else {
        let DecimalLen = _Number[1].length - 0;
        for (var i2 = 0; i2 < DecimalLen; i2++) {
          var tmp2 = _Number[1].substring(i2, i2 + 1) - 0;
          if (tmp2 !== 0) {
            if (i2 === DecimalLen - 1 && tmp2 === 1) {
              BahtText += "เอ็ด";
            } else if (i2 === DecimalLen - 2 && tmp2 === 2) {
              BahtText += "ยี่";
            } else if (i2 === DecimalLen - 2 && tmp2 === 1) {
              BahtText += "";
            } else {
              BahtText += NumberArray[tmp2];
            }
            BahtText += DigitArray[DecimalLen - i2 - 1];
          }
        }
        BahtText += "สตางค์";
      }
      return BahtText;
    }
  }
}

export function CheckNumber(Number) {
  var decimal = false;
  Number = Number.toString();
  Number = Number.replace(/ |,|บาท|฿/gi, "");
  for (var i = 0; i < Number.length; i++) {
    if (Number[i] === ".") {
      decimal = true;
    }
  }
  if (decimal === false) {
    Number = Number + ".00";
  }
  return Number;
}

export function getFormattedDateDiff(date1, date2) {
  var b = Moment(date1),
    a = Moment(date2),
    intervals = ["years", "months", "weeks", "days", "hours", "minutes"],
    out = {};

  for (var i = 0; i < intervals.length; i++) {
    var diff = a.diff(b, intervals[i]);
    b.add(diff, intervals[i]);
    out[intervals[i]] = diff;
  }

  if (out.years > 1) {
    return DateThai(Moment(date1).format("YYYY-MM-DD HH:mm:ss"), "datetime");
  } else if (out.months >= 1) {
    return DateThai(Moment(date1).format("YYYY-MM-DD HH:mm:ss"), "datetime");
  } else if (out.days > 1) {
    return DateThai(Moment(date1).format("YYYY-MM-DD HH:mm:ss"), "datetime");
  } else if (out.days === 1) {
    return out.days + " วันที่แล้ว";
  } else if (out.hours >= 1) {
    return out.hours + " ชั่วโมง";
  } else if (out.minutes >= 1) {
    return out.minutes + " นาที";
  }
}

export function dateDifference(start, end) {
  var s = new Date(start);
  var e = new Date(end);
  s.setHours(12, 0, 0, 0);
  e.setHours(12, 0, 0, 0);
  var totalDays = Math.round((e - s) / 8.64e7);
  var wholeWeeks = (totalDays / 7) | 0;
  var days = wholeWeeks * 5;
  if (totalDays % 7) {
    s.setDate(s.getDate() + wholeWeeks * 7);
    while (s < e) {
      s.setDate(s.getDate() + 1);
      if (s.getDay() !== 0 && s.getDay() !== 6) {
        ++days;
      }
    }
  }
  return days;
}

export function dateDifferenceNonStop(start, end) {
  var date1 = Moment(start),
    date2 = Moment(end);

  var duration = Moment.duration(date2.diff(date1));
  return duration.asDays();
}

export function thaiNumber(num) {
  var array = {
    "1": "๑",
    "2": "๒",
    "3": "๓",
    "4": "๔",
    "5": "๕",
    "6": "๖",
    "7": "๗",
    "8": "๘",
    "9": "๙",
    "0": "๐",
  };
  var str = num.toString();
  for (var val in array) {
    str = str.split(val).join(array[val]);
  }
  return str;
}

export function getAllDateBetween(startDate, endDate) {
  let dates = []
    const theDate = new Date(startDate)
    const endDate1 = new Date(endDate)
		while (theDate <= endDate1) {
			dates.push(Moment(theDate).format('YYYY-MM-DD'))
			theDate.setDate(theDate.getDate() + 1)
    }
		return dates
}


export const _checkUserType = (obj, idx) => {
  let r_obj = null;
  for (var i in obj) {
    if (String(obj[i].user_type_id) === String(idx)) {
      r_obj = true;
    }
  }
  return r_obj;
}

export function calcAge(ondate__) {
  if (ondate__) {
    var ondate = new Date(ondate__);
    var date = ondate.getDate();
    var month = ondate.getMonth();
    var year = ondate.getFullYear();

    var today = new Date();
    var dateStr = today.getDate();
    var monthStr = today.getMonth();
    var yearStr = today.getFullYear();

    var theYear = yearStr - year;
    var theMonth = monthStr - month;
    var theDate = dateStr - date;

    var inYears = 0;
    var inMonths = 0;
    var inDays = 0;
    var days = "";
    if (
      monthStr === 0 ||
      monthStr === 2 ||
      monthStr === 4 ||
      monthStr === 6 ||
      monthStr === 7 ||
      monthStr === 9 ||
      monthStr === 11
    )
      days = 31;
    if (monthStr === 3 || monthStr === 5 || monthStr === 8 || monthStr === 10)
      days = 30;
    if (monthStr === 1) days = 28;

    inYears = theYear;

    if (month < monthStr && date > dateStr) {
      inYears = parseInt(inYears) + 1;
      inMonths = theMonth - 1;
    }

    if (month < monthStr && date <= dateStr) {
      inMonths = theMonth;
    } else if (month === monthStr && (date < dateStr || date === dateStr)) {
      inMonths = 0;
    } else if (month === monthStr && date > dateStr) {
      inMonths = 11;
    } else if (month > monthStr && date <= dateStr) {
      inYears = inYears - 1;
      inMonths = 12 - -theMonth + 1;
    } else if (month > monthStr && date > dateStr) {
      inMonths = 12 - -theMonth;
    }

    if (date < dateStr) {
      inDays = theDate;
    } else if (date === dateStr) {
      inDays = 0;
    } else {
      inYears = inYears - 1;
      inDays = days - -theDate;
    }

    // var result = ["day", "month", "year"];
    // result.day = inDays;
    // result.month = inMonths;
    // result.year = inYears;
    
    return inYears+" ปี  "+(inMonths!==0?inMonths+" เดือน  ":"" )+(inDays!==0?(inDays-1)+" วัน  ":"" );
  } else {
    return "";
  }
}