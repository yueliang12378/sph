<template>
    <div class="pagination">
<!--        上一页当当前页码是1的是这个按钮应该禁用-->
        <button :disabled="currentPage === 1" @click="$emit('changePage',currentPage - 1)">上一页</button>
<!--        如果连续页码的start是1 则 这个1就隐藏 不然会重复-->
        <button v-if="startEnd.start > 1" @click="$emit('changePage', 1)">1</button>
<!--        如果 start 的值比2大时候这三个点才显示,2的时候也不显示-->
        <button v-if="startEnd.start > 2 ">···</button>
        
<!--        这里利用v-for 可以遍历数字-->
<!--        直接相当于for循环而已，而且利用v-if 如果小于start的就不显示-->
<!--        添加上选中样式-->
        <button
        v-for="page in startEnd.end"
        :key="page"
        v-if="page >= startEnd.start"
        :class="{active:currentPage === page}"
        @click="$emit('changePage',page)"
        >
            {{page}}
        </button>
        
        <button v-if="startEnd.end < totalPageNo - 1 ">···</button>
        <button v-if="startEnd.end < totalPageNo" @click="$emit('changePage',totalPageNo)">{{totalPageNo}}</button>
        <button :disabled="currentPage === totalPageNo" @click="$emit('changePage',currentPage + 1)">下一页</button>
        
        <button style="margin-left: 30px">共{{total}}条</button>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        // 接收传进来的数据
        props:{
            currentPage:Number,
            pageSize:{
                type:Number,
                default:10
            },
            continueNo:{
                type:Number,
                required:true
            },
            total:{
                type:Number,
                default:0
            },
            
        },
        computed:{
            totalPageNo(){
                let {total,pageSize} = this
                return Math.ceil(total/pageSize) //向上取整
            },
            //计算连续页的起始位置和结束位置
            startEnd(){
                let {continueNo,currentPage,totalPageNo} = this
                let start = 0;//连续页的起始页码
                let end = 0;  //连续页的结束页码
                if(continueNo >= totalPageNo){
                    //如果需要的连续页页码数 大约 总的页数 则直接就全部展示
                    start = 1;
                    end = totalPageNo;
                }else{
                    let pageNum = Math.floor(continueNo/2) //这里表示 连续页的前后的页数
                    start = currentPage - pageNum; //currentPage前pageNum都是连续页
                    end = currentPage + pageNum;//currentPage后pageNum都是连续页
                    if(start < 1){ //如果算出来的起始数字小于1 则需要将起始位置变为1
                        start = 1;
                        end = continueNo;//那么末尾直接是连续页码的页数了
                    }
                    if(end > totalPageNo){ //如果算出来的页码 超出最大页码
                        end = totalPageNo; //末尾直接为最大页码
                        start = totalPageNo - continueNo + 1; //起始位置就是最后一页 减去 连续页数 +1即可
                        //挺简单的 自己想想
                    }
                }
                console.log(start)
                console.log(end)
                return {start,end}
            },
            
            
        },
    }
</script>

<style lang="less" scoped>
    .pagination {
        button {
            margin: 0 5px;
            background-color: #f4f4f5;
            color: #606266;
            outline: none;
            border-radius: 2px;
            padding: 0 4px;
            vertical-align: top;
            display: inline-block;
            font-size: 13px;
            min-width: 35.5px;
            height: 28px;
            line-height: 28px;
            cursor: pointer;
            box-sizing: border-box;
            text-align: center;
            border: 0;
            
            &[disabled] {
                color: #c0c4cc;
                cursor: not-allowed;
            }
            
            &.active {
                cursor: not-allowed;
                background-color: #409eff;
                color: #fff;
            }
        }
    }
</style>

