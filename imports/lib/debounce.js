export default (func, wait) => {console.log('debounce')
  let timeout = null
  return function(...args) {
    const context = this
    const later = () => {
      timeout = null
      func.apply(context, args)
    }
    const callNow = !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args)
  }
}
