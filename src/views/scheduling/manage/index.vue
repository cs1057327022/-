<template>
    <div class="manage">
        <div>
            <h3>排班情况</h3>
            <ul>
                <li>
                    <p>今日待排班</p>
                    <p>{{ doctor }}</p>
                </li>
                <li>
                    <p>今日排班进度</p>
                    <p>{{ progress }}%</p>
                </li>
                <li>
                    <p>今日医生变动</p>
                    <p>暂无</p>
                </li>
                <li>
                    <p>评分</p>
                    <p>{{ evaluate }}</p>
                </li>
            </ul>
        </div>
        <div class="wait">
            <h3>今日排班</h3>
            <div>
                <div class="wait-item" v-for="(item, index) in arrange" :key="index">
                    <img class="calendarimage" src="@/assets/img/u133.png" />
                    <div>
                        <p class="time">{{ item.time }}</p>
                        <p class="department">科室: {{ item.department }}</p>
                        <p class="duty">值班人员：</p>
                        <p class="title">{{ item.title }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getdoctor, updateDoctors,updatefalse } from '@/api/doctor';
import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            doctor: 0,
            progress: 0,
            evaluate: 0,
            arrange: []
        };
    },
    created() {
        getdoctor().then((res) => {
            // console.log(res.data);
            let time = '';
            let Y = new Date().getFullYear();
            let M = new Date().getMonth() + 1 < 10 ? '0' + new Date().getMonth() + 1 : new Date().getMonth() + 1;
            let D = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate();
            time = '' + Y + M + D;

            let gt = localStorage.getItem('time');
            if (gt) {
                if (gt == time) {
                    return
                } else {
                    for (let i = 0; i < res.data.length; i++) {
                        updatefalse({ name: res.data[i].name });
                    }
                    localStorage.setItem('time', time);
                }
            } else {
                localStorage.setItem('time', time);
            }
        });

        
        this.updateCalendars().then((res) => {
            // console.log(res.data);
            let time = new Date().getTime();
            var date = new Date(time);
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            let timer = Y + M + D;
            let arr = [];
            let str = '';
            let str1 = '';
            for (let i = 0; i < res.data.length; i++) {
                // console.log(res.data[i].time)
                if (timer == res.data[i].time) {
                    let obj = {};
                    obj.department = res.data[i].department;
                    let morning = JSON.parse(res.data[i].afternoon);
                    let afternoon = JSON.parse(res.data[i].night);
                    let night = JSON.parse(res.data[i].morning);
                    let newarr = morning.concat(afternoon);
                    let newarr1 = newarr.concat(night);
                    newarr1 = new Set(newarr1);
                    newarr1 = Array.from(newarr1);

                    for (let j = 0; j < newarr1.length; j++) {
                        str += newarr1[j] + ' ';
                    }
                    obj.title = str;
                    obj.time = timer;
                    arr.push(obj);
                    str1 += str;
                }
            }
            this.arrange = arr;
            let arr1 = str1.split(' ');
            arr1 = new Set(arr1);
            arr1 = Array.from(arr1);
            for (let i = 0; i < arr1.length - 1; i++) {
                updateDoctors({ name: arr1[i] });
            }
        });

        this.updateDoctor().then((res) => {
            // console.log(res);
            let count = res.length;
            let length = [];
            for (let i = 0; i < res.length; i++) {
                if (res[i].schedulingconfirmation == 'false') {
                    length.push(res[i]);
                } else {
                    let num = res.length / count;
                    this.progress = parseInt(num * 100);
                }
                let sum = 0;
                sum += res[i].evaluate;
                this.evaluate = (sum / count).toFixed(1);
            }
            this.doctor = length.length;
        });
    },
    methods: {
        ...mapActions(['updateDoctor', 'updateCalendars'])
    }
};
</script>

<style scoped>
h3 {
    border-bottom: 1px solid #d4cfcf;
    padding: 30px 0;
}
.manage {
    width: 90%;
    margin: 0 auto;
}
ul {
    overflow: hidden;
    margin-top: 20px;
}
ul > li {
    float: left;
    width: 23%;
    border-right: 1px solid #d4cfcf;
    margin-left: 10px;
}
ul > li > p:first-child {
    font-size: 16px;
    color: #d4cfcf;
    padding: 5px 0;
}
ul > li > p:last-child {
    font-size: 26px;
    color: #000;
    padding: 5px 0;
}
.wait > h3 {
    margin-top: 40px;
}
.calendarimage {
    width: 100px;
    height: 100px;
}
.wait-item {
    width: 30%;
    height: 150px;
    border: 1px solid #d4cfcf;
    display: flex;
    justify-content: start;
    border-radius: 25px;
    float: left;
    margin-left: 20px;
    margin-top: 20px;
    box-sizing: border-box;
    padding: 20px;
}
.wait-item:hover {
    box-shadow: 1px 1px 10px #000000;
}
.wait-item > div {
    margin-left: 10px;
}
.time {
    font-size: 20px;
    color: #d4cfcf;
}
.department {
    font-size: 14px;
    color: #000000;
}
.title {
    margin-top: 5px;
    font-size: 12px;
    color: #fde5b9;
    font-weight: 600;
}
.duty {
    font-size: 14px;
    color: #000000;
}
</style>