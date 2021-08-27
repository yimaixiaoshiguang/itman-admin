Table 重封装组件说明
====

封装说明
----
>  通过 `v-bind="$attrs" v-on="$listeners"` 方式，table 的属性prop与 API 与 [官方版(Table)](https://element.eleme.cn/#/zh-CN/component/table) 保持一致
>  集成了分页逻辑处理
>  开放自定义操作代码



例子

父组件，引用table组件，只需传递

```
tableColumn:列属性数组，column对象必须包含prop，label两个字段
tableDataFunc:接口函数，必须是promise对象

需要自定义的列内容，通过配置slot:true来重写
```



```vue
<template>
	<el-card>
		<mvk-table ref="dictTable" :tableColumn="tableColumn" :tableDataFunc="tableDataFunc">
			<!--自定义操作-->
			<el-table-column label="操作">
				<template slot-scope="{row}">
					<el-button round size="small" @click="handleEdit(row)">编辑</el-button>
					<el-button round size="small" @click="handleChild(row)">子类</el-button>
					<delete-button round size="small" @delete="handleDelete" :id="row.id">删除</delete-button>
				</template>
			</el-table-column>
		</mvk-table>
	</el-card>
</template>

<script>
export default {
	name: 'DictionaryIndex',
	components: {
		'mvk-table':()=>import('@/components/Table/index'),
	},
	directives: {  },
	data() {
		return {
			tableColumn:[
				{
					prop:'id',
					label:'ID'
				},
				{
					prop:'name',
					label:'名称'
				},
				{
					prop:'type',
					label:'类型'
				},
				{
					prop:'description',
					label:'描述'
				},
			],

			// 查询条件参数
			queryParam:{},
			// 加载数据方法 必须为 Promise 对象
			tableDataFunc:parameter => {
				return getSysDictionary(Object.assign(parameter, this.queryParam))
					.then(res => {
						return res.data
					})
			},
		};
	},
	mounted() {

	},
	methods: {

	},
};
</script>

<style lang="scss" scoped>
</style>

```
自定义列中内容的例子
```vue
<template>
    <div>
        <mvk-table ref="mvkTable" :tableColumn="tableColumn" :tableDataFunc="tableDataFunc">
			<!--自定义内容-->
            <template slot-scope="{row}" slot="values">
                <el-tag :type="tagsType[index]" v-for="(item,index) in row.values" :key="item.id">{{item.name}}</el-tag>
            </template>

			<template slot-scope="{row}" slot="pic" label="头像">
				<el-image
					style="width:30px;height:30px"
					:src="row.pic"
					:preview-src-list="[row.pic]"
				/>
			</template>

			<template slot-scope="{row}" slot="creationDate" label="创建日期">
				{{row.creationDate | formatTime}}
			</template>

            <!--自定义操作-->
			<el-table-column label="操作">
				<template slot-scope="{row}">
					<el-button type="text" size="small" @click="handleEdit(row)">编辑</el-button>
					<delete-button buttonType="text" size="small" @delete="handleDelete" :id="row.id">删除</delete-button>
				</template>
			</el-table-column>
		</mvk-table>
    </div>
</template>

<script>
    export default {
        components: {
        },
        data() {
            return {
                tableColumn:[
                    {
                        prop:'name',
                        label:'规格名称',
                    },
                    {
                        prop:'values',
                        label:'商品属性',
                        slot: true,//需要自定义,定义slot：true
                    },{
						prop:'pic',
						label:'头像',
						slot:true,
					},{
						prop:'creationDate',
						label:'创建时间',
						slot:true,
					},{
						prop:'obtainMethod',
						label:'获取方式',
						formatter:(value) => {//格式化内容
							const statusMap = {
								'10': '手动领取',
								'20': '新人券',
								'30': '赠送券',
							}

							return statusMap[value.obtainMethod]
						}
					}
                ],

                tableDataFunc:parameter => {
                    return prodList(parameter)
                        .then(res => {
                            return res.data
                        })
                },
            }
        },
        mounted() {
            
        },
        methods: {
        }
    }
</script>
```

