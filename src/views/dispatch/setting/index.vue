<template>
    <div class="order">
        <h3>订单</h3>
        <div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="patientname" label="姓名" width="200"> </el-table-column>
                <el-table-column prop="submittime" label="提交时间" width="200"> </el-table-column>
                <el-table-column prop="doctor" label="医生" width="150"> </el-table-column>
                <el-table-column prop="consulttype" label="类别" width="150"> </el-table-column>
                <el-table-column prop="consultcontent" label="病因" width="150"> </el-table-column>
                <el-table-column prop="consultcost" label="支付费用(元)" width="150"> </el-table-column>
                <el-table-column fixed="right" label="操作" width="400">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <el-dialog title="订单详情" :visible.sync="dialogFormVisible">
                <div class="details">
                    <div class="label">
                        <p>姓名:</p>
                        <p>{{ people.patientname }}</p>
                    </div>
                    <div class="label">
                        <p>性别:</p>
                        <p>{{ people.sex }}</p>
                    </div>
                    <div class="label">
                        <p>年龄:</p>
                        <p>{{ people.patientage }}</p>
                    </div>
                    <div class="label">
                        <p>预约医生:</p>
                        <p>{{ people.doctor }}</p>
                    </div>
                    <div class="label">
                        <p>预约时间:</p>
                        <p>{{ people.submittime }}</p>
                    </div>
                     <div class="label">
                        <p>咨询内容:</p>
                        <p>{{ people.consultcontent }}</p>
                    </div>
                     <div class="label">
                        <p>手机号:</p>
                        <p>{{ people.phone }}</p>
                    </div>
                </div>
                <div>
                    <div class="img">
                        <p>症状:</p>
                        <img :src="people.case">
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { getOrders } from '../../../api/order';
export default {
    data() {
        return {
            tableData: [],
            dialogFormVisible: false,
            people: {}
        };
    },
    created() {
        getOrders().then((res) => {
            this.tableData = res.data;
        });
    },
    methods: {
        handleClick(row) {
            console.log(row);
            this.dialogFormVisible = true;
            this.people = row;
        }
    }
};
</script>

<style scoped>
.order {
    width: 90%;
    margin: 0 auto;
}
h3 {
    padding: 30px 0;
    border-bottom: 1px solid #d4cfcf;
}
.details{
    display: flex;
    flex-flow: wrap;
}
.label {
    display: flex;
    width: 33%;
    padding: 20px 0;
    align-items: center;
}
.label>p:last-child{
    margin-left: 20px;
}
.img{
    margin-top: 20px;
    display: flex;
}
</style>