import request from '@/utils/request'

export function getMember(data) {
  return request({
    url: '/cashRegister/getMember',
    method: 'post',
    data
  })
}
