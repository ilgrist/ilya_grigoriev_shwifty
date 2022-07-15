export { ApiKey, ResourceTypes, DefaultLocation, UserMsgTypes };

const ApiKey = 'xUb6xc8a3mlSpCpAuPdCGpG53iIhyKPh';

const ResourceTypes = {
  FiveDays: 'forecasts/v1/daily/5day/',
  CurrentConditions: 'currentconditions/v1/',
  LocationKey: 'locations/v1/cities/',
  Autocomplete: 'locations/v1/cities/autocomplete',
};

const DefaultLocation = {
  Version: 1,
  Key: '215854',
  Type: 'City',
  Rank: 31,
  LocalizedName: 'Tel Aviv',
  Country: {
    ID: 'IL',
    LocalizedName: 'Israel',
  },
  AdministrativeArea: {
    ID: 'TA',
    LocalizedName: 'Tel Aviv',
  },
};

const UserMsgTypes = {
  error: 'error',
  warning: 'warning',
  info: 'info',
  success: 'success',
};
