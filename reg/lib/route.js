Router.configure({
	layoutTemplate: 'mainLayout',
});

Router.route('/',{
    template:'mainReg',
    name:'mainReg',
});

Router.route('/rfc-admin',{
    template:'admin',
    name:'admin',
});