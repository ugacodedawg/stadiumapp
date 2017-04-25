var stadiumapp;
(function (stadiumapp) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController(stadiumService, filepickerService, $scope) {
                this.stadiumService = stadiumService;
                this.filepickerService = filepickerService;
                this.$scope = $scope;
                this.message = 'Click Upload to select a photo from your local computer, OR take a new picture, OR from 15+ cloud-based sites/apps.';
                this.stadiums = stadiumService.list();
            }
            HomeController.prototype.save = function () {
                var _this = this;
                var token = window.localStorage['token'];
                var payload = JSON.parse(window.atob(token.split('.')[1]));
                this.stadium.owner_id = payload.id;
                this.stadium.username = payload.username;
                this.stadium.url = this.file.url;
                this.stadiumService.save(this.stadium).then(function () {
                    _this.stadiums = _this.stadiumService.list();
                    _this.stadium = null;
                    _this.file = null;
                });
            };
            HomeController.prototype.remove = function (id) {
                var _this = this;
                this.stadiumService.remove(id).then(function () {
                    _this.stadiums = _this.stadiumService.list();
                });
            };
            HomeController.prototype.pickFile = function () {
                this.filepickerService.pick({ mimetype: 'image/*' }, this.fileUploaded.bind(this));
            };
            HomeController.prototype.fileUploaded = function (file) {
                this.file = file;
                this.$scope.$apply();
            };
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
        var LoginController = (function () {
            function LoginController(userService, $window) {
                this.userService = userService;
                this.$window = $window;
            }
            LoginController.prototype.login = function () {
                this.userService.loginUser(this.userInfo).then(function (data) {
                    window.localStorage['token'] = JSON.stringify(data.token);
                    var token = window.localStorage['token'];
                    var payload = JSON.parse(window.atob(token.split('.')[1]));
                    alert('Login Successful -- Welcome back, ' + payload.username + '!');
                });
            };
            return LoginController;
        }());
        Controllers.LoginController = LoginController;
        var RegisterController = (function () {
            function RegisterController(userService) {
                this.userService = userService;
            }
            RegisterController.prototype.signup = function () {
                this.userService.registerUser(this.user).then(function () {
                    alert('signup successful, please login');
                });
            };
            return RegisterController;
        }());
        Controllers.RegisterController = RegisterController;
        var EditController = (function () {
            function EditController(stadiumService, $state, $stateParams) {
                this.stadiumService = stadiumService;
                this.$state = $state;
                this.$stateParams = $stateParams;
                this.stadiumId = $stateParams['id'];
                this.stadium = stadiumService.get(this.stadiumId);
            }
            EditController.prototype.save = function () {
                var _this = this;
                var token = window.localStorage['token'];
                var payload = JSON.parse(window.atob(token.split('.')[1]));
                this.stadium.username = payload.username;
                this.stadium._id = this.stadiumId;
                this.stadiumService.save(this.stadium).then(function () {
                    _this.$state.go('home');
                });
            };
            return EditController;
        }());
        Controllers.EditController = EditController;
        var NavBarController = (function () {
            function NavBarController($state, $stateParams) {
                this.$state = $state;
                this.$stateParams = $stateParams;
            }
            NavBarController.prototype.logout = function () {
                var token = window.localStorage['token'];
                localStorage.removeItem('token');
                this.$state.go('home');
                alert("Goodbye");
            };
            return NavBarController;
        }());
        Controllers.NavBarController = NavBarController;
        angular.module('stadiumapp').controller('NavBarController', NavBarController);
        var AboutController = (function () {
            function AboutController() {
                this.message = 'Hello from the about page!';
            }
            return AboutController;
        }());
        Controllers.AboutController = AboutController;
    })(Controllers = stadiumapp.Controllers || (stadiumapp.Controllers = {}));
})(stadiumapp || (stadiumapp = {}));
