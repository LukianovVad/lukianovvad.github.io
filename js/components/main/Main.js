define(["jquery","ko"],(r,s)=>{"use strict";return function(){const e=this;e.url="/js/model/product.json",e.json=null,e.products=s.observableArray(),e.productsGrid=s.observableArray(),e.pageSize=s.observable(8),e.currentPage=s.observable(1),e.selectedSort=s.observable(),e.getJson=()=>{const s=[];r.getJSON(e.url,r=>{Object.keys(r).forEach(e=>{s.push(r[e])}),e.json=s,e.products(e.json)})},e.getJson()}});