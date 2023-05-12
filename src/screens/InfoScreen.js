import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import urls from '../api/urls';
import { StatusBar } from 'expo-status-bar';

const InfoScreen = ({ route, navigation }) => {
  // Car number plate number from HomeScreen
  const { numberPlate } = route.params;
  // General data for car numberplate
  const [data, setData] = useState('');
  // History data for car numberplate
  const [historyData, setHistoryData] = useState('');
  // Disabled certificate  for car numberplate
  const [certificateData, setCertificateData] = useState('');

  const [loading, setLoading] = useState(false);

  const headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers':
      'X-Requested-With, content-type, Authorization',
    'Content-Type': 'application/json;charset=utf-8',
  });

  const getDataForNumberPlate = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        urls.searchCarInfoByNumberPlate(numberPlate),
        {
          method: 'GET',
        }
      );
      const serverData = await response.json();
      if (typeof serverData.result !== 'undefined')
        setData(serverData.result.records[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getDisabledCertificateByNumberPlate = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        urls.searchDisabledCertificateByNumberPlate(numberPlate),
        {
          method: 'GET',
        }
      );
      const serverData = await response.json();
      if (typeof serverData.result !== 'undefined')
        setCertificateData(serverData.result.records[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // const getHistoryDataForNumberPlate = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch(
  //       urls.searchHistoryCarInfoByNumberPlate(numberPlate),
  //       {
  //         method: 'GET',
  //         headers: headers,
  //       }
  //     );
  //     const serverData = await response.json();
  //     if (typeof serverData.result !== 'undefined')
  //       setHistoryData(serverData.result.records[0]);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    getDataForNumberPlate();
    // getHistoryDataForNumberPlate();
    getDisabledCertificateByNumberPlate();
  }, []);

  // Format date
  const formatData = (message) => {
    let year = message.substring(0, 4);
    let month = message.substring(4, 6);
    let day = message.substring(6, 8);
    return year + '-' + month + '-' + day;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4511e" />

      <ScrollView>
        <Text>
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#f4511e"
              style={{
                marginTop: 60,
              }}
            />
          ) : !data ? (
            <View style={{ marginTop: 60 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                מספר הרכב שהוזן לא נמצא במאגר
              </Text>
            </View>
          ) : (
            <View>
              <Text
                style={{
                  margin: 10,
                  fontWeight: 'bold',
                  fontSize: 25,
                }}
              >
                מידע כללי
              </Text>
              <Text style={[styles.rightText, styles.darkRow]}>
                מספר רכב: {data.mispar_rechev}
              </Text>
              <Text style={styles.rightText}>שם תוצר: {data.tozeret_nm}</Text>
              <Text style={[styles.rightText, styles.darkRow]}>
                כינוי מסחרי: {data.kinuy_mishari}
              </Text>
              <Text style={styles.rightText}>
                רמת גימור: {data.ramat_gimur}
              </Text>
              <Text style={[styles.rightText, styles.darkRow]}>
                שנת ייצור: {data.shnat_yitzur}
              </Text>
              <Text style={styles.rightText}>צבע רכב: {data.tzeva_rechev}</Text>

              <Text style={[styles.rightText, styles.darkRow]}>
                סוג דגם (פרטי/מסחרי): {data.sug_degem}
              </Text>

              <Text style={styles.rightText}>
                תאריך מבחן רכב (טסט): {data.mivchan_acharon_dt}
              </Text>
              <Text style={[styles.rightText, styles.darkRow]}>
                תוקף רישיון רכב: {data.tokef_dt}
              </Text>
              <Text style={styles.rightText}>
                מועד עליה לכביש: {data.moed_aliya_lakvish}
              </Text>
              <Text style={[styles.rightText, styles.darkRow]}>
                סוג בעלות: {data.baalut}
              </Text>

              <Text style={styles.rightText}>מספר צבע: {data.tzeva_cd}</Text>

              <Text style={[styles.rightText, styles.darkRow]}>
                רמת אבזור בטיחותי: {data.ramat_eivzur_betihuty}
              </Text>
              <Text
                style={{
                  margin: 10,
                  fontWeight: 'bold',
                  fontSize: 25,
                }}
              >
                נתוני מנוע ורכב
              </Text>
              <Text style={[styles.rightText, styles.darkRow]}>
                קוד תוצר: {data.tozeret_cd}
              </Text>

              <Text style={styles.rightText}>דגם מנוע: {data.degem_manoa}</Text>

              <Text style={[styles.rightText, styles.darkRow]}>
                קוד דגם: {data.degem_cd}
              </Text>

              <Text style={styles.rightText}>שם דגם: {data.degem_nm}</Text>

              <Text style={[styles.rightText, styles.darkRow]}>
                קבוצת זיהום: {data.kvutzat_zihum}
              </Text>

              <Text style={styles.rightText}>
                מידות צמיד קדמי: {data.zmig_kidmi}
              </Text>

              <Text style={[styles.rightText, styles.darkRow]}>
                מידות צמיד אחורי: {data.zmig_ahori}
              </Text>

              <Text style={styles.rightText}>סוג דלק: {data.sug_delek_nm}</Text>

              <Text style={[styles.rightText, styles.darkRow]}>
                מספר הוראת רישום: {data.horaat_rishum}
              </Text>

              <Text style={styles.rightText}>מספר שילדה: {data.misgeret}</Text>

              <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 25 }}>
                תג נכה
              </Text>

              {!certificateData ? (
                <Text style={{ margin: 10 }}>
                  מספר הרכב שהוזן אינו בעל תו נכה
                </Text>
              ) : (
                <View>
                  <Text style={[styles.rightText, styles.darkRow]}>
                    סוג תו: {certificateData['SUG TAV']}
                  </Text>
                  <Text style={styles.rightText}>
                    תאריך הפקת תג נכה:{' '}
                    {formatData(certificateData['TAARICH HAFAKAT TAG'])}
                  </Text>
                </View>
              )}

              {/* <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 25 }}>
                היסטוריית רכב - בקרוב
              </Text> */}

              {/* {!historyData ? (
                <Text>מספר הרכב שהוזן לא נמצא במאגר</Text>
              ) : (
                <View>
                  <Text>ספר מנוע: {historyData.mispar_manoa}</Text>
                  <Text>
                    נסועה כפי שדווח במועד הטסט האחרון:{' '}
                    {historyData.kilometer_test_aharon} ק"מ{' '}
                  </Text>
                  <Text>
                    האם בוצע שינוי מבנה באחד מהשדות גפ\"מ,צבע,צמיג? (1 כן 0 לא)
                    : {historyData.shinui_mivne_ind}
                  </Text>
                  <Text>
                    האם התווסף גפ\"מ? (1 כן 0 לא) : {historyData.gapam_ind}
                  </Text>
                  <Text>
                    שינוי צבע (1 כן 0 לא) : {historyData.shnui_zeva_ind}
                  </Text>
                  <Text>
                    {' '}
                    שינוי במידת צמיג (1 כן 0 לא): {historyData.shinui_zmig_ind}
                  </Text>
                  <Text>מקוריות: {historyData.mkoriut_nm}</Text>
                </View>
              )} */}
            </View>
          )}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#f2f2f2',
  },
  rightText: {
    textAlign: 'right',
    textAlignVertical: 'center', //Centered vertically
    fontSize: 17,
    height: 50,
    width: 400,
    paddingRight: 15,
  },
  darkRow: {
    backgroundColor: '#E0E0E0',
  },
});
