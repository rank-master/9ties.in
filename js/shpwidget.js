
 
var token = function(){
  try {
      let curr = ShopifyAnalytics.lib.user().traits().uniqToken;
      if (curr !== undefined && curr !== null && curr !== "") {
        return curr;
      }
      else {
        token();
      }
    } catch (e) { }
    return null;
}
var oldSelectId='';var oldSelectText='';
var cartData = '';
var user_token = token();
var cartLogs = function() {
  let shop = getShop();
  let hostName = hostname()
  let cartUrl = 'https://'+hostName+'/cart.js';

  let url ='https://convert.shipway.com/dashboard/api/analytics.php';
  ip = '62.133.61.131';
  cartDataCall = createRequest(cartUrl,'GET','json','',false);

  if(cartData.item_count =="undefined" || cartData.item_count == 0){
      return cartId = 0;
  }else{

      var formData = new FormData(); 
      formData.append('token', cartData.token);
      formData.append('shop', shop);
      formData.append('customerId', user_cid);
      formData.append('item_count', cartData.item_count);
      formData.append('total_price', cartData.total_price);
      formData.append('response', JSON.stringify(cartData));
      formData.append('ip', ip);
      formData.append('type', 'crt');
      return cartId =  createRequest(url,'POST','',formData);
  }
}
var widgetAnalytics = function(text_index,source="whatsapp_widget",form_id=0,group="widget",other_flag=0,insertData=""){

  let shop = getShop();
  let url ='https://convert.shipway.com/dashboard/api/analytics.php';
  ip = '62.133.61.131';
  var formData = new FormData(); 
  formData.append('token', user_token);
  formData.append('cart_token', cartData.token);
  formData.append('shop', shop);
  formData.append('customerId', getCookie('cnvt_cid'));
  formData.append('text_index', text_index);
  formData.append('ip', ip);
  formData.append('type', 'wg');
  formData.append('source', source);
  formData.append('other_flag',other_flag );
  formData.append('insertData', insertData);
  formData.append('key', form_id);
  formData.append('group', group);
  return cartId =  createRequest(url,'POST','',formData);
  
}

var pageLogs = async function(page) {
  let url ='https://convert.shipway.com/dashboard/api/analytics.php';
  ip = '62.133.61.131';
  var formData = new FormData(); 
  formData.append('token', user_token);
  formData.append('shop', getShop());
  formData.append('customerId', user_cid);
  formData.append('pageurl', pageurl());
  formData.append('device', getDeviceType());
  formData.append('ip', ip);
  formData.append('type', 'pg');
  formData.append('order_id', orderId());
  formData.append('req_id', req_id());
  formData.append('page_type', cnvt_page_type());
  //var pageId = await createRequest(url,'POST','',formData,false);
  //if(page=='thanku_page' && pageId !== ""){
    //logs_update(pageId);
  //}

}

async function get_cid() {
  let url ='https://convert.shipway.com/dashboard/api/analytics.php';
  ip = '62.133.61.131';
  var formData = new FormData(); 
  formData.append('first_name', firstName());
  formData.append('last_name', lastName());
  formData.append('country', c_country());
  formData.append('email', customerEmail());
  formData.append('shop', getShop());
  formData.append('type', 'customer_id');
  let cid_raw = await createRequest(url,'POST','',formData,false);
  let cid = cid_raw.replace(/\s+/g,'');
  if(cid != "" && cid != null){
    setCookie('cnvt_cid',cid,30);
    let get_cookie = getCookie('cnvt_cid');
    if(get_cookie == "" || get_cookie == null){
      let cDetails = getCookie('cnvt_obj');
      if(cDetails != "" && cDetails != null){
        set_cid_by_cookie();
      }
    }
  }
}

function logs_update(page_id) {
  let url ='https://convert.shipway.com/dashboard/api/analytics.php';
  ip = '62.133.61.131';
  var formData = new FormData(); 
  formData.append('page_id', page_id);
  formData.append('shop', getShop());
  formData.append('cookie_id', getCookie('cnvt_cid'));
  formData.append('type', 'Thanku_page');
  var insert = createRequest(url,'POST','',formData);
}

async function set_cid_by_cookie() {
  let url ='https://convert.shipway.com/dashboard/api/analytics.php';
  ip = '62.133.61.131';
  var formData = new FormData(); 
  formData.append('shop', getShop());
  formData.append('cookie_obj', getCookie('cnvt_obj'));
  formData.append('type', 'set_cid_by_cookie');
  var setCid_raw = await createRequest(url,'POST','',formData,false);
  let setCid = setCid_raw.replace(/\s+/g,'');
  if(setCid != "" && setCid != null){
    setCookie('cnvt_cid',setCid,30);
   }
}

var getShop = function() {
  var shopname;

  // Check if window.Shopify is defined before trying to access its properties
  if (typeof window.Shopify !== "undefined") {
    shopname = window.Shopify.shop;
    if (typeof shopname === "undefined" || shopname === null) {
      shopname = window.Shopify.Checkout.apiHost;
    }
  }

  // Check if shopname is still not obtained
  if (typeof shopname === "undefined" || shopname === null || shopname === '') {
    // Ensure myShop is defined somewhere in your script
    shopname = typeof myShop !== "undefined" ? myShop : '';
  }

  return shopname;
}

var orderId = function(){
  try {
      let order_id = window.Shopify.checkout.order_id;
      if (order_id !== undefined && order_id !== null && order_id !== "") {
        return order_id;
      }
    } catch (e) { }
    return 0;
}

var checkoutData = function(){
  try {
      let token = window.Shopify.checkout;
      if (token !== undefined && token !== null && token !== "") {
        return token;
      }
    } catch (e) { }
    return 0;
}

var getDeviceType = function() {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "mobile";
  }
  return "desktop";
}

function checkNumber(event, form_type = 'optin') {
  const input_id_map = {
    'optin':'mobile_number_input',
    'spin': 'spin_mobile_input',
    'countdown': 'countdown_mobile_input',
  };
  let input_id = input_id_map[form_type] || 'mobile_number_input';
  var inputElement = document.getElementById(input_id);
  var inputValue = inputElement.value;

  if (inputValue.length > 14) {
    return false;
  }

  // Use the input event for better compatibility on mobile
  inputElement.addEventListener('input', function (e) {
    var inputValue = e.target.value;

    // Remove non-numeric characters from the input
    inputValue = inputValue.replace(/\D/g, '');

    if (isNaN(inputValue)) {
      // If not a number, remove the last character
      inputValue = inputValue.slice(0, -1);
    }

    // Update the input value
    e.target.value = inputValue;
  });

  return true;
}

var getShpCustomerId = function() {
    try {
      let curr = window.ShopifyAnalytics.meta.page.customerId;
      if (curr !== undefined && curr !== null && curr !== "") {
        return curr;
      }
    } catch(e) { }
    try {
      let curr = window.meta.page.customerId;
      if (curr !== undefined && curr !== null && curr !== "") {
        return curr;
      }
    } catch (e) { }    
    try {
      let curr = __st.cid;
      if (curr !== undefined && curr !== null && curr !== "") {
        return curr;
      }
    } catch (e) { }
    try {
      let curr = Shopify.checkout.customer_id;
      if (curr !== undefined && curr !== null && curr !== "") {
        return curr;
      }
    } catch (e) { }
    return null;
  }

var hostname = function(){
  try {
      let curr =  window.location.hostname;
      if (curr !== undefined && curr !== null && curr !== "") {
        return curr;
      }
    } catch (e) { }
    return null;
}

var pageurl = function(){
  try {
      let curr = __st.pageurl;
      if (curr !== undefined && curr !== null && curr !== "") {
        return curr;
      }
    } catch (e) { }
    try {
      let curr =  window.location.href;
      if (curr !== undefined && curr !== null && curr !== "") {
        return curr;
      }
    } catch (e) { }
    return null;
}

var firstName = function(){
  try{
    let fname = Shopify.checkout.billing_address.first_name;
    if (fname !== undefined && fname !== null && fname !== "") {
        return fname;
      }
  }catch (e){ }

  try{
    let fname = Shopify.checkout.shipping_address.first_name;
    if (fname !== undefined && fname !== null && fname !== "") {
        return fname;
      }
    }catch (e){ }
    return "";
}

var lastName = function(){
  try{
    let lname = Shopify.checkout.billing_address.last_name;
    if (lname !== undefined && lname !== null && lname !== "") {
        return lname;
      }
  }catch (e){ }

  try{
    let lname = Shopify.checkout.shipping_address.last_name;
    if (lname !== undefined && lname !== null && lname !== "") {
        return lname;
      }
    }catch (e){ }
    return "";
}

var c_country = function(){
  try{
    let country = Shopify.checkout.billing_address.country;
    if (country !== undefined && country !== null && country !== "") {
        return country;
      }
  }catch (e){ }

  try{
    let country = Shopify.checkout.shipping_address.country;
    if (country !== undefined && country !== null && country !== "") {
        return country;
      }
    }catch (e){ }
    return "";
}


var customerEmail = function(){
  try{
    let cemail = Shopify.checkout.email;
    if (cemail !== undefined && cemail !== null && cemail !== "") {
        return cemail;
      }
  }catch (e){ }

  return "";
}

var req_id = function(){
  try {
      let curr = __st.rid;
      if (curr !== undefined && curr !== null && curr !== "") {
        return curr;
      }
    } catch (e) { }
    return 0;
}

var variant_id = function(){
  try {
      let curr = window.ShopifyAnalytics.meta.selectedVariantId;
      if (curr !== undefined && curr !== null && curr !== "") {
        return curr;
      }
    } catch(e) { }
    try {
      let curr = ShopifyAnalytics.meta.selectedVariantId;
      if (curr !== undefined && curr !== null && curr !== "") {
        return curr;
      }
    } catch (e) { }
  return 0;
}

var product_name = function(){
  try {
      let curr = window.ShopifyAnalytics.meta.product.variants[0].name;
      if (curr !== undefined && curr !== null && curr !== "") {
        return curr;
      }
    } catch(e) { }
    try {
      let curr = ShopifyAnalytics.meta.product.variants[0].name;
      if (curr !== undefined && curr !== null && curr !== "") {
        return curr;
      }
    } catch (e) { }
  return 0;
}

