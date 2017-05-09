namespace stadiumapp.Services {
  export class StadiumService {
    private stadiumResource;
    public get(id) {
      return this.stadiumResource.get({id:id});
    }
    public list() {
      return this.stadiumResource.query();
    }
    public save(stadium) {
      return this.stadiumResource.save(stadium).$promise;
    }
    public remove(id) {
      return this.stadiumResource.remove({id:id}).$promise;
    }

    constructor($resource) {
      this.stadiumResource = $resource('/api/stadiums/:id');
    }
  }
  angular.module('stadiumapp').service('stadiumService', StadiumService);

  export class UserService {
    public LoginResource;
    public SignUpResource;

    public registerUser(userObj) {
      return this.SignUpResource.save(userObj).$promise;
    }

    public loginUser(userInfo) {
      return this.LoginResource.save(userInfo).$promise;
    }

    constructor(private $resource:ng.resource.IResourceService){
      this.LoginResource = this.$resource('/userRoutes/api/Login/Local');
      this.SignUpResource = this.$resource('/userRoutes/api/Register');
      // this.LogoutResource = this.$resource('/userRoutes/api/Logout');
    }

  }

  angular.module('stadiumapp').service('userService', UserService);

  export class CommentService {
    private commentResource;
    public get(id) {
      return this.commentResource.get({id:id});
    }
    public list() {
      return this.commentResource.query();
    }
    public save(comment) {
      return this.commentResource.save(comment).$promise;
    }
    public remove(id) {
      return this.commentResource.remove({id:id}).$promise;
    }

    constructor($resource) {
      this.commentResource = $resource('/api/stadiums/:id');
    }
  }
  angular.module('stadiumapp').service('commentService', CommentService);

}
