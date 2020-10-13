<template>
    <div class="consulting">
        <div class="year">
            <h3>一年咨询量趋势</h3>
            <div id="myChart" style="width: 100%; height: 376px"></div>
        </div>
        <div>
            <h3>各科医生咨询量</h3>
            <div class="dep">
                <el-select @change="onChange" v-model="dep" placeholder="请选择科室">
                    <el-option v-for="(item, index) in department" :key="index" :value="item"></el-option>
                </el-select>
            </div>
            <div id="chart" style="width: 100%; height: 376px"></div>
        </div>
    </div>
</template>

<script>
import { getYear, getYearDoctor } from '../../../api/year';
import { getdoc } from '../../../api/doctor';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            year: [],
            dep: '',
        };
    },
    created() {
        let nowYear = new Date();
        let year = nowYear.getFullYear();
        getYear({ year: year }).then((res) => {
            let arr = [];
            for (let i in res.data[0]) {
                arr.push(parseInt(res.data[0][i]));
            }
            this.year = arr;

            let myChart = this.$echarts.init(document.getElementById('myChart'));
            // 绘制图表
            myChart.setOption({
                tooltip: {},
                xAxis: {
                    type: 'category',
                    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '咨询',
                        type: 'bar',
                        data: this.year
                    }
                ]
            });
        });
    },
    computed: {
        ...mapGetters(['department'])
    },
    methods: {
        get(name){
            let str = localStorage.getItem(name)
            str = JSON.parse(str)
            let arr = []
            for(let i in str[0]){
                arr.push(str[0][i])
            }
            return arr
        },
        onChange() {
            getdoc({ department: this.dep }).then((res) => {
                let nowYear = new Date();
                let year = nowYear.getFullYear();
                let arr2 = [];
                for (let i = 0; i < res.data.length; i++) {
                    arr2.push(res.data[i].name);
                    getYearDoctor({ doctor: res.data[i].name, year: year }).then((data) => {
                        console.log(data.data);
                        localStorage.setItem(res.data[i].name,JSON.stringify(data.data))
                    });
                }
                let chart = this.$echarts.init(document.getElementById('chart'));
                chart.setOption({
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: arr2
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: arr2[0],
                            type: 'line',
                            stack: '总量',
                            data: this.get(arr2[0])
                        },
                        {
                            name: arr2[1],
                            type: 'line',
                            stack: '总量',
                            data: this.get(arr2[1])
                        },
                        {
                            name: arr2[2],
                            type: 'line',
                            stack: '总量',
                            data: this.get(arr2[2])
                        },
                        {
                            name: arr2[3],
                            type: 'line',
                            stack: '总量',
                            data: this.get(arr2[3])
                        }
                    ]
                });
            });
        }
    }
};
</script>

<style scoped>
.consulting {
    width: 90%;
    margin: 0 auto;
}
h3 {
    border-bottom: 1px solid #d4cfcf;
    padding: 20px 0;
}
.dep {
    margin-top: 20px;
    float: right;
}
#chart{
    margin-top: 80px;
}
</style>