var cnvt_page_type = function(){
  try {
      let curr = __st.p;
      if (curr !== undefined && curr !== null && curr !== "") {
        return curr;
      }
    } catch (e) { }
    try {
      let curr = __st.rtyp;
      if (curr !== undefined && curr !== null && curr !== "") {
        return curr;
      }
    } catch (e) { }

    try {
      let curr = __st.t;
      if (curr !== undefined && curr !== null && curr !== "") {
        return curr;
      }
    } catch (e) { }

    return "";
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    var cookieArray = ca.length;
    for(var i=0;i < cookieArray;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return "";
}

async function get_country(store_tel_code,form_type='optin'){
  //let url ='https://get.geojs.io/v1/ip/geo.json';
  //var country_Data = await createRequest(url,'GET','','',false);
  //let country_obj = JSON.parse(country_Data);
  let time_zone =Intl.DateTimeFormat().resolvedOptions().timeZone;
  let userStdCode = "";
  if(timeZone_obj[time_zone]){
    userCountryCode = timeZone_obj[time_zone];
    if(country_arr[userCountryCode]){
     userStdCode = country_arr[userCountryCode];
    }
  }
  if (userStdCode == '') {
    userStdCode = store_tel_code;
  }
  const form_select_id_map = {
    'optin':'input_std',
    'spin': 'spin_input_std',
    'countdown': 'countdown_input_std',
  };

  let form_select_id = form_select_id_map[form_type] || 'input_std';
    document.getElementById(form_select_id).value = userStdCode;
  }

function setTime(store_tel_code,popupHtml){
  fnOnjAddElement('', 'div', {'class' : 'cnvt_main_div_form'} , popupHtml);
  get_country(store_tel_code); 
  fnOnjAddElement('', 'script', '' , 'handleCountryChange()');
}

function setTimeSpin(store_tel_code){
    fnOnjAddElement('', 'div', {'class' : 'main-div-spin'} , spin_html);
    get_country(store_tel_code,'spin');
    fnOnjAddElement('', 'div','', spin_bubble_html); 
    fnOnjAddElement('', 'script',{'src' : 'https://convert.shipway.com/dashboard/js2/spin_js.js?v=1234'}, '');
    fnOnjAddElement('', 'script', '' , 'handleCountryChange("spin")');
}

function setTimeCountDown(store_tel_code,distance){
  fnOnjAddElement('', 'div', {'class' : 'main-div-countdown'} , countdown_html);
  get_country(store_tel_code,'countdown');
  fnOnjAddElement('', 'div','', countdown_bubble_html); 
  fnOnjAddElement('', 'div', {'class' : 'main-thanks-countdown'} , thanku_countdown);
  fnOnjAddElement('', 'script', '' , 'handleCountryChange("countdown")');
  document.querySelector(".main-div-thanku-countdown").style.zIndex = 99999;
  setTimeout(() => {
    document.querySelector(".main-box-mob-countdown").style.display = "none";
    document.querySelector(".main-thanks-countdown").style.display = "none";
    document.querySelector(".main-box-mob-countdown").style.zIndex = 0;
  }, Math.max(distance, 0));
}

function setTime1(){
  fnOnjAddElement('', 'div', {'class' : 'main-div-qr'} , form_qr);
}

function form1_close(form_id,form_type,enable_cookie) {
  let source,group,cookie_name,days;
  switch (form_type) {
    case 'optin':
      day = set_days;
      break;
    case 'spin':
      day = set_days_spin;
      console.log('set_days_spin');
      break;
    case 'countdown':
      day = set_days_countdown;
      break;
    default:
      day = set_days;
  }
  const formConfig = {
    'optin': {
      source: "optin_formclose",
      group: "optin",
      cookie_name: "cnvt_form_days",
      days: day,
      selectors: [".cnvt_form_container"]
    },
    'spin': {
      source: "spin_formClose",
      group: "spin",
      cookie_name: "cnvt_form_days_spin",
      days: day,
      selectors: [".main-div-spin"]
    },
    'countdown': {
      source: "countdown_formClose",
      group: "countdown",
      cookie_name: "cnvt_form_days_countdown",
      days: day,
      selectors: [".main-div-countdown",".main-thanks-countdown"]
    }
  };

  const config = formConfig[form_type];
  if (config) {
    const { source, group, cookie_name, days, selectors } = config;
    selectors.forEach(selector => document.querySelector(selector).style.display = "none");
    widgetAnalytics(0,source,form_id,group);
      
    if(enable_cookie==1){
      console.log('cookie_name----',cookie_name);
      setCookie(cookie_name,form_id,days);  
    }
  }
  console.log('cookie_name2',cookie_name);
  switch (form_type) {
    case 'optin':
      bubble_val = bubble_value;
      break;
    case 'spin':
      bubble_val = bubble_value_spin;
      break;
    case 'countdown':
      bubble_val = bubble_value_countdown;
      break;
    default:
      bubble_val = bubble_value;
  }
  const selectorMap = {
    'optin': {
      condition: bubble_val == 'bubble',
      selector: ".cnvt_bubble"
    },
    'spin': {
      condition: bubble_val == 'bubble',
      selector: ".ship-spin-widget"
    },
    'countdown': {
      condition: bubble_val == 'bubble',
      selector: ".ship-countdown-widget"
    }
  };

  for (const [formType, { condition, selector }] of Object.entries(selectorMap)) {
    if (form_type === formType && condition) {
      document.querySelector(selector).style.display = "block";
      break;
    }
  }
}

function qr_close(form_id_qr) {
  document.querySelector(".QRDiv").style.display = "none";
  widgetAnalytics(0,"qr_formClose",form_id_qr,"qr_code");
  if(enable_cookie_qr==1){
    setCookie('cnvt_form_days_qr',form_id_qr,set_days_qr);
  } 
}

function form_click_qr(){
  widgetAnalytics(0,"qr_formClick",form_id_qr,"qr_code");
}

function thanku_close(form_type='optin') {
  switch (form_type) {
    case 'optin':
      form_id = form_id;
      break;
    case 'spin':
      form_id = form_id_spin;
      break;
    case 'countdown':
      form_id = form_id_countdown;
      break;
    default:
    form_id = form_id;
  }
  const formConfig = {
    'optin': {
      widgetAnalyticsArgs: [0, "optin_thankyouClose", form_id, form_type],
      selectors: [".cnvt_popup_box_thanku"]
    },
    'spin': {
      widgetAnalyticsArgs: [0, "spin_thankyouClose", form_id_spin, form_type],
      selectors: [".main-box-mob", ".main-div-spin"]
    },
    'countdown': {
      widgetAnalyticsArgs: [0, "countdown_thankyouClose", form_id_countdown, form_type],
      selectors: [".main-box-mob-countdown", ".main-div-countdown", ".ship-thanks-box-countdown",".main-div-thanku-countdown",".main-thanks-countdown"]
    }
  };

  const config = formConfig[form_type];

  if (config) {
    const { widgetAnalyticsArgs, selectors } = config;
    widgetAnalytics(...widgetAnalyticsArgs);
    selectors.forEach(selector => document.querySelector(selector).style.display = "none");
  }
}
  
function form_submit(form_id){
  let PhoneNo = document.getElementById("mobile_number_input").value;
  let std_code = document.getElementById("input_std").value;
  if(PhoneNo.length<6){
    return false;
  }
  if(PhoneNo !== "" && PhoneNo !== null && std_code != ""){
    document.querySelector(".cnvt_form_container").style.display = "none";
    document.querySelector(".cnvt_popup_box_thanku").style.display = "block";
    setCookie('cnvt_submit',form_id,365);
    window.localStorage.setItem('cnvt_submit',form_id);
    var obj_data = {"phone":PhoneNo,"std_code":std_code,"form_id":form_id,"token":token};
    var insertData = JSON.stringify(obj_data);
    widgetAnalytics(0,"optin_formSubmit",form_id,"optin",1,insertData);
  }
}

function bubble_close(form_id,form_type,enable_cookie) {
  let source,group,cookie_name;
  switch (form_type) {
    case 'optin':
      day = set_days;
      break;
    case 'spin':
      day = set_days_spin;
      break;
    case 'countdown':
      day = set_days_countdown;
      break;
    default:
      day = set_days;
  }
  const formConfig = {
    'optin': {
      source: "optin_bubbleClose",
      group: "optin",
      cookie_name: "cnvt_form_days",
      days: day
    },
    'spin': {
      source: "spin_bubbleClose",
      group: "spin",
      cookie_name: "cnvt_form_days_spin",
      days: day
    },
    'countdown': {
      source: "countdown_bubbleClose",
      group: "countdown",
      cookie_name: "cnvt_form_days_countdown",
      days: day
    }
  };

  const config = formConfig[form_type];

  if (config) {
    const { source, group, cookie_name, days } = config;
    // Use source, group, cookie_name, and days as needed
  }

  
  widgetAnalytics(0,source,form_id,group);

  const selectorMap = {
    'optin': '.cnvt_bubble',
    'spin': '.ship-spin-widget',
    'countdown': '.ship-countdown-widget'
  };

  const selector = selectorMap[form_type];

  if (selector) {
    document.querySelector(selector).style.display = "none";
  }

  if(enable_cookie==1){
    setCookie(cookie_name,form_id,days);  
  }
}

function show_form(form_type) {
  switch (form_type) {
    case 'optin':
      form_id = form_id;
      break;
    case 'spin':
      form_id = form_id_spin;
      break;
    case 'countdown':
      form_id = form_id_countdown;
      break;
    default:
    form_id = form_id;
  }
  const formConfig = {
    'optin': {
      widgetAnalyticsArgs: [0, "optin_bubbleOpen", form_id, "optin"],
      selectorsToShow: [".cnvt_form_container"],
      selectorToHide: ".cnvt_bubble"
    },
    'spin': {
      widgetAnalyticsArgs: [0, "spin_bubbleOpen", form_id_spin, "spin"],
      selectorsToShow: [".main-div-spin"],
      selectorToHide: ".ship-spin-widget"
    },
    'countdown': {
      widgetAnalyticsArgs: [0, "countdown_bubbleOpen", form_id_countdown, "countdown"],
      selectorsToShow: [".main-div-countdown",".main-thanks-countdown"],
      selectorToHide: ".ship-countdown-widget"
    }
  };

  const config = formConfig[form_type];

  if (config) {
    const { widgetAnalyticsArgs, selectorsToShow, selectorToHide } = config;
    widgetAnalytics(...widgetAnalyticsArgs);
    selectorsToShow.forEach(selector => document.querySelector(selector).style.display = "block");
    document.querySelector(selectorToHide).style.display = "none";
  }

}

//let url = 'https://omjsms.myshopify.com/cart.js'

var createRequest = function(url,method='GET',responseType='',formData = '',async = true){
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();

    xhr.onload = function() {
      if(responseType == 'json'){
        cartData = JSON.parse(xhr.responseText);
        resolve(xhr.responseText);
      }else{
        resolve(xhr.responseText);
      }
      
    };
    xhr.open(method, url, async);
    if(formData != '')
    {
      resolve(xhr.send(formData));
    
    }else{
      resolve(xhr.send());  
    }
  });
  
}
var fnOnjRemoveElement = function (elem_id){
  let elem = document.getElementById(elem_id);
  elem.parentNode.removeChild(elem);
}

function fnOnjAddElement(parent_id, tag, attr, html){
    if(parent_id ==''){
      var elm = document.body;
    }else{
      var elm = document.getElementById(parent_id);
    }
    
    var new_elm = document.createElement(tag);
  
  //setting attributes
  if(attr != ''){
    for(var key in attr){
      if (attr.hasOwnProperty(key)) {
         new_elm.setAttribute(key, attr[key]);
      }
    }
  }
  if(html != ''){
    new_elm.innerHTML = html;
  }
    
  elm.appendChild(new_elm);
}

function showDiv(){
  document.getElementById('shp-cnv-whatsapp-chat').classList.add("show");
  document.getElementById('shp-cnv-whatsapp-chat').classList.remove("hide");
  //widgetAnalytics();
}

function tcw_hidePopup(){
  document.getElementById('shp-cnv-whatsapp-chat').classList.add("hide");
  document.getElementById('shp-cnv-whatsapp-chat').classList.remove("show");
}

function handleCountryChange(form_type='optin') {
  var isOpen = false;
  const formSelectIdMap = {
    'optin': 'input_std',
    'spin': 'spin_input_std',
    'countdown': 'countdown_input_std'
  };

  const form_select_id = formSelectIdMap[form_type] || 'input_std';

  var select = document.getElementById(form_select_id);
  var originalText = select.options[select.selectedIndex].text;
  var originalId = select.options[select.selectedIndex].id
  var transformText = select.options[select.selectedIndex].value;
  select.options[select.selectedIndex].text = transformText;

  select.addEventListener("change", function() {
      var selectedOption = select.options[select.selectedIndex];
      var selectedOptionId = selectedOption.id;
      var selectedOptionValue = selectedOption.value;
      var selectedOptionText = selectedOption.text;
      oldSelectId = selectedOptionId;
      oldSelectText = selectedOptionText;
      
      selectedOption.text = selectedOptionValue;
      isOpen = false;
  });

  select.addEventListener(`mousedown`, function(ev) {
    isOpen = !isOpen;
    if(ev.target.offsetHeight > 0 && oldSelectId!='' && oldSelectText!='')
    {
      document.getElementById(oldSelectId).text = oldSelectText;
    }
    if(isOpen)
    {
      document.getElementById(originalId).text = originalText;
    }
    else
    {
      document.getElementById(originalId).text = transformText;
    }
  });
}

function rotateFunction(){
  var min = 4;
  var max = 10;
  var deg = Math.floor(Math.random() * (max - min)) + min;
  console.log(deg);
  document.getElementById('box').style.transform = "rotate("+deg+"deg)";
}

async function form_submit_spin(){
  let sPhone = document.getElementById("spin_mobile_input").value;
  let sCode = document.getElementById("spin_input_std").value;
  if(sPhone.length<6){
    document.querySelector('.ship-validation').innerText = "Enter a valid number";
    document.querySelector('.ship-validation').style.display = "block";
    return false;
  }
  if(sPhone !== "" && sPhone !== null && sCode != ""){
    document.getElementById("spin-btn-wheel").disabled = true;

    let url ='https://convert.shipway.com/dashboard/api/analytics.php'; 
    let formData = new FormData();
    let spin_obj_data = {"phone":sPhone,"std_code":sCode,"form_id":form_id_spin};
    let spin_data = JSON.stringify(spin_obj_data);
    formData.append('shop', getShop());
    formData.append('spin_data', spin_data);
    formData.append('type', 'check_spin');
    let isdata = await createRequest(url,'POST','',formData,false);
    if(isdata>0){
      document.querySelector('.ship-validation').style.display = "none";
      document.getElementById("spin-btn-wheel").removeAttribute("onclick");
      document.querySelector('.ship-close-btn').removeAttribute('onclick');
      document.querySelector('.ship-close-btn').setAttribute('onclick', 'thanku_close(\'spin\')');
      document.querySelector('.ship-close-btn').disabled = true;
        
      const result = await spinTheWheel();
      setCookie('cnvt_submit_spin',form_id_spin,365);
      window.localStorage.setItem('cnvt_submit_spin',form_id_spin);
      let obj_data = {"phone":sPhone,"std_code":sCode,"form_id":form_id_spin,"token":token_spin,coupon_won:result.coupon};
      let insertData = JSON.stringify(obj_data);
      widgetAnalytics(0,"spin_submit",form_id_spin,"spin",1,insertData); 
    }else{
      document.querySelector('.ship-validation').innerText = "Offer Already availed on this number";
      document.querySelector('.ship-validation').style.display = "block";
      document.getElementById("spin-btn-wheel").disabled = false;
      return false;
    } 
  }
}


