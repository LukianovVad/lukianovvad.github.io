define(["ko","text!components/header/header.html","text!components/main/main.html","text!components/sidebar/sidebar.html","text!components/toolbar/toolbar.html","text!components/products/products.html","text!components/pagination/pagination.html","text!components/footer/footer.html","components/header/Header","components/main/Main","components/sidebar/Sidebar","components/toolbar/Toolbar","components/products/Products","components/pagination/Pagination"],(e,t,o,n,m,s,a,p,r,i,c,l,d,g)=>{"use strict";e.components.register("header",{viewModel:r,template:t}),e.components.register("main-component",{viewModel:i,template:o}),e.components.register("sidebar",{viewModel:c,template:n}),e.components.register("toolbar",{viewModel:l,template:m}),e.components.register("products",{viewModel:d,template:s}),e.components.register("pagination",{viewModel:g,template:a}),e.components.register("footer",{template:p}),e.applyBindings()});