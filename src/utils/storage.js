// 将数据存储到本地
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}
// 获取本地存储的数据
export const getItem = (key) => {
  const data = localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

// 删除本地单个数据
export const removeItem = (key) => {
  localStorage.removeItem(key)
}

// 清空本地所有数据
export const clearItem = () => {
  localStorage.clear()
}
