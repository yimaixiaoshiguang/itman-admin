<template>
    <el-input v-bind="$attrs" v-on="$listeners" @change="validValue"></el-input>
    
</template>

<script>
export default {
    name: 'MvkInput',

    components: {  },

    directives: {  },

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        validValue(value){
            //不能输入特殊字符
            let reTurnValue =  value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '').replace(/\s/g, "")
            this.$emit('input', reTurnValue)
        }
    },
};
</script>

<style lang="scss" scoped>

</style>