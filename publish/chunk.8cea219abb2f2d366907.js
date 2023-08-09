(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{258:function(t,e,i){"use strict";i(4);var r=i(21),a=i(30),s=i(68),n=i(33),o=i(1),d=i(25),l=i(7),c=i(48),_=i(228),u=i(293),A={name:"EcOrderInfo",components:{ShippingLine:_.a,EcSummary:u.a},props:{order:{type:Object,required:!0},isNew:Boolean,skipDataLoad:Boolean,skipFirstDataLoad:Boolean,skipCustomerUpdate:Boolean,accountOrdersUrl:{type:String,default:"/app/#/account/orders"},cartUrl:{type:String,default:"/app/#/cart"},ecomCart:{type:Object,default:()=>l.a},ecomPassport:{type:Object,default:()=>d.a},invoiceBaseLink:{type:String,default:"https://www.nfe.fazenda.gov.br/portal/consultaRecaptcha.aspx?tipoConteudo=7PhJ+gAVw2g=&tipoConsulta=resumo&nfe="}},data(){return{isLoaded:this.skipDataLoad||this.skipFirstDataLoad,isUpdating:!1,reloadInterval:null,orderBody:this.order,canReopenOrder:!1,validThruTimer:null,validThruRemainingTime:null}},computed:{i19buyAgain:()=>Object(a.a)(r.A),i19cancelOrder:()=>Object(a.a)(r.G),i19codeCopied:()=>Object(a.a)(r.R),i19copyCode:()=>Object(a.a)(r.ab),i19copyErrorMsg:()=>Object(a.a)(r.bb),i19days:()=>Object(a.a)(r.fb),i19doPaymentMsg:()=>Object(a.a)(r.kb),i19expirationDate:()=>"Prazo de vencimento",i19freight:()=>Object(a.a)(r.Eb),i19login:()=>Object(a.a)(r.cc),i19loginForOrderDetailsMsg:()=>Object(a.a)(r.ec),i19myOrders:()=>Object(a.a)(r.oc),i19notes:()=>Object(a.a)(r.zc),i19of:()=>Object(a.a)(r.Dc),i19orderConfirmationMsg:()=>Object(a.a)(r.Lc),i19orderNumber:()=>Object(a.a)(r.Nc),i19printBillet:()=>Object(a.a)(r.bd),i19redirectToPayment:()=>Object(a.a)(r.kd),i19referenceCode:()=>Object(a.a)(r.md),i19reopenOrder:()=>Object(a.a)(r.td),i19shippingAddress:()=>Object(a.a)(r.Pd),i19transactionCode:()=>Object(a.a)(r.ee),i19ticketCode:()=>Object(a.a)(r.Zd),i19trackDelivery:()=>Object(a.a)(r.de),i19unsubscribe:()=>Object(a.a)(r.je),i19zipCode:()=>Object(a.a)(r.ue),i19invoice:()=>"Nota fiscal",localOrder:{get(){return this.orderBody},set(t){this.orderBody=t,this.$emit("update:order",t),this.saveCustomerOrder()}},hasManyTransactions(){const{transactions:t}=this.localOrder;return t&&t.length>1},transaction(){const{transactions:t}=this.localOrder;return t&&t.length?t[0]:{}},validThru(){const t=this.transaction.banking_billet||this.transaction.account_deposit;return t&&t.valid_thru},shippingAddress(){const{localOrder:t}=this;if(t.shipping_lines&&t.shipping_lines.length)return t.shipping_lines[0].to},canShowShippingAddress(){const{localOrder:t,shippingAddress:e}=this;return!(!e||!e.street)&&!/(retira|pick\s?up|e-?mail)/i.test(t.shipping_method_label)},status(){return this.localOrder.status},financialStatus(){const{localOrder:t,transaction:e}=this;if(t.payments_history){const e=t.transactions&&t.transactions.find((t=>"loyalty_points"!==t.payment_method.code));let i;if(t.payments_history.forEach((t=>{!t||e&&t.transaction_id&&t.transaction_id!==e._id||i&&t.date_time&&!(new Date(t.date_time).getTime()>=new Date(i.date_time).getTime())||(i=t)})),i)return i.status}const i=t.financial_status&&t.financial_status.current;return i||(e&&e.status?e.status.current:"pending")},fulfillmentStatus(){const{localOrder:t}=this,e=t.fulfillment_status&&t.fulfillment_status.current;if(e)return e;{const e=t.shipping_lines&&t.shipping_lines[0];if(e&&e.status)return e.status.current}return null},statusEntries(){const t=[];let e=[];return["payments_history","fulfillments"].forEach((t=>{Array.isArray(this.localOrder[t])&&(e=e.concat(this.localOrder[t]))})),e.length&&(e=e=e.sort(((t,e)=>t.date_time&&e.date_time?new Date(t.date_time).getTime()>new Date(e.date_time).getTime()?-1:1:0)),e.forEach(((i,r)=>{r>0&&i.status===e[r-1].status||t.push(i)}))),t},isAuthenticated(){return this.ecomPassport.checkAuthorization()},isSubscription(){return this.localOrder.transactions&&this.localOrder.transactions.find((t=>{let{type:e}=t;return"recurrence"===e}))}},methods:{i19FinancialStatus:t=>Object(a.a)(r.a)[t],i19FulfillmentStatus:t=>Object(a.a)(r.b)[t],i19OrderStatus:t=>Object(a.a)(r.e)[t],formatMoney:s.a,formatDate:n.a,formatTime(t){const e=Date.parse(t);return new Date(e).toLocaleTimeString()},toClipboard(t){this.$copyText(t).then((()=>{this.$toast({title:this.i19codeCopied,body:t,variant:"success",delay:2e3})}),(e=>{console.error(e),this.$toast({title:"Oops",body:`${this.i19copyErrorMsg}: <i>${t}</i>`,variant:"warning",delay:3e3})}))},saveCustomerOrder(){const{localOrder:t,ecomPassport:e}=this;!this.skipCustomerUpdate&&t.number&&e.checkAuthorization()&&(t.transactions&&t.transactions.find((t=>"loyalty_points"===t.payment_method.code))&&e.setCustomer({loyalty_points_entries:[]}),e.requestApi("/me.json").then((i=>{let{data:r}=i;const a=r.orders?r.orders.slice(-300):[],s={};["_id","created_at","number","currency_id","currency_symbol","amount","payment_method_label","shipping_method_label"].forEach((e=>{t[e]&&(s[e]=t[e])}));const n=a.findIndex((e=>{let{_id:i,number:r}=e;return i===t._id||r===t.number}));n>-1?Object.assign(a[n],s):a.push(s),e.requestApi("/me.json","patch",{orders:a})})))},buyAgain(){const{localOrder:t}=this;if(t.items){const{items:e}=t;l.a.clear(),e.forEach(((t,i)=>{l.a.addItem(t,!1),i+1===e.length&&(l.a.save(),window.location=this.cartUrl)}))}},toggle(){this.isUpdating=!0;const t="cancelled"!==this.localOrder.status?{status:"cancelled",cancel_reason:"customer"}:{status:"open"};d.a.requestApi(`/orders/${this.order._id}.json`,"patch",t).then((()=>{this.localOrder={...this.localOrder,...t}})).finally((()=>{this.isUpdating=!1}))}},watch:{isLoaded:{handler(t){if(t&&this.isAuthenticated&&"cancelled"===this.status){const{items:t}=this.localOrder;if(t&&t.length){const e=t.map((t=>t.product_id)),i=new c.a;i.setPageSize(e.length).setProductIds(e).fetch(!0).then((()=>{for(let e=0;e<t.length;e++){const r=t[e],a=i.getItems().find((t=>{let{_id:e}=t;return e===r.product_id}));if(a){if(r.variation_id&&a.variations){const t=a.variations.find((t=>{let{sku:e}=t;return e===r.sku}));if(t&&t.quantity>=r.quantity)continue}if(a.quantity>=r.quantity)continue}return void(this.canReopenOrder=!1)}this.canReopenOrder=!0})).catch(console.error)}}},immediate:!0}},created(){if(this.order._id&&(this.isNew&&this.saveCustomerOrder(),!this.skipDataLoad)){const t=`/orders/${this.order._id}.json`,e=()=>(this.ecomPassport.checkAuthorization()?this.ecomPassport.requestApi(t):Object(o.g)({url:t})).then((t=>{let{data:e}=t;this.localOrder={...this.localOrder,...e}})).catch((t=>{console.error(t)}));this.reloadInterval=setInterval(e,9e3),this.skipFirstDataLoad||setTimeout((()=>{e().finally((()=>{this.isLoaded=!0}))}),this.isNew?1e3:3e3)}},mounted(){if(this.validThru){const t=new Date(this.validThru),e=Date.now();if(t.getTime()>e){let i;const a=864e5;Math.floor((t.getTime()-e)/a)>2?(i=new Date,i.setHours(23,59,59,999)):i=t;const s=t=>t<10?`0${t}`:t,n=()=>{const t=i.getTime()-Date.now(),e=Math.floor(t/a),n=Math.floor(t%a/36e5),o=Math.floor(t%36e5/6e4),d=Math.floor(t%6e4/1e3);return(e>0?`${s(e)} ${r.fb} - `:"")+`${s(n)}:${s(o)}:${s(d)}`};this.validThruTimer=setInterval((()=>{this.validThruRemainingTime=n()}),1e3)}}},beforeDestroy(){clearInterval(this.reloadInterval),this.validThruTimer&&clearInterval(this.validThruTimer)}},p=(i(348),i(40)),m=Object(p.a)(A,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"order-info py-4"},[t.isNew?i("div",{staticClass:"order-info__new"},[t._v(" "+t._s(t.i19orderConfirmationMsg)+"! ")]):t._e(),i("transition-group",{attrs:{"enter-active-class":"animated fadeInDown slower"}},[t.isLoaded?i("div",{key:"loaded"},[i("div",{staticClass:"row"},[i("div",{staticClass:"col-md-5 col-lg-3"},[i("h2",{staticClass:"order-info__number"},[i("small",[t._v(t._s(t.i19orderNumber)+":")]),t._v(" #"),i("span",[t._v(t._s(t.localOrder.number))])]),i("transition",{attrs:{"enter-active-class":"animated fadeInDown","leave-active-class":"animated fadeOutUp fast"}},[t.isUpdating||"cancelled"!==t.status?t._e():i("p",{staticClass:"order-info__cancelled h3"},[t._v(" "+t._s(t.i19OrderStatus(t.status))+" "),i("transition",{attrs:{"enter-active-class":"animated fadeInDown"}},[t.canReopenOrder?i("button",{staticClass:"order-info__toggle btn",class:"cancelled"===t.status?"btn-success":"btn-secondary",on:{click:t.toggle}},[i("i",{staticClass:"i-check-circle mr-1"}),t._v(" "+t._s(t.i19reopenOrder)+" ")]):t._e()])],1)]),t.statusEntries.length?i("ul",{staticClass:"order-info__timeline"},t._l(t.statusEntries,(function(e,r){return i("li",{key:"status-"+r,staticClass:"order-info__timeline-status",class:"order-info__timeline-status--"+e.status},[e.date_time?i("div",{staticClass:"order-info__timeline-date"},[t._v(" "+t._s(t.formatDate(e.date_time))+" "+t._s(t.formatTime(e.date_time))+" ")]):t._e(),t._v(" "+t._s(t.i19FinancialStatus(e.status)||t.i19FulfillmentStatus(e.status))+" ")])})),0):t._e(),t.accountOrdersUrl?i("a",{staticClass:"order-info__orders-link d-none d-md-block btn btn-light",attrs:{href:t.accountOrdersUrl}},[i("i",{staticClass:"i-chevron-left mr-1"}),t._v(" "+t._s(t.i19myOrders)+" ")]):t._e()],1),i("div",{staticClass:"col-md-7 col-lg-9"},[i("div",{staticClass:"row"},[i("div",{staticClass:"col-lg-6"},[i("article",[t.transaction.status&&"pending"===t.transaction.status.current?[t.transaction.banking_billet?i("div",{staticClass:"order-info__billet"},[i("p",{staticClass:"lead"},[t._v(" "+t._s(t.i19doPaymentMsg)+" ")]),t.transaction.banking_billet.code?[i("p",[t._v(" "+t._s(t.i19ticketCode)+": "),i("br"),i("samp",[t._v(t._s(t.transaction.banking_billet.code))])]),i("button",{staticClass:"btn btn-outline-primary mr-3",on:{click:function(){return t.toClipboard(t.transaction.banking_billet.code)}}},[i("i",{staticClass:"i-copy mr-1"}),t._v(" "+t._s(t.i19copyCode)+" ")])]:t._e(),t.transaction.banking_billet.link?i("a",{staticClass:"btn btn-primary",attrs:{target:"_blank",href:t.transaction.banking_billet.link}},[i("i",{staticClass:"i-print mr-1"}),t._v(" "+t._s(t.i19printBillet)+" ")]):t._e()],2):t.transaction.payment_link?i("div",{staticClass:"order-info__redirect"},[i("p",{staticClass:"lead"},[t._v(" "+t._s(t.i19doPaymentMsg)+" ")]),i("a",{staticClass:"btn btn-lg btn-success",attrs:{target:"_blank",href:t.transaction.payment_link}},[i("i",{staticClass:"i-arrow-right mr-1"}),t._v(" "+t._s(t.i19redirectToPayment)+" ")])]):t._e(),t.validThruRemainingTime?i("div",{staticClass:"order-info__valid-thru mb-3 mt-3"},[t._v(" "+t._s(t.i19expirationDate)+" "),i("div",{staticClass:"ml-3 mb-0"},[t._v(" "+t._s(t.validThruRemainingTime)+" ")])]):t._e()]:t._e(),i("div",{staticClass:"order-info__details"},[t._t("payment",(function(){return[i("div",{staticClass:"order-info__payment card"},[i("div",{staticClass:"card-header"},[i("span",{staticClass:"order-info__financial-status",class:"order-info__financial-status--"+t.financialStatus},[i("i",{staticClass:"i-money-check mr-1"}),t._v(" "+t._s(t.i19FinancialStatus(t.financialStatus))+" ")])]),t._l(t.localOrder.transactions,(function(e){return i("div",{key:"t-"+e._id,staticClass:"card-body"},[i("p",{staticClass:"order-info__payment-value"},[e.payment_method.name?[t._v(" "+t._s(e.payment_method.name)+": ")]:t.localOrder.payment_method_label?[t._v(" "+t._s(t.localOrder.payment_method_label)+": ")]:t._e(),e.installments&&e.installments.value?i("strong",[t._v(" "+t._s(e.installments.number)+"x "+t._s(t.i19of.toLowerCase())+" "+t._s(t.formatMoney(e.installments.value))+" ")]):i("strong",[t._v(" "+t._s(t.formatMoney(e.amount||t.localOrder.amount.total))+" ")]),t.hasManyTransactions&&e.status?[i("br"),i("span",{staticClass:"text-muted"},[t._v(" "+t._s(t.i19FinancialStatus(e.status.current))+" ")])]:t._e()],2),e.notes?i("p",{staticClass:"order-info__payment-notes alert alert-warning",attrs:{role:"alert"},domProps:{innerHTML:t._s(e.notes)}}):t._e(),e.credit_card?i("p",{staticClass:"order-info__credit-card"},[t._v(" "+t._s(e.credit_card.company)+" "),e.credit_card.last_digits?i("span",[e.credit_card.company?t._e():i("span",[t._v(" "+t._s(t.i19cardNumber)+" ")]),t._v(" **** "+t._s(e.credit_card.last_digits)+" ")]):t._e()]):t._e(),e.intermediator?[e.intermediator.transaction_code?i("div",{staticClass:"order-info__transaction-code"},[i("small",[t._v(t._s(t.i19transactionCode))]),i("br"),i("code",[t._v(t._s(e.intermediator.transaction_code))]),i("br"),i("button",{staticClass:"btn btn-sm btn-light",on:{click:function(){return t.toClipboard(e.intermediator.transaction_code)}}},[i("i",{staticClass:"i-copy mr-1"}),t._v(" "+t._s(t.i19copyCode)+" ")])]):t._e(),e.intermediator.transaction_reference?i("div",{staticClass:"order-info__transaction-reference"},[i("small",[t._v(t._s(t.i19referenceCode))]),i("br"),t._v(" "+t._s(e.intermediator.transaction_reference)+" ")]):t._e()]:t._e()],2)}))],2)]}),null,{order:t.localOrder,transaction:t.transaction,financialStatus:t.financialStatus}),t._t("shipping",(function(){return[i("div",{staticClass:"order-info__shipping"},[t._l(t.localOrder.shipping_lines,(function(e){return i("div",{key:"s-"+e._id,staticClass:"order-info__shipping-freight card"},[i("div",{staticClass:"card-header"},[t.fulfillmentStatus?i("span",{staticClass:"order-info__fulfillment-status",class:"order-info__fulfillment-status--"+t.fulfillmentStatus},[i("i",{staticClass:"i-truck mr-1"}),t._v(" "+t._s(t.i19FulfillmentStatus(t.fulfillmentStatus))+" ")]):[i("i",{staticClass:"i-truck mr-1"}),t._v(" "+t._s(t.i19freight)+" ")]],2),i("div",{staticClass:"card-body"},[e.app?i("span",[t._v(" "+t._s(e.app.label)+" ")]):t._e(),i("shipping-line",{attrs:{"shipping-line":e}}),e.tracking_codes?i("div",{staticClass:"order-info__shipping-tracking"},[i("hr"),i("div",{staticClass:"text-muted"},[t._v(" "+t._s(t.i19trackDelivery)+": ")]),t._l(e.tracking_codes,(function(e,r){return i("samp",{key:"track-"+r},[e.link?i("a",{attrs:{href:""+e.link,target:"_blank"}},[t._v(" "+t._s(e.code)+" ")]):i("span",[t._v(" "+t._s(e.code)+" ")])])}))],2):t._e(),i("div",{staticClass:"order-info__shipping-nfe",attrs:{if:"shippingLine.invoices"}},[i("hr"),t._l(e.invoices,(function(e,r){return e.link||e.access_key?i("samp",{key:"invoice-"+r},[i("a",{attrs:{href:""+(e.link||""+(t.invoiceBaseLink+e.access_key)),target:"_blank"}},[t._v(" "+t._s(t.i19invoice)+" ")])]):t._e()}))],2)],1)])})),t.canShowShippingAddress?i("div",{staticClass:"order-info__shipping-address card"},[i("div",{staticClass:"card-header"},[i("i",{staticClass:"i-map-marked mr-1"}),t._v(" "+t._s(t.i19shippingAddress)+" ")]),i("address",{staticClass:"card-body mb-0"},[t._v(" "+t._s(t.shippingAddress.street)+" "),t.shippingAddress.number?[t._v(" "+t._s(t.shippingAddress.number)+" ")]:t._e(),t.shippingAddress.complement?[t._v(" , "+t._s(t.shippingAddress.complement)+" ")]:t._e(),t.shippingAddress.near_to?[i("br"),t._v(t._s(t.shippingAddress.near_to)+" ")]:t._e(),i("br"),t._l(["borough","city","province_code"],(function(e,r){return t.shippingAddress[e]?i("span",{key:e},[t._v(" "+t._s(t.shippingAddress[e]+(2===r?".":","))+" ")]):t._e()})),i("br"),i("span",[t._v(" "+t._s(t.i19zipCode)+": "),i("samp",[t._v(t._s(t.shippingAddress.zip))])])],2)]):t._e()],2)]}),null,{order:t.localOrder,shippingAddress:t.shippingAddress,fulfillmentStatus:t.fulfillmentStatus}),t._t("notes",(function(){return[t.localOrder.notes?i("div",{staticClass:"order-info__notes card"},[i("div",{staticClass:"card-header"},[i("span",[t._v(" "+t._s(t.i19notes)+" ")])]),i("div",{staticClass:"card-body"},[i("span",[t._v(" "+t._s(t.localOrder.notes)+" ")])])]):t._e()]}),null,{order:t.localOrder})],2),t.isAuthenticated?t._e():i("p",{staticClass:"lead"},[t._v(" "+t._s(t.i19loginForOrderDetailsMsg)+" "),i("br"),i("a",{staticClass:"btn btn-primary mt-2",attrs:{href:t.accountOrdersUrl}},[i("i",{staticClass:"i-user mr-1"}),t._v(" "+t._s(t.i19login)+" ")])])],2)]),t.localOrder.amount?i("div",{staticClass:"col-lg-6 order-info__right"},[i("div",{staticClass:"order-info__summary card"},[i("div",{staticClass:"card-body"},[i("ec-summary",{attrs:{amount:t.localOrder.amount,items:t.localOrder.items,buyer:t.localOrder.buyer&&t.localOrder.buyer[0]||t.ecomPassport.getCustomer(),shippingAddress:t.shippingAddress}})],1)]),t.isSubscription&&"cancelled"!==t.status?t._t("unsubscribe",(function(){return[i("button",{staticClass:"order-info__unsubscribe btn btn-outline-danger",attrs:{type:"button"},on:{click:t.toggle}},[i("i",{staticClass:"i-exclamation-triangle mr-1"}),t._v(" "+t._s(t.i19unsubscribe)+" ")])]})):[t._t("buy",(function(){return[i("button",{staticClass:"order-info__buy-again btn",class:t.isNew?"btn-outline-secondary":"btn-primary",attrs:{type:"button"},on:{click:t.buyAgain}},[i("i",{staticClass:"i-shopping-bag mr-1"}),t._v(" "+t._s(t.i19buyAgain)+" ")])]})),t.isUpdating||"open"!==t.status||t.fulfillmentStatus?t._e():i("button",{staticClass:"order-info__toggle btn btn-sm btn-danger",style:t.isNew?"display: none":null,on:{click:t.toggle}},[i("i",{staticClass:"i-exclamation-triangle mr-1"}),t._v(" "+t._s(t.i19cancelOrder)+" ")])]],2):t._e()])])])]):i("div",{key:"loading"},[i("div",{staticClass:"spinner-border",attrs:{role:"status"}},[i("span",{staticClass:"sr-only"},[t._v("Loading...")])])])]),t.accountOrdersUrl?i("a",{staticClass:"order-info__orders-link d-md-none btn btn-light",attrs:{href:t.accountOrdersUrl}},[i("i",{staticClass:"i-chevron-left mr-1"}),t._v(" "+t._s(t.i19myOrders)+" ")]):t._e()],1)}),[],!1,null,null,null);e.a=m.exports},283:function(t,e,i){var r=i(349);r.__esModule&&(r=r.default),"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);(0,i(159).default)("d08c370e",r,!0,{})},348:function(t,e,i){"use strict";i(283)},349:function(t,e,i){(e=i(158)(!0)).push([t.i,".order-info__number{color:var(--secondary);font-weight:var(--font-light);margin-top:var(--spacer-2)}.order-info__number span{font-weight:var(--font-bold)}.order-info__number small{color:var(--gray);display:block;font-size:var(--font-size-sm)}.order-info__timeline{display:flex;flex-wrap:nowrap;font-size:var(--font-size-sm);list-style:none;margin:var(--spacer-4) 0;overflow-x:auto;padding:0}@media(min-width:768px){.order-info__timeline{display:block}}.order-info__timeline-status{border-color:var(--border-color);border-style:solid;border-width:0 0 5px;margin-right:var(--spacer-1);min-width:165px;padding:var(--spacer-2)}@media(min-width:768px){.order-info__timeline-status{border-bottom-width:0;border-left-width:5px;margin-bottom:var(--spacer-1);margin-right:0;min-width:0;padding-left:var(--spacer-3)}}.order-info__timeline-status--pending,.order-info__timeline-status--under_analysis{border-color:var(--warning)}.order-info__timeline-status--shipped{border-color:var(--info)}.order-info__timeline-status--in_dispute,.order-info__timeline-status--unauthorized,.order-info__timeline-status--voided{border-color:var(--danger)}.order-info__timeline-status--delivered,.order-info__timeline-status--paid{border-color:var(--success)}.order-info__timeline-date{color:var(--text-muted);font-size:85%}.order-info__details:not(:first-child){margin-top:var(--spacer-4)}.order-info__payment,.order-info__shipping-address,.order-info__shipping-freight{margin-bottom:var(--spacer-3)}.order-info__financial-status,.order-info__fulfillment-status{color:var(--info);font-weight:var(--font-bold)}.order-info__financial-status--pending{color:var(--warning)}.order-info__financial-status--under_analysis{color:var(--info)}.order-info__financial-status--in_dispute,.order-info__financial-status--unauthorized,.order-info__financial-status--voided{color:var(--danger)}.order-info__financial-status--paid,.order-info__fulfillment-status--delivered,.order-info__new{color:var(--success)}.order-info__new{font-size:var(--font-size-lg);margin-bottom:var(--spacer-5);text-align:center}.order-info__orders-link{margin-left:auto;margin-top:var(--spacer-4)}.order-info__summary{background:var(--light);margin-bottom:var(--spacer-3)}.order-info__buy-again{display:block;margin-left:auto;margin-right:auto;margin-top:var(--spacer-3)}.order-info__toggle,.order-info__unsubscribe{display:block;margin-left:auto;margin-top:var(--spacer-5)}.order-info__cancelled{color:var(--danger)}.order-info__valid-thru{background-color:var(--danger);border-radius:var(--border-radius);color:var(--primary-white);display:flex;line-height:1.2;max-width:310px;padding:var(--spacer-2);width:100%}","",{version:3,sources:["EcOrderInfo.scss"],names:[],mappings:"AAAA,oBAAoB,sBAAsB,CAAC,6BAA6B,CAAC,0BAA0B,CAAC,yBAAyB,4BAA4B,CAAC,0BAA0B,iBAAiB,CAAC,aAAa,CAAC,6BAA6B,CAAC,sBAAsB,YAAY,CAAC,gBAAgB,CAAC,6BAA6B,CAAC,eAAe,CAAC,wBAAwB,CAAC,eAAe,CAAC,SAAS,CAAC,wBAAwB,sBAAsB,aAAa,CAAC,CAAC,6BAA6B,gCAAgC,CAAC,kBAAkB,CAAC,oBAAoB,CAAC,4BAA4B,CAAC,eAAe,CAAC,uBAAuB,CAAC,wBAAwB,6BAA6B,qBAAqB,CAAC,qBAAqB,CAAC,6BAA6B,CAAC,cAAc,CAAC,WAAW,CAAC,4BAA4B,CAAC,CAAC,mFAAmF,2BAA2B,CAAC,sCAAsC,wBAAwB,CAAC,yHAAyH,0BAA0B,CAAC,2EAA2E,2BAA2B,CAAC,2BAA2B,uBAAuB,CAAC,aAAa,CAAC,uCAAuC,0BAA0B,CAAC,iFAAiF,6BAA6B,CAAC,8DAA8D,iBAAiB,CAAC,4BAA4B,CAAC,uCAAuC,oBAAoB,CAAC,8CAA8C,iBAAiB,CAAC,4HAA4H,mBAAmB,CAAC,gGAAgG,oBAAoB,CAAC,iBAAiB,6BAA6B,CAAC,6BAA6B,CAAC,iBAAiB,CAAC,yBAAyB,gBAAgB,CAAC,0BAA0B,CAAC,qBAAqB,uBAAuB,CAAC,6BAA6B,CAAC,uBAAuB,aAAa,CAAC,gBAAgB,CAAC,iBAAiB,CAAC,0BAA0B,CAAC,6CAA6C,aAAa,CAAC,gBAAgB,CAAC,0BAA0B,CAAC,uBAAuB,mBAAmB,CAAC,wBAAwB,8BAA8B,CAAC,kCAAkC,CAAC,0BAA0B,CAAC,YAAY,CAAC,eAAe,CAAC,eAAe,CAAC,uBAAuB,CAAC,UAAU",file:"EcOrderInfo.scss",sourcesContent:[".order-info__number{color:var(--secondary);font-weight:var(--font-light);margin-top:var(--spacer-2)}.order-info__number span{font-weight:var(--font-bold)}.order-info__number small{color:var(--gray);display:block;font-size:var(--font-size-sm)}.order-info__timeline{display:flex;flex-wrap:nowrap;font-size:var(--font-size-sm);list-style:none;margin:var(--spacer-4) 0;overflow-x:auto;padding:0}@media(min-width:768px){.order-info__timeline{display:block}}.order-info__timeline-status{border-color:var(--border-color);border-style:solid;border-width:0 0 5px;margin-right:var(--spacer-1);min-width:165px;padding:var(--spacer-2)}@media(min-width:768px){.order-info__timeline-status{border-bottom-width:0;border-left-width:5px;margin-bottom:var(--spacer-1);margin-right:0;min-width:0;padding-left:var(--spacer-3)}}.order-info__timeline-status--pending,.order-info__timeline-status--under_analysis{border-color:var(--warning)}.order-info__timeline-status--shipped{border-color:var(--info)}.order-info__timeline-status--in_dispute,.order-info__timeline-status--unauthorized,.order-info__timeline-status--voided{border-color:var(--danger)}.order-info__timeline-status--delivered,.order-info__timeline-status--paid{border-color:var(--success)}.order-info__timeline-date{color:var(--text-muted);font-size:85%}.order-info__details:not(:first-child){margin-top:var(--spacer-4)}.order-info__payment,.order-info__shipping-address,.order-info__shipping-freight{margin-bottom:var(--spacer-3)}.order-info__financial-status,.order-info__fulfillment-status{color:var(--info);font-weight:var(--font-bold)}.order-info__financial-status--pending{color:var(--warning)}.order-info__financial-status--under_analysis{color:var(--info)}.order-info__financial-status--in_dispute,.order-info__financial-status--unauthorized,.order-info__financial-status--voided{color:var(--danger)}.order-info__financial-status--paid,.order-info__fulfillment-status--delivered,.order-info__new{color:var(--success)}.order-info__new{font-size:var(--font-size-lg);margin-bottom:var(--spacer-5);text-align:center}.order-info__orders-link{margin-left:auto;margin-top:var(--spacer-4)}.order-info__summary{background:var(--light);margin-bottom:var(--spacer-3)}.order-info__buy-again{display:block;margin-left:auto;margin-right:auto;margin-top:var(--spacer-3)}.order-info__toggle,.order-info__unsubscribe{display:block;margin-left:auto;margin-top:var(--spacer-5)}.order-info__cancelled{color:var(--danger)}.order-info__valid-thru{background-color:var(--danger);border-radius:var(--border-radius);color:var(--primary-white);display:flex;line-height:1.2;max-width:310px;padding:var(--spacer-2);width:100%}"]}]),t.exports=e}}]);