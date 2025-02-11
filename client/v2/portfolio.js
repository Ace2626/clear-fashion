// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};

// inititiqte selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const spanNbNewProducts =document.querySelector('#nbNewProducts');
const selectBrand=document.querySelector('#brand-select');
const selectFilter=document.querySelector('#filter-select');
const selectSort=document.querySelector('#sort-select');
const spanP50=document.querySelector('#P50');
const spanP90=document.querySelector('#P90');
const spanP95=document.querySelector('#P95');
const spanLastReleasedDate=document.querySelector('#LastReleasedDate');

/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12) => {
  try {
    var url=`https://clear-fashion-bice.vercel.app/?page=${page}&size=${size}`;
    const response = await fetch(
      //`https://clear-fashion-api.vercel.app/?page=${page}&size=${size}`
        url
    );
    console.log(response)
    const body = await response.json();
    console.log('body')
    console.log(body)
    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product._id}>
      <span>${product.name}</span>
        <span>${product.brand}</span>
        <span>${product.price}</span>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};



/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

//Render Brands selector
const renderBrands=products=>{
  var listBrand=[]
  products.forEach(element => {
    if(!listBrand.includes(element.brand))
    {
      listBrand.push(element.brand)
    }
  });
  const options = Array.from(
    {'length': listBrand.length},
    (value, index) => `<option value="${listBrand[index]}">${listBrand[index]}</option>`
  ).join('');
  selectBrand.innerHTML = options;
  selectBrand.selectedIndex=-1;
};

//Render Filter selector
const renderFilter=products=>{
  const options=[`<option value="${"Price"}">${"By reasonable price"}</option>` ];
  selectFilter.innerHTML = options;
  selectFilter.selectedIndex=-1;
}



/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;
  spanNbProducts.innerHTML = count;
  fetchProducts(currentPagination.currentPage,currentPagination.pageCount).then(setCurrentProducts).then(() => InfoPage(currentProducts, currentPagination));;

 
};

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderBrands(products);
  renderFilter(products);
  renderIndicators(pagination);
};

const InfoPage=(products, pagination) => {
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var listProdDate=[]
  products.forEach(element => {
    var time=new Date(element.released).getTime()
    var now=new Date(date).getTime()
    if(((now-time)/(1000 * 3600 * 24))<14)
      listProdDate.push(element)
  });

  //spanNbNewProducts.innerHTML=listProdDate.length

  var currentProd=products
  var ProdSortByPriceAsc =currentProd.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  var ProdSortByDateDesc =currentProd.slice().sort((a, b) =>new Date(b.released).getTime()- new Date(a.released).getTime());
  spanP50.innerHTML=ProdSortByPriceAsc[Math.round((ProdSortByPriceAsc.length)/2)].price
  spanP90.innerHTML=ProdSortByPriceAsc[Math.round((ProdSortByPriceAsc.length)*0.90)].price
  spanP95.innerHTML=ProdSortByPriceAsc[Math.round((ProdSortByPriceAsc.length)*0.95)].price
  //spanLastReleasedDate.innerHTML=ProdSortByDateDesc[0].released
};



/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 * @type {[type]}
 */
selectShow.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage, parseInt(event.target.value))
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
    console.log(currentProducts)
});

selectPage.addEventListener('change', event => {
  fetchProducts(parseInt(event.target.value),currentPagination.pageCount)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

selectBrand.addEventListener('change', event => {
  var listProd=[]
  currentProducts.forEach(element => {
    if(element.brand==event.target.value) {
      listProd.push(element)}
  });
  fetchProducts(currentPagination.currentPage,currentPagination.pageCount)
    .then(setCurrentProducts)
    .then(() => render(listProd, currentPagination));
});

selectFilter.addEventListener('change', event => {
  /*
  if(event.target.value=="Released")
  {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var listProdDate=[]
    currentProducts.forEach(element => {
      var time=new Date(element.released).getTime()
      var now=new Date(date).getTime()
      if(((now-time)/(1000 * 3600 * 24))<14)
        listProdDate.push(element)
    });
  fetchProducts(currentPagination.currentPage,currentPagination.pageCount)
    .then(setCurrentProducts)
    .then(() => render(listProdDate, currentPagination));
  }
  */
  console.log(currentProducts);
  if(event.target.value=="Price")
  {
    var listProdPrice=[]
    currentProducts.forEach(element => {
      if(element.price<50)
        listProdPrice.push(element)
    });
  fetchProducts(currentPagination.currentPage,currentPagination.pageCount)
    .then(setCurrentProducts)
    .then(() => render(listProdPrice, currentPagination));
  }
  
  else{
    console.log(event.target.value)
    var listProdElem=[];
    currentProducts.forEach(element => {
      if(element.name.includes(event.target.value))
        listProdElem.push(element)
    });
    console.log(listProdElem)
    fetchProducts(currentPagination.currentPage,currentPagination.pageCount)
    .then(setCurrentProducts)
    .then(() => render(listProdElem, currentPagination));
  }
}); 

selectSort.addEventListener('change', event => {
  if(event.target.value=="price-asc")
  { 
    var ProdSortByPriceAsc =currentProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    fetchProducts(currentPagination.currentPage,currentPagination.pageCount)
      .then(setCurrentProducts)
      .then(() => render(ProdSortByPriceAsc, currentPagination));
  }
  if(event.target.value=="price-desc")
  { 
    var ProdSortByPriceDesc =currentProducts.sort((a, b) => parseFloat(b.price)-parseFloat(a.price) );
    fetchProducts(currentPagination.currentPage,currentPagination.pageCount)
      .then(setCurrentProducts)
      .then(() => render(ProdSortByPriceDesc, currentPagination));
  }
  if(event.target.value=="date-asc")
  { 
      var ProdSortByDateDesc =currentProducts.slice().sort((a, b) =>new Date(b.released).getTime()- new Date(a.released).getTime());
      fetchProducts(currentPagination.currentPage,currentPagination.pageCount)
        .then(setCurrentProducts)
        .then(() => render(ProdSortByDateDesc, currentPagination));
  }
  if(event.target.value=="date-desc")
  { 
    var ProdSortByDateAsc =currentProducts.slice().sort((a, b) => new Date(a.released).getTime() -new Date(b.released).getTime());
    fetchProducts(currentPagination.currentPage,currentPagination.pageCount)
      .then(setCurrentProducts)
      .then(() => render(ProdSortByDateAsc, currentPagination));
  }
});


document.addEventListener('DOMContentLoaded', () =>
  fetchProducts()
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination))
);
