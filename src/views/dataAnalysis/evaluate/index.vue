<template>
    <div class="evaluate">
        <div>
            <h3>医生所得评价占比</h3>
            <div class="rated">
                <div id="chart" style="width: 40%; height: 376px"></div>
                <div>
                    <p>医生总人数:{{ count.length }}人</p>
                    <p>好评医生人数占比: {{ good }}%</p>
                    <p>差评医生人数占比: {{ bad }}%</p>
                </div>
            </div>
        </div>
        <div>
            <h3>医生评价排行</h3>
            <div class="sort" v-for="(item,index) in sort" :key="index">
                <p>{{item.name}}:</p>
                <p :style="{width:item.evaluate*50+'px'}"></p>
                <p style="margin-left: 20px;">{{item.evaluate}}分</p>
            </div>
        </div>
    </div>
</template>

<script>
import { getdoctor } from '../../../api/doctor';
export default {
    data() {
        return {
            good: '',
            bad: '',
            count: [],
            sort:[]
        };
    },
    created() {
        getdoctor().then((res) => {
            let arr = [];
            let arr1 = [];
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].evaluate > 3) {
                    arr.push(res.data[i]);
                } else {
                    arr1.push(res.data[i]);
                }
            }
            this.count = res.data;
            this.good = (arr.length / res.data.length) * 100;
            this.bad = (arr1.length / res.data.length) * 100;


            function sortByKey(array, key) {
                return array.sort(function (a, b) {
                    var y = a[key]; //如果要从大到小,把x,y互换就好
                    var x = b[key];
                    return x < y ? -1 : x > y ? 1 : 0;
                });
            }
            let arr3 = sortByKey(res.data,'evaluate')
            this.sort = arr3

            let myChart = this.$echarts.init(document.getElementById('chart'));
            myChart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['好评', '差评']
                },
                series: [
                    {
                        name: '官方数据',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [
                            { value: arr.length, name: '好评' },
                            { value: arr1.length, name: '差评' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            });
        });
    },
    methods: {}
};
</script>

<style scoped>
.evaluate {
    width: 90%;
    margin: 0 auto;
}
h3 {
    padding: 20px 0;
    border-bottom: 1px solid #d4cfcf;
}
.rated {
    display: flex;
    margin-top: 20px;
    justify-content: space-around;
}
.sort{
    display: flex;
    align-items: center;
    height: 30px;
    line-height: 30px;
    padding: 5px 0;
    margin-top: 20px;
}
.sort>p:first-child{
    font-size: 18px;
    color: #000;
    font-weight: 600;
}
.sort>p:nth-child(2){
    height: 20px;
    background: red;
}
</style>