async function form_submit_countdown(){
  let sPhone = document.getElementById("countdown_mobile_input").value;
  let sCode = document.getElementById("countdown_input_std").value;
  if(sPhone.length<6){
    document.querySelector('.ship-validation-countdown').innerText = "Enter a valid number";
    document.querySelector('.ship-validation-countdown').style.display = "block";
    return false;
  }
  if(sPhone !== "" && sPhone !== null && sCode != ""){
    let url ='https://convert.shipway.com/dashboard/api/analytics.php'; 
    let formData = new FormData();
    let countdown_obj_data = {"phone":sPhone,"form_id":form_id_countdown,"std_code":sCode};
    let countdown_data = JSON.stringify(countdown_obj_data);
    formData.append('shop', getShop());
    formData.append('countdown_data', countdown_data);
    formData.append('type', 'check_countdown');
    let isdata = await createRequest(url,'POST','',formData,false);
    if(isdata>0){
      document.querySelector('.ship-validation-countdown').style.display = "none";
      document.querySelector(".main-box-mob-countdown").style.display = "none";
      document.querySelector(".main-box-mob-countdown").style.zIndex = "0";
      document.querySelector(".ship-thanks-box-countdown").style.display = "block";
      document.querySelector('.ship-close-btn-countdown-thanks').removeAttribute('onclick');
      document.querySelector('.ship-close-btn-countdown-thanks').setAttribute('onclick', 'thanku_close(\'countdown\')');
      document.querySelector('.ship-close-btn-countdown-thanks').disabled = true;

      setCookie('cnvt_submit_countdown',form_id_countdown,365);
      window.localStorage.setItem('cnvt_submit_countdown',form_id_countdown);
      let obj_data = {"phone":sPhone,"std_code":sCode,"form_id":form_id_countdown,"token":token_countdown};
      let insertData = JSON.stringify(obj_data);
      widgetAnalytics(0,"countdown_submit",form_id_countdown,"countdown",1,insertData); 
    }else{
      document.querySelector('.ship-validation-countdown').innerText = "Offer Already availed on this number";
      document.querySelector('.ship-validation-countdown').style.display = "block";
      return false;
    } 
  }
}

async function get_decrypt_value(encrypt) {
  let url ='https://convert.shipway.com/dashboard/api/analytics.php';
  var formData = new FormData(); 
  formData.append('encrypt', encrypt);
  formData.append('type', 'get_decypt');
  let coupon = await createRequest(url,'POST','',formData,false);
  return coupon; 
  
}
function copy_text(obj) {
  let cnvt_copyText;

  if (obj.id == 'cnvt-count') {
    cnvt_copyText = document.getElementById("cnvt-coupon-head-countdown");
  } else {
    cnvt_copyText = document.getElementById("cnvt-coupon-head");
  }

  if (navigator.clipboard) {
    navigator.clipboard.writeText(cnvt_copyText.textContent).then(function() {
      document.getElementById("ship-copied-msg").style.display = "block";
      setTimeout(function() {
        document.getElementById("ship-copied-msg").style.display = "none";
      }, 3000);
    }).catch(function(err) {
      console.error('Could not copy text: ', err);
    });
  } else {
    console.error('Clipboard API not supported');
  }
}
function copy_text1(obj) {
 
  if(obj.id == 'cnvt-count'){
    
   var cnvt_copyText = document.getElementById("cnvt-coupon-head-countdown");
  }else{
     cnvt_copyText = document.getElementById("cnvt-coupon-head");
  }
  console.log('cnvt_copyText: ',cnvt_copyText);
  //if(!cnvt_copyText){
  //  cnvt_copyText = document.getElementById("cnvt-coupon-head-countdown");
  //}
  var cnvt_range = document.createRange();
   console.log('cnvt_range: ',cnvt_range);
  var cnvt_selection = window.getSelection();
   console.log('cnvt_selection: ',cnvt_selection);
  cnvt_range.selectNodeContents(cnvt_copyText);  
  console.log('cnvt_range: ',cnvt_range);
  cnvt_selection.removeAllRanges();
  console.log('cnvt_selection: ',cnvt_selection);
  cnvt_selection.addRange(cnvt_range);
  console.log('cnvt_selection: ',cnvt_selection);
  document.execCommand("copy");
  document.getElementById("ship-copied-msg").style.display = "block";
    setTimeout(function(){
        document.getElementById("ship-copied-msg").style.display = "none";
    }, 3000);
}

function removeLeadingWhitespaceAndNewLines(content) {
    return content.replace(/^\s+/g, '').replace(/\n/g, '');
}       
var myShop = 'realiteesffs.myshopify.com'      

/*Will call always*/
/*Cart page log*/
var cartLogs = cartLogs();
var page_url = pageurl();
var user_cid = getShpCustomerId();
var user_email = customerEmail();
var page_type = cnvt_page_type();
var page_req_id = req_id();
var product_name = product_name();
var variant_id = variant_id();
var user_token = token();
var device_type = getDeviceType();
var cart_data = cartData.item_count > 0 ? JSON.stringify(cartData) : false;
var checkout_data = JSON.stringify(checkoutData());
var checkout_order_id = orderId();
var cus_ip = "10.10.3.60";
var curr_page_shp = "";

if(page_url.includes("thank_you") && user_cid != "" && user_cid != null){
    curr_page_shp = 'thank_you';
    setCookie('cnvt_cid',user_cid,365);
}else{
    if(user_cid != "" && user_cid != null){
        setCookie('cnvt_cid',user_cid,365);
    }
}

if(page_url.includes("thank_you") && (user_cid == "" || user_cid == null)){
    curr_page_shp = 'thank_you';
    var first_name  = firstName();
    var last_name   = lastName();
    var email       = customerEmail();
    let country     = c_country();

    if(first_name != "" || last_name != "" || email != "" || country != ""){
        var cookieObj = {};
        if(first_name != ""){
            cookieObj.fname = first_name;
        }
        if(last_name != ""){
            cookieObj.lname = last_name;
        }
        if(email != ""){
            cookieObj.email = email;
        }
        if(country != ""){
            cookieObj.country = country;
        }
        setCookie('cnvt_obj',JSON.stringify(cookieObj),30);
        get_cid();
    }
}

var cookie_cid = getCookie('cnvt_cid');

if(cookie_cid != ""){
  user_cid = cookie_cid;
}
if(curr_page_shp == "" && cookie_cid == ""){
    var cDetails = getCookie('cnvt_obj');
    if(cDetails != "" && cDetails != null){
        set_cid_by_cookie();
    }
}

if(page_url.includes("thank_you")){
    let order_id = orderId();
    if(order_id != 0 && order_id !== undefined){
        setCookie('cnvt_oid',order_id,30);

    }
}

if(page_url.includes("thank_you") && (user_cid == "" || user_cid == null)){
    pageLogs('thanku_page');
}else{
   var pageLogs = pageLogs("");
}

