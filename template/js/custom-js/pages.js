// Add your custom JavaScript for storefront pages here.
const toggleClass = (el, className) => el.classList.toggle(className)
const buttonSearch = document.getElementById('mobile-search-btn')
buttonSearch.addEventListener('click', function (e) {
  if (window.innerWidth > 767) {
    toggleClass(document.querySelector('.header .d-none.d-lg-block.col-12'), 'hide')
  } else {
    toggleClass(document.querySelector('.header .d-lg-block.col-12'), 'hide')
  }
})
