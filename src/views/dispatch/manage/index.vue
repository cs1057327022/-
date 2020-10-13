<template>
    <div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="全部" name="first">
                <div>
                    <el-table :data="tableData" border>
                        <el-table-column prop="patientname" label="姓名" width="210"> </el-table-column>
                        <el-table-column prop="submittime" label="提交时间" width="210"> </el-table-column>
                        <el-table-column prop="doctor" label="医生" width="210"> </el-table-column>
                        <el-table-column prop="consulttype" label="类别" width="210"> </el-table-column>
                        <el-table-column prop="consultcontent" label="病因" width="208"> </el-table-column>
                        <el-table-column prop="consultcost" label="支付费用(元)" width="200"> </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="可调度" name="second">
                <div>
                    <el-table :data="tableData1" border style="width: 100%">
                        <el-table-column prop="patientname" label="姓名" width="200"> </el-table-column>
                        <el-table-column prop="submittime" label="提交时间" width="200"> </el-table-column>
                        <el-table-column prop="doctor" label="医生" width="150"> </el-table-column>
                        <el-table-column prop="consulttype" label="类别" width="150"> </el-table-column>
                        <el-table-column prop="consultcontent" label="病因" width="150"> </el-table-column>
                        <el-table-column prop="consultcost" label="支付费用(元)" width="150"> </el-table-column>
                        <el-table-column fixed="right" label="操作" width="400">
                            <template slot-scope="scope">
                                <el-button @click="handleClick2(scope.row)" type="text" size="small">去调度</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="已调度" name="third">
                <div>
                    <el-table :data="tableData2" border style="width: 100%">
                        <el-table-column prop="patientname" label="姓名" width="200"> </el-table-column>
                        <el-table-column prop="submittime" label="提交时间" width="200"> </el-table-column>
                        <el-table-column prop="newdoctor" label="医生" width="150"> </el-table-column>
                        <el-table-column prop="consulttype" label="类别" width="150"> </el-table-column>
                        <el-table-column prop="consultcontent" label="病因" width="150"> </el-table-column>
                        <el-table-column prop="consultcost" label="支付费用(元)" width="150"> </el-table-column>
                        <el-table-column fixed="right" label="操作" width="400">
                            <template slot-scope="scope">
                                <el-button @click="handleClick1(scope.row)" type="text" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
        </el-tabs>
        <div>
            <el-dialog title="添加新医生" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="医生">
                        <el-select v-model="form.newdoctor" placeholder="请选择医生">
                            <el-option v-for="(item, index) in doctorName" :key="index" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="onConfirm">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { getOrders, updateOrders } from '../../../api/order';
import { getdoctor, getdoc  } from '../../../api/doctor';
export default {
    data() {
        return {
            activeName: 'first',
            tableData: [],
            tableData1: [],
            tableData2: [],
            doctorName: [],
            dialogFormVisible: false,
            form: {
                id: '',
                newdoctor: ''
            }
        };
    },
    created() {
        getOrders().then((res) => {
            this.tableData = res.data;
            let arr = [];
            let arr1 = [];
            for (let i = 0; i < res.data.length; i++) {
                // console.log(res.data[i]);
                if (res.data[i].newdoctor == undefined||res.data[i].newdoctor == '' ||res.data[i].newdoctor == null) {
                    // console.log(res.data[i]);
                    arr.push(res.data[i]);
                } else {
                    arr1.push(res.data[i]);
                }
            }
            this.tableData1 = arr;
            this.tableData2 = arr1;
        });
    },
    methods: {
        handleClick(tab, event) {
            // console.log(tab, event);
        },
        handleClick2(row) {
            // console.log(row);
            this.form.id = row.id;
            this.dialogFormVisible = true;
            getdoctor().then((res) => {
                console.log(res.data);
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].name == row.doctor) {
                        getdoc({ department: res.data[i].department }).then((res) => {
                            this.doctorName = res.data;
                        });
                        return;
                    }
                }
            });
        },
        handleClick1(row) {
            console.log(row);
            updateOrders({id:row.id,newdoctor:''}).then((res) => {
                console.log(res);
            });
            setTimeout(() => {
                this.$router.go(0);
            }, 500);
            
        },
        onConfirm() {
            this.dialogFormVisible = false;
            updateOrders(this.form).then((res) => {
                console.log(res);
            });
            setTimeout(() => {
                this.$router.go(0);
            }, 500);
        }
    }
};
</script>

<style>
</style>