/*browse abandonment*/
if(myShop) {
   // setTimeout(() => {   
   //     let url ='https://convert.shipway.com/dashboard/api/analytics.php';
   //     let formData = new FormData(); 
   //     formData.append('type', 'browse');
   //     formData.append('shop', myShop);
   //     formData.append('pageUrl', page_url);
   //     formData.append('customerId', user_cid);
   //     formData.append('userEmail', user_email);
   //     formData.append('pageType', page_type);
   //     formData.append('reqId', page_req_id);
   //     formData.append('productName', product_name);
   //     formData.append('variantId', variant_id);
   //     formData.append('userToken', user_token);
   //     formData.append('device', device_type);
   //     formData.append('cartData', cart_data);
   //    formData.append('checkoutData', checkout_data);
   //     formData.append('orderId', checkout_order_id);
   //     formData.append('cusIp', cus_ip);
   //     createRequest(url,'POST','',formData);
   // },2000)
}


    var country_arr = JSON.parse('{"AF":"+93","AX":"+358","AL":"+355","DZ":"+213","AS":"+1684","AD":"+376","AO":"+244","AI":"+1264","AG":"+1268","AR":"+54","AM":"+374","AW":"+297","AU":"+61","AT":"+43","AZ":"+994","BS":"+1242","BH":"+973","BD":"+880","BB":"+1246","BY":"+375","BE":"+32","BZ":"+501","BJ":"+229","BM":"+1441","BT":"+975","BO":"+591","BQ":"+599","BA":"+387","BW":"+267","BR":"+55","BN":"+673","BG":"+359","BF":"+226","BI":"+257","KH":"+855","CM":"+237","CA":"+1","CV":"+238","KY":"+1345","CF":"+236","TD":"+235","CL":"+56","CN":"+86","CO":"+57","KM":"+269","CK":"+682","CR":"+506","HR":"+385","CW":"+599","CY":"+357","CZ":"+420","CD":"+243","DK":"+45","DJ":"+253","DM":"+1767","DO":"+1809","TL":"+670","EC":"+593","EG":"+20","SV":"+503","GQ":"+240","EE":"+372","ET":"+251","FO":"+298","FJ":"+679","FI":"+358","FR":"+33","GF":"+594","PF":"+689","GA":"+241","GM":"+220","GE":"+995","DE":"+49","GH":"+233","GI":"+350","GB":"+44","GR":"+30","GL":"+299","GD":"+1473","GP":"+590","GU":"+1671","GT":"+502","GG":"+44","GN":"+224","GW":"+245","GY":"+592","HT":"+509","HN":"+504","HK":"+852","HU":"+36","IS":"+354","IN":"+91","ID":"+62","IR":"+98","IQ":"+964","IE":"+353","IM":"+44","IL":"+972","IT":"+39","CI":"+225","JM":"+1876","JP":"+81","JE":"+44","JO":"+962","KZ":"+7","KE":"+254","KI":"+686","XK":"+383","KW":"+965","KG":"+996","LA":"+856","LV":"+371","LB":"+961","LS":"+266","LR":"+231","LY":"+218","LI":"+423","LT":"+370","LU":"+352","MO":"+853","MK":"+389","MG":"+261","MW":"+265","MY":"+60","MV":"+960","ML":"+223","MT":"+356","MH":"+692","MQ":"+596","MR":"+222","MU":"+230","YT":"+269","MX":"+52","FM":"+691","MD":"+373","MC":"+377","MN":"+976","ME":"+382","MS":"+1664","MA":"+212","MZ":"+258","MM":"+95","NA":"+264","NR":"+674","NP":"+977","NL":"+31","AN":"+599","NC":"+687","NZ":"+64","NI":"+505","NE":"+227","NG":"+234","MP":"+1670","NO":"+47","OM":"+968","PK":"+92","PW":"+680","PS":"+970","PA":"+507","PG":"+675","PY":"+595","PE":"+51","PH":"+63","PL":"+48","PT":"+351","PR":"+1787","QA":"+974","CG":"+242","RE":"+262","RO":"+40","RU":"+7","RW":"+250","KN":"+1869","LC":"+1758","PM":"+508","VC":"+1784","WS":"+685","SM":"+378","ST":"+239","SA":"+966","SN":"+221","RS":"+381","SC":"+248","SL":"+232","SG":"+65","SX":"+1721","SK":"+421","SI":"+386","SB":"+677","SO":"+252","ZA":"+27","KR":"+82","SS":"+211","ES":"+34","LK":"+94","SD":"+249","SR":"+597","SZ":"+268","SE":"+46","CH":"+41","SY":"+963","TW":"+886","TJ":"+992","TZ":"+255","TH":"+66","TG":"+228","TO":"+676","TT":"+1868","TN":"+216","TR":"+90","TM":"+993","TC":"+1649","UG":"+256","UA":"+380","AE":"+971","UK":"+44","US":"+1","UM":"+1","UY":"+598","UZ":"+998","VU":"+678","VE":"+58","VN":"+84","VG":"+1284","VI":"+1340","YE":"+967","ZM":"+260","ZW":"+263"}'); 
    var timeZone_obj = JSON.parse('{"Asia\/Kabul":"AF","Europe\/Tirane":"AL","Africa\/Algiers":"DZ","Pacific\/Pago_Pago":"AS","US\/Samoa":"AS","Europe\/Andorra":"AD","Africa\/Luanda":"AO","America\/Anguilla":"AI","Antarctica\/Casey":"AQ","Antarctica\/Davis":"AQ","Antarctica\/DumontDUrville":"AQ","Antarctica\/Mawson":"AQ","Antarctica\/McMurdo":"AQ","Antarctica\/Palmer":"AQ","Antarctica\/Syowa":"AQ","Antarctica\/Troll":"AQ","Antarctica\/Vostok":"AQ","America\/Antigua":"AG","America\/Argentina\/Buenos_Aires":"AR","America\/Buenos_Aires":"AR","Asia\/Yerevan":"AM","America\/Aruba":"AW","Antarctica\/Macquarie":"AU","Australia\/Adelaide":"AU","Australia\/South":"AU","Australia\/Brisbane":"AU","Australia\/Queensland":"AU","Australia\/Darwin":"AU","Australia\/North":"AU","Australia\/Eucla":"AU","Australia\/Perth":"AU","Australia\/West":"AU","Europe\/Vienna":"AT","Asia\/Baku":"AZ","America\/Nassau":"BS","Asia\/Bahrain":"BH","Asia\/Dhaka":"BD","Asia\/Dacca":"BD","America\/Barbados":"BB","Europe\/Minsk":"BY","Europe\/Brussels":"BE","America\/Belize":"BZ","Africa\/Porto-Novo":"BJ","Atlantic\/Bermuda":"BM","Asia\/Thimphu":"BT","Asia\/Thimbu":"BT","America\/La_Paz":"BO","America\/Kralendijk":"BQ","Europe\/Sarajevo":"BA","Africa\/Gaborone":"BW","America\/Araguaina":"BR","America\/Boa_Vista":"BR","America\/Eirunepe":"BR","America\/Noronha":"BR","Brazil\/DeNoronha":"BR","Indian\/Chagos":"IO","Asia\/Brunei":"BN","Europe\/Sofia":"BG","Africa\/Ouagadougou":"BF","Africa\/Bujumbura":"BI","Asia\/Phnom_Penh":"KH","Africa\/Douala":"CM","America\/Atikokan":"CA","America\/Blanc-Sablon":"CA","America\/Cambridge_Bay":"CA","America\/Rankin_Inlet":"CA","America\/St_Johns":"CA","Canada\/Newfoundland":"CA","America\/Vancouver":"CA","Canada\/Pacific":"CA","Atlantic\/Cape_Verde":"CV","America\/Cayman":"KY","Africa\/Bangui":"CF","Africa\/Ndjamena":"TD","America\/Punta_Arenas":"CL","Pacific\/Easter":"CL","Chile\/EasterIsland":"CL","Asia\/Shanghai":"CN","PRC":"CN","Asia\/Urumqi":"CN","Indian\/Christmas":"CX","Indian\/Cocos":"CC","America\/Bogota":"CO","Indian\/Comoro":"KM","Africa\/Brazzaville":"CG","Africa\/Kinshasa":"CD","Africa\/Lubumbashi":"CD","Pacific\/Rarotonga":"CK","America\/Costa_Rica":"CR","Europe\/Zagreb":"HR","America\/Havana":"CU","Cuba":"CU","America\/Curacao":"CW","Asia\/Famagusta":"CY","Europe\/Prague":"CZ","Africa\/Abidjan":"CI","Europe\/Copenhagen":"DK","Africa\/Djibouti":"DJ","America\/Dominica":"DM","America\/Santo_Domingo":"DO","America\/Guayaquil":"EC","Pacific\/Galapagos":"EC","Africa\/Cairo":"EG","Egypt":"EG","America\/El_Salvador":"SV","Africa\/Malabo":"GQ","Africa\/Asmara":"ER","Europe\/Tallinn":"EE","Africa\/Addis_Ababa":"ET","Atlantic\/Stanley":"FK","Atlantic\/Faroe":"FO","Atlantic\/Faeroe":"FO","Pacific\/Fiji":"FJ","Europe\/Helsinki":"FI","Europe\/Paris":"FR","America\/Cayenne":"GF","Pacific\/Gambier":"PF","Pacific\/Marquesas":"PF","Pacific\/Tahiti":"PF","Indian\/Kerguelen":"TF","Africa\/Libreville":"GA","Africa\/Banjul":"GM","Asia\/Tbilisi":"GE","Europe\/Berlin":"DE","Africa\/Accra":"GH","Europe\/Gibraltar":"GI","Europe\/Athens":"GR","America\/Danmarkshavn":"GL","America\/Nuuk":"GL","America\/Godthab":"GL","America\/Scoresbysund":"GL","America\/Thule":"GL","America\/Grenada":"GD","America\/Guadeloupe":"GP","Pacific\/Guam":"GU","America\/Guatemala":"GT","Europe\/Guernsey":"GG","Africa\/Conakry":"GN","Africa\/Bissau":"GW","America\/Guyana":"GY","America\/Port-au-Prince":"HT","Europe\/Vatican":"VA","America\/Tegucigalpa":"HN","Asia\/Hong_Kong":"HK","Hongkong":"HK","Europe\/Budapest":"HU","Atlantic\/Reykjavik":"IS","Asia\/Kolkata":"IN","Asia\/Calcutta":"IN","Asia\/Jakarta":"ID","Asia\/Jayapura":"ID","Asia\/Makassar":"ID","Asia\/Ujung_Pandang":"ID","Asia\/Tehran":"IR","Iran":"IR","Asia\/Baghdad":"IQ","Europe\/Dublin":"IE","Eire":"IE","Europe\/Isle_of_Man":"IM","Asia\/Jerusalem":"IL","Israel":"IL","Europe\/Rome":"IT","America\/Jamaica":"JM","Jamaica":"JM","Asia\/Tokyo":"JP","Japan":"JP","Europe\/Jersey":"JE","Asia\/Amman":"JO","Asia\/Almaty":"KZ","Asia\/Aqtau":"KZ","Africa\/Nairobi":"KE","Pacific\/Kanton":"KI","Pacific\/Enderbury":"KI","Pacific\/Kiritimati":"KI","Pacific\/Tarawa":"KI","Asia\/Pyongyang":"KP","Asia\/Seoul":"KR","ROK":"KR","Asia\/Kuwait":"KW","Asia\/Bishkek":"KG","Asia\/Vientiane":"LA","Europe\/Riga":"LV","Asia\/Beirut":"LB","Africa\/Maseru":"LS","Africa\/Monrovia":"LR","Africa\/Tripoli":"LY","Libya":"LY","Europe\/Vaduz":"LI","Europe\/Vilnius":"LT","Europe\/Luxembourg":"LU","Asia\/Macau":"MO","Asia\/Macao":"MO","Europe\/Skopje":"MK","Indian\/Antananarivo":"MG","Africa\/Blantyre":"MW","Asia\/Kuala_Lumpur":"MY","Indian\/Maldives":"MV","Africa\/Bamako":"ML","Europe\/Malta":"MT","Pacific\/Kwajalein":"MH","Kwajalein":"MH","America\/Martinique":"MQ","Africa\/Nouakchott":"MR","Indian\/Mauritius":"MU","Indian\/Mayotte":"YT","America\/Bahia_Banderas":"MX","America\/Cancun":"MX","America\/Ciudad_Juarez":"MX","America\/Tijuana":"MX","Mexico\/BajaNorte":"MX","Pacific\/Chuuk":"FM","Pacific\/Kosrae":"FM","Europe\/Chisinau":"MD","Europe\/Tiraspol":"MD","Europe\/Monaco":"MC","Asia\/Choibalsan":"MN","Asia\/Hovd":"MN","Europe\/Podgorica":"ME","America\/Montserrat":"MS","Africa\/Casablanca":"MA","Africa\/Maputo":"MZ","Asia\/Yangon":"MM","Asia\/Rangoon":"MM","Africa\/Windhoek":"NA","Pacific\/Nauru":"NR","Asia\/Kathmandu":"NP","Asia\/Katmandu":"NP","Europe\/Amsterdam":"NL","Pacific\/Noumea":"NC","Pacific\/Auckland":"NZ","NZ":"NZ","Pacific\/Chatham":"NZ","NZ-CHAT":"NZ","America\/Managua":"NI","Africa\/Niamey":"NE","Africa\/Lagos":"NG","Pacific\/Niue":"NU","Pacific\/Norfolk":"NF","Pacific\/Saipan":"MP","Europe\/Oslo":"NO","Asia\/Muscat":"OM","Asia\/Karachi":"PK","Pacific\/Palau":"PW","Asia\/Gaza":"PS","America\/Panama":"PA","Pacific\/Bougainville":"PG","Pacific\/Port_Moresby":"PG","America\/Asuncion":"PY","America\/Lima":"PE","Asia\/Manila":"PH","Pacific\/Pitcairn":"PN","Europe\/Warsaw":"PL","Poland":"PL","Atlantic\/Azores":"PT","Atlantic\/Madeira":"PT","America\/Puerto_Rico":"PR","Asia\/Qatar":"QA","Europe\/Bucharest":"RO","Asia\/Anadyr":"RU","Asia\/Barnaul":"RU","Asia\/Chita":"RU","Asia\/Irkutsk":"RU","Asia\/Magadan":"RU","Asia\/Omsk":"RU","Asia\/Ust-Nera":"RU","Asia\/Yekaterinburg":"RU","Europe\/Astrakhan":"RU","Europe\/Kaliningrad":"RU","Europe\/Kirov":"RU","Africa\/Kigali":"RW","Indian\/Reunion":"RE","America\/St_Barthelemy":"BL","Atlantic\/St_Helena":"SH","America\/St_Kitts":"KN","America\/St_Lucia":"LC","America\/Marigot":"MF","America\/Miquelon":"PM","America\/St_Vincent":"VC","Pacific\/Apia":"WS","Europe\/San_Marino":"SM","Africa\/Sao_Tome":"ST","Asia\/Riyadh":"SA","Africa\/Dakar":"SN","Europe\/Belgrade":"RS","Indian\/Mahe":"SC","Africa\/Freetown":"SL","Asia\/Singapore":"SG","Singapore":"SG","America\/Lower_Princes":"SX","Europe\/Bratislava":"SK","Europe\/Ljubljana":"SI","Pacific\/Guadalcanal":"SB","Africa\/Mogadishu":"SO","Africa\/Johannesburg":"ZA","Atlantic\/South_Georgia":"GS","Africa\/Juba":"SS","Africa\/Ceuta":"ES","Atlantic\/Canary":"ES","Asia\/Colombo":"LK","Africa\/Khartoum":"SD","America\/Paramaribo":"SR","Arctic\/Longyearbyen":"SJ","Africa\/Mbabane":"SZ","Europe\/Stockholm":"SE","Europe\/Zurich":"CH","Asia\/Damascus":"SY","Asia\/Taipei":"TW","ROC":"TW","Asia\/Dushanbe":"TJ","Africa\/Dar_es_Salaam":"TZ","Asia\/Bangkok":"TH","Asia\/Dili":"TL","Africa\/Lome":"TG","Pacific\/Fakaofo":"TK","Pacific\/Tongatapu":"TO","America\/Port_of_Spain":"TT","Africa\/Tunis":"TN","Europe\/Istanbul":"TR","Turkey":"TR","Asia\/Ashgabat":"TM","Asia\/Ashkhabad":"TM","America\/Grand_Turk":"TC","Pacific\/Funafuti":"TV","Africa\/Kampala":"UG","Europe\/Kyiv":"UA","Europe\/Zaporozhye":"UA","Europe\/Simferopol":"UA","Asia\/Dubai":"AE","Europe\/London":"GB","GB-Eire":"GB","America\/Adak":"US","US\/Aleutian":"US","America\/Anchorage":"US","US\/Alaska":"US","America\/Boise":"US","America\/Chicago":"US","US\/Central":"US","America\/Detroit":"US","US\/Michigan":"US","America\/Los_Angeles":"US","US\/Pacific":"US","Pacific\/Midway":"UM","Pacific\/Wake":"UM","America\/Montevideo":"UY","Asia\/Samarkand":"UZ","Pacific\/Efate":"VU","America\/Caracas":"VE","Asia\/Ho_Chi_Minh":"VN","Asia\/Saigon":"VN","America\/Tortola":"VG","America\/St_Thomas":"VI","Pacific\/Wallis":"WF","Asia\/Aden":"YE","Africa\/Lusaka":"ZM","Africa\/Harare":"ZW","Europe\/Mariehamn":"AX"}');

