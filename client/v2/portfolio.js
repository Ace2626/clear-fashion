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
const selectBrand=document.querySelector('#brand-select');
const selectFilter=document.querySelector('#filter-select');
const selectSort=document.querySelector('#sort-select');

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
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();

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
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
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
  console.log(listBrand)
  const options = Array.from(
    {'length': listBrand.length},
    (value, index) => `<option value="${listBrand[index]}">${listBrand[index]}</option>`
  ).join('');
  console.log(options)
  selectBrand.innerHTML = options;
  selectBrand.selectedIndex=-1;
};

//Render Filter selector
const renderFilter=products=>{
  const options=[`<option value="${"Released"}">${"By reasonable released"}</option>`,`<option value="${"Price"}">${"By reasonable price"}</option>`];
  console.log(options)
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
};

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
  renderBrands(products);
  renderFilter(products);
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
    console.log(listProdDate)
  fetchProducts(currentPagination.currentPage,currentPagination.pageCount)
    .then(setCurrentProducts)
    .then(() => render(listProdDate, currentPagination));
  }
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
});


document.addEventListener('DOMContentLoaded', () =>
  fetchProducts()
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination))
);
