import DateTime from "../src/DateTime.js";
import TimeSpan from "../src/TimeSpan.js";

var dt1=DateTime.now();
var dt2=dt1.monthLastDay();

var ts1=dt1.between(dt2);
console.log("现在的时间是:"+dt1.toString("yyyy年MM月dd日 HH时mm分ss秒")+" 时间戳:"+dt1.timeStamp());
console.log("这个月的月末日期是:"+dt1.toString());
console.log("今天距离月末还有:"+ts1.totalDays+"天");

var ts1=TimeSpan.fromDay(3).addHours(18).addMinutes(10);
console.log("距离现在3天18小时10分钟前的时间是:"+DateTime.now().sub(ts1).toString());

console.log("距离现在3天18小时10分钟前的时间是:"+DateTime.now().addDays(-3).addHours(-18).addMinutes(-10).toString());

var day1=DateTime.convert("2020-01-01","yyyy-MM-dd")
var day2=new DateTime(2020,3,1);
console.log(day1>day2);
console.log(day2>day1);

console.log(`现在是${DateTime.now().month}月,这个月共有${DateTime.monthDays(DateTime.now().year,DateTime.now().month)}天`)
for(let i=1990;i<=DateTime.now().year;i++){
    console.log(i+"年共有"+DateTime.yearDays(i)+"天");
}
