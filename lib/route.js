Router.configure({
	layoutTemplate: 'mainLayout',
    loadingTemplate:'loading',
});

Router.route('/',{
    template:'mainReg',
    name:'mainReg',
//    waitOn: function(){
//        window.setTimeout(function(){return true},15000);
//      },
});

Router.route('/rfc-admin',{
    template:'admin',
    name:'admin',
});