<template>
    <div class="month">
        <dateRl style="width: 70%;" @day="day"></dateRl>
        <div class="choose">
            <div>
                <p>科室选择</p>
                <el-select @change="onChange" v-model="value" clearable placeholder="请选择">
                    <el-option v-for="item in options" :key="item" :value="item"> </el-option>
                </el-select>
            </div>

            <div>
                <p>时间</p>
                <p class="time">{{ time }}</p>    
            </div>
            <div>
                <p>上午</p>
                <el-select @change="onChange1" v-model="value1" multiple clearable placeholder="请选择">
                    <el-option v-for="(item, index) in doctorName" :key="index" :value="item"> </el-option>
                </el-select>
            </div>
            <div>
                <p>下午</p>
                <el-select @change="onChange2" v-model="value2" multiple clearable placeholder="请选择">
                    <el-option v-for="(item, index) in doctorName" :key="index" :value="item"> </el-option>
                </el-select>
            </div>
            <div>
                <p>晚上</p>
                <el-select @change="onChange3" v-model="value3" multiple clearable placeholder="请选择">
                    <el-option v-for="(item, index) in doctorName" :key="index" :value="item"> </el-option>
                </el-select>
            </div>
            <el-button @click="onClick" class="btn" type="primary" icon="el-icon-check">提交</el-button>
        </div>
    </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
import dateRl from '@/components/date';
export default {
    components: {
        dateRl
    },
    data() {
        return {
            doctor: [],
            options: [],
            value: '',
            value1: '',
            value2: '',
            value3: '',
            time: '',
            doctorName: [],
            morning:[],
            afternoon:[],
            night:[],
            department:''
        };
    },
    computed: {
        ...mapGetters(['doctors'])
    },
    created() {
        // console.log(this.doctors);
        let arr = JSON.parse(JSON.stringify(this.doctors));
        console.log(arr);
        let arr1 = [];
        for (let i = 0; i < arr.length; i++) {
            arr1.push(arr[i].department);
        }
        arr1 = new Set(arr1);
        arr1 = Array.from(arr1);
        this.options = arr1;
        this.updatedepartment(arr1)
    },
    methods: {
        ...mapActions(['updateCalendar','updatedepartment']),
        onChange(item) {
            let arr = JSON.parse(JSON.stringify(this.doctors));
            let doctorName = [];
            for (let i = 0; i < arr.length; i++) {
                if (item == arr[i].department) {
                    doctorName.push(arr[i].name);
                }
                this.doctorName = doctorName;
            }
            this.department = item
        },
        onChange1(item) {
            this.morning = item
        },
        onChange2(item) {
            this.afternoon = item
        },
        onChange3(item) {
            this.night = item
        },
        day(day) {
            let time = new Date(day).getTime();
            var date = new Date(time);
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
            this.time = Y + M + D;
        },
        onClick(){
            let obj = {}
            obj.department = this.department
            obj.time = this.time
            obj.morning = JSON.stringify(this.morning)
            obj.afternoon = JSON.stringify(this.afternoon)
            obj.night = JSON.stringify(this.night)
            console.log(obj);
            this.updateCalendar(obj)
            this.value= ''
            this.value1=''
            this.value2=''
            this.value3=''
            this.time=''
            setTimeout(() => {
                this.$router.go(0)
            }, 500);
            
        }
    }
};
</script>

<style scoped>
.month {
    display: flex;
}
.time{
    width: 180px;
    height: 10px;
    line-height: 10px;
    padding: 10px;
    border: 1px solid #DCDFE6;
}
.choose{
    margin-top: 50px;
    margin-left: 70px;
}
.btn{
    margin-top: 20px;
}
</style>