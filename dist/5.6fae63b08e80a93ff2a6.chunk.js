webpackJsonp([5],{LDZG:function(l,n,u){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e=u("WT6e"),t=u("NOoU"),d=u("uBk/"),a=(u("MDfR"),u("xgm2"),u("bqhO"),u("aTdd"),u("owTz"),u("VwFy"),u("EN1B"),u("huge")),i=function(){function l(l){this.http=l,this.currentUser=JSON.parse(localStorage.getItem("currentUser")),this.apiUrl=a.a.apiUrl,this.apiKey=this.currentUser.apikey}return l.prototype.getServerStateList=function(){return this.http.get(this.apiUrl+"/WAPI/ServerStateList/?key="+this.apiKey).map(this.extractData).catch(d.a)},l.prototype.extractData=function(l){return l.json().data||{}},l}(),r=function(){function l(l){this.serverManageService=l,this.serverStatData=[]}return l.prototype.ngOnInit=function(){this.getServerStateList()},l.prototype.getServerStateList=function(){var l=this;this.serverManageService.getServerStateList().subscribe(function(n){l.serverStatData=n,console.log("this serverStat",l.serverStatData)},function(n){return l.errMessage=n})},l}(),s=u("AQpH"),c=function(){},o=u("gpTn"),m=u("Xjw4"),p=e["\u0275crt"]({encapsulation:2,styles:[],data:{}});function g(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,35,"tr",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](2,0,null,null,4,"td",[["scope","row"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                    "])),(l()(),e["\u0275eld"](4,0,null,null,1,"span",[["class","m-badge m-badge--brand m-badge--wide"],["style","font-size:12pt;"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["AGENT"])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](8,0,null,null,1,"th",[["class","align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](9,null,["",""])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](11,0,null,null,1,"td",[["class","align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](12,null,["",""])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](14,0,null,null,1,"td",[["class","align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](15,null,["",""])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](17,0,null,null,4,"td",[["class","align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                    "])),(l()(),e["\u0275eld"](19,0,null,null,1,"span",[["class","m-badge m-badge--info m-badge--wide m-badge--rounded"]],null,null,null,null,null)),(l()(),e["\u0275ted"](20,null,["",""])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](23,0,null,null,11,"td",[["class","align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                    "])),(l()(),e["\u0275eld"](25,0,null,null,8,"span",[["class","m-switch m-switch--outline m-switch--icon m-switch--success align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                        "])),(l()(),e["\u0275eld"](27,0,null,null,5,"label",[["style","display:block; margin-bottom:0;"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                            "])),(l()(),e["\u0275eld"](29,0,null,null,0,"input",[["checked","checked"],["name",""],["type","checkbox"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                            "])),(l()(),e["\u0275eld"](31,0,null,null,0,"span",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                        "])),(l()(),e["\u0275ted"](-1,null,["\n                                    "])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275ted"](-1,null,["\n                            "]))],null,function(l,n){l(n,9,0,n.context.$implicit.ServerType),l(n,12,0,n.context.$implicit.ServerID),l(n,15,0,n.context.$implicit.ServerAddress),l(n,20,0,n.context.$implicit.State)})}function h(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,25,"tbody",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275eld"](2,0,null,null,19,"tr",[["class","bg-primary text-white"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](4,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Server Name"])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](7,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Server Type"])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](10,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Server ID"])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](13,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Server Address"])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](16,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["State"])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](19,0,null,null,1,"th",[["style","width:10%;"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["ON/OFF"])),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275and"](16777216,null,null,1,null,g)),e["\u0275did"](24,802816,null,0,m.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),e["\u0275ted"](-1,null,["\n                        "]))],function(l,n){var u=n.component;l(n,24,0,null==u.serverStatData[0]?null:u.serverStatData[0].AGENT)},null)}function f(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,35,"tr",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](2,0,null,null,4,"td",[["scope","row"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                    "])),(l()(),e["\u0275eld"](4,0,null,null,1,"span",[["class","m-badge m-badge--brand m-badge--wide"],["style","font-size:12pt;"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["GAME"])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](8,0,null,null,1,"th",[["class","align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](9,null,["",""])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](11,0,null,null,1,"td",[["class","align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](12,null,["",""])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](14,0,null,null,1,"td",[["class","align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](15,null,["",""])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](17,0,null,null,4,"td",[["class","align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                    "])),(l()(),e["\u0275eld"](19,0,null,null,1,"span",[["class","m-badge m-badge--info m-badge--wide m-badge--rounded"]],null,null,null,null,null)),(l()(),e["\u0275ted"](20,null,["",""])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](23,0,null,null,11,"td",[["class","align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                    "])),(l()(),e["\u0275eld"](25,0,null,null,8,"span",[["class","m-switch m-switch--outline m-switch--icon m-switch--success align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                        "])),(l()(),e["\u0275eld"](27,0,null,null,5,"label",[["style","display:block; margin-bottom:0;"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                            "])),(l()(),e["\u0275eld"](29,0,null,null,0,"input",[["checked","checked"],["name",""],["type","checkbox"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                            "])),(l()(),e["\u0275eld"](31,0,null,null,0,"span",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                        "])),(l()(),e["\u0275ted"](-1,null,["\n                                    "])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275ted"](-1,null,["\n                            "]))],null,function(l,n){l(n,9,0,n.context.$implicit.ServerType),l(n,12,0,n.context.$implicit.ServerID),l(n,15,0,n.context.$implicit.ServerAddress),l(n,20,0,n.context.$implicit.State)})}function v(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,25,"tbody",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275eld"](2,0,null,null,19,"tr",[["class","bg-primary text-white"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](4,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Server Name"])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](7,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Server Type"])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](10,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Server ID"])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](13,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Server Address"])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](16,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["State"])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](19,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["ON/OFF"])),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275and"](16777216,null,null,1,null,f)),e["\u0275did"](24,802816,null,0,m.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),e["\u0275ted"](-1,null,["\n                        "]))],function(l,n){var u=n.component;l(n,24,0,null==u.serverStatData[0]?null:u.serverStatData[0].GAME)},null)}function b(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,35,"tr",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](2,0,null,null,4,"td",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                    "])),(l()(),e["\u0275eld"](4,0,null,null,1,"span",[["class","m-badge m-badge--brand m-badge--wide"],["style","font-size:12pt;"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["HOST"])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](8,0,null,null,1,"th",[["class","align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](9,null,["",""])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](11,0,null,null,1,"td",[["class","align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](12,null,["",""])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](14,0,null,null,1,"td",[["class","align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](15,null,["",""])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](17,0,null,null,4,"td",[["class","align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                    "])),(l()(),e["\u0275eld"](19,0,null,null,1,"span",[["class","m-badge m-badge--info m-badge--wide m-badge--rounded"]],null,null,null,null,null)),(l()(),e["\u0275ted"](20,null,["",""])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](23,0,null,null,11,"td",[["class","align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                    "])),(l()(),e["\u0275eld"](25,0,null,null,8,"span",[["class","m-switch m-switch--outline m-switch--icon m-switch--success align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                        "])),(l()(),e["\u0275eld"](27,0,null,null,5,"label",[["style","display:block; margin-bottom:0;"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                            "])),(l()(),e["\u0275eld"](29,0,null,null,0,"input",[["checked","checked"],["name",""],["type","checkbox"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                            "])),(l()(),e["\u0275eld"](31,0,null,null,0,"span",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                        "])),(l()(),e["\u0275ted"](-1,null,["\n                                    "])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275ted"](-1,null,["\n                            "]))],null,function(l,n){l(n,9,0,n.context.$implicit.ServerType),l(n,12,0,n.context.$implicit.ServerID),l(n,15,0,n.context.$implicit.ServerAddress),l(n,20,0,n.context.$implicit.State)})}function S(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,25,"tbody",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275eld"](2,0,null,null,19,"tr",[["class","bg-primary text-white"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](4,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Server Name"])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](7,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Server Type"])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](10,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Server ID"])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](13,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Server Address"])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](16,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["State"])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](19,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["ON/OFF"])),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275and"](16777216,null,null,1,null,b)),e["\u0275did"](24,802816,null,0,m.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),e["\u0275ted"](-1,null,["\n                        "]))],function(l,n){var u=n.component;l(n,24,0,null==u.serverStatData[0]?null:u.serverStatData[0].HOST)},null)}function y(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,35,"tr",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](2,0,null,null,4,"td",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                    "])),(l()(),e["\u0275eld"](4,0,null,null,1,"span",[["class","m-badge m-badge--brand m-badge--wide"],["style","font-size:12pt;"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["CACHE"])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](8,0,null,null,1,"th",[["class","align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](9,null,["",""])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](11,0,null,null,1,"td",[["class","align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](12,null,["",""])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](14,0,null,null,1,"td",[["class","align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](15,null,["",""])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](17,0,null,null,4,"td",[["class","align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                    "])),(l()(),e["\u0275eld"](19,0,null,null,1,"span",[["class","m-badge m-badge--info m-badge--wide m-badge--rounded"]],null,null,null,null,null)),(l()(),e["\u0275ted"](20,null,["",""])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](23,0,null,null,11,"td",[["class","align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                    "])),(l()(),e["\u0275eld"](25,0,null,null,8,"span",[["class","m-switch m-switch--outline m-switch--icon m-switch--success align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                        "])),(l()(),e["\u0275eld"](27,0,null,null,5,"label",[["style","display:block; margin-bottom:0;"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                            "])),(l()(),e["\u0275eld"](29,0,null,null,0,"input",[["checked","checked"],["name",""],["type","checkbox"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                            "])),(l()(),e["\u0275eld"](31,0,null,null,0,"span",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                        "])),(l()(),e["\u0275ted"](-1,null,["\n                                    "])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275ted"](-1,null,["\n                            "]))],null,function(l,n){l(n,9,0,n.context.$implicit.ServerType),l(n,12,0,n.context.$implicit.ServerID),l(n,15,0,n.context.$implicit.ServerAddress),l(n,20,0,n.context.$implicit.State)})}function w(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,25,"tbody",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275eld"](2,0,null,null,19,"tr",[["class","bg-primary text-white"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](4,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Server Name"])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](7,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Server Type"])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](10,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Server ID"])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](13,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Server Address"])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](16,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["State"])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](19,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["ON/OFF"])),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275and"](16777216,null,null,1,null,y)),e["\u0275did"](24,802816,null,0,m.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),e["\u0275ted"](-1,null,["\n                        "]))],function(l,n){var u=n.component;l(n,24,0,null==u.serverStatData[0]?null:u.serverStatData[0].CACHE)},null)}function O(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,35,"tr",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](2,0,null,null,4,"td",[["scope","row"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                    "])),(l()(),e["\u0275eld"](4,0,null,null,1,"span",[["class","m-badge m-badge--brand m-badge--wide"],["style","font-size:12pt;"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["MONITORING"])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](8,0,null,null,1,"th",[["class","align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](9,null,["",""])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](11,0,null,null,1,"td",[["class","align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](12,null,["",""])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](14,0,null,null,1,"td",[["class","align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](15,null,["",""])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](17,0,null,null,4,"td",[["class","align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                    "])),(l()(),e["\u0275eld"](19,0,null,null,1,"span",[["class","m-badge m-badge--info m-badge--wide m-badge--rounded"]],null,null,null,null,null)),(l()(),e["\u0275ted"](20,null,["",""])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](23,0,null,null,11,"td",[["class","align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                    "])),(l()(),e["\u0275eld"](25,0,null,null,8,"span",[["class","m-switch m-switch--outline m-switch--icon m-switch--success align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                        "])),(l()(),e["\u0275eld"](27,0,null,null,5,"label",[["style","display:block; margin-bottom:0;"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                            "])),(l()(),e["\u0275eld"](29,0,null,null,0,"input",[["checked","checked"],["name",""],["type","checkbox"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                            "])),(l()(),e["\u0275eld"](31,0,null,null,0,"span",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                        "])),(l()(),e["\u0275ted"](-1,null,["\n                                    "])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275ted"](-1,null,["\n                            "]))],null,function(l,n){l(n,9,0,n.context.$implicit.ServerType),l(n,12,0,n.context.$implicit.ServerID),l(n,15,0,n.context.$implicit.ServerAddress),l(n,20,0,n.context.$implicit.State)})}function D(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,25,"tbody",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275eld"](2,0,null,null,19,"tr",[["class","bg-primary text-white"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](4,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Server Name"])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](7,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Server Type"])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](10,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Server ID"])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](13,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Server Address"])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](16,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["State"])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](19,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["ON/OFF"])),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275and"](16777216,null,null,1,null,O)),e["\u0275did"](24,802816,null,0,m.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),e["\u0275ted"](-1,null,["\n                        "]))],function(l,n){var u=n.component;l(n,24,0,null==u.serverStatData[0]?null:u.serverStatData[0].MONITORING)},null)}function I(l){return e["\u0275vid"](0,[(l()(),e["\u0275ted"](-1,null,["\n"])),(l()(),e["\u0275eld"](1,0,null,null,10,"div",[["appunwraptag",""],["class","m-subheader"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n    "])),(l()(),e["\u0275eld"](3,0,null,null,7,"div",[["class","d-flex align-items-center"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n        "])),(l()(),e["\u0275eld"](5,0,null,null,4,"div",[["class","mr-auto"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n            "])),(l()(),e["\u0275eld"](7,0,null,null,1,"h3",[["class","m-subheader__title m-subheader__title--separator"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                \uc11c\ubc84 \uad00\ub9ac\n            "])),(l()(),e["\u0275ted"](-1,null,["\n        "])),(l()(),e["\u0275ted"](-1,null,["\n    "])),(l()(),e["\u0275ted"](-1,null,["\n"])),(l()(),e["\u0275ted"](-1,null,["\n"])),(l()(),e["\u0275ted"](-1,null,["\n"])),(l()(),e["\u0275eld"](14,0,null,null,67,"div",[["class","m-content"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n    "])),(l()(),e["\u0275eld"](16,0,null,null,64,"div",[["class","m-portlet"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n        "])),(l()(),e["\u0275eld"](18,0,null,null,10,"div",[["class","m-portlet__head"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n            "])),(l()(),e["\u0275eld"](20,0,null,null,7,"div",[["class","m-portlet__head-caption"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                "])),(l()(),e["\u0275eld"](22,0,null,null,4,"div",[["class","m-portlet__head-title"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                    "])),(l()(),e["\u0275eld"](24,0,null,null,1,"h3",[["class","m-portlet__head-text"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                        Set Servers Maintenance\n                    "])),(l()(),e["\u0275ted"](-1,null,["\n                "])),(l()(),e["\u0275ted"](-1,null,["\n            "])),(l()(),e["\u0275ted"](-1,null,["\n        "])),(l()(),e["\u0275ted"](-1,null,["\n        "])),(l()(),e["\u0275eld"](30,0,null,null,48,"div",[["class","m-portlet__body"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n            "])),(l()(),e["\u0275ted"](-1,null,["\n            "])),(l()(),e["\u0275eld"](33,0,null,null,44,"div",[["class","m-section"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                "])),(l()(),e["\u0275eld"](35,0,null,null,41,"div",[["class","m-section__content"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                    "])),(l()(),e["\u0275eld"](37,0,null,null,38,"table",[["class","table m-table"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                        "])),(l()(),e["\u0275eld"](39,0,null,null,20,"thead",[["class","thead-default"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275eld"](41,0,null,null,17,"tr",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](43,0,null,null,1,"th",[["style","width:20%; vertical-align: middle;"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Server State"])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275eld"](46,0,null,null,11,"th",[["colspan","5"],["style","width:80%"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                    All Server ON/OFF \xa0\xa0\n                                    "])),(l()(),e["\u0275eld"](48,0,null,null,8,"span",[["class","m-switch m-switch--outline m-switch--icon m-switch--danger align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                        "])),(l()(),e["\u0275eld"](50,0,null,null,5,"label",[["style","display:block; margin-bottom:0;"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                            "])),(l()(),e["\u0275eld"](52,0,null,null,0,"input",[["checked","checked"],["name",""],["type","checkbox"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                            "])),(l()(),e["\u0275eld"](54,0,null,null,0,"span",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\n                                        "])),(l()(),e["\u0275ted"](-1,null,["\n                                    "])),(l()(),e["\u0275ted"](-1,null,["\n                                "])),(l()(),e["\u0275ted"](-1,null,["\n                            "])),(l()(),e["\u0275ted"](-1,null,["\n                        "])),(l()(),e["\u0275ted"](-1,null,["\n                        "])),(l()(),e["\u0275and"](16777216,null,null,1,null,h)),e["\u0275did"](62,16384,null,0,m.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275ted"](-1,null,["\n                        "])),(l()(),e["\u0275and"](16777216,null,null,1,null,v)),e["\u0275did"](65,16384,null,0,m.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275ted"](-1,null,["\n                        "])),(l()(),e["\u0275and"](16777216,null,null,1,null,S)),e["\u0275did"](68,16384,null,0,m.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275ted"](-1,null,["\n                        "])),(l()(),e["\u0275and"](16777216,null,null,1,null,w)),e["\u0275did"](71,16384,null,0,m.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275ted"](-1,null,["\n                        "])),(l()(),e["\u0275and"](16777216,null,null,1,null,D)),e["\u0275did"](74,16384,null,0,m.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275ted"](-1,null,["\n                    "])),(l()(),e["\u0275ted"](-1,null,["\n                "])),(l()(),e["\u0275ted"](-1,null,["\n            "])),(l()(),e["\u0275ted"](-1,null,["\n        "])),(l()(),e["\u0275ted"](-1,null,["\n        "])),(l()(),e["\u0275ted"](-1,null,["\n    "])),(l()(),e["\u0275ted"](-1,null,["\n"])),(l()(),e["\u0275ted"](-1,null,["\n"]))],function(l,n){var u=n.component;l(n,62,0,void 0!=(null==u.serverStatData[0]?null:u.serverStatData[0].AGENT)),l(n,65,0,void 0!=(null==u.serverStatData[0]?null:u.serverStatData[0].GAME)),l(n,68,0,void 0!=(null==u.serverStatData[0]?null:u.serverStatData[0].HOST)),l(n,71,0,void 0!=(null==u.serverStatData[0]?null:u.serverStatData[0].CACHE)),l(n,74,0,void 0!=(null==u.serverStatData[0]?null:u.serverStatData[0].MONITORING))},null)}var x=e["\u0275ccf"]("app-tabs-bootstrap",r,function(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,2,"app-tabs-bootstrap",[],null,null,null,I,p)),e["\u0275prd"](512,null,i,i,[t.e]),e["\u0275did"](2,114688,null,0,r,[i],null,null)],function(l,n){l(n,2,0)},null)},{},{},[]),N=u("bfOx"),T=u("p2Z0");u.d(n,"ServerManageModuleNgFactory",function(){return F});var F=e["\u0275cmf"](c,[],function(l){return e["\u0275mod"]([e["\u0275mpd"](512,e.ComponentFactoryResolver,e["\u0275CodegenComponentFactoryResolver"],[[8,[o.a,x]],[3,e.ComponentFactoryResolver],e.NgModuleRef]),e["\u0275mpd"](4608,m.NgLocalization,m.NgLocaleLocalization,[e.LOCALE_ID,[2,m["\u0275a"]]]),e["\u0275mpd"](512,m.CommonModule,m.CommonModule,[]),e["\u0275mpd"](512,N.RouterModule,N.RouterModule,[[2,N["\u0275a"]],[2,N.Router]]),e["\u0275mpd"](512,T.a,T.a,[]),e["\u0275mpd"](512,c,c,[]),e["\u0275mpd"](1024,N.ROUTES,function(){return[[{path:"",component:s.a,children:[{path:"",component:r}]}]]},[])])})}});