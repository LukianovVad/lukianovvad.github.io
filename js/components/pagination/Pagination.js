define(["ko"],t=>{"use strict";return function(e){const r=this;r.products=e.parent.products,r.productsGrid=e.parent.productsGrid,r.pageSize=e.parent.pageSize,r.currentPage=e.parent.currentPage,r.totalPages=t.computed(()=>{var e=Math.ceil(r.products().length/r.pageSize());return Array.from({length:e},(e,t)=>++t)}),r.paginated=t.computed(()=>{if(3<r.totalPages().length){if(r.currentPage()<=2)return r.totalPages().slice(0,3);if(r.currentPage()===r.totalPages().length)return r.totalPages().slice(r.currentPage.length-3,r.currentPage().length);if(3<=r.currentPage()&&r.currentPage()!==r.totalPages().length)return r.totalPages().slice(r.currentPage()-2,r.currentPage()+1)}return r.totalPages()}),r.getProductsGrid=t.computed(()=>{var e=r.pageSize()*(r.currentPage()-1),t=e+r.pageSize(),e=r.products.slice(e,t);return r.productsGrid(e)}),r.prevPage=()=>{var e=r.currentPage()-1;r.currentPage(e)},r.nextPage=()=>{var e=r.currentPage()+1;r.currentPage(e)},r.firstPage=()=>{r.currentPage(1)},r.lastPage=()=>{r.currentPage(r.totalPages().length)},r.selectPage=(e,t)=>{r.currentPage(+t.target.innerText)}}});