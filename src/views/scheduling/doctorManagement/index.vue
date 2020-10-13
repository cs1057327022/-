<template>
    <div class="doctorManage">
        <div class="list">
            <p>医生列表</p>
            <div>
                <el-button icon="el-icon-plus" type="primary" @click="dialogFormVisible = true">新增</el-button>
                <el-dialog title="添加新医生" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                        <el-form-item label="医生名" :label-width="formLabelWidth">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="年龄" :label-width="formLabelWidth">
                            <el-input v-model="form.age"></el-input>
                        </el-form-item>
                        <el-form-item label="性别" :label-width="formLabelWidth">
                            <el-input v-model="form.sex"></el-input>
                        </el-form-item>
                        <el-form-item label="科室" :label-width="formLabelWidth">
                            <el-select v-model="form.department" placeholder="请选择科室">
                                <el-option v-for="(item, index) in department" :key="index" :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="级别" :label-width="formLabelWidth">
                            <el-input v-model="form.position"></el-input>
                        </el-form-item>
                        <el-form-item label="介绍" :label-width="formLabelWidth">
                            <el-input v-model="form.dec"></el-input>
                        </el-form-item>
                        <el-form-item label="头像" :label-width="formLabelWidth">
                            <el-input v-model="form.pic"></el-input>
                        </el-form-item>
                        <el-form-item label="收取费用" :label-width="formLabelWidth">
                            <el-input v-model="form.expenses"></el-input>
                        </el-form-item>
                        <el-form-item label="评价" :label-width="formLabelWidth">
                            <el-input v-model="form.evaluate"></el-input>
                        </el-form-item>
                        <el-form-item label="总收入" :label-width="formLabelWidth">
                            <el-input v-model="form.totalrevenue"></el-input>
                        </el-form-item>
                        <el-form-item label="记录" :label-width="formLabelWidth">
                            <el-input v-model="form.record"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号" :label-width="formLabelWidth">
                            <el-input v-model="form.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="状态" :label-width="formLabelWidth">
                            <el-input v-model="form.schedulingconfirmation"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="onCancel">取 消</el-button>
                        <el-button type="primary" @click="onConfirm">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
        <div class="table">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="name" label="姓名" width="200"> </el-table-column>
                <el-table-column prop="sex" label="性别" width="200"> </el-table-column>
                <el-table-column prop="age" label="年龄" width="150"> </el-table-column>
                <el-table-column prop="department" label="科室" width="150"> </el-table-column>
                <el-table-column prop="schedulingconfirmation" label="状态" width="150"> </el-table-column>
                <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button @click="onShow(scope.row)" type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @current-change="onChange"
                class="pagination"
                :page-size="5"
                :pager-count="11"
                layout="prev, pager, next"
                :total="doctorlength"
            >
            </el-pagination>
        </div>
        <div>
            <el-dialog title="查看信息" :visible.sync="visible">
                <el-form :model="form">
                    <el-form-item label="医生名" :label-width="formLabelWidth">
                        <el-input disabled v-model="doctorform.name"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄" :label-width="formLabelWidth">
                        <el-input disabled v-model="doctorform.age"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" :label-width="formLabelWidth">
                        <el-input disabled v-model="doctorform.sex"></el-input>
                    </el-form-item>
                    <el-form-item label="科室" :label-width="formLabelWidth">
                        <el-input disabled v-model="doctorform.sex"></el-input>
                    </el-form-item>
                    <el-form-item label="级别" :label-width="formLabelWidth">
                        <el-input disabled v-model="doctorform.position"></el-input>
                    </el-form-item>
                    <el-form-item label="介绍" :label-width="formLabelWidth">
                        <el-input disabled v-model="doctorform.dec"></el-input>
                    </el-form-item>
                    <el-form-item label="头像" :label-width="formLabelWidth">
                        <el-input disabled v-model="doctorform.pic"></el-input>
                    </el-form-item>
                    <el-form-item label="收取费用" :label-width="formLabelWidth">
                        <el-input disabled v-model="doctorform.expenses"></el-input>
                    </el-form-item>
                    <el-form-item label="评价" :label-width="formLabelWidth">
                        <el-input disabled v-model="doctorform.evaluate"></el-input>
                    </el-form-item>
                    <el-form-item label="总收入" :label-width="formLabelWidth">
                        <el-input disabled v-model="doctorform.totalrevenue"></el-input>
                    </el-form-item>
                    <el-form-item label="记录" :label-width="formLabelWidth">
                        <el-input disabled v-model="doctorform.record"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" :label-width="formLabelWidth">
                        <el-input disabled v-model="doctorform.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" :label-width="formLabelWidth">
                        <el-input disabled v-model="doctorform.schedulingconfirmation"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="visible = false">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div>
            <el-dialog title="修改状态" :visible.sync="visible2">
                <el-form :model="form">
                    <el-form-item label="医生名" :label-width="formLabelWidth">
                        <el-input disabled v-model="edit.name"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" :label-width="formLabelWidth">
                        <el-input v-model="edit.update"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="visible2 = false">取 消</el-button>
                    <el-button type="primary" @click="onSumit">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { getdoctorlimt } from '../../../api/doctorlimt';
import { mapGetters } from 'vuex';
import { insertDoctor,updatestatus } from '../../../api/doctor.js';
export default {
    data() {
        return {
            tableData: [],
            doctorlength: 0,
            dialogFormVisible: false,
            formLabelWidth: '120px',
            form: {
                name: '',
                age: '',
                sex: '',
                department: '',
                position: '',
                dec: '',
                pic: '',
                expenses: '',
                evaluate: '',
                totalrevenue: '',
                record: '',
                phone: '',
                schedulingconfirmation: ''
            },
            departments: [],
            doctorform: {},
            visible: false,
            visible2: false,
            edit:{
                name:'',
                update:''
            }
        };
    },
    created() {
        getdoctorlimt({ id: 1 }).then((res) => {
            this.tableData = res.data;
        });
        this.doctorlength = this.doctors.length;
    },
    computed: {
        ...mapGetters(['doctors', 'department'])
    },
    methods: {
        handleClick(row) {
            console.log(row);
            this.doctorform = row;
            this.visible = true;
        },
        onChange(index) {
            getdoctorlimt({ id: index }).then((res) => {
                this.tableData = res.data;
            });
        },
        onConfirm() {
            insertDoctor(this.form).then((res) => {
                console.log(res);
            });
            console.log(this.form);
            this.dialogFormVisible = false;
        },
        onCancel() {
            this.dialogFormVisible = false;
        },
        onShow(row){
            this.visible2 = true;
            this.edit.name = row.name
            
        },
        onSumit(){
            this.visible2 = false
            updatestatus(this.edit).then(res=>{
                console.log(res);
            })
        }
    }
};
</script>

<style>
.doctorManage {
    width: 90%;
    margin: 0 auto;
}
.list {
    font-weight: 600;
    font-size: 18px;
    padding: 15px 0;
    border-bottom: 1px solid #ebebeb;
    display: flex;
    justify-content: space-between;
}
.table {
    margin-top: 20px;
}
.pagination {
    margin-top: 20px;
}
</style>