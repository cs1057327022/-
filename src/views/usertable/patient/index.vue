<template>
    <div>
        <el-table
            :data="tableData.filter((data) => !search || data.newphone.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%"
        >
            <el-table-column label="用户/手机号" prop="phone"> </el-table-column>
            <el-table-column label="密码" prop="password"> </el-table-column>
            <el-table-column align="center">
                <template slot="header" slot-scope="scope">
                    <el-input v-model="search" style="width: 200px" placeholder="搜索" />
                    <el-button type="primary" @click="look" icon="el-icon-search">搜索</el-button>
                    <el-button type="primary" @click="back">返回</el-button>
                </template>
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-size="50" @current-change="currentChange" :pager-count="7" layout="prev, pager, next" :total="long" align="right"> </el-pagination>
    </div>
</template>

<script>
import { getpatient, removeruser, serchuser } from '../../../api/table';
export default {
    data() {
        return {
            tableData: [],
            search: '',
            long:0
        };
    },
    created() {
        getpatient({ page: 1 }).then((res) => {
            let arr = [];
            for (let i = 0; i < res.data.length; i++) {
                let str = res.data[i].password;
                str = str.replace(/(.*)/, '************');

                let str1 = res.data[i].phone;
                str1 = str1.substr(0, 3) + '****' + str1.substr(7);
                let obj = {};
                obj.phone = str1;
                obj.password = str;
                obj.newphone = res.data[i].phone;
                arr.push(obj);
            }
            this.tableData = arr;
        });
        getpatient().then((res) => {
            this.long = res.data.length
        });
    },
    methods: {
        handleDelete(index, row) {
            removeruser({ phone: row.newphone });
            setTimeout(() => {
                this.$router.go(0);
            }, 100);
        },
        look() {
            serchuser({ phone: this.search }).then((res) => {
                console.log(res.data[0]);
                let arr = [];
                let str = res.data[0].password;
                str = str.replace(/(.*)/, '************');

                let str1 = res.data[0].phone;
                str1 = str1.substr(0, 3) + '****' + str1.substr(7);
                let obj = {};
                obj.phone = str1;
                obj.password = str;
                obj.newphone = res.data[0].phone;
                arr.push(obj);
                // console.log(arr);
                this.tableData = arr;
                this.search = '';
            });
        },
        back() {
            getpatient({ page: 1 }).then((res) => {
                let arr = [];
                for (let i = 0; i < res.data.length; i++) {
                    let str = res.data[i].password;
                    str = str.replace(/(.*)/, '************');

                    let str1 = res.data[i].phone;
                    str1 = str1.substr(0, 3) + '****' + str1.substr(7);
                    let obj = {};
                    obj.phone = str1;
                    obj.password = str;
                    obj.newphone = res.data[i].phone;
                    arr.push(obj);
                }
                this.tableData = arr;
            });
        },
        currentChange(index){
            getpatient({ page: index }).then((res) => {
            let arr = [];
            for (let i = 0; i < res.data.length; i++) {
                let str = res.data[i].password;
                str = str.replace(/(.*)/, '************');

                let str1 = res.data[i].phone;
                str1 = str1.substr(0, 3) + '****' + str1.substr(7);
                let obj = {};
                obj.phone = str1;
                obj.password = str;
                obj.newphone = res.data[i].phone;
                arr.push(obj);
            }
            this.tableData = arr;
        });
        }
    }
};
</script>

<style>
</style>