var cnvt_device = 'desktop';
var form_status   = 1;
var form_status_qr   = 0;
var form_status_spin   = 0;
var form_status_countdown   = 0;

let form_id_spin = "";
let form_id_countdown = "";
var token   = '2UkKLvJYVSnTC4WgPfVyG0Z6mwpW5AIrIFF29tQvFuIgKsswVVI+oHQcvQRDtCP/iS3+TvI4BxUtXLNc2jEO4JqvTCn31E6OfVeew+sm7O/M7AmLw9yBdoDteq2J1WWf';
var token_qr   = '';
var token_spin   = '';
var token_countdown   = '';
var thnk = 0;
var after_seconds = '10000';
var after_seconds_qr = '0000';
var after_seconds_spin = '0000';
var after_seconds_countdown = '0000';
var show_qr = '1';
var show_spin = '';
var show_countdown = '';
if(page_url.includes("thank_you")){thnk=1;}
if(form_status==1 && thnk!=1){
    var form_id = '6T7kvY7sfChDDOfa18mS3g==';
    var optin_z_index = 9999;

    var country_arr = JSON.parse('{"AF":"+93","AX":"+358","AL":"+355","DZ":"+213","AS":"+1684","AD":"+376","AO":"+244","AI":"+1264","AG":"+1268","AR":"+54","AM":"+374","AW":"+297","AU":"+61","AT":"+43","AZ":"+994","BS":"+1242","BH":"+973","BD":"+880","BB":"+1246","BY":"+375","BE":"+32","BZ":"+501","BJ":"+229","BM":"+1441","BT":"+975","BO":"+591","BQ":"+599","BA":"+387","BW":"+267","BR":"+55","BN":"+673","BG":"+359","BF":"+226","BI":"+257","KH":"+855","CM":"+237","CA":"+1","CV":"+238","KY":"+1345","CF":"+236","TD":"+235","CL":"+56","CN":"+86","CO":"+57","KM":"+269","CK":"+682","CR":"+506","HR":"+385","CW":"+599","CY":"+357","CZ":"+420","CD":"+243","DK":"+45","DJ":"+253","DM":"+1767","DO":"+1809","TL":"+670","EC":"+593","EG":"+20","SV":"+503","GQ":"+240","EE":"+372","ET":"+251","FO":"+298","FJ":"+679","FI":"+358","FR":"+33","GF":"+594","PF":"+689","GA":"+241","GM":"+220","GE":"+995","DE":"+49","GH":"+233","GI":"+350","GB":"+44","GR":"+30","GL":"+299","GD":"+1473","GP":"+590","GU":"+1671","GT":"+502","GG":"+44","GN":"+224","GW":"+245","GY":"+592","HT":"+509","HN":"+504","HK":"+852","HU":"+36","IS":"+354","IN":"+91","ID":"+62","IR":"+98","IQ":"+964","IE":"+353","IM":"+44","IL":"+972","IT":"+39","CI":"+225","JM":"+1876","JP":"+81","JE":"+44","JO":"+962","KZ":"+7","KE":"+254","KI":"+686","XK":"+383","KW":"+965","KG":"+996","LA":"+856","LV":"+371","LB":"+961","LS":"+266","LR":"+231","LY":"+218","LI":"+423","LT":"+370","LU":"+352","MO":"+853","MK":"+389","MG":"+261","MW":"+265","MY":"+60","MV":"+960","ML":"+223","MT":"+356","MH":"+692","MQ":"+596","MR":"+222","MU":"+230","YT":"+269","MX":"+52","FM":"+691","MD":"+373","MC":"+377","MN":"+976","ME":"+382","MS":"+1664","MA":"+212","MZ":"+258","MM":"+95","NA":"+264","NR":"+674","NP":"+977","NL":"+31","AN":"+599","NC":"+687","NZ":"+64","NI":"+505","NE":"+227","NG":"+234","MP":"+1670","NO":"+47","OM":"+968","PK":"+92","PW":"+680","PS":"+970","PA":"+507","PG":"+675","PY":"+595","PE":"+51","PH":"+63","PL":"+48","PT":"+351","PR":"+1787","QA":"+974","CG":"+242","RE":"+262","RO":"+40","RU":"+7","RW":"+250","KN":"+1869","LC":"+1758","PM":"+508","VC":"+1784","WS":"+685","SM":"+378","ST":"+239","SA":"+966","SN":"+221","RS":"+381","SC":"+248","SL":"+232","SG":"+65","SX":"+1721","SK":"+421","SI":"+386","SB":"+677","SO":"+252","ZA":"+27","KR":"+82","SS":"+211","ES":"+34","LK":"+94","SD":"+249","SR":"+597","SZ":"+268","SE":"+46","CH":"+41","SY":"+963","TW":"+886","TJ":"+992","TZ":"+255","TH":"+66","TG":"+228","TO":"+676","TT":"+1868","TN":"+216","TR":"+90","TM":"+993","TC":"+1649","UG":"+256","UA":"+380","AE":"+971","UK":"+44","US":"+1","UM":"+1","UY":"+598","UZ":"+998","VU":"+678","VE":"+58","VN":"+84","VG":"+1284","VI":"+1340","YE":"+967","ZM":"+260","ZW":"+263"}');
    var bubble_value  = 'bubble';
    var enable_cookie = '1';
    var set_days   = '7';

    let cookie_days   = getCookie('cnvt_form_days');
    let submit_status = getCookie('cnvt_submit');
    let local_submit_status = window.localStorage.getItem('cnvt_submit');

    if(submit_status == "" || submit_status == null || submit_status != form_id){
      if((local_submit_status == "" || local_submit_status == null || local_submit_status != form_id ) && (cookie_days == "" || cookie_days == null || cookie_days != form_id) ){
                                var general_form = removeLeadingWhitespaceAndNewLines(`<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://convert.shipway.com/dashboard/css/bootstrap.min.css">
<link href="https://fonts.googleapis.com/css?family=Kaushan Script" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400..800&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet">
<style type="text/css">
 @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&display=swap');
 @import url('https://fonts.googleapis.com/css?family=Baloo');
 @import url('https://fonts.googleapis.com/css?family=Lato');
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

p{margin-bottom: 0;}

.cnvt_form_container{
    width: 100%;
    height: 100vh;
}
.cnvt_popup_bg{
    position: fixed;
    top: 0;
    left: 0;
    background-color: #7bbcea4f;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999999;
}
.cnvt_offer_popup{
    display: flex;
    justify-content: center;
    align-self: center;
    flex-wrap: wrap; 
    background: #ffffff;
    background-position: center ;
    background-repeat: no-repeat;
    background-size: cover;
    width:780px;
    border-radius:5px;
    position: relative;
    overflow: hidden;
    border-radius: 5px;
}

.cnvt_offer_popup .cnvt_close_icon{
    position: absolute;
    top: 10px;
    right: 10px;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: #ffffff;
    fill: #374347;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 1px;
    cursor: pointer;
}

/* without Image section */
.cnvt_content_section{
    display: flex;
    justify-content: center;
    align-self: center;
    flex-direction: column;
    text-align: center;
    color: #fff;
    padding: 20px;
    width: 50%;
}


/*.cnvt_content_section .heading1{*/
.cnvt_heading{
    margin-bottom: 20px;
    text-align: center;
    color: #374347;
    font-size: 30px;
    font-family: Arial;
    text-decoration: ;
    font-weight: bold;
    font-style: ;
}

.cnvt_content_section .cnvt_subheading{
    margin-bottom: 20px;
    text-align: center;
    color: #374347;
    font-size: 10px;
    font-family: Arial;
    text-decoration: ;
    font-weight: ;
    font-style: ;
}

.cnvt_userDetail_form{
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 15px;
}
.cnvt_userDetail_form .formdiv{
    border-radius: 5px; 
    border: 1px solid #000000;
    overflow: hidden;
}
.cnvt_userDetail_form .countrySelect{
  background-color: #fff;
  width:75px!important;
  margin-top:0px;
  border:none;
  color: black;
  outline: none;
  padding: 5px;
  margin: 0;
  -webkit-box-shadow : none;
  box-shadow : none;
  border-radius: 0 !important;
  height: inherit;
  background-color: #fff;
}


.cnvt_userDetail_form .cnvt_mobile_number_input{
    padding: 13px;
    border: none;
    color: #374347;
    font-size: 12px;
    font-family: Arial;
    margin: 0;
    -webkit-box-shadow : none;
    box-shadow : none;
    text-align:start;
    background-color: #fff;
}
.cnvt_userDetail_form .cnvt_mobile_number_input:focus { 
    outline: none;
    border: none;
    box-shadow: none;
}
.cnvt_userDetail_form .cnvt_submitButton{
    cursor: pointer;
    border: none;
    padding: 7px;
    border-radius: 5px;
    background-color:  #c4ff5e;
    text-align: center;
    color: #000000;
    font-size: 18px;
    font-family: helvetica;
}
.cnvt_smstext{
    font-family: Arial;
    text-align: center;
    font-size: 10px;
    color: #374347;
    text-decoration: ;
    font-weight: ;
    font-style: ;
    margin: 15px 0px;
    overflow-wrap: break-word;
}
.cnvt_logo_Section img{
    width: 100px;
}
.cnvt_image_section {
    display: flex;
    justify-content: center;
    width: 50%;
    overflow: hidden !important;
    background-color: #ffffff;
*/}
.cnvt_image_section .imageSec{
    background-image:  url(https://shipway-convertway.s3.ap-south-1.amazonaws.com/2.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: 100%;
    height: 100%;
    display: block;
    /*border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;*/
    padding: 0px;
}

.cnvt_main_div_form{
    z-index: 9999;
}
/* responsive css*/
@media (max-width: 600px) {
    .cnvt_offer_popup{
        width: 350px;
        padding:"25px";
        background: #ffffff;
        background-position: center ;
        background-repeat: no-repeat;
        background-size: cover;
   }
   .cnvt_image_section {
       width: 100%;
       display: none;
    }
    .cnvt_content_section{
        width: 100%;
    }
}


/*Thanku CSS*/
.cnvt_success_popup{
    background: #fff;
    background-image: ;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    position: relative;
    width: 350px;
    min-height: 200px;
}
.cnvt_success_popup .cnvt_thanku_close_icon{
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
}

.cnvt_success_popup .success_sms{
    text-align: center;
    color: #374347;
    font-size: 12px;
    font-family: Arial;
    text-decoration: ;
    font-weight: ;
    font-style: ;
}

.cnvt_success_image{
    width: 65px;
    height: 65px;
    margin: auto;

}
.cnvt_success_heading{
    font-size:28px;
    font-weight: bold;
}
.cnvt_popup_box_thanku{
    display: none;
}


/* Bubble CSS */
.cnvt_bubble{
    position: fixed;
    bottom: 63px;
    right: 17px;
    display: none;
z-index:9999;
}

.cnvt_bubble .box{
    position: relative;
}

.cnvt_bubble .box .cnvt_close_icon{
    position: absolute;
    right: -8px;
    top: -8px;
    background-color: #ffffff;
    fill: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 1px;
    cursor: pointer;
    height: 20px;
    width: 20px;
    border-radius: 50%;
}

.cnvt_bubble .box .cnvt_actionButton{
    color: #ffffff;
    background-color: #0acf97;
    border: none;
    padding: 10px;
    border-radius: 10px;
    z-index:99999999;
    cursor: pointer;
}

</style>


<!-- Popup Form -->
<div class="cnvt_form_container">
    <div class="cnvt_popup_bg">
        <div class="cnvt_offer_popup">
            <div class="cnvt_close_icon" onclick="form1_close(\'6T7kvY7sfChDDOfa18mS3g==\',\'optin\',enable_cookie)" >
                <svg
                xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="19">
                <path
                    d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z" />
                </svg>
            </div>
            <div class="cnvt_content_section">
                <p class="cnvt_heading">✨Stay above the commons✨</p>
                <!-- with image -->
                <p class="cnvt_subheading">Add your phone number to get exclusive deals and join in our insider list.</p>
                <!-- without image -->
                <!-- <p class="subheading">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta pariatur tempora deleniti amet nulla ut eveniet laboriosam reiciendis minus laudantium.</p> -->
                <form action="" class="cnvt_userDetail_form">
                    <div style="display: flex;" class="formdiv">
                    <select id="input_std" class="countrySelect"> <option id="country_af" value="+93" data-fullname="Afghanistan">Afghanistan (+93)</option>  <option id="country_ax" value="+358" data-fullname="Åland Islands">Åland Islands (+358)</option>  <option id="country_al" value="+355" data-fullname="Albania">Albania (+355)</option>  <option id="country_dz" value="+213" data-fullname="Algeria">Algeria (+213)</option>  <option id="country_as" value="+1684" data-fullname="American Samoa">American Samoa (+1684)</option>  <option id="country_ad" value="+376" data-fullname="Andorra">Andorra (+376)</option>  <option id="country_ao" value="+244" data-fullname="Angola">Angola (+244)</option>  <option id="country_ai" value="+1264" data-fullname="Anguilla">Anguilla (+1264)</option>  <option id="country_ag" value="+1268" data-fullname="Antigua and Barbuda">Antigua and Barbuda (+1268)</option>  <option id="country_ar" value="+54" data-fullname="Argentina">Argentina (+54)</option>  <option id="country_am" value="+374" data-fullname="Armenia">Armenia (+374)</option>  <option id="country_aw" value="+297" data-fullname="Aruba">Aruba (+297)</option>  <option id="country_au" value="+61" data-fullname="Australia">Australia (+61)</option>  <option id="country_at" value="+43" data-fullname="Austria">Austria (+43)</option>  <option id="country_az" value="+994" data-fullname="Azerbaijan">Azerbaijan (+994)</option>  <option id="country_bs" value="+1242" data-fullname="Bahamas">Bahamas (+1242)</option>  <option id="country_bh" value="+973" data-fullname="Bahrain">Bahrain (+973)</option>  <option id="country_bd" value="+880" data-fullname="Bangladesh">Bangladesh (+880)</option>  <option id="country_bb" value="+1246" data-fullname="Barbados">Barbados (+1246)</option>  <option id="country_by" value="+375" data-fullname="Belarus">Belarus (+375)</option>  <option id="country_be" value="+32" data-fullname="Belgium">Belgium (+32)</option>  <option id="country_bz" value="+501" data-fullname="Belize">Belize (+501)</option>  <option id="country_bj" value="+229" data-fullname="Benin">Benin (+229)</option>  <option id="country_bm" value="+1441" data-fullname="Bermuda">Bermuda (+1441)</option>  <option id="country_bt" value="+975" data-fullname="Bhutan">Bhutan (+975)</option>  <option id="country_bo" value="+591" data-fullname="Bolivia">Bolivia (+591)</option>  <option id="country_bq" value="+599" data-fullname="Bonaire, Sint Eustatius and Saba">Bonaire, Sint Eustatius and Saba (+599)</option>  <option id="country_ba" value="+387" data-fullname="Bosnia and Herzegovina">Bosnia and Herzegovina (+387)</option>  <option id="country_bw" value="+267" data-fullname="Botswana">Botswana (+267)</option>  <option id="country_br" value="+55" data-fullname="Brazil">Brazil (+55)</option>  <option id="country_bn" value="+673" data-fullname="Brunei">Brunei (+673)</option>  <option id="country_bg" value="+359" data-fullname="Bulgaria">Bulgaria (+359)</option>  <option id="country_bf" value="+226" data-fullname="Burkina Faso">Burkina Faso (+226)</option>  <option id="country_bi" value="+257" data-fullname="Burundi">Burundi (+257)</option>  <option id="country_kh" value="+855" data-fullname="Cambodia">Cambodia (+855)</option>  <option id="country_cm" value="+237" data-fullname="Cameroon">Cameroon (+237)</option>  <option id="country_ca" value="+1" data-fullname="Canada">Canada (+1)</option>  <option id="country_cv" value="+238" data-fullname="Cape Verde">Cape Verde (+238)</option>  <option id="country_ky" value="+1345" data-fullname="Cayman Islands">Cayman Islands (+1345)</option>  <option id="country_cf" value="+236" data-fullname="Central African Republic">Central African Republic (+236)</option>  <option id="country_td" value="+235" data-fullname="Chad">Chad (+235)</option>  <option id="country_cl" value="+56" data-fullname="Chile">Chile (+56)</option>  <option id="country_cn" value="+86" data-fullname="China">China (+86)</option>  <option id="country_co" value="+57" data-fullname="Colombia">Colombia (+57)</option>  <option id="country_km" value="+269" data-fullname="Comoros">Comoros (+269)</option>  <option id="country_ck" value="+682" data-fullname="Cook Islands">Cook Islands (+682)</option>  <option id="country_cr" value="+506" data-fullname="Costa Rica">Costa Rica (+506)</option>  <option id="country_hr" value="+385" data-fullname="Croatia">Croatia (+385)</option>  <option id="country_cw" value="+599" data-fullname="Curacao">Curacao (+599)</option>  <option id="country_cy" value="+357" data-fullname="Cyprus">Cyprus (+357)</option>  <option id="country_cz" value="+420" data-fullname="Czechia">Czechia (+420)</option>  <option id="country_cd" value="+243" data-fullname="Democratic Republic of the Congo">Democratic Republic of the Congo (+243)</option>  <option id="country_dk" value="+45" data-fullname="Denmark">Denmark (+45)</option>  <option id="country_dj" value="+253" data-fullname="Djibouti">Djibouti (+253)</option>  <option id="country_dm" value="+1767" data-fullname="Dominica">Dominica (+1767)</option>  <option id="country_do" value="+1809" data-fullname="Dominican Republic">Dominican Republic (+1809)</option>  <option id="country_tl" value="+670" data-fullname="East Timor">East Timor (+670)</option>  <option id="country_ec" value="+593" data-fullname="Ecuador">Ecuador (+593)</option>  <option id="country_eg" value="+20" data-fullname="Egypt">Egypt (+20)</option>  <option id="country_sv" value="+503" data-fullname="El Salvador">El Salvador (+503)</option>  <option id="country_gq" value="+240" data-fullname="Equatorial Guinea">Equatorial Guinea (+240)</option>  <option id="country_ee" value="+372" data-fullname="Estonia">Estonia (+372)</option>  <option id="country_et" value="+251" data-fullname="Ethiopia">Ethiopia (+251)</option>  <option id="country_fo" value="+298" data-fullname="Faroe Islands">Faroe Islands (+298)</option>  <option id="country_fj" value="+679" data-fullname="Fiji">Fiji (+679)</option>  <option id="country_fi" value="+358" data-fullname="Finland">Finland (+358)</option>  <option id="country_fr" value="+33" data-fullname="France">France (+33)</option>  <option id="country_gf" value="+594" data-fullname="French Guiana">French Guiana (+594)</option>  <option id="country_pf" value="+689" data-fullname="French Polynesia">French Polynesia (+689)</option>  <option id="country_ga" value="+241" data-fullname="Gabon">Gabon (+241)</option>  <option id="country_gm" value="+220" data-fullname="Gambia">Gambia (+220)</option>  <option id="country_ge" value="+995" data-fullname="Georgia">Georgia (+995)</option>  <option id="country_de" value="+49" data-fullname="Germany">Germany (+49)</option>  <option id="country_gh" value="+233" data-fullname="Ghana">Ghana (+233)</option>  <option id="country_gi" value="+350" data-fullname="Gibraltar">Gibraltar (+350)</option>  <option id="country_gb" value="+44" data-fullname="Great Britain">Great Britain (+44)</option>  <option id="country_gr" value="+30" data-fullname="Greece">Greece (+30)</option>  <option id="country_gl" value="+299" data-fullname="Greenland">Greenland (+299)</option>  <option id="country_gd" value="+1473" data-fullname="Grenada">Grenada (+1473)</option>  <option id="country_gp" value="+590" data-fullname="Guadeloupe">Guadeloupe (+590)</option>  <option id="country_gu" value="+1671" data-fullname="Guam">Guam (+1671)</option>  <option id="country_gt" value="+502" data-fullname="Guatemala">Guatemala (+502)</option>  <option id="country_gg" value="+44" data-fullname="Guernsey">Guernsey (+44)</option>  <option id="country_gn" value="+224" data-fullname="Guinea">Guinea (+224)</option>  <option id="country_gw" value="+245" data-fullname="Guinea-Bissau">Guinea-Bissau (+245)</option>  <option id="country_gy" value="+592" data-fullname="Guyana">Guyana (+592)</option>  <option id="country_ht" value="+509" data-fullname="Haiti">Haiti (+509)</option>  <option id="country_hn" value="+504" data-fullname="Honduras">Honduras (+504)</option>  <option id="country_hk" value="+852" data-fullname="Hong Kong">Hong Kong (+852)</option>  <option id="country_hu" value="+36" data-fullname="Hungary">Hungary (+36)</option>  <option id="country_is" value="+354" data-fullname="Iceland">Iceland (+354)</option>  <option id="country_in" value="+91" data-fullname="India">India (+91)</option>  <option id="country_id" value="+62" data-fullname="Indonesia">Indonesia (+62)</option>  <option id="country_ir" value="+98" data-fullname="Iran">Iran (+98)</option>  <option id="country_iq" value="+964" data-fullname="Iraq">Iraq (+964)</option>  <option id="country_ie" value="+353" data-fullname="Ireland">Ireland (+353)</option>  <option id="country_im" value="+44" data-fullname="Isle of Man">Isle of Man (+44)</option>  <option id="country_il" value="+972" data-fullname="Israel">Israel (+972)</option>  <option id="country_it" value="+39" data-fullname="Italy">Italy (+39)</option>  <option id="country_ci" value="+225" data-fullname="Ivory Coast">Ivory Coast (+225)</option>  <option id="country_jm" value="+1876" data-fullname="Jamaica">Jamaica (+1876)</option>  <option id="country_jp" value="+81" data-fullname="Japan">Japan (+81)</option>  <option id="country_je" value="+44" data-fullname="Jersey">Jersey (+44)</option>  <option id="country_jo" value="+962" data-fullname="Jordan">Jordan (+962)</option>  <option id="country_kz" value="+7" data-fullname="Kazakhstan">Kazakhstan (+7)</option>  <option id="country_ke" value="+254" data-fullname="Kenya">Kenya (+254)</option>  <option id="country_ki" value="+686" data-fullname="Kiribati">Kiribati (+686)</option>  <option id="country_xk" value="+383" data-fullname="Kosovo">Kosovo (+383)</option>  <option id="country_kw" value="+965" data-fullname="Kuwait">Kuwait (+965)</option>  <option id="country_kg" value="+996" data-fullname="Kyrgyzstan">Kyrgyzstan (+996)</option>  <option id="country_la" value="+856" data-fullname="Laos">Laos (+856)</option>  <option id="country_lv" value="+371" data-fullname="Latvia">Latvia (+371)</option>  <option id="country_lb" value="+961" data-fullname="Lebanon">Lebanon (+961)</option>  <option id="country_ls" value="+266" data-fullname="Lesotho">Lesotho (+266)</option>  <option id="country_lr" value="+231" data-fullname="Liberia">Liberia (+231)</option>  <option id="country_ly" value="+218" data-fullname="Libya">Libya (+218)</option>  <option id="country_li" value="+423" data-fullname="Liechtenstein">Liechtenstein (+423)</option>  <option id="country_lt" value="+370" data-fullname="Lithuania">Lithuania (+370)</option>  <option id="country_lu" value="+352" data-fullname="Luxembourg">Luxembourg (+352)</option>  <option id="country_mo" value="+853" data-fullname="Macau">Macau (+853)</option>  <option id="country_mk" value="+389" data-fullname="Macedonia">Macedonia (+389)</option>  <option id="country_mg" value="+261" data-fullname="Madagascar">Madagascar (+261)</option>  <option id="country_mw" value="+265" data-fullname="Malawi">Malawi (+265)</option>  <option id="country_my" value="+60" data-fullname="Malaysia">Malaysia (+60)</option>  <option id="country_mv" value="+960" data-fullname="Maldives">Maldives (+960)</option>  <option id="country_ml" value="+223" data-fullname="Mali">Mali (+223)</option>  <option id="country_mt" value="+356" data-fullname="Malta">Malta (+356)</option>  <option id="country_mh" value="+692" data-fullname="Marshall Islands">Marshall Islands (+692)</option>  <option id="country_mq" value="+596" data-fullname="Martinique">Martinique (+596)</option>  <option id="country_mr" value="+222" data-fullname="Mauritania">Mauritania (+222)</option>  <option id="country_mu" value="+230" data-fullname="Mauritius">Mauritius (+230)</option>  <option id="country_yt" value="+269" data-fullname="Mayotte">Mayotte (+269)</option>  <option id="country_mx" value="+52" data-fullname="Mexico">Mexico (+52)</option>  <option id="country_fm" value="+691" data-fullname="Micronesia">Micronesia (+691)</option>  <option id="country_md" value="+373" data-fullname="Moldova">Moldova (+373)</option>  <option id="country_mc" value="+377" data-fullname="Monaco">Monaco (+377)</option>  <option id="country_mn" value="+976" data-fullname="Mongolia">Mongolia (+976)</option>  <option id="country_me" value="+382" data-fullname="Montenegro">Montenegro (+382)</option>  <option id="country_ms" value="+1664" data-fullname="Montserrat">Montserrat (+1664)</option>  <option id="country_ma" value="+212" data-fullname="Morocco">Morocco (+212)</option>  <option id="country_mz" value="+258" data-fullname="Mozambique">Mozambique (+258)</option>  <option id="country_mm" value="+95" data-fullname="Myanmar">Myanmar (+95)</option>  <option id="country_na" value="+264" data-fullname="Namibia">Namibia (+264)</option>  <option id="country_nr" value="+674" data-fullname="Nauru">Nauru (+674)</option>  <option id="country_np" value="+977" data-fullname="Nepal">Nepal (+977)</option>  <option id="country_nl" value="+31" data-fullname="Netherlands">Netherlands (+31)</option>  <option id="country_an" value="+599" data-fullname="Netherlands Antilles">Netherlands Antilles (+599)</option>  <option id="country_nc" value="+687" data-fullname="New Caledonia">New Caledonia (+687)</option>  <option id="country_nz" value="+64" data-fullname="New Zealand">New Zealand (+64)</option>  <option id="country_ni" value="+505" data-fullname="Nicaragua">Nicaragua (+505)</option>  <option id="country_ne" value="+227" data-fullname="Niger">Niger (+227)</option>  <option id="country_ng" value="+234" data-fullname="Nigeria">Nigeria (+234)</option>  <option id="country_mp" value="+1670" data-fullname="Northern Mariana Islands">Northern Mariana Islands (+1670)</option>  <option id="country_no" value="+47" data-fullname="Norway">Norway (+47)</option>  <option id="country_om" value="+968" data-fullname="Oman">Oman (+968)</option>  <option id="country_pk" value="+92" data-fullname="Pakistan">Pakistan (+92)</option>  <option id="country_pw" value="+680" data-fullname="Palau">Palau (+680)</option>  <option id="country_ps" value="+970" data-fullname="Palestinian Territory">Palestinian Territory (+970)</option>  <option id="country_pa" value="+507" data-fullname="Panama">Panama (+507)</option>  <option id="country_pg" value="+675" data-fullname="Papua New Guinea">Papua New Guinea (+675)</option>  <option id="country_py" value="+595" data-fullname="Paraguay">Paraguay (+595)</option>  <option id="country_pe" value="+51" data-fullname="Peru">Peru (+51)</option>  <option id="country_ph" value="+63" data-fullname="Philippines">Philippines (+63)</option>  <option id="country_pl" value="+48" data-fullname="Poland">Poland (+48)</option>  <option id="country_pt" value="+351" data-fullname="Portugal">Portugal (+351)</option>  <option id="country_pr" value="+1787" data-fullname="Puerto Rico">Puerto Rico (+1787)</option>  <option id="country_qa" value="+974" data-fullname="Qatar">Qatar (+974)</option>  <option id="country_cg" value="+242" data-fullname="Republic Of The Congo">Republic Of The Congo (+242)</option>  <option id="country_re" value="+262" data-fullname="Réunion Island">Réunion Island (+262)</option>  <option id="country_ro" value="+40" data-fullname="Romania">Romania (+40)</option>  <option id="country_ru" value="+7" data-fullname="Russia">Russia (+7)</option>  <option id="country_rw" value="+250" data-fullname="Rwanda">Rwanda (+250)</option>  <option id="country_kn" value="+1869" data-fullname="Saint Kitts and Nevis">Saint Kitts and Nevis (+1869)</option>  <option id="country_lc" value="+1758" data-fullname="Saint Lucia">Saint Lucia (+1758)</option>  <option id="country_pm" value="+508" data-fullname="Saint Pierre and Miquelon">Saint Pierre and Miquelon (+508)</option>  <option id="country_vc" value="+1784" data-fullname="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines (+1784)</option>  <option id="country_ws" value="+685" data-fullname="Samoa">Samoa (+685)</option>  <option id="country_sm" value="+378" data-fullname="San Marino">San Marino (+378)</option>  <option id="country_st" value="+239" data-fullname="Sao Tome and Principe">Sao Tome and Principe (+239)</option>  <option id="country_sa" value="+966" data-fullname="Saudi Arabia">Saudi Arabia (+966)</option>  <option id="country_sn" value="+221" data-fullname="Senegal">Senegal (+221)</option>  <option id="country_rs" value="+381" data-fullname="Serbia">Serbia (+381)</option>  <option id="country_sc" value="+248" data-fullname="Seychelles">Seychelles (+248)</option>  <option id="country_sl" value="+232" data-fullname="Sierra Leone">Sierra Leone (+232)</option>  <option id="country_sg" value="+65" data-fullname="Singapore">Singapore (+65)</option>  <option id="country_sx" value="+1721" data-fullname="Sint Maarten (Dutch Part)">Sint Maarten (Dutch Part) (+1721)</option>  <option id="country_sk" value="+421" data-fullname="Slovakia">Slovakia (+421)</option>  <option id="country_si" value="+386" data-fullname="Slovenia">Slovenia (+386)</option>  <option id="country_sb" value="+677" data-fullname="Solomon Islands">Solomon Islands (+677)</option>  <option id="country_so" value="+252" data-fullname="Somalia">Somalia (+252)</option>  <option id="country_za" value="+27" data-fullname="South Africa">South Africa (+27)</option>  <option id="country_kr" value="+82" data-fullname="South Korea">South Korea (+82)</option>  <option id="country_ss" value="+211" data-fullname="South Sudan">South Sudan (+211)</option>  <option id="country_es" value="+34" data-fullname="Spain">Spain (+34)</option>  <option id="country_lk" value="+94" data-fullname="Sri Lanka">Sri Lanka (+94)</option>  <option id="country_sd" value="+249" data-fullname="Sudan">Sudan (+249)</option>  <option id="country_sr" value="+597" data-fullname="Suriname">Suriname (+597)</option>  <option id="country_sz" value="+268" data-fullname="Swaziland">Swaziland (+268)</option>  <option id="country_se" value="+46" data-fullname="Sweden">Sweden (+46)</option>  <option id="country_ch" value="+41" data-fullname="Switzerland">Switzerland (+41)</option>  <option id="country_sy" value="+963" data-fullname="Syria">Syria (+963)</option>  <option id="country_tw" value="+886" data-fullname="Taiwan">Taiwan (+886)</option>  <option id="country_tj" value="+992" data-fullname="Tajikistan">Tajikistan (+992)</option>  <option id="country_tz" value="+255" data-fullname="Tanzania">Tanzania (+255)</option>  <option id="country_th" value="+66" data-fullname="Thailand">Thailand (+66)</option>  <option id="country_tg" value="+228" data-fullname="Togo">Togo (+228)</option>  <option id="country_to" value="+676" data-fullname="Tonga">Tonga (+676)</option>  <option id="country_tt" value="+1868" data-fullname="Trinidad and Tobago">Trinidad and Tobago (+1868)</option>  <option id="country_tn" value="+216" data-fullname="Tunisia">Tunisia (+216)</option>  <option id="country_tr" value="+90" data-fullname="Turkey">Turkey (+90)</option>  <option id="country_tm" value="+993" data-fullname="Turkmenistan">Turkmenistan (+993)</option>  <option id="country_tc" value="+1649" data-fullname="Turks and Caicos Islands">Turks and Caicos Islands (+1649)</option>  <option id="country_ug" value="+256" data-fullname="Uganda">Uganda (+256)</option>  <option id="country_ua" value="+380" data-fullname="Ukraine">Ukraine (+380)</option>  <option id="country_ae" value="+971" data-fullname="United Arab Emirates">United Arab Emirates (+971)</option>  <option id="country_uk" value="+44" data-fullname="United Kingdom">United Kingdom (+44)</option>  <option id="country_us" value="+1" data-fullname="United States">United States (+1)</option>  <option id="country_um" value="+1" data-fullname="United States Minor Outlying Islands">United States Minor Outlying Islands (+1)</option>  <option id="country_uy" value="+598" data-fullname="Uruguay">Uruguay (+598)</option>  <option id="country_uz" value="+998" data-fullname="Uzbekistan">Uzbekistan (+998)</option>  <option id="country_vu" value="+678" data-fullname="Vanuatu">Vanuatu (+678)</option>  <option id="country_ve" value="+58" data-fullname="Venezuela">Venezuela (+58)</option>  <option id="country_vn" value="+84" data-fullname="Vietnam">Vietnam (+84)</option>  <option id="country_vg" value="+1284" data-fullname="Virgin Islands, British">Virgin Islands, British (+1284)</option>  <option id="country_vi" value="+1340" data-fullname="Virgin Islands, US">Virgin Islands, US (+1340)</option>  <option id="country_ye" value="+967" data-fullname="Yemen">Yemen (+967)</option>  <option id="country_zm" value="+260" data-fullname="Zambia">Zambia (+260)</option>  <option id="country_zw" value="+263" data-fullname="Zimbabwe">Zimbabwe (+263)</option> </select>
                    <input style="width:100%" oninput="return checkNumber(event)" type="text" pattern="[0-9]*" value="" placeholder="Mobile Number" id="mobile_number_input" 
                        placeholder=" +91 Enter Your Mobile Number" class="cnvt_mobile_number_input">
                    </div>                    
                    <span class="cnvt_submitButton" onclick="form_submit(\'6T7kvY7sfChDDOfa18mS3g==\')">
                        Join Now                    </span>
                </form>
                <div class="cnvt_smstext"> By signing up via text you agree to receive recurring automated marketing messages and shopping cart reminders at the phone number provided. Reply STOP to unsubscribe.</div>
                                    <p style="text-align:center;margin-bottom:0px" class="cnvt_logo_Section"><a href="https://apps.shopify.com/sms-notifications-1?utm_source=realiteesffs.myshopify.com&utm_medium=optin_form&utm_campaign=optin_form" target="_blank"><img class="ship-optin-logo" src="https://convert.shipway.com/dashboard/images/convertway_logo.png" alt="" style="max-width:150px;display:unset;"></a></p>
                                   
            </div>
            <!-- with image section -->
                        <div class="cnvt_image_section">
                <div class="imageSec">                    
                </div>
                <!-- <img src="https://shipway-convertway.s3.ap-south-1.amazonaws.com/2.jpg" alt=""> -->
            </div> 
                </div>
    </div>
</div>



<!-- Thanku popup -->
<div class="form_container cnvt_popup_box_thanku">
    <div class="cnvt_popup_bg">
        <div class="cnvt_success_popup">
            <div class="cnvt_thanku_close_icon" onclick="thanku_close()" >
                <svg
                xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="19">
                <path
                    d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z" />
                </svg>
            </div>
            <div class="success_content">
                <img class="cnvt_success_image" src="https://convert.shipway.com/dashboard/images/thank.png" alt="" >
                <h3 class="cnvt_success_heading">
                    Thank you
                </h3>
                <p class="success_sms">
                    Thank you for subscribing with us. You will be the first to know about the latest offers and other updates. 
                </p>
            </div>
        </div>
    </div>
</div>

<!-- bubble -->
<div class="cnvt_bubble">
    <div class="box">
          <div class="cnvt_close_icon" onclick="bubble_close(\'6T7kvY7sfChDDOfa18mS3g==\',\'optin\',enable_cookie)" >
            <svg
            xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="19">
            <path
                d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z" />
            </svg>
        </div>
        <button class="cnvt_actionButton" onclick="show_form(\'optin\')"> 
            GET 5% OFF        </button> 
</div>


`);
            setTimeout(() => setTime('+91',general_form),after_seconds);
              }
    }
}
css = '<style>#shp-cnv-whatsapp-chat { box-sizing: border-box !important; outline: none !important; position: fixed; width: 350px; border-radius: 10px;box-shadow: 0 1px 15px rgba(32, 33, 36, 0.28); bottom: 90px; overflow: hidden;z-index: 9999999;}';

