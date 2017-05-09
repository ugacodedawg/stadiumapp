var stadiumapp;
(function (stadiumapp) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController($uibModal, stadiumService, filepickerService, $scope, $state, $stateParams, $window, ModalService) {
                this.$uibModal = $uibModal;
                this.stadiumService = stadiumService;
                this.filepickerService = filepickerService;
                this.$scope = $scope;
                this.$state = $state;
                this.$stateParams = $stateParams;
                this.$window = $window;
                this.ModalService = ModalService;
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
                    _this.$window.location.reload();
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
            HomeController.prototype.showModal = function (stadiumObj) {
                this.$uibModal.open({
                    templateUrl: '/ngApp/views/stadiumDialog.html',
                    controller: 'DialogController',
                    controllerAs: 'modal',
                    resolve: {
                        stadium: function () { return stadiumObj; }
                    },
                    size: 'md'
                });
            };
            ;
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
        var DialogController = (function () {
            function DialogController(stadium, $uibModalInstance, commentService, $window) {
                this.stadium = stadium;
                this.$uibModalInstance = $uibModalInstance;
                this.commentService = commentService;
                this.$window = $window;
                var token = window.localStorage['token'];
                if (token) {
                    var payload = JSON.parse(window.atob(token.split('.')[1]));
                    this.currentUser = payload.username;
                }
                else {
                    this.currentUser = false;
                }
            }
            DialogController.prototype.ok = function () {
                this.$uibModalInstance.close();
            };
            DialogController.prototype.save = function () {
                var _this = this;
                var token = window.localStorage['token'];
                var payload = JSON.parse(window.atob(token.split('.')[1]));
                this.comment.author_id = payload.id;
                this.comment.author.username = payload.username;
                this.commentService.save(this.comment).then(function () {
                    _this.comments = _this.commentService.list();
                    _this.comment = null;
                    _this.$window.location.reload();
                });
            };
            return DialogController;
        }());
        angular.module('stadiumapp').controller('DialogController', DialogController);
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
                    alert('Welcome, ' + _this.user.username + '. Please log in.');
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
            function NavBarController($state, $stateParams, $window, $scope) {
                this.$state = $state;
                this.$stateParams = $stateParams;
                this.$window = $window;
                this.$scope = $scope;
                this.navbar = document.getElementById('navbar');
                this.footer = document.getElementById('footer');
                var token = window.localStorage['token'];
                if (token) {
                    var payload = JSON.parse(window.atob(token.split('.')[1]));
                    this.username = payload.username;
                    this.loggedIn = true;
                }
                else {
                    this.loggedIn = false;
                }
                if ($window.location.pathname === '/') {
                    this.navbar.style.display = 'none';
                    this.footer.style.display = 'none';
                }
            }
            NavBarController.prototype.goHome = function () {
                this.navbar.style.display = '';
                this.footer.style.display = '';
                this.$state.go('home');
            };
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
        var LandingController = (function () {
            function LandingController(stadiumService) {
                this.stadiumService = stadiumService;
                this.stadiums = stadiumService.list();
                this.stadium = 'https://cdn.filestackcontent.com/FXvQpIPMRimgcWSFvfRi';
                setTimeout(function () { this.stadium = 'https://cdn.filestackcontent.com/0bO6vh5TZO9lqp8jga8X'; }, 5000);
            }
            return LandingController;
        }());
        Controllers.LandingController = LandingController;
    })(Controllers = stadiumapp.Controllers || (stadiumapp.Controllers = {}));
})(stadiumapp || (stadiumapp = {}));
