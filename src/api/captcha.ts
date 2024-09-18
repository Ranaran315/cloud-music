import useRequest from '@/utils/request'

const request = useRequest('captcha')

export default {
  // 根据手机号获取验证码
  getCellPhoneCaptcha(phone: string) {
    return request({
      url: 'sent',
      params: {
        phone,
      },
    })
  },
  // 校验手机号验证码
  verifyCellPhoneCaptcha(phone: string, captcha: string) {
    return request({
      url: 'verify',
      params: {
        phone,
        captcha,
      },
    })
  },
}