css += 'a.shp-cnv-shipway-chat { position: fixed;  display: flex; font-weight: 400; justify-content: space-between; z-index: 9999999;font-size: 15px; padding: 10px 20px; border-radius: 30px;}';

css += 'a.shp-cnv-shipway-chat {background: #25d366; color: #ffffff; box-shadow: 0 1px 15px rgba(32, 33, 36, 0.28);}';
 
    css += '#shp-cnv-whatsapp-chat {right: 30px;}';
    css += 'a.shp-cnv-shipway-chat {right: 20px;}';
    css += 'a.shp-cnv-shipway-chat {bottom: 20px;}';

    css += 'a.shp-cnv-shipway-chat svg {transform: scale(1.2);margin: 0 10px 0 0;}';

css += '.shp-cnv-whatsapp-chat-header { color: #fff; padding: 10px 20px 20px 25px;}';
css += '.shp-cnv-whatsapp-chat-header h3 { margin: 0 0 10px;}';
css += '.shp-cnv-whatsapp-chat-header p { font-size: 14px !important; line-height: 20px !important; margin: -10px;}';
css += '.shp-cnv-whatsapp-chat-header .shp-cnv-whatsapp-chat-name {font-size: 16px !important; font-weight: 600;padding-bottom: 0; margin-bottom: 0;line-height: 1.5;}';

