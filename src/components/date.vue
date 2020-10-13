<template>
    <div>
        <full-calendar
            :events="fcEvents"
            locale="en"
            @changeMonth="changeMonth"
            @eventClick="eventClick"
            @dayClick="dayClick"
            @moreClick="moreClick"
        >
        </full-calendar>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            fcEvents: []
        };
    },
    created() {
        this.updateCalendar()
            .then((res) => {
                console.log(res.data);
                let arr = [];
                for (let i = 0; i < res.data.length; i++) {
                    let morning = JSON.parse(res.data[i].morning);
                    let afternoon = JSON.parse(res.data[i].afternoon);
                    let night = JSON.parse(res.data[i].night);
                    morning += '';
                    afternoon += '';
                    night += '';
                    let obj = {};
                    obj.title = `科室:${res.data[i].department}\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0<br>上午:${morning}<br>下午:${afternoon}<br>晚上:${night}`;
                    obj.start = `${res.data[i].time}`;
                    arr.push(obj);
                }
                this.fcEvents = arr;
            })
            .catch((err) => {
                console.log(err);
            });
    },
    methods: {
        ...mapActions(['updateCalendar']),
        changeMonth(start, end, current) {
            console.log('changeMonth', start, end, current, 444444444);
        },
        eventClick(event, jsEvent, pos) {
            console.log('eventClick', event, jsEvent, pos, 3333333333333);
            this.$alert(`${event.title}`, {
                dangerouslyUseHTMLString: true
            });
        },
        dayClick(day, jsEvent) {
            console.log('dayClick', day, jsEvent, 22222222222);
            this.$emit('day', day);
        },
        moreClick(day, events, jsEvent) {
            console.log('moreCLick', day, events, jsEvent, 111111);
        }
    }
};
</script>

<style>
</style>