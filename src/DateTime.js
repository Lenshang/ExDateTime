import TimeSpan from "./TimeSpan.js";
import {pad} from "./Util.js";
export default class DateTime{
    /**
     * 创建一个日期时间对象
     * @param {*} year 年份
     * @param {*} month 月份(从1开始)
     * @param {*} date 日期(从1开始)
     * @param {*} hour 小时
     * @param {*} minutes 分钟
     * @param {*} seconds 秒
     * @param {*} milliseconds 毫秒
     */
    constructor(year=null,month=null,date=null,hour=null,minutes=null,seconds=null,milliseconds=null){
        if(year.getMilliseconds){
            this._constructorDate(year);
        }
        else if(typeof year==='object'&&(year.year||year.month||year.date||year.hour>=0||year.minutes>=0||year.seconds>=0)){
            this._constructor(year);
        }
        else if(typeof year=="number"&& year>9999){
            this._constructorDate(new Date(year))
        }
        else{
            this._constructor({
                year:year,
                month:month,
                date:date,
                hour:hour,
                minutes:minutes,
                seconds:seconds,
                milliseconds:milliseconds
            });
        }
    }
    _constructor(obj){
        //let now = new Date();
        let _year=obj.year?obj.year:now.getFullYear();
        let _month=obj.month?(obj.month-1):now.getMonth();
        let _date=obj.date?obj.date:1
        let _hour=obj.hour?obj.hour:0
        let _minutes=obj.minutes?obj.minutes:0
        let _seconds=obj.seconds?obj.seconds:0
        let _milliseconds=obj.milliseconds?obj.milliseconds:0
        let date=new Date(_year,_month,_date,_hour,_minutes,_seconds,_milliseconds);
        this._constructorDate(date);
    }
    _constructorDate(date){
        this._dt=date;
        this._setAttribute();
    }
    _setAttribute(){
        this.year=this._dt.getFullYear();
        this.month=this._dt.getMonth()+1;
        this.day=this._dt.getDate();
        this.hours=this._dt.getHours();
        this.minutes=this._dt.getMinutes();
        this.seconds=this._dt.getSeconds();
        this.milliseconds=this._dt.getMilliseconds();
        this.dayOfWeek=this._dt.getDay()==0?7:this._dt.getDay();
    }
    addDays(num){
        let ts=Number(this._dt)+num*24*60*60*1000;
        return new DateTime(new Date(ts));
    }
    addMonths(num){
        let dt=new Date(
            this._dt.getFullYear(),
            this._dt.getMonth()+num,
            this._dt.getDate(),
            this._dt.getHours(),
            this._dt.getMinutes(),
            this._dt.getSeconds(),
            this._dt.getMilliseconds());
        return new DateTime(dt);
    }
    addYears(num){
        let dt=new Date(
            this._dt.getFullYear()+num,
            this._dt.getMonth(),
            this._dt.getDate(),
            this._dt.getHours(),
            this._dt.getMinutes(),
            this._dt.getSeconds(),
            this._dt.getMilliseconds());
        return new DateTime(dt);
    }
    addHours(num){
        let ts=Number(this._dt)+num*60*60*1000;
        return new DateTime(new Date(ts));
    }
    addMinutes(num){
        let ts=Number(this._dt)+num*60*1000;
        return new DateTime(new Date(ts));
    }
    addSeconds(num){
        let ts=Number(this._dt)+num*1000;
        return new DateTime(new Date(ts));
    }
    addMilliseconds(num){
        let ts=Number(this._dt)+num;
        return new DateTime(new Date(ts));
    }
    /**
     * 仅获得包含日期对象部分(时间为00:00:00)
     */
    date(){
        return new DateTime(this.year,this.month,this.day);
    }
    /**
     * 获得月初时间
     */
    monthFirstDay(){
        return new DateTime(this.year,this.month,1);
    }
    monthLastDay(){
        return (new DateTime(this.year,this.month,1)).addMonths(1).addDays(-1);
    }
    /**
     * 获得与另一个时间相差的时间范围
     * @param {DateTime} date 
     * @returns {TimeSpan}
     */
    between(date){
        if(!date._dt){
            throw new Error("参数不是DateTime类型!");
        }
        let ts=Math.abs(this._dt-date._dt);
        return new TimeSpan(ts);
    }
    /**
     * 加法运算，增加一段时间
     * @param {TimeSpan} ts 
     */
    add(ts){
        return new DateTime(Number(this._dt)+ts._totalMilliseconds);
    }
    /**
     * 减法运算，减少一段时间
     * @param {TimeSpan} ts 
     */
    sub(ts){
        return new DateTime(Number(this._dt)-ts._totalMilliseconds);
    }
    /**
     * 获得时间戳字符串
     * @returns {string}
     */
    timeStamp(){
        return Number(this._dt).toString();
    }
    /**
     * 获得时间戳
     */
    timeStampNumber(){
        return Number(this._dt);
    }
    /**
     * 以指定格式序列化DateTime对象,默认为yyyy-MM-dd HH:mm:ss 
     * @param {*} formatStr 序列化格式 yyyy=年份 MM=月 dd=日期 HH=24小时制时 hh=12小时制时 mm=分钟 ss=秒
     */
    toString(formatStr="yyyy-MM-dd HH:mm:ss"){
        let result=formatStr;
        let yearpos=formatStr.indexOf("yyyy");
        let monthpos=formatStr.indexOf("MM");
        let daypos=formatStr.indexOf("dd");
        let hourpos=formatStr.indexOf("HH");
        let minutespos=formatStr.indexOf("mm");
        let secondspos=formatStr.indexOf("ss");
        if(yearpos>=0){
            result=result.replace(/yyyy/g,this.year);
        }
        if(monthpos>=0){
            result=result.replace(/MM/g,pad(this.month,2));
        }
        if(daypos>=0){
            result=result.replace(/dd/g,pad(this.day,2));
        }
        if(hourpos>=0){
            result=result.replace(/HH/g,pad(this.hours,2));
        }
        if(minutespos>=0){
            result=result.replace(/mm/g,pad(this.minutes,2));
        }
        if(secondspos>=0){
            result=result.replace(/ss/g,pad(this.seconds,2))
        }
        return result;
    }
    /**
     * 将字符串时间按照指定格式转换成DateTime对象
     * @param {string} dateStr 
     * @param {string} formatStr 
     * @returns {DateTime}
     */
    static convert(dateStr,formatStr){
        if(dateStr.length!=formatStr.length){
            throw new Error("format 格式错误!")
        }
        let _year=1970;
        let _month=1;
        let _day=1;
        let _hour=0
        let _minute=0
        let _second=0

        let yearpos=formatStr.indexOf("yyyy");
        let monthpos=formatStr.indexOf("MM");
        let daypos=formatStr.indexOf("dd");
        let hourpos=formatStr.indexOf("HH");
        let minutespos=formatStr.indexOf("mm");
        let secondspos=formatStr.indexOf("ss");
        if(yearpos>=0){
            _year=parseInt(dateStr.substr(yearpos,4));
        }
        if(monthpos>=0){
            _month=parseInt(dateStr.substr(monthpos,2));
        }
        if(daypos>=0){
            _day=parseInt(dateStr.substr(daypos,2));
        }
        if(hourpos>=0){
            _hour=parseInt(dateStr.substr(hourpos,2));
        }
        if(minutespos>=0){
            _minute=parseInt(dateStr.substr(minutespos,2));
        }
        if(secondspos>=0){
            _second=parseInt(dateStr.substr(secondspos,2));
        }
        return new DateTime(_year,_month,_day,_hour,_minute,_second);
    }
    /**
     * 获得当前时间的DateTime对象
     * @returns {DateTime}
     */
    static now(){
        return new DateTime(new Date());
    }
    /**
     * 获得指定月份的天数
     * @param {string} year 
     * @param {string} month 
     * @returns {number} 天数
     */
    static monthDays(year,month){
        return (new DateTime(year,month)).addMonths(1).addDays(-1).day;
    }
    /**
     * 获得指定年份的天数
     * @param {number} year 
     */
    static yearDays(year){
        let total=0;
        for(let i=1;i<13;i++){
            total+=DateTime.monthDays(year,i);
        }
        return total;
    }
}