/**
 * Created by win 10 on 2018/5/22.
 */
var vm = new Vue({
   el: '#app' ,
    data: {
        itemList: [],
        totalMoney: 0,
        selectAll: false,
        deleteClass:false,
        currentClass:''
    },
    filters: {
        chineseYuan: function (val) {
            if (!val) { return '0'}
            return "￥" + val.toFixed(2);
        }
    },
    //钩子函数，当所有DOM挂载在页面上时，加载此方法，相当于window.onload=function(){}
    mounted:function(){
        //需要用$nextTick来保证所有节点挂载后才执行方法
        this.$nextTick(function(){
            this.cartView();
        })
    },
    compute: {

    },
    methods: {
        cartView: function () {
            var _this = this;
            _this.$http.get("./data/cartData.json", {id: '123'}).then(function (res) {
                // console.log(res.data.result.list)
                _this.itemList = res.data.result.list;
                // _this.totalMoney = res.data.result.totalMoney
            })
        },
        selectedItem: function (item) {
            if (typeof item.ischecked === 'undefined') {
                //局部$set方法，在item里注册ischecked属性，赋值为true
                this.$set(item,'ischecked',true);
            } else {
                //点击反转属性值
                item.ischecked = !item.ischecked;
            }
            this.calcTotalmoney();//选择商品重新计算总金额
        },
        changeQuantity: function (product, type) {
            if (type > 0) {
                product.productQuantity++;
                this.calcTotalmoney();//数量变动重新计算总金额
            } else {
                if(product.productQuantity < 2) {
                    product.productQuantity = 1;
                } else {
                    product.productQuantity--;
                    this.calcTotalmoney();//数量变动重新计算总金额
                }
            }
        },
        removeConfirm: function (item) {
            this.deleteClass = true;
            this.currentClass = item;
        },
        removeClass: function () {
            var index = this.itemList.indexOf(this.currentClass);
            this.itemList.splice(index, 1);
            // console.log(this.itemList)
            this.deleteClass = false;
            this.calcTotalmoney();//删除商品后重新计算总金额
        },
        calcTotalmoney: function(){
            var _this = this;//用ES5方法解决this指向问题
            //每次计算前必须清理，防止出现累计计算
            this.totalMoney = 0;
            this.itemList.forEach(function (val, index) {
                if(val.ischecked) {
                    _this.totalMoney += val.productPrice * val.productQuantity;
                }
            })
        },
        checkAll: function (statu) {
            this.selectedAll = statu;
            var _this = this;
            this.itemList.forEach(function (val, index) {
                if (typeof val.ischecked === 'undefined') {
                    _this.$set(val, 'ischecked', _this.selectedAll)
                } else {
                    val.ischecked = _this.selectedAll
                }
            });
            this.calcTotalmoney();// 全选/非全选 商品重新计算总金额
        }


    }
});