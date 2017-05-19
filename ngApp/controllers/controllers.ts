namespace stadiumapp.Controllers {

  export class HomeController {
      public stadiums;
      public stadium;
      public currentUser;
      public loggedIn;
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
        this.$window.location.reload();
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

      public showModal(stadiumObj) {
        this.$uibModal.open({
          templateUrl: '/ngApp/views/stadiumDialog.html',
          controller: 'DialogController',
          controllerAs: 'modal',
          resolve: {
            stadium: () => stadiumObj
          },
          size: 'md'
        });
      };


      constructor(private $uibModal: angular.ui.bootstrap.IModalService,
                  private stadiumService:stadiumapp.Services.StadiumService,
                  private filepickerService, private $scope: ng.IScope,
                  private $state, private $stateParams, private $window, public ModalService) {
        this.stadiums = stadiumService.list();
        let token = window.localStorage['token'];
        if(token) {
          this.loggedIn = true;
          let payload = JSON.parse(window.atob(token.split('.')[1]));
          this.currentUser = payload.username;
        } else {
          this.loggedIn = false;
        }
      }

  }

  class DialogController {
    public currentUser;
    public comments;
    public comment;
    public text;

    public ok() {
      this.$uibModalInstance.close();
    }

    public save() {
      let token = window.localStorage['token'];
      let payload = JSON.parse(window.atob(token.split('.')[1]));
      this.comment.text = this.text;
      this.comment.author = payload.username;
      this.commentService.save(this.comment).then(() => {
      this.comments = this.commentService.list();
      this.comment = null;
      this.$window.location.reload();
      });
    }

    constructor(public stadium, private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance,
    private commentService:stadiumapp.Services.CommentService, private $window) {
      let token = window.localStorage['token'];
      if(token) {
        let payload = JSON.parse(window.atob(token.split('.')[1]));
        this.currentUser = payload.username;
      } else {
        this.currentUser = false;
      }
      this.comment={};
     }

  }

  angular.module('stadiumapp').controller('DialogController', DialogController);

  export class LoginController {
      public userInfo;

      public login() {
        this.userService.loginUser(this.userInfo).then((data) => {
          window.localStorage['token'] = JSON.stringify(data.token);
          let token = window.localStorage['token'];
          let payload = JSON.parse(window.atob(token.split('.')[1]));
          alert('Login Successful -- Welcome back, ' + payload.username + '!');
          this.$state.go('home');
          this.$window.location.reload();
        })
      }

      public constructor(
        private userService,
        public $window,
        public $state,
        public $stateParams
      ) {}
  }

  export class RegisterController {
      public user

      public signup() {
        this.userService.registerUser(this.user).then(() => {
          alert('Welcome, ' + this.user.username + '. Please log in.');
          this.$state.go('login');
        })
      }

      public constructor(
        private userService, private $state, private $stateParams
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
      public navbar;
      public footer;

      public goHome() {
        this.navbar.style.display = '';
        this.footer.style.display = '';
        this.$state.go('home');
      }

      public logout() {
        let token = window.localStorage['token'];
        let payload = JSON.parse(window.atob(token.split('.')[1]));
        alert('Goodbye, ' + payload.username + '! Hope to see you back.');
        localStorage.removeItem('token');
        this.$window.location.reload();
      }

      constructor(private $state, private $stateParams, private $window, public $scope){
        this.navbar = <HTMLElement>document.getElementById('navbar');
        this.footer = <HTMLElement>document.getElementById('footer');

        let token = window.localStorage['token'];
        if(token) {
          let payload = JSON.parse(window.atob(token.split('.')[1]));
          this.username = payload.username;
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
        if($window.location.pathname === '/') {
          this.navbar.style.display = 'none';
          this.footer.style.display = 'none';
        }
      }
    }
    angular.module('stadiumapp').controller('NavBarController', NavBarController);

    export class LandingController {
      public stadiums;
      public stadium;
      public slide;

      constructor(private stadiumService:stadiumapp.Services.StadiumService) {
        this.stadiums = stadiumService.list();
        this.stadium = 'https://cdn.filestackcontent.com/FXvQpIPMRimgcWSFvfRi';
        setTimeout(function(){ this.stadium = 'https://cdn.filestackcontent.com/0bO6vh5TZO9lqp8jga8X'; }, 5000);
    // do something
}
        // this.stadiums.forEach(myFunction);
        //
        // function myFunction() {
          // alert("Hello");
        // }
        // stadiums.forEach(var i=1;i<this.stadiums.length;i++){
        //   this.slide=true;
        //   setTimeout(function(){ alert("Hello"); }, 5000);
        // }

      }



    // export class AboutController {
    //     public message = 'Hello from the about page!';
    // }

    // export class ModalController {
    //   public stadium
    //
    //   constructor(private $scope) {}
    //
    // }

}
