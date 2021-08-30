<template>
  <div>
     <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">
              {{searchParams.categoryName}}<i @click = "removeCategory">×</i>
            </li>
            <li class="with-x" v-if="searchParams.keyword">
              {{searchParams.keyword}}<i @click = "removeKeyword">×</i>
            </li>
  
            <li class="with-x" v-if="searchParams.trademark">
              {{searchParams.trademark.split(':')[1]}}<i @click = "removeTrademark">×</i>
            </li>
  
            <li class="with-x" v-for="(prop,index) in searchParams.props" :key="prop">
              {{prop.split(':')[1]}}<i @click = "removeProp(index)">×</i>
            </li>
            
          </ul>
        </div>

        <!--selector-->
<!--        绑定自定义事件-->
        <SearchSelector @SearchForTrademark="SearchForTrademark" @searchForProps="searchForProps"/>

        <!--details-->
        <div class="details clearfix">
          
          <div class="sui-navbar">
            <div class="navbar-inner filter">
<!--              第一步：先让背景色动态显示（根据请求的数据）-->
<!--              第二步：让图标动态显示
                  1.用什么图标
                  2.什么时候出现？谁有背景色 谁有图标
                  3.方向向上还是向下？ 根据数据的asc和desc（升序和降序）决定
                  先在计算属性将东西取好
-->
              <ul class="sui-nav">
<!--                1表示综合排序-->
                <li
                    :class="{active:orderNum === '1'}"
                    @click="sortOrder('1')"
                >
                  <a href="#">
                    综合
                    <i
                      v-if="orderNum === '1'"
                      class="iconfont"
                      :class="{
                        icondown:orderType === 'desc',
                        iconup:orderType === 'asc'
                        }"
                    ></i>
                  </a>
                </li>
                <li>
                <li
                    :class="{active:orderNum === '2'}"
                    @click="sortOrder('2')"
                >
                  <a href="#">
                    价格
                    <i
                      v-if="orderNum === '2'"
                      class="iconfont"
                      :class="{
                        icondown:orderType === 'desc',
                        iconup:orderType === 'asc'
                      }"
                    ></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good,index) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 跳转到详情页面 -->
                    <router-link :to="'/detail/'+good.id">
                      <img :src="good.defaultImg" />
                    </router-link>
                    <!-- <a href="item.html" target="_blank">
                      <img :src="good.defaultImg" />
                    </a> -->
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥&nbsp; </em>
                      <i>{{good.price}}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                   <router-link :to="'/detail/'+good.id">
                      {{good.title}}
                    </router-link>
                    <!-- <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">
                      {{good.title}}
                    </a> -->
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
<!--          分页器-->
<!--            传递四个数据-->
          <Pagination
            :currentPage="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :continueNo = '5'
            :total = 'searchInfo.total'
            @changePage="changePage"
          />

          
