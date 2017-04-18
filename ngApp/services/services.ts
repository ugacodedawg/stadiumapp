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
}
