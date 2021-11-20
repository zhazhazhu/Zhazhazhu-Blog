const hostname = 'http://110.42.131.59'


const ports = {
  blogs: 3000
}

const hosts = {
  blogs: `${hostname}:${ports.blogs}`,
}

function uploadAvatar() {
  return `${hostname}:${ports.blogs}/api/Form/UploadFiles`
}

window.projectConfig = { hosts, uploadAvatar }