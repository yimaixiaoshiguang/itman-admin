export const listMixin = {
    data() {
        return {

        }
    },
    methods: {
        handleAdd: function() {
            this.$refs.modalForm.add()
            this.$refs.modalForm.title = '新增'
        },

        handleEdit: function(record) {
            this.$refs.modalForm.edit(record)
            this.$refs.modalForm.title = '编辑'
        },

        handleAddOrEditSave() {
            this.$refs.mvkTable.refresh()
        }
    }
}
