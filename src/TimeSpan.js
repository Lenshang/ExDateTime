export default class TimeSpan{
    constructor(milliseconds=null){
        this._totalMilliseconds=0;
        if(typeof milliseconds==='number'){
            this._totalMilliseconds=milliseconds;
        }
        else if(typeof milliseconds==="object" && (milliseconds.hour>=0||milliseconds.minutes>=0||milliseconds.seconds>=0)){
            if(obj.hour){
                this._totalMilliseconds+=obj.hour*60*60*1000;
            }
            if(obj.minutes){
                this._totalMilliseconds+=obj.minutes*60*1000;
            }
            if(obj.seconds){
                this._totalMilliseconds+=obj.seconds*1000;
            }
            if(obj.milliseconds){
                this._totalMilliseconds+=obj.milliseconds;
            }
        }
        this.totalSeconds=parseInt(this._totalMilliseconds/1000);
        this.totalMinutes=parseInt(this.totalSeconds/60);
        this.totalHours=parseInt(this.totalMinutes/60);
        this.totalDays=parseInt(this.totalHours/24);
        this.totalMilliseconds=this._totalMilliseconds;
    }
    addDays(num){
        return new TimeSpan(this._totalMilliseconds+num*24*60*60*1000);
    }
    addHours(num){
        return new TimeSpan(this._totalMilliseconds+num*60*60*1000);
    }
    addMinutes(num){
        return new TimeSpan(this._totalMilliseconds+num*60*1000);
    }
    addSeconds(num){
        return new TimeSpan(this._totalMilliseconds+num*1000);
    }
    addSeconds(num){
        return new TimeSpan(this._totalMilliseconds+num*1000);
    }
    addMilliseconds(num){
        return new TimeSpan(this._totalMilliseconds+num);
    }
    /**
     * 加法运算计算时间段
     * @param {TimeSpan} ts 
     * @returns 
     */
    add(ts){
        if(!ts._totalMilliseconds>=0){
            throw new Error("参数不是TimeSpan类型!")
        }
        let r=this._totalMilliseconds+ts._totalMilliseconds;
        return new TimeSpan(r);
    }
    /**
     * 减法运算计算时间段
     * @param {TimeSpan} ts 
     */
    sub(ts){
        if(!ts._totalMillisecond>=0){
            throw new Error("参数不是TimeSpan类型!")
        }
        let r=this._totalMilliseconds-ts._totalMilliseconds;
        if(r<0){
            throw new Error("结果是负的!");
        }
        return new TimeSpan(r);
    }
    valueOf(){
        return this._totalMilliseconds;
    }
    static fromDay(_day){
        return new TimeSpan(_day*24*60*60*1000);
    }
    static fromHour(_hour){
        return new TimeSpan(_hour*60*60*1000);
    }
    static fromMinutes(_minutes){
        return new TimeSpan(_minutes*60*1000);
    }
    static fromSeconds(_seconds){
        return new TimeSpan(_seconds*1000);
    }
    static fromMilliseconds(_milliseconds){
        return new TimeSpan(milliseconds);
    }
    static convert(dateStr,formatStr){
        if(dateStr.length!=formatStr.length){
            throw new Error("format 格式错误!")
        }
        let _day=0
        let _hour=0
        let _minute=0
        let _second=0
        let daypos=formatStr.indexOf("dd");
        let hourpos=formatStr.indexOf("HH");
        let minutespos=formatStr.indexOf("mm");
        let secondspos=formatStr.indexOf("ss");

        if(daypos>=0){
            _day=dateStr.substr(daypos,2);
        }
        if(hourpos>=0){
            _hour=dateStr.substr(hourpos,2);
        }
        if(minutespos>=0){
            _minute=dateStr.substr(minutespos,2);
        }
        if(secondspos>=0){
            _second=dateStr.substr(secondspos,2);
        }
        let ts=_day*24*60*60*1000;
        ts+=_hour*60*60*1000;
        ts+=_minute*60*1000;
        ts+=_second*1000;
        return new TimeSpan(ts);
    }
}