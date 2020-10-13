<template>
    <div>
        <el-button type="primary" @click="dialogFormVisible = true" icon="el-icon-plus" style="float: right; margin: 10px 0"
            >新增</el-button
        >
        <el-table
            :data="
                tableData.filter(
                    (data) =>
                        !search ||
                        data.phone.toLowerCase().includes(search.toLowerCase()) ||
                        data.jobId.toLowerCase().includes(search.toLowerCase())
                )
            "
            style="width: 100%"
        >
            <el-table-column label="工号" prop="jobId"> </el-table-column>
            <el-table-column label="密码" prop="password"> </el-table-column>
            <el-table-column label="电话" prop="phone"> </el-table-column>
            <el-table-column align="center">
                <template slot="header" slot-scope="scope">
                    <el-input v-model="search" style="width: 140px" placeholder="搜索" />
                    <el-button type="primary" @click="look" icon="el-icon-search">搜索</el-button>
                    <el-button type="primary" @click="back">返回</el-button>
                </template>
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            :page-size="50"
            @current-change="currentChange"
            :pager-count="7"
            layout="prev, pager, next"
            :total="length"
            align="right"
        >
        </el-pagination>
        <div>
            <el-dialog title="医生注册" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="工号" :label-width="formLabelWidth">
                        <el-input v-model="form.jobId" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" :label-width="formLabelWidth">
                        <el-input v-model="form.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" :label-width="formLabelWidth">
                        <el-input v-model="form.phone" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="onSure">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { getdoctoruser, searchdoctor, doctorregister, removedoctor } from '../../../api/doctoruser';
export default {
    data() {
        return {
            tableData: [],
            search: '',
            length: 0,
            formLabelWidth: '120px',
            dialogFormVisible: false,
            form: {
                jobId: '',
                password: '',
                phone: ''
            }
        };
    },
    created() {
        getdoctoruser({ page: 1 }).then((res) => {
            let arr = [];
            for (let i = 0; i < res.data.length; i++) {
                let str = res.data[i].password;
                str = str.replace(/(.*)/, '************');

                let obj = {};
                obj.phone = res.data[i].phone;
                obj.password = str;
                obj.jobId = res.data[i].jobnumber;
                arr.push(obj);
            }
            this.tableData = arr;
        });
        getdoctoruser().then((res) => {
            this.length = res.data.length;
        });
    },
    methods: {
        handleDelete(index, row) {
            console.log(row);
            removedoctor({ phone: row.phone });
            setTimeout(() => {
                this.$router.go(0);
            }, 100);
        },
        look() {
            let key = {};
            if (this.search.length == 5) {
                key.jobId = this.search;
            } else {
                key.phone = this.search;
            }
            searchdoctor(key).then((res) => {
                let arr = [];
                let str = res.data[0].password;
                str = str.replace(/(.*)/, '************');

                let obj = {};
                obj.phone = res.data[0].phone;
                obj.password = str;
                obj.jobId = res.data[0].jobnumber;
                arr.push(obj);
                // console.log(arr);
                this.tableData = arr;
                this.search = '';
            });
        },
        back() {
            getdoctoruser({ page: 1 }).then((res) => {
                let arr = [];
                for (let i = 0; i < res.data.length; i++) {
                    let str = res.data[i].password;
                    str = str.replace(/(.*)/, '************');

                    let obj = {};
                    obj.phone = res.data[i].phone;
                    obj.password = str;
                    obj.jobId = res.data[i].jobnumber;
                    arr.push(obj);
                }
                this.tableData = arr;
            });
        },
        onSure() {
            doctorregister(this.form);
            this.dialogFormVisible = false;
            setTimeout(() => {
                this.$router.go(0);
            }, 100);
        },
        currentChange(index) {
            getdoctoruser({ page: index }).then((res) => {
                let arr = [];
                for (let i = 0; i < res.data.length; i++) {
                    let str = res.data[i].password;
                    str = str.replace(/(.*)/, '************');

                    let obj = {};
                    obj.phone = res.data[i].phone;
                    obj.password = str;
                    obj.jobId = res.data[i].jobnumber;
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