var stadiumapp;
(function (stadiumapp) {
    angular.module('stadiumapp', ['ui.router', 'ngResource', 'angular-filepicker', 'ui.bootstrap']).config(function ($stateProvider, $urlRouterProvider, $locationProvider, filepickerProvider) {
        filepickerProvider.setKey('AJ1qzKq0iSJ6ocUxOHi6Zz');
        $stateProvider
            .state('landing', {
            url: '/',
            templateUrl: '/ngApp/views/landing.html',
            controller: stadiumapp.Controllers.LandingController,
            controllerAs: 'controller'
        })
            .state('home', {
            url: '/home',
            templateUrl: '/ngApp/views/home.html',
            controller: stadiumapp.Controllers.HomeController,
            controllerAs: 'controller'
        })
            .state('login', {
            url: '/login',
            templateUrl: '/ngApp/views/login.html',
            controller: stadiumapp.Controllers.LoginController,
            controllerAs: 'controller'
        })
            .state('register', {
            url: '/register',
            templateUrl: '/ngApp/views/register.html',
            controller: stadiumapp.Controllers.RegisterController,
            controllerAs: 'controller'
        })
            .state('edit', {
            url: '/edit/:id',
            templateUrl: '/ngApp/views/edit.html',
            controller: stadiumapp.Controllers.EditController,
            controllerAs: 'controller'
        })
            .state('notFound', {
            url: '/notFound',
            templateUrl: '/ngApp/views/notFound.html'
        });
        $urlRouterProvider.otherwise('/notFound');
        $locationProvider.html5Mode(true);
    });
})(stadiumapp || (stadiumapp = {}));
