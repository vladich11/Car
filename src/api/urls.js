const datastoreUrl = 'https://data.gov.il/api/3/action/datastore_search';
const numberPlateDataResId = '053cea08-09bc-40ec-8f7a-156f0677aff3';
const numberPlateHistoryDataResId = '56063a99-8a3e-4ff4-912e-5966c0279bad';
const numberPlateDisabledCertificateId = 'c8b9f9c8-4612-4068-934f-d4acd2e3c06e';

export default {
  searchCarInfoByNumberPlate: (numberPlate) =>
    `${datastoreUrl}?resource_id=${numberPlateDataResId}&&filters={"mispar_rechev":${numberPlate}}`,
  searchHistoryCarInfoByNumberPlate: (numberPlate) =>
    `${datastoreUrl}?resource_id=${numberPlateHistoryDataResId}&&filters={"mispar_rechev":${numberPlate}}`,
  searchDisabledCertificateByNumberPlate: (numberPlate) =>
    `${datastoreUrl}?resource_id=${numberPlateDisabledCertificateId}&&filters={"MISPAR RECHEV":${numberPlate}}`,
};
