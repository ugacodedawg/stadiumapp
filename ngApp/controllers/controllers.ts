namespace stadiumapp.Controllers {

  export class HomeController {
      public stadiums;
      public stadium;
      public author;
      //Filestack
      public message = 'Click Upload to select a photo from your local computer, OR take a new picture, OR from 15+ cloud-based sites/apps.';
      public file;

      public save() {
        let token = window.localStorage['token'];
        let payload = JSON.parse(window.atob(token.split('.')[1]));
        this.stadium.owner_id = payload.id;
        this.stadium.username = payload.username;
        this.stadium.url = this.file.url;
        this.stadiumService.save(this.stadium).then(() => {
        this.stadiums = this.stadiumService.list();
        this.stadium = null;
        this.file = null;
        });
      }

      public remove(id) {
        this.stadiumService.remove(id).then(() => {
          this.stadiums = this.stadiumService.list();
        });
      }

      //Filestack
      public pickFile() {
          this.filepickerService.pick(
              { mimetype: 'image/*' },
              this.fileUploaded.bind(this)
          );
      }

      public fileUploaded(file) {
          // save file url to database
          this.file = file;
          this.$scope.$apply(); // force page to update
      }

      constructor(private stadiumService:stadiumapp.Services.StadiumService,
      private filepickerService, private $scope: ng.IScope) {
        this.stadiums = stadiumService.list();
      }
  }

  export class LoginController {
      public userInfo

      public login() {
        this.userService.loginUser(this.userInfo).then((data) => {
          // window.localStorage.setItem("token", JSON.stringify(data.token));
          window.localStorage['token'] = JSON.stringify(data.token);
          let token = window.localStorage['token'];
          let payload = JSON.parse(window.atob(token.split('.')[1]));
          alert('Login Successful -- Welcome back, ' + payload.username + '!');
          this.$state.go('home');
          this.$window.location.reload();
          // this.$route.reload();
        })
      }

      public constructor(
        private userService,
        public $window,
        public $state,
        public $stateParams
        // public $route
      ) {

      }
  }

  export class RegisterController {
      public user

      public signup() {
        this.userService.registerUser(this.user).then(() => {
          alert('signup successful, please login');
        })
      }

      public constructor(
        private userService
      ) {

      }
    }

  export class EditController {
      public stadium;
      public stadiumId;

      public save() {
        let token = window.localStorage['token'];
        let payload = JSON.parse(window.atob(token.split('.')[1]));
        this.stadium.username = payload.username;
        this.stadium._id = this.stadiumId;
        this.stadiumService.save(this.stadium).then(() => {
          this.$state.go('home');
        });
      }
      constructor(
        private stadiumService,
        private $state,
        private $stateParams
      ) {
        this.stadiumId = $stateParams['id'];
        this.stadium = stadiumService.get(this.stadiumId);
      }
  }

    export class NavBarController {
      public loggedIn;
      public username;

      public logout() {
        let token = window.localStorage['token'];
        let payload = JSON.parse(window.atob(token.split('.')[1]));
        alert('Goodbye, ' + payload.username + '! Hope to see you back.');
        localStorage.removeItem('token');
        this.$window.location.reload();
        // this.$state.go('home');
      }

      constructor(private $state, private $stateParams, private $window){
        let token = window.localStorage['token'];
        // let token = window.localStorage['token'];
        // let payload = JSON.parse(window.atob(token.split('.')[1]));
        // username = payload.username;
        if(token) {
          let payload = JSON.parse(window.atob(token.split('.')[1]));
          this.username = payload.username;
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
      }
    }
    angular.module('stadiumapp').controller('NavBarController', NavBarController);

    export class AboutController {
        public message = 'Hello from the about page!';
    }

    // class NavBarController {
    //   public loggedIn
    //   public userName
    //
    //   constructor() {
    //     if(token) {
    //       let payload = JSON.parse(window.atob(token.split('.')[1]));
    //       this.userName = payload.username;
    //       this.loggedIn = true;
    //     } else {
    //       this.loggedIn = false;
    //     }
    //   }
    // }


}
