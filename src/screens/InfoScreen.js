import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import urls from "../api/urls";
import { StatusBar } from "expo-status-bar";

const InfoScreen = ({ route, navigation }) => {
  // Car number plate number from HomeScreen
  const { numberPlate } = route.params;
  // General data for car numberplate
  const [data, setData] = useState("");

  // History data for car numberplate
  const [historyData, setHistoryData] = useState("");

  // Disabled certificate  for car numberplate
  const [certificateData, setCertificateData] = useState("");

  const getDataForNumberPlate = async () => {
    try {
      const response = await fetch(
        urls.searchCarInfoByNumberPlate(numberPlate),
        {
          method: "GET",
        }
      );
      const serverData = await response.json();
      if (typeof serverData.result !== "undefined")
        setData(serverData.result.records[0]);
    } catch (error) {
      console.error(error);
    }
  };

  // const getDisabledCertificateByNumberPlate = async () => {

  //   try {
  //     const response = await fetch(
  //       urls.searchDisabledCertificateByNumberPlate(numberPlate),
  //       {
  //         method: 'GET',
  //       }
  //     );
  //     const serverData = await response.json();
  //     console.log(serverData);
  //     if (typeof serverData.result !== 'undefined')
  //       setCertificateData(serverData.result.records[0]);
  //     console.log(`The certificate data is:${serverData.result}`);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     //setLoading(false);
  //   }
  // };

  // const getHistoryDataForNumberPlate = async () => {
  //   try {
  //     const response = await fetch(
  //       urls.searchHistoryCarInfoByNumberPlate(numberPlate),
  //       {
  //         method: 'GET',
  //       }
  //     );
  //     console.log('im here');
  //     const serverData = await response.json();
  //     console.log(serverData);
  //     if (typeof serverData.result !== 'undefined')
  //       setHistoryData(serverData.result.records[0]);
  //     // console.log(serverData.result.records[0]);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     //setLoading(false);
  //   }
  // };

  useEffect(() => {
    getDataForNumberPlate();
    //  getHistoryDataForNumberPlate();
    // getDisabledCertificateByNumberPlate();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4511e" />
      <ScrollView>
        <Text style={{ margin: 10, fontWeight: "bold", fontSize: 25 }}>
          מידע כללי
        </Text>
        <Text>
          {!data ? (
            <Text>מספר רכב שהוזן אינו קיים במאגר</Text>
          ) : (
            <View style={styles.item}>
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
                  marginTop: 50,
                  marginBottom: 10,
                  fontWeight: "bold",
                  textAlign: "right",
                  fontSize: 25,
                }}
              >
                נתוני מנוע ורכב
              </Text>
              <Text style={styles.rightText}>קוד תוצר: {data.tozeret_cd}</Text>
              <Text style={[styles.rightText, styles.darkRow]}>
                דגם מנוע: {data.degem_manoa}
              </Text>
              <Text style={styles.rightText}>קוד דגם: {data.degem_cd}</Text>
              <Text style={[styles.rightText, styles.darkRow]}>
                שם דגם: {data.degem_nm}
              </Text>
              <Text style={styles.rightText}>
                קבוצת זיהום: {data.kvutzat_zihum}
              </Text>
              <Text style={[styles.rightText, styles.darkRow]}>
                מידות צמיד קדמי: {data.zmig_kidmi}
              </Text>
              <Text style={styles.rightText}>
                מידות צמיד אחורי: {data.zmig_ahori}
              </Text>
              <Text style={[styles.rightText, styles.darkRow]}>
                סוג דלק: {data.sug_delek_nm}
              </Text>
              <Text style={styles.rightText}>
                מספר הוראת רישום: {data.horaat_rishum}
              </Text>
              <Text style={[styles.rightText, styles.darkRow]}>
                מספר שילדה: {data.misgeret}
              </Text>
            </View>
          )}
        </Text>

        {/* <Text style={{ margin: 10, fontWeight: 'bold' }}>היסטוריית רכב</Text>

        {!historyData ? (
          <Text>מספר רכב שהוזן אינו קיים במאגר</Text>
        ) : (
          <View>
            <Text>ספר מנוע: {historyData.mispar_manoa}</Text>
            <Text>
              נסועה כפי שדווח במועד הטסט האחרון:{' '}
              {historyData.kilometer_test_aharon} ק"מ{' '}
            </Text>
            <Text>
              האם בוצע שינוי מבנה באחד מהשדות גפ\"מ,צבע,צמיג? (1 כן 0 לא) :{' '}
              {historyData.shinui_mivne_ind}
            </Text>
            <Text>האם התווסף גפ\"מ? (1 כן 0 לא) : {historyData.gapam_ind}</Text>
            <Text>שינוי צבע (1 כן 0 לא) : {historyData.shnui_zeva_ind}</Text>
            <Text>
              {' '}
              שינוי במידת צמיג (1 כן 0 לא): {historyData.shinui_zmig_ind}
            </Text>
            <Text>מקוריות: {historyData.mkoriut_nm}</Text>
          </View>
        )}

        <Text style={{ margin: 10, fontWeight: 'bold' }}>תג נכה</Text>

        {!certificateData ? (
          <Text>מספר רכב שהוזן אינו קיים במאגר</Text>
        ) : (
          <View>
            <Text>סוג תו: {certificateData.records}</Text>
          </View>
        )} */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    alignSelf: "center",
  },
  rightText: {
    textAlign: "right",
    textAlignVertical: "center", //Centered vertically
    backgroundColor: "#f9f9f9",
    fontSize: 17,
    height: 50,
    width: 400,
    paddingRight: 15,
  },
  darkRow: {
    backgroundColor: "#E0E0E0",
  },
});
