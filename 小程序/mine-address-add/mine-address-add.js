// pages/mine-address-add/mine-address-add.js
// import WxValidate from '../../utils/WxValidate.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      name: '',
      tel: '',
      area:'',
      detailAddress:''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.initValidate()
  },
  change(e) {
    console.log(e);
    this.setData({
      'form.name': e.detail.value
    })
  },
  


  //报错 
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },

  //调用验证函数
  submitForm(e) {
    console.log(e.detail.value)
    // form提交
    const params = e.detail.value.name
    /* if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    } */
    //验证通过以后
    // this.submitInfo(params);
  },


  /**
   * 表单-提交
   */
  submitInfo(params) {
    // form提交
    let form = params;
      console.log('将要提交的表单信息：', form);
      wx.showToast({
        title: '提交成功！',
      })
  },

  //验证函数
  initValidate() {
    const rules = {
      name: {
        required: true,
      },
      tel: {
        required: true,
        tel: true
      },
      area: {
        required: true,
      },
      detailAddress: {
        required: true,
      }
    }
    const messages = {
      name: {
        required: '请填写姓名',
      },
      tel: {
        required: '请填写手机号',
        tel: '请填写正确的手机号码'
      },
      area: {
        required: '请填写地址',
      },
      detailAddress: {
        required: '请填写详细地址',
      }
    }
    // this.WxValidate = new WxValidate(rules, messages)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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