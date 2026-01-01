/* eslint-disable */
var motocard = {
  goto: function (url, isDynamicRendering) {
    if (isDynamicRendering) {
      $nuxt.$router.push({
        path: url
      })
    } else {
      document.location = url
    }
  }
}
