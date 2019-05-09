Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: '默认值',
    },
    propA: {
      type: Object,
      value: {
        name: 'hh'
      }
      /* observer: function(newVal, oldVal) {
        console.log(newVal)
        console.log(oldVal)
      } */
    }
  },
  observers: {
    /* '**': function (newVal) {
      // 只有一个参数
      console.log(newVal)
    } */
    'propA.name': function (subfield) {
      console.log(subfield)
    },
    'someData'(subfield) {
      console.log(subfield)
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: '接口'
  },
  // 自小程序基础库版本 2.2.3 起，组件的的生命周期也可以在 lifetimes 字段内进行声明（这是推荐的方式，其优先级最高）。
  lifetimes: {
    created () {
      console.log(this.data)
    },
    attached () {
      console.log(this)
    },
    detached() {
      console.log('this')
    }
  },
  methods: {
    // 这里是一个自定义方法
    customMethod() {
      this.setData({
        someData: '接口2223'
      })
    },
    haha() {
      const myEventDetail = {a: 8888} // detail对象，提供给事件监听函数
      const myEventOption = {bubbles: true} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    },
    haha2() {
      this.triggerEvent('customevent', {name: 'Lee'})
    },
    haha3() {
      wx.navigateTo({
        url: '../../pages/login/login'
      })
    }
  },
  options: {
    multipleSlots: true
  }
})