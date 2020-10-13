<template>
    <div>
        <el-button @click="dialogFormVisible = true" type="primary" icon="el-icon-plus" style="float: right; margin: 20px 0"
            >新增</el-button
        >
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="hospitalname" label="医院名" width="150"> </el-table-column>
            <el-table-column prop="hospitaladdress" label="地址" width="150"> </el-table-column>
            <el-table-column prop="hospitalgrade" label="等级" width="150"> </el-table-column>
            <el-table-column prop="hospitalintroduce" label="简介" width="548"> </el-table-column>
            <el-table-column label="操作" width="250">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-size="50"  @current-change="currentChange" :pager-count="7" layout="prev, pager, next"  :total="length" align="right"> </el-pagination>
        <div>
            <el-dialog title="文章添加" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="医院名" :label-width="formLabelWidth">
                        <el-input v-model="form.hospitalname" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="医院地址" :label-width="formLabelWidth">
                        <el-input v-model="form.hospitaladdress" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="医院等级" :label-width="formLabelWidth">
                        <el-input v-model="form.hospitalgrade" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="医院简介" :label-width="formLabelWidth">
                        <el-input type="textarea" v-model="form.hospitalintroduce" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="医院评分" :label-width="formLabelWidth">
                        <el-input v-model="form.hospitalscore" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="医院预约量" :label-width="formLabelWidth">
                        <el-input v-model="form.hospitalamount" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="医院网址" :label-width="formLabelWidth">
                        <el-input v-model="form.hospitaladdressurl" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="医院图片" :label-width="formLabelWidth">
                        <el-upload action="https://jsonplaceholder.typicode.com/posts/" ref="upload" list-type="picture-card" :auto-upload="true" :on-change="onChange">
                            <i slot="default" class="el-icon-plus"></i>
                            <div slot="file" slot-scope="{ file }">
                                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                                <span class="el-upload-list__item-actions">
                                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                        <i class="el-icon-zoom-in"></i>
                                    </span>
                                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                        <i class="el-icon-delete"></i>
                                    </span>
                                </span>
                            </div>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="onSumit">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { gethospital,addhospital,removehospital } from '../../api/hospital'
export default {
    data() {
        return {
            tableData: [],
            dialogFormVisible: false,
            formLabelWidth: '120px',
            form: {
                hospitalname: '',
                hospitaladdress: '',
                hospitalgrade: '',
                hospitalintroduce:'',
                hospitalscore:'',
                hospitalamount:'',
                hospitaladdressurl:'',
                imgsrc:[]
            },
            disabled: false,
            dialogImageUrl: '',
            dialogVisible: false,
            length:0
        };
    },
    created() {
        gethospital({page:1}).then(res=>{
            console.log(res);
            this.tableData = res.data
        })
        gethospital().then(res=>{
            this.length=res.data.length
        })
    },
    methods: {
        handleRemove(file) {
            let fileList = this.$refs.upload.uploadFiles;
            let index = fileList.findIndex((fileItem) => {
                return fileItem.uid === file.uid;
            });
            fileList.splice(index, 1);
            let arr = []
            for(let i =0;i<fileList.length;i++){
                arr.push(fileList[i].url)
            }
            this.form.imgsrc = arr
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        onChange(file,fileList) {
            let arr = []
            for(let i =0;i<fileList.length;i++){
                arr.push(fileList[i].url)
            }
            arr = JSON.stringify(arr)
            this.form.imgsrc = arr
        },
        onSumit(){
            addhospital(this.form)
            this.dialogFormVisible = false
            setTimeout(()=>{
                this.$router.go(0);
            },100)
        },
        handleClick(row){
            removehospital({id:row.id})
            setTimeout(()=>{
                this.$router.go(0);
            },100)
        },
        currentChange(index){
            gethospital({page:index}).then(res=>{
            this.tableData = res.data
        })
        }
    }
};
</script>

<style>
</style>