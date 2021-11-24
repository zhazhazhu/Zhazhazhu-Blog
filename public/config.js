const hostname = 'http://www.qzzhu.cn'


const ports = {
  blogs: 3000,
  avatar: 3100
}

const hosts = {
  blogs: `${hostname}:${ports.blogs}`,
  avatar: `${hostname}:${ports.avatar}/`
}

function uploadAvatar() {
  return `${hostname}:${ports.blogs}/api/Form/UploadFiles`
}

window.projectConfig = { hosts, uploadAvatar }