css += '.shp-cnv-whatsapp-chat-header {background: #000000;}';

css += '.shp-cnv-whatsapp-chat-name {color: #ffffff;}';

css += '.shp-cnv-whatsapp-chat-avatar { position: relative;}';
css += '.shp-cnv-whatsapp-chat-avatar::after { content: "";bottom: 0px; right: 0px; width: 12px; height: 12px; box-sizing: border-box; display: block; position: relative; z-index: 1; border-radius: 50%; left: 40px; top: 38px;}';
css += '.shp-cnv-whatsapp-chat-avatar img {width: 50px; height: 50px; float: left; margin: 0px 10px 0 0; border-radius: 50px;}';

css += '.shp-cnv-info-chat span {display: block;}';

css += '.blanter-msg {background: #fff;padding: 1px;}';

css +='#get-label,span.chat-label{font-size:12px;color:#888}#get-nama,span.chat-nama{margin:5px 0 0;font-size:15px;font-weight:700;color:#222}#get-label,#get-nama{color:#fff}span.my-number{display:none}textarea#chat-input{border:0;font-family:"Arial",sans-serif;width:100%;height:20px;outline:0;resize:none;font-size:14px}a#send-it{width:30px;font-weight:700;padding:12px 10px 0;background:#eee}a#send-it svg{fill:#a6a6a6;height:24px;width:24px}.first-msg{background:transparent;padding:30px;text-align:center}.first-msg span{background:#e2e2e2;color:#333;font-size:14.2px;line-height:1.7;border-radius:10px;padding:15px 20px;display:inline-block}#get-number{display:none}a.close-chat{position:absolute;top:5px;right:15px;color:#fff;font-size:30px !important}@keyframes ZpjSY{0{background-color:#b6b5ba}15%{background-color:#111}25%{background-color:#b6b5ba}}@keyframes hPhMsj{15%{background-color:#b6b5ba}25%{background-color:#111}35%{background-color:#b6b5ba}}@keyframes iUMejp{25%{background-color:#b6b5ba}35%{background-color:#111}45%{background-color:#b6b5ba}}@keyframes showhide{from{transform:scale(0.5);opacity:0}}@keyframes showchat{from{transform:scale(0);opacity:0}}@media screen and (max-width:480px){#shp-cnv-whatsapp-chat{width:auto;left:5%;right:5%;font-size:80%}}.hide{display:none;opacity:1}.show{display:block;opacity:1}.shp-cnv-whatsapp-message-container{display:flex;z-index:1}.shp-cnv-whatsapp-message{padding:7px 14px 6px;background-color:white;border-radius:0 8px 8px;position:relative;opacity:0;transform-origin:center top 0;z-index:2;box-shadow:rgba(0,0,0,0.13) 0 1px .5px;margin-top:4px;margin-left:-54px;max-width:calc(100% - 66px)}.shp-cnv-whatsapp-chat-body{padding:20px 20px 20px 10px;background-color:#e6ddd4;position:relative}.shp-cnv-whatsapp-chat-body::before{display:block;position:absolute;content:"";left:0;top:0;height:100%;width:100%;z-index:0;opacity:.08;background-image:url("https://elfsight.com/assets/chats/patterns/whatsapp.png")}.shp-cnv-shipway-chat-body{display:flex;z-index:1}.shp-cnv-eJJEeC{background-color:white;width:52.5px;height:32px;border-radius:16px;display:flex;-moz-box-pack:center;justify-content:center;-moz-box-align:center;align-items:center;margin-left:10px;opacity:0;z-index:1;box-shadow:rgba(0,0,0,0.13) 0 1px .5px}.shp-cnv-hFENyl{position:relative;display:flex}.shp-cnv-ixsrax{height:5px;width:5px;margin:0 2px;border-radius:50%;display:inline-block;position:relative;top:0;background-color:#9e9da2}.shp-cnv-dRvxoz{height:5px;width:5px;margin:0 2px;background-color:#b6b5ba;border-radius:50%;display:inline-block;position:relative;top:0}.shp-cnv-whatsapp-chat-widget{padding:7px 14px 6px;background-color:white;border-radius:0 8px 8px;position:relative;opacity:0;transform-origin:center top 0;z-index:2;box-shadow:rgba(0,0,0,0.13) 0 1px .5px;margin-top:4px;margin-left:-54px;width:100%}.shp-cnv-whatsapp-chat-widget::before{position:absolute;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAmCAMAAADp2asXAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACQUExURUxpccPDw9ra2m9vbwAAAAAAADExMf///wAAABoaGk9PT7q6uqurqwsLCycnJz4+PtDQ0JycnIyMjPf3915eXvz8/E9PT/39/RMTE4CAgAAAAJqamv////////r6+u/v7yUlJeXl5f///5ycnOXl5XNzc/Hx8f///xUVFf///+zs7P///+bm5gAAAM7Ozv///2fVensAAAAvdFJOUwCow1cBCCnqAhNAnY0WIDW2f2/hSeo99g1lBYT87vDXG8/6d8oL4sgM5szrkgl660OiZwAAAHRJREFUKM/ty7cSggAABNFVUQFzwizmjPz/39k4YuFWtm55bw7eHR6ny63+alnswT3/rIDzUSC7CrAziPYCJCsB+gbVkgDtVIDh+DsE9OTBpCtAbSBAZSEQNgWIygJ0RgJMDWYNAdYbAeKtAHODlkHIv997AkLqIVOXVU84AAAAAElFTkSuQmCC");background-position:50% 50%;background-repeat:no-repeat;background-size:contain;content:"";top:0;left:-12px;width:12px;height:19px}.shp-cnv-whatsapp-chat-title{font-size:13px;font-weight:700;line-height:18px;color:rgba(0,0,0,0.4)}.shp-cnv-whatsapp-chat-massage{font-size:14px;line-height:19px;margin-top:4px;color:#111}.shp-cnv-whatsapp-chat-time{text-align:right;margin-top:4px;font-size:12px;line-height:16px;color:rgba(17,17,17,0.5);margin-right:-8px;margin-bottom:-4px}.shp-cnv-textarea_chatbot{min-height:48px !important;line-height:40px;margin-left:20px;margin-bottom:0 !important}.shp-cnv-button{padding:3px 10px;border:1px solid #00a0ac;border-radius:10px;text-align:left;margin-bottom:6px;width: fit-content;}</style>';html = css;
html += '<div id="shp-cnv-whatsapp-chat" class="hide">';
html += '<div class="shp-cnv-whatsapp-chat-header">';
html += '<div class="shp-cnv-whatsapp-chat-avatar">';

    html += '<img src="https://shipway-convertway.s3.ap-south-1.amazonaws.com/shipway-convertway/whatsapp-widget/Realitees%20logo-1.png" alt="Logo" />';

