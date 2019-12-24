import wepy from 'wepy'

// 判定现在的环境
const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'

// development or production host
const hosts = {
  // dev: 'http://118.89.247.29:8791',
  dev: 'http://localhost:8791',
  // dev: 'http://192.168.31.122:8791',
  // dev: 'https://hrbust-dev.smackgg.cn',
  prod: 'https://hrbust-dev.smackgg.cn'
}
// 511126199801227725
// 日期格式化
const dateFormat = function (date, format) {
  date = new Date(date)
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length))
  }

  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
    }
  }
  return format
}

const request = requestOption => new Promise((resolve, reject) => {
  wepy.request({
    ...requestOption,
    success (res) {
      if (res && res.statusCode === 200) {
        resolve(res)
        return
      }
      reject(res && res.data)
    },
    fail (error) {
      // console.log(error, 111)
      if (error.errMsg === 'request:fail timeout') {
        wepy.showToast({
          title: '请求超时，服务器可能开小差了~',
          icon: 'none',
          duration: 2000
        })
      }
      reject(error)
    }
  })
})

module.exports = {
  env,
  host: hosts[env],
  dateFormat,
  request
}
