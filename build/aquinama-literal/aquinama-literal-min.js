YUI.add("aquinama-literal",function(E){E.namespace("AquiNaMa");var B=E.Lang,A=B.isString,D=B.isNumber,C=E.Base.create("aquinama-literal",E.Base,[],{initializer:function(G){var F=this;F.set("model",G.model);},walkToRoot:function(K,H,G){var F=this,J,I;I=F.getAttr(G,K);if(I){if(E.Lang.isArray(H)){H=I.concat(H);}else{if(E.Lang.isObject(H)){H=E.merge(H,I);}else{H=I+H;}}}J=F.getAttr("parent",K);if(J){H=this.walkToRoot(F.get("model")[J],H,G);}return H;return H;},getAttr:function(G,I){var F=this,H=I;if(!H){H=F.get("model");}if(H.hasOwnProperty(G)){return H[G];}return undefined;}},{ATTRS:{model:{value:{}}}});E.AquiNaMa.Literal=C;},"@VERSION@",{skinnable:false,requires:["base","transition"]});