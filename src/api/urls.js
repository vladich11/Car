const datastoreUrl = "https://data.gov.il/api/3/action/datastore_search";
const numberPlateDataResId = "053cea08-09bc-40ec-8f7a-156f0677aff3";
const numberPlateHistoryDataResId = "56063a99-8a3e-4ff4-912e-5966c0279bad";

export default {
  searchCarInfoByNumberPlate: (numberPlate) =>
    `${datastoreUrl}?resource_id=${numberPlateDataResId}&&filters={"mispar_rechev":${numberPlate}}`,
  searchHistoryCarInfoByNumberPlate: (numberPlate) =>
    `${datastoreUrl}?resource_id=${numberPlateHistoryDataResId}&&filters={"mispar_rechev":${numberPlate}}`,
};
