namespace stadiumapp.Controllers {

  export class HomeController {
      public stadiums;
      public stadium;

      public save() {
        this.stadiumService.save(this.stadium).then(() => {
        this.stadiums = this.stadiumService.list();
        this.stadium = null;
        });
      }

      public remove(id) {
        this.stadiumService.remove(id).then(() => {
          this.stadiums = this.stadiumService.list();
        });
      }

      constructor(private stadiumService) {
        this.stadiums = stadiumService.list();
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