html += '</div>';
html += '<p><span class="shp-cnv-whatsapp-chat-name">Realitees<span style="font-size: 10px;"><br/><i>Typically replies in few minutes</i></span></span></p>';
html += '</div>';
html += '<div class="start-chat">';
html += '<div pattern="https://elfsight.com/assets/chats/patterns/whatsapp.png" class="WhatsappChat__Component-sc-1wqac52-0 shp-cnv-whatsapp-chat-body">';
html += '<div class="WhatsappChat__MessageContainer-sc-1wqac52-1 shp-cnv-shipway-chat-body">';
html += '<div style="opacity: 0;" class="WhatsappDots__Component-pks5bf-0 shp-cnv-eJJEeC">';
html += '<div class="WhatsappDots__ComponentInner-pks5bf-1 shp-cnv-hFENyl">';
html += '<div class="WhatsappDots__Dot-pks5bf-2 WhatsappDots__DotOne-pks5bf-3 shp-cnv-ixsrax"></div>';
html += '<div class="WhatsappDots__Dot-pks5bf-2 WhatsappDots__DotTwo-pks5bf-4 shp-cnv-dRvxoz"></div>';
html += '<div class="WhatsappDots__Dot-pks5bf-2 WhatsappDots__DotThree-pks5bf-5 shp-cnv-kXBtNt"></div>';
html += '</div>';
html += '</div>';
html += '<div style="opacity: 1;" class="WhatsappChat__Message-sc-1wqac52-4 shp-cnv-whatsapp-chat-widget">';

html += '<div class="WhatsappChat__Text-sc-1wqac52-2 shp-cnv-whatsapp-chat-massage">How can we help you?<br><br></div>';
html += '<div class="WhatsappChat__Text-sc-1wqac52-2 shp-cnv-whatsapp-chat-massage">';

            html += '<div class="shp-cnv-button"><a href="https://api.whatsapp.com/send/?phone=918108228811&text=%F0%9F%93%A6+Track+my+order" target="_blank" style="text-decoration: none;color: #000;" onclick="widgetAnalytics(1)">📦 Track my order</a></div>';
                    html += '<div class="shp-cnv-button"><a href="https://api.whatsapp.com/send/?phone=918108228811&text=%F0%9F%92%B0+Offers+%26+discounts" target="_blank" style="text-decoration: none;color: #000;" onclick="widgetAnalytics(2)">💰 Offers & discounts</a></div>';
                    html += '<div class="shp-cnv-button"><a href="https://api.whatsapp.com/send/?phone=918108228811&text=%F0%9F%99%8B%E2%80%8D%E2%99%82%EF%B8%8F+Query+related+to+products" target="_blank" style="text-decoration: none;color: #000;" onclick="widgetAnalytics(3)">🙋‍♂️ Query related to products</a></div>';
        
html += '</div>';

html += '</div>';
html += '</div>';
html += '</div>';
html += '<div class="blanter-msg"><p style="text-align: center;font-size: 12px;display: block !important;"><span style="color: #484848;">Powered by</span> <span><a href="https://apps.shopify.com/sms-notifications-1?utm_source=realiteesffs.myshopify.com&utm_medium=whatsapp_widget&utm_campaign=whatsapp_widget" target="_blank" style="color:#2794bc;">TheConvertWay</a></span></p></div>';

html += '</div>';
html += '<div id="get-number"></div>';
html += '<a class="close-chat" href="javascript:void(0)" onclick="tcw_hidePopup()" style="text-decoration: none;">×</a>';
html += '</div>';
html += '<a class="shp-cnv-shipway-chat" href="javascript:void(0)" title="Show Chat" onclick="showDiv()">';
    html += '<svg width="20" style="width:20px;height:25px;stroke:none" viewBox="0 0 24 24">';
html += '<defs />';
html += '<path fill="#ffffff" d="M20.5 3.4A12.1 12.1 0 0012 0 12 12 0 001.7 17.8L0 24l6.3-1.7c2.8 1.5 5 1.4 5.8 1.5a12 12 0 008.4-20.3z" />';
html += '<path fill="#25d366" d="M12 21.8c-3.1 0-5.2-1.6-5.4-1.6l-3.7 1 1-3.7-.3-.4A9.9 9.9 0 012.1 12a10 10 0 0117-7 9.9 9.9 0 01-7 16.9z" />';
html += '<path fill="#ffffff" d="M17.5 14.3c-.3 0-1.8-.8-2-.9-.7-.2-.5 0-1.7 1.3-.1.2-.3.2-.6.1s-1.3-.5-2.4-1.5a9 9 0 01-1.7-2c-.3-.6.4-.6 1-1.7l-.1-.5-1-2.2c-.2-.6-.4-.5-.6-.5-.6 0-1 0-1.4.3-1.6 1.8-1.2 3.6.2 5.6 2.7 3.5 4.2 4.2 6.8 5 .7.3 1.4.3 1.9.2.6 0 1.7-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4z" />';
html += '</svg> ';

    html += 'Chat with us';
html += '</a>';fnOnjAddElement('', 'div', '' , html)