<template>
    <div>
        <el-button @click="dialogFormVisible = true" type="primary" icon="el-icon-plus" style="float: right; margin: 20px 0"
            >新增</el-button
        >
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="title" label="标题" width="150"> </el-table-column>
            <el-table-column prop="content" label="正文" width="600"> </el-table-column>
            <el-table-column prop="kind" label="种类" width="128"> </el-table-column>
            <el-table-column prop="pic" label="图片" width="120"> </el-table-column>
            <el-table-column label="操作" width="250">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
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
            <el-dialog title="文章添加" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="文章标题" :label-width="formLabelWidth">
                        <el-input v-model="form.title" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="类型" :label-width="formLabelWidth">
                        <el-input v-model="form.kind" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="内容" :label-width="formLabelWidth">
                        <el-input type="textarea" v-model="form.content" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="图片" :label-width="formLabelWidth">
                        <el-upload action="https://jsonplaceholder.typicode.com/posts/" ref="upload" list-type="picture-card" :on-success="success"  :auto-upload="true" :on-change="onChange">
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
import { upload } from '../../api/upload'
import { getarticle, addarticle, removearticle } from '../../api/article';
export default {
    data() {
        return {
            tableData: [],
            dialogFormVisible: false,
            formLabelWidth: '120px',
            form: {
                title: '',
                kind: '',
                content: '',
                imgsrc: []
            },
            disabled: false,
            dialogImageUrl: '',
            dialogVisible: false,
            length: 0,
            src:[]
        };
    },
    created() {
        getarticle({ page: 1 }).then((res) => {
            console.log(res);
            this.tableData = res.data;
        });
        getarticle().then((res) => {
            this.length = res.data.length;
        });
    },
    methods: {
        handleRemove(file) {
            let fileList = this.$refs.upload.uploadFiles;
            let index = fileList.findIndex((fileItem) => {
                return fileItem.uid === file.uid;
            });
            fileList.splice(index, 1);
            let arr = [];
            for (let i = 0; i < fileList.length; i++) {
                arr.push(fileList[i].url);
            }
            this.form.imgsrc = arr;
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        onChange(file, fileList) {
            // let arr = [];
            // for (let i = 0; i < fileList.length; i++) {
            //     arr.push(fileList[i].url);
            // }
            // arr = JSON.stringify(arr);
            // this.form.imgsrc = arr;
        },
        onSumit() {
            addarticle(this.form);
            this.dialogFormVisible = false;
            // let imgsrc = new FormData()
            // console.log(this.$refs.upload.$children[0].files[0])
            // let file = this.$refs.upload.$children[0].files[0].raw
            // imgsrc.append('imgpath',file)
            setTimeout(()=>{
                this.$router.go(0);
            },100)
            // upload(imgsrc)

        },
        handleClick(row) {
            removearticle({ id: row.id });
            setTimeout(() => {
                this.$router.go(0);
            }, 100);
        },
        currentChange(index) {
            getarticle({ page: index }).then((res) => {
                console.log(res);
                this.tableData = res.data;
            });
        },
        success(file, fileList){
            console.log(file);
            console.log(fileList);
            this.src.push(fileList.url)
            this.form.imgsrc = this.src
            console.log(this.form.imgsrc);
        }
    }
};
</script>

<style>
</style>