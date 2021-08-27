/**
 * @description 删除确定操作弹框
 */
 export function deteleModal(title) {
    return new Promise((resolve, reject) => {
        this.$confirm(`确定永久删除该${title || '文件'}`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            resolve()
        }).catch(() => {
            reject()
            this.$message({
                type: 'info',
                message: '已取消'
            })
        })
    })
}