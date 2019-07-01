;(function(){document.querySelector('.m_menu').onclick = function(){document.querySelector('header').classList.toggle('m_menu--open');};})()
if('serviceWorker' in navigator) {
  // 註冊 Service Worker
  // navigator.serviceWorker.register('./sw.js',{scope:'/app'})
  // 只能操控 /app 下的頁面，像是網址是 /app/example 或 /app/test 的情況
  navigator.serviceWorker.register('./js/sw.js')
  .then(reg => console.log('SW registered!', reg))
  .catch(err => console.log('Boo!', err));
}