<!--          <div class="fr page">-->
<!--          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector/SearchSelector'
  import {mapGetters,mapState} from 'vuex'
  
  export default {
    name: 'Search',
    data() {
      return{
        //将所有的搜索请求的参数 存储到一个对象
        searchParams:{
          category1Id: "",
          category2Id: "",
          category3Id: "",
          categoryName: "",
          keyword: "",
          props: [],
          trademark: "",
          
          //默认的搜索参数  后台已经做好分页了
          order: "2:asc", //排序规则
          pageNo: 1,  //要第几页
          pageSize: 2 //一页多少个商品
  
        }
      }
    },
    components: {
      SearchSelector
    },
    //在组件创建之前
    beforeMount() {
      //修改请求参数的对象
      this.handleSearchParams()
    },
    
    mounted(){
      this.getSearchInfo()
        console.log(this.searchInfo)
    },
    
    computed: {
      ...mapGetters(['goodsList']), //拿到三个存储在getters里面的的数组
      ...mapState({
          searchInfo:state=>state.search.SearchInfo
      }),
      orderNum(){
        //这个1 表示综合排序  2 表示价格排序
        return this.searchParams.order.split(':')[0]
      },
      orderType(){
        //desc表示降序 asc表示升序
        return this.searchParams.order.split(':')[1]
      }
    },
    
    methods: {
        //页码改变
        changePage(page){
            this.searchParams.pageNo = page;
            this.getSearchInfo();//重新发送请求
        },
      sortOrder(typeFlag){
        let thisTypeFlag = this.orderNum;
        let thisOrderType = this.orderType;
        let newOrder = '';
        if (typeFlag === thisTypeFlag){ //如果用户点击的时候，是同一个标签，则说明要改变顺序（升序或降序）
          newOrder = `${typeFlag}:${thisOrderType === 'desc'?'asc':'desc'}` //作一个切换
        }else{ //这说明点击了一个新标签
          newOrder = `${typeFlag}:desc` //点击新标签之后 默认是降序
        }
        this.searchParams.order = newOrder;
          this.searchParams.pageNo = 1;
        this.getSearchInfo();//重新发送请求
      },
      
      removeProp(index){
        this.searchParams.props.splice(index,1) //删除下标为index的 元素
          this.searchParams.pageNo = 1;
        this.getSearchInfo(); //重新发送请求
      },
      
      searchForProps(attrValue,attr){
        let prop = `${attr.attrId}:${attrValue}:${attr.attrName}`
        
        //some
        //功能  只要数组当中有一个和条件一样 则返回true，如果都没有 则返回false
        //参数：跟forEach一样
        //返回值：布尔值
        
        //every
        //功能 数组中必须全部和条件一样 才返回true，有一个不一样 则返回false
        //参数：跟forEach一样
        //返回值：布尔值
        
        //这里要判断 用户是不是重复点击了 如果是重复点击 则不添加
        let isRepate = this.searchParams.props.some(item=> item === prop)
        if(isRepate) return; //如果相同的 直接跳出函数 不返回了
        this.searchParams.props.push(prop)
          this.searchParams.pageNo = 1;
        this.getSearchInfo() //重新发送请求
      },
      
      SearchForTrademark(trademark){
        //trademark最终参数的样子 要去参考接口文档
        this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
        //重新发送请求
          this.searchParams.pageNo = 1;
        this.getSearchInfo()
      },
      
      //发送请求
      getSearchInfo(){
        // 如果dispatch要传递多个参数，则需要将参数构成一个对象
        // dispatch只能传递一个参数
        this.$store.dispatch('getSearchInfo',this.searchParams)
      },
    //  修改搜索信息的工具函数
      handleSearchParams(){
        //进来页面之前 将请求的关键字都拿到 封装好在发送请求
        let {category1Id,category2Id,category3Id,categoryName} = this.$route.query;
        let {keyword} = this.$route.params;
        //修改当前的请求参数对象
        this.searchParams = {
          ...this.searchParams,
          category1Id,
          category2Id,
          category3Id,
          categoryName,
          keyword
        }
        //这里如果是空串的 发送ajax还会携带过去（虽然不应影响结果但是可能会影响效率）
        //我们这里将空串全部转换成 undefined 这样ajax请求的时候 是不会将undefined携带过去的
        Object.keys(this.searchParams).forEach(key=>{
          if(this.searchParams[key] === ''){
            this.searchParams[key] = undefined; //如果是空串 转换成undefined即可
          }
        })
        
      },
    //点击叉号的回调函数
      removeCategory(){
        this.searchParams.category1Id = undefined;
        this.searchParams.category2Id = undefined;
        this.searchParams.category3Id = undefined;
        this.searchParams.categoryName = undefined;
        // this.getSearchInfo()
        //这里我们修改数据后 路径也不会变化 ，所以这样发送请求不行
        //我们需要让数据发生变化
        //这里是为了让路径发生变化，然后通过watch里面的路径监听 来重新dispatch
        this.searchParams.pageNo = 1;
          this.$router.replace({name:'search',params:this.$route.params})
        
      },
      //点击叉号的回调函数
      removeKeyword(){
        this.searchParams.keyword = undefined;
        //这里是为了让路径发生变化，然后通过watch里面的路径监听 来重新dispatch
        this.$router.replace({name:'search',query:this.$route.query})
        //通知header组件删除Keywords
        this.$bus.$emit('removeKeywords')
      },
      removeTrademark(){
        this.searchParams.trademark = undefined;
        //这里不在路径里面 不会影响 所以直接调用函数发送请求
        this.searchParams.pageNo = 1;
        this.getSearchInfo();
      }
      
    },
    watch: {
      $route:{ //如果$route发生了变化 则说明请求的参数改变了（则也需要重新发送一次请求）
        handler(){
          //修改请求参数的对象
          this.handleSearchParams()
          this. getSearchInfo()
        }
      }
    },
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>