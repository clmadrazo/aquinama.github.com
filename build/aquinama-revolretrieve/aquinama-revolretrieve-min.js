YUI.add("aquinama-revolretrieve",function(A){A.namespace("AquiNaMa");var B=A.Base.create("aquinama-revolretrieve",A.Base,[],{initializer:function(E){var C=this,D;C.set("model",E.model);C._publishEvents();C._bind();},_publishEvents:function(){var C=this;C.publish("categoryRetrieve",{emitFacade:true,broadcast:1});C.publish("more",{emitFacade:true,broadcast:1});C.publish("articleRetrieve",{emitFacade:true,broadcast:1});C.publish("error",{emitFacade:true,broadcast:1});},_bind:function(){var D=this,E,C;D.on("_categoryRetrieve",function(F){E=D.get("model").getAttr("data",F);if(E){C=D.categoryParse(F.data);C=D.categoryFormat(C);if(C&&D.get("more")){D.fire("activeRetrieve:more",{data:{result:C,filter:F.data.filter}});}else{if(C){D.fire("activeRetrieve:categoryRetrieve",{data:{result:C,filter:F.data.filter,search:{totalArticles:D.get("totalArticle")}}});}}}else{D.fire("activeRetrieve:error",{data:{error:"CategoryRetrieve no ha retornado ningun dato"}});}});D.on("_articleRetrieve",function(F){C=D.articleParse(F.data);C=D.articleFormat(C);D.fire("activeRetrieve:articleRetrieve",{data:C,filter:F.data.filter});});D.after("actualUrlChange",function(F){D.set("actualPage",1);D.set("totalPages",0);},D);},getData:function(E){var D=this,C;D.set("actualFilter",E);if(E.length>0){if(E[0].attr!="category"&&E[0].attr!="article"){D.defaultFilter(E);}else{A.each(E,function(F){C=D.get("model").getAttr("attr",F);if(C){if(D[C]){D[F.attr](F.value,E);}else{}}else{}});}}else{}},retrieveData:function(E){var C=this,I=E.query,H=E.eventPrefix,G,D,F=E.repeat;G=A.YQL(I,{allowCache:false,on:{success:function(J){D=C.get("model").getAttr("error",J);if(D){if(F.max<F.actual){F.actual++;E.repeat=F;C.retrieveData(E);}else{}}else{if(J.query.results){C.fire(H,{data:{result:J.query.results,filter:E.filter}});}else{if(F.max<F.actual){F.actual++;E.repeat=F;C.retrieveData(E);}else{}}}},failure:function(J){if(F.max<F.actual){F.actual++;E.repeat=F;C.retrieveData(E);}else{D="Error al conectarse, revice su conexion de Red";C.fire("activeRetrieve:error",{data:{error:D}});}}}});},getCategory:function(D,E){var C=this;if(D){C.categoryRetrieve(D,E);}else{return false;}},categoryRetrieve:function(E,F){var C=this,G,D;if(test){A.later(1000,A,function(H){C.fire("_categoryRetrieve",{data:{result:yqlexample.query.results,filter:F}});});}else{if(!C.get("more")){G='select * from html where url="'+E+'"  and xpath=\'//table[@class="adsterix_set"]//tr|//div[@id="flatMenu"]//a[last()]\'';}else{G='select * from html where url="'+E+'" and xpath=\'//table[@class="adsterix_set"]//tr\'';}C.retrieveData({query:G,eventPrefix:"_categoryRetrieve",filter:F,repeat:{max:3,actual:0}});}},categoryParse:function(I){var J=this,K=new A.ModelList(),G,C=new Date("Sun Jul 10 2012"),E=1000,H,D;try{H=J.get("model").getAttr("tr",I.result);if(H){A.each(H,function(L){D=J.get("model").getAttr("td",L);if(D){if(D["class"]=="adsterix_head"){C=J.categoryDateParse(L);}else{if(!L.td.hasOwnProperty("div")&&L.td["class"]!="space"){G=J.articleOutParse(L,C,E);if(G){K.add(G);E--;}}}}else{}});J.categoryPagesCountParse(I);}else{J.fire("activeRetrieve:error",{data:{error:"No fue encontrado ningun articulo"}});}}catch(F){return K;}return K;},categoryFormat:function(C){return C;},categoryPagesCountParse:function(E){var C=this,F=0,D;if(!C.get("more")){D=C.get("model").getAttr("a",E.result);if(D!=undefined){F=D[1].content;F=F.split(" ");F=F[F.length-1];F=parseInt(F);C.set("totalArticle",F);F=F/100;if(F>0){F=Math.ceil(F);}}else{F=0;}C.set("totalPages",F);}},getArticle:function(D){var C=this;C.articleRetrieve(D);},articleRetrieve:function(F){var C=this,G,E,D=F[0].value;if(test){A.later(1000,C,function(){C.fire("_articleRetrieve",{data:{result:yqlArticleExample.query.results,filter:F}});});}else{G='select * from html where url="'+D+'"and xpath=\'//div[@id="show-ad-left-block"]|'+'//div[@id="adwrap"]//div[@class="text"]//span[@class="showAdText"]|//div[@id="contact"]\'';C.retrieveData({query:G,eventPrefix:"_articleRetrieve",filter:F,repeat:{max:3,actual:0}});}},articleParse:function(G){var D=this,E=new Date(),H="",C={email:"",name:"",phone:""};try{E=D.articleDateParse(G.result);H=D.articleDescriptionParse(G.result);C=D.articleContactParse(G.result);return{date:E,desc:H,contact:C};}catch(F){}return{date:E,desc:H,contact:C};},articleFormat:function(C){return C;},articleDateParse:function(E){var C=this,D;if(A.Lang.isArray(E.div[0].div)){D=E.div[0].div[1].span[1].content;}else{if(E.div[0].div.span[1].content){D=E.div[0].div.span[1].content;}else{return false;}}return D;},articleDescriptionParse:function(E){var C=this,F="";try{F=E.span.content;return F;}catch(D){}return F;},articleContactParse:function(G){var E=this,D,C={email:"",phone:"",name:""};try{D=G.div[1].div;if(A.Lang.isArray(D)){A.each(D,function(H){C=E.articleOneContactParse(H,C);});}else{C=E.articleOneContactParse(D,C);}return C;}catch(F){}return C;},articleOneContactParse:function(E,D){var C=this,F=E.span[0].content;F=F.split(":");F=F[0];switch(F){case"Email":D.email=E.span[1].a.content;break;case"Nombre":D.name=E.span[1].content;break;default:D.phone=E.span[1].content;break;}return D;},articleOutParse:function(J,E,F){var L=this,G="",D="",H="",C="",K=true,M;try{G=J.td.a.content;C=J.td.a.href;if(G===undefined||C===undefined){throw new Error("tittle or href propertys are undefined");}else{if(J.td.a.hasOwnProperty("span")){H=L.priceParse(J.td.a.span);}else{H=0;}C=L.get("model").getAttr("revolico").url+C;E=new Date(E.setMilliseconds(F));M=new A.AquiNaMa.ArticleModel({interest:false,idAttribute:"href",visible:false,load:false,tittle:G,price:H,href:C,date:E,number:F,passfilter:K,highlight:G,retrieve:"RevolRetrieve"});L.addTarget(M);return M;}}catch(I){}return false;},categoryDateParse:function(E){var D=this,C=false;try{E=E.td.p;E=E.split(" ");C=E[1]+" "+D.get("date")[E[3]]+" "+E[5];C=new Date(C);return C;}catch(F){}return C;},priceParse:function(D){var C=this;try{D=D.split(" ");D=D[0].replace(",","");D=parseFloat(D);if(!A.Lang.isNumber(D)){throw new Error("El precio debe ser un numero");
}else{return D;}}catch(E){return 0;}},buildUrl:function(F){var C=this,E,D="";E=C.get("model").getAttr(F);if(E){return C.get("model").walkToRoot(E,D,"url");}else{}return false;},buildUrlbyFilter:function(F,G){var D=this,C,E="";A.each(G,function(H){C=D.get("model").getAttr("attr",H);if(C){if(D[C]){if(C!="category"){E+=D[H.attr](H.value);}}else{}}else{}});return E;},category:function(E,F){var C=this,D="";C.set("more",false);D=C.buildUrl(E);if(D){D+="?"+C.buildUrlbyFilter(D,F);}C.set("actualUrl",D);C.getCategory(D,F);},text:function(D,C){D=escape(D);return"searchtext="+D+"&";},min:function(C,D){return"min_price="+C+"&";},max:function(C,D){return"max_price="+C+"&";},count:function(E,D){var C=this;C.set("count",E);return"";},article:function(E,D){var C=this;C.getArticle(D);},more:function(F,G){var C=this,E=C.get("actualUrl"),H=C.get("totalPages"),I=C.get("actualPage"),J="",D="pagina-",G=C.get("actualFilter");if(E!=""){if(I<H){I++;J=D+I+".html?";if(G[0].attr!="category"&&G[0].attr!="article"){J="/"+J;J=E.replace(".html/?",J);}else{J=E.replace("?",J);}C.set("more",true);C.getCategory(J,G);}else{C.fire("activeRetrieve:error",{data:{error:"No fueron encontrados mas resultados"}});}}C.set("actualPage",I);},defaultFilter:function(G){var D=this,F=D.buildUrl("revolico")+"resultado-de-la-busqueda.html?",C,E;A.each(G,function(H){C=D.get("model").getAttr("attr",H);if(C){if(D[C]){if(C!="category"){E=D[H.attr](H.value);if(E){F+=E;}else{return false;}}}else{}}else{}});D.set("actualUrl",F);D.getCategory(F,G);return F;}},{ATTRS:{model:{value:{}},count:{value:100},actualUrl:{value:""},totalPages:{value:5},actualPage:{value:0},totalArticle:{value:0},actualFilter:{value:{}},more:{value:false},url:{value:{}},date:{value:{"Septiembre":"September","Octubre":"October","Noviembre":"November","Diciembre":"December","Enero":"January","Febrero":"Frebuary","Marzo":"March","Abril":"April","Mayo":"May","Junio":"June","Julio":"July","Agosto":"August"}}}});A.AquiNaMa.RevolRetrieve=B;},"@VERSION@",{skinnable:false,requires:["base","yql","model-list","aquinama-articlemodel","datatype-date"]});