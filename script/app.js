YUI().use("event","aquinama-datacontroller","aquinama-revolretrieve","aquinama-literal","aquinama-search","aquinama-list","aquinama-tools",function(b){var a={};a.tree=appTree;a.model=a.tree;a.error=error;a.Search=function(c){b.one("#yui3-aquinama-news").addClass("yui3-aquinama-hidden");b.one("#yui3-aquinama-list").removeClass("yui3-aquinama-hidden");a.list.changeMoreTex("Ver mas resultados");a.list.clearList();a.filter.clear();a.list.showLoad();a.datacontroller.resetList();b.log("el filtro");b.log(c.filter);a.datacontroller.getData(c.filter);a.interest.deselect();b.one("#yui3-aquinama-error").set("innerHTML","")};a.Error=function(f){if(f.data.error.code===2){var d=a.search.get("aselect"),c=a.tree[a.search.get("aselect")];b.log("la selecionada");if(c){d=c.name}a.list.changeMoreTex(a.error[2].msg+" "+a.filter.get("query")+" "+a.list.getActiveTags()+" en "+d);a.list.hideLoad()}else{b.one("#yui3-aquinama-error").set("innerHTML","<p>"+a.error[f.data.error.code].msg)+"</p>";b.one("#yui3-aquinama-list").addClass("yui3-aquinama-hidden");a.search.clearSearch()}};a.categoryRetrieve=function(d){var c={};a.list.set("atotal",a.datacontroller.get("search.total"));a.list.set("emodellist",d.data);a.filter.set("source",a.list.source());a.filter.sendRequest();c=a.datacontroller.tags(a.search.get("aselect"));a.list.set("tags",c);a.filter.set("tags",c);a.filter.set("afilter",{});b.one("#yui3-aquinama-error").set("innerHTML","")};a.tagsHandle=function(c){a.filter.afilterPopulate(c.data);a.filter.sendRequest(a.filter.get("value"))};a.moreDataControllerHandle=function(c){a.list.set("emodellist",c.data);a.filter.set("source",a.list.source());a.filter.sendRequest(a.filter.get("query"))};a.Filter=function(c){a.list.set("evisiblelist",c.results)};a.Sort=function(c){a.filter.set("source",a.list.source());a.filter.sendRequest()};a.InterestMe=function(c){a.datacontroller.addInterest(c.model);a.interest.set("acount",a.datacontroller.get("interest").size())};a.NoInterestMe=function(c){a.datacontroller.notInterest(c.model);a.interest.set("acount",a.datacontroller.get("interest").size())};a.articleData=function(c){a.datacontroller.getData(c.data)};a.moreListHandle=function(c){a.datacontroller.more()};a.scrollDown=function(d){var c=a.body.scrollInfo.getOffscreenNodesBottom("li.yui3-aquinama-item");if(c.size()<20){a.list.moveItemsDown()}};a.search=new b.AquiNaMa.Search({boundingBox:"#yui3-aquinama-search",contentBox:"#yui3-aquinama-search div",acategorys:a.tree});a.search.render();a.datacontroller=new b.AquiNaMa.DataController({model:a.model});a.list=new b.AquiNaMa.List({boundingBox:"#yui3-aquinama-list"});a.list.render("#yui3-aquinama-left");a.interest=new b.AquiNaMa.Interest({acount:a.datacontroller.get("interest").size(),boundingBox:b.one(".yui3-aquinama-interest"),contentBox:b.one(".yui3-aquinama-interest")});a.busqueda=new b.AquiNaMa.Busqueda({boundingBox:b.one(".yui3-aquinama-busqueda"),contentBox:b.one(".yui3-aquinama-busqueda")});a.interest.render();a.busqueda.render();a.filter=new b.AquiNaMa.Filter({inputNode:a.search.get("contentBox").one(".yui3-aquinama-search-filter"),minQueryLength:0,queryDelay:300,resultTextLocator:"tags",});a.filter.set("source",a.list.source());a.body=b.one("body");a.body.plug(b.Plugin.ScrollInfo);b.on("aquinama-search:search",a.Search);a.filter.on("results",a.Filter);b.on("aquinama-list:sort",a.Sort);b.on("aquinama-list:tags",a.tagsHandle);b.on("aquinama-datacontroller:categoryRetrieve",a.categoryRetrieve);b.on("aquinama-datacontroller:more",a.moreDataControllerHandle);b.on("aquinama-datacontroller:error",a.Error);b.on("aquinama-item:interest",a.InterestMe);b.on("aquinama-item:no-interest",a.NoInterestMe);b.on("aquinama-articlemodel:articleData",a.articleData);b.on("aquinama-list:more",a.moreListHandle);a.body.scrollInfo.on("scrollDown",a.scrollDown);b.on("aquinama-search:clear",function(c){a.list.get("boundingBox").addClass("yui3-aquinama-hidden");b.one("#yui3-aquinama-news").removeClass("yui3-aquinama-hidden");a.interest.deselect();a.list.clearList()});b.one(".yui3-aquinama-interest").on("click",function(c){a.busqueda.deselect();b.one("#yui3-aquinama-news").addClass("yui3-aquinama-hidden");b.one("#yui3-aquinama-list").removeClass("yui3-aquinama-hidden");a.list.showLoad();a.list.set("emodellist",a.datacontroller.get("interest"));a.filter.set("source",a.list.source());a.filter.clear();a.filter.sendRequest();a.search.setCategory("Me Interesan");b.one("#yui3-aquinama-error").set("innerHTML","")});b.one(".yui3-aquinama-busqueda").on("click",function(f){var c=a.datacontroller.get("latestSearch"),d=c.size();a.interest.deselect();if(d>0){a.search.setupSearch(a.search.get("lastaselect"))}else{b.one("#yui3-aquinama-news").removeClass("yui3-aquinama-hidden");a.search._syncSearch();a.search._clearSearch()}});b.one(".loading-main").addClass("yui3-aquinama-hidden");b.one("#yui3-aquinama-all-desc").setHTML("Busca anuncios en R_ _ _ _ _co de manera *R&aacute;pida e Intuitiva*.</br></br>")});