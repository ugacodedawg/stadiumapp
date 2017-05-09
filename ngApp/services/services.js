var stadiumapp;
(function (stadiumapp) {
    var Services;
    (function (Services) {
        var StadiumService = (function () {
            function StadiumService($resource) {
                this.stadiumResource = $resource('/api/stadiums/:id');
            }
            StadiumService.prototype.get = function (id) {
                return this.stadiumResource.get({ id: id });
            };
            StadiumService.prototype.list = function () {
                return this.stadiumResource.query();
            };
            StadiumService.prototype.save = function (stadium) {
                return this.stadiumResource.save(stadium).$promise;
            };
            StadiumService.prototype.remove = function (id) {
                return this.stadiumResource.remove({ id: id }).$promise;
            };
            return StadiumService;
        }());
        Services.StadiumService = StadiumService;
        angular.module('stadiumapp').service('stadiumService', StadiumService);
        var UserService = (function () {
            function UserService($resource) {
                this.$resource = $resource;
                this.LoginResource = this.$resource('/userRoutes/api/Login/Local');
                this.SignUpResource = this.$resource('/userRoutes/api/Register');
            }
            UserService.prototype.registerUser = function (userObj) {
                return this.SignUpResource.save(userObj).$promise;
            };
            UserService.prototype.loginUser = function (userInfo) {
                return this.LoginResource.save(userInfo).$promise;
            };
            return UserService;
        }());
        Services.UserService = UserService;
        angular.module('stadiumapp').service('userService', UserService);
        var CommentService = (function () {
            function CommentService($resource) {
                this.commentResource = $resource('/api/stadiums/:id');
            }
            CommentService.prototype.get = function (id) {
                return this.commentResource.get({ id: id });
            };
            CommentService.prototype.list = function () {
                return this.commentResource.query();
            };
            CommentService.prototype.save = function (stadium) {
                return this.commentResource.save(comment).$promise;
            };
            CommentService.prototype.remove = function (id) {
                return this.commentResource.remove({ id: id }).$promise;
            };
            return CommentService;
        }());
        Services.CommentService = CommentService;
        angular.module('stadiumapp').service('commentService', CommentService);
    })(Services = stadiumapp.Services || (stadiumapp.Services = {}));
})(stadiumapp || (stadiumapp = {}));
