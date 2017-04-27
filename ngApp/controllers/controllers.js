var stadiumapp;
(function (stadiumapp) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController(stadiumService, filepickerService, $scope, $state, $stateParams, $window) {
                this.stadiumService = stadiumService;
                this.filepickerService = filepickerService;
                this.$scope = $scope;
                this.$state = $state;
                this.$stateParams = $stateParams;
                this.$window = $window;
                this.message = 'Click Upload to select a photo from your local computer, OR take a new picture, OR from 15+ cloud-based sites/apps.';
                this.stadiums = stadiumService.list();
                var token = window.localStorage['token'];
                if (token) {
                    this.loggedIn = true;
                    var payload = JSON.parse(window.atob(token.split('.')[1]));
                    this.currentUser = payload.username;
                }
                else {
                    this.loggedIn = false;
                }
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
            function LoginController(userService, $window, $state, $stateParams) {
                this.userService = userService;
                this.$window = $window;
                this.$state = $state;
                this.$stateParams = $stateParams;
            }
            LoginController.prototype.login = function () {
                var _this = this;
                this.userService.loginUser(this.userInfo).then(function (data) {
                    window.localStorage['token'] = JSON.stringify(data.token);
                    var token = window.localStorage['token'];
                    var payload = JSON.parse(window.atob(token.split('.')[1]));
                    alert('Login Successful -- Welcome back, ' + payload.username + '!');
                    _this.$state.go('home');
                    _this.$window.location.reload();
                });
            };
            return LoginController;
        }());
        Controllers.LoginController = LoginController;
        var RegisterController = (function () {
            function RegisterController(userService, $state, $stateParams) {
                this.userService = userService;
                this.$state = $state;
                this.$stateParams = $stateParams;
            }
            RegisterController.prototype.signup = function () {
                var _this = this;
                this.userService.registerUser(this.user).then(function () {
                    alert('signup successful, please login');
                    _this.$state.go('login');
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
            function NavBarController($state, $stateParams, $window) {
                this.$state = $state;
                this.$stateParams = $stateParams;
                this.$window = $window;
                var token = window.localStorage['token'];
                if (token) {
                    var payload = JSON.parse(window.atob(token.split('.')[1]));
                    this.username = payload.username;
                    this.loggedIn = true;
                }
                else {
                    this.loggedIn = false;
                }
            }
            NavBarController.prototype.logout = function () {
                var token = window.localStorage['token'];
                var payload = JSON.parse(window.atob(token.split('.')[1]));
                alert('Goodbye, ' + payload.username + '! Hope to see you back.');
                localStorage.removeItem('token');
                this.$window.location.reload();
            };
            return NavBarController;
        }());
        Controllers.NavBarController = NavBarController;
        angular.module('stadiumapp').controller('NavBarController', NavBarController);
        angular.module('stadiumapp').controller('CarouselDemoCtrl', function ($scope) {
            $scope.myInterval = 5000;
            $scope.noWrapSlides = false;
            var slides = $scope.slides = [];
            $scope.addSlide = function () {
                var newWidth = 600 + slides.length + 1;
                slides.push({
                    image: '//placekitten.com/' + newWidth + '/300',
                    text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' +
                        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
                });
            };
            for (var i = 0; i < 4; i++) {
                $scope.addSlide();
            }
        });
    })(Controllers = stadiumapp.Controllers || (stadiumapp.Controllers = {}));
})(stadiumapp || (stadiumapp = {}));
