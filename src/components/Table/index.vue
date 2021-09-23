<template>
    <div>
        <el-table v-bind="$attrs" ref="tableTemplate" v-loading="loading" :data="tableData" class="border-table" v-on="$listeners">
            <slot name="head" />
            <el-table-column v-for="column in tableColumn"
                             :key="column.label"
                             :prop="column.prop"
                             :label="column.label"
                             :width="column.width"
                             :show-overflow-tooltip="!column.tooltip"
                             :formatter="column.formatter"
            >
                <template slot-scope="scope">
                    <template v-if="column.slot">
                        <slot :name="column.prop" :row="scope.row" :label="scope.row['$'+column.prop]">
                            <!-- {{column.prop}} -->
                        </slot>
                    </template>
                    <span v-else>{{ handleDetail(scope.row,column) }}</span>
                </template>
            </el-table-column>
            <slot />
        </el-table>
        <div class="pagination-contain">
            <el-pagination background
                           :current-page.sync="pageNum"
                           :page-size="pageSize"
                           layout="total,prev, pager, next"
                           :total="total"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: 'TableWithPagination',
    props: {
        tableColumn: { // 表格列属性
            type: Array,
            default: () => [],
            require: true
        },
        tableDataFunc: { // 表格的数据接口
            type: Function,
            required: true
        }
    },
    watch: {
        tableDataFunc: {
            handler() {
                // 针对调接口经常变化的情况
                this.refresh()
            },
            deep: true
        }
    },
    computed: {
        params() {
            return {
                pageNum: this.pageNum - 1,
                pageSize: this.pageSize
            }
        }
    },
    data() {
        return {
            tableData: [], // 表格的数据

            pageNum: 1,
            pageSize: 10,
            total: 0,

            loading: false
        }
    },
    mounted() {

    },
    created() {
        this.loadData()
    },
    methods: {
        refresh() {
            this.pageNum = 1
            this.loadData()
        },
        // 加载表格的接口，获得返回数据
        loadData() {
            this.loading = true
            let dataPromise = this.tableDataFunc(this.params)

            dataPromise.then(res => {
                // console.log(res);
                this.tableData = res.list || res.content
                this.total = res.totalElements
            }).finally(() => {
                this.loading = false
            })
        },

        handleDetail(row, column) {
            if (column.formatter) {
                return column.formatter(row, column, row[column.prop])
            } else {
                return row[column.prop]
            }
        },

        // 每页显示个数
        handleSizeChange(val) {
            this.pageSize = val
            this.pageNum = 1
            this.loadData()
        },
        // 当前页变化
        handleCurrentChange(val) {
            this.pageNum = val
            this.loadData()
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
