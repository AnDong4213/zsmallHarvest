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

  navbarTap(e) {
    let currentTab = e.currentTarget.dataset.index;
    this.setData({
      currentTab
    })
  },
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
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})