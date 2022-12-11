import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import urls from "../api/urls";

const InfoScreen = ({ route, navigation }) => {
  // Car number plate number from HomeScreen
  const { numberPlate } = route.params;
  // General data for car numberplate
  const [data, setData] = useState("");

  // History data for car numberplate
  // const [historyData, setHistoryData] = useState('');

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

  const getHistoryDataForNumberPlate = async () => {
    try {
      const response = await fetch(
        urls.searchHistoryCarInfoByNumberPlate(numberPlate),
        {
          method: "GET",
        }
      );
      const serverData = await response.json();
      setHistoryData(serverData.result.records[0]);
    } catch (error) {
      console.error(error);
    } finally {
      //setLoading(false);
    }
  };

  useEffect(() => {
    getDataForNumberPlate();
    // getHistoryDataForNumberPlate();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={{ margin: 10, fontWeight: "bold" }}>מידע כללי</Text>
        <Text>
          {!data ? (
            <Text>מספר רכב שהוזן אינו קיים במאגר</Text>
          ) : (
            <View style={{ textAlign: "right" }}>
              <Text>מספר רכב: {data.mispar_rechev}</Text>
              <Text>כינוי מסחרי: {data.kinuy_mishari}</Text>
              <Text>שם תוצר: {data.tozeret_nm} </Text>
              <Text>קוד תוצר: {data.tozeret_cd}</Text>
              <Text>סוג דגם (פרטי/מסחרי): {data.sug_degem}</Text>
              <Text>קוד דגם: {data.degem_cd}</Text>
              <Text>שם דגם: {data.degem_nm}</Text>
              <Text>רמת גימור: {data.ramat_gimur}</Text>
              <Text>רמת אבזור בטיחותי: {data.ramat_eivzur_betihuty}</Text>
              <Text>קבוצת זיהום: {data.kvutzat_zihum}</Text>
              <Text>שנת ייצור: {data.shnat_yitzur}</Text>
              <Text>דגם מנוע: {data.degem_manoa}</Text>
              <Text>תאריך מבחן רכב (טסט): {data.mivchan_acharon_dt}</Text>
              <Text>תוקף רישיון רכב: {data.tokef_dt}</Text>
              <Text>סוג בעלות: {data.baalut}</Text>
              <Text>מספר שילדה: {data.misgeret}</Text>
              <Text>מספר צבע: {data.tzeva_cd}</Text>
              <Text>צבע רכב: {data.tzeva_rechev}</Text>
              <Text>מידות צמיד קדמי: {data.zmig_kidmi}</Text>
              <Text>מידות צמיד אחורי: {data.zmig_ahori}</Text>
              <Text>סוג דלק: {data.sug_delek_nm}</Text>
              <Text>מספר הוראת רישום: {data.horaat_rishum}</Text>
              <Text>מועד עליה לכביש: {data.moed_aliya_lakvish}</Text>
            </View>
          )}
        </Text>

        {/* 
        <Text style={{ margin: 10, fontWeight: 'bold' }}>היסטוריית רכב</Text>

        <Text>ספר מנוע: {historyData.mispar_manoa}</Text>
        <Text>
          נסועה כפי שדווח במועד הטסט האחרון: {historyData.kilometer_test_aharon}{' '}
          ק"מ{' '}
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
        <Text>מקוריות: {historyData.mkoriut_nm}</Text> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    justifyContent: "space-between",
    marginHorizontal: 3,
    marginVertical: 5,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});
