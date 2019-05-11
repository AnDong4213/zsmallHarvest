Page({
  data: {
    currentTab: '0',
    item: {
      drugName: '枳术宽中胶囊药物',
      name: '安乐'
    }
  },

  onLoad: function (options) {
    
  },
  /* onReady() {
    this.selectComponent();
  },
  selectComponent() {
    console.log(this);
  }, */

  
  change() {
    this.setData({
      'item.name': '呵呵呵呵'
    })
  },
  hehe(e) {
    console.log(e);
    this.setData({
      'item.name': e.detail.a
    })
  },
  pageEventListener(e) {
    console.log(e)
  }
})