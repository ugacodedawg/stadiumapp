namespace stadiumapp.Controllers {

  export class HomeController {
      public stadiums;
      public stadium;
      //Filestack
      public message = 'Click Upload to select a photo from your local computer, OR take a new picture, OR from 15+ cloud-based sites/apps.';
      public file;

      public save() {
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
          console.log(this.file);
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
          this.$window.localStorage.setItem("token", JSON.stringify(data.token));
          alert('login successful');
        })
      }

      public constructor(
        private userService,
        public $window
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



    export class AboutController {
        public message = 'Hello from the about page!';
    }

}
