import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import urls from '../api/urls';
import { StatusBar } from 'expo-status-bar';

const InfoScreen = ({ route }) => {
  // Car number plate number from HomeScreen
  const { numberPlate } = route.params;
  // General data for car numberplate
  const [data, setData] = useState('');
  // History data for car numberplate
  const [historyData, setHistoryData] = useState('');
  // Disabled certificate  for car numberplate
  const [certificateData, setCertificateData] = useState('');

  // Get phone height for activity indicator center horizontally
  const screenHeight = Dimensions.get('window').height;

  // Loading data for activity indicator
  const [loading, setLoading] = useState(false);

  const [labels, setLabels] = useState([
    { label: 'מידע כללי', value: '', isHeader: true },
    { label: 'מספר רכב', value: '', dark: true },
    { label: 'שם תוצר', value: '' },
    { label: 'כינוי מסחרי', value: '', dark: true },
    { label: 'רמת גימור', value: '' },
    { label: 'שנת ייצור', value: '', dark: true },
    { label: 'צבע הרכב', value: '' },
    { label: 'סוג דגם (פרטי/מסחרי)', value: '', dark: true },
    { label: 'תאריך מבחן רכב (טסט)', value: '' },
    { label: 'תוקף רישיון רכב', value: '', dark: true },
    { label: 'מועד עליה לכביש', value: '' },
    { label: 'סוג בעלות', value: '', dark: true },
    { label: 'מספר צבע', value: '' },
    { label: 'רמת אבזור בטחוני', value: '', dark: true },

    { label: 'נתוני מנוע', value: '', isHeader: true },
    { label: 'קוד תוצר', value: '', dark: true },
    { label: 'דגם מנוע', value: '' },
    { label: 'קוד דגם', value: '', dark: true },
    { label: 'שם דגם', value: '' },
    { label: 'קבוצת זיהום', value: '', dark: true },
    { label: 'מידות צמיד קדמי', value: '' },
    { label: 'מידות צמיד אחורי', value: '', dark: true },
    { label: 'סוג דלק', value: '' },
    { label: 'מספר הוראת רישום', value: '', dark: true },
    { label: 'מספר שילדה', value: '' },

    { label: 'תג נכה', value: '', isHeader: true },
  ]);

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
      if (typeof serverData.result !== 'undefined') {
        setData(serverData.result.records[0]);
      }
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

  // create labels based on the loaded data
  const createLabels = async () => {
    const newLabels = [
      { label: 'מידע כללי', value: '', isHeader: true },
      { label: 'מספר רכב', value: data ? data.mispar_rechev : '', dark: true },
      { label: 'שם תוצר', value: data ? data.tozeret_nm : '' },
      {
        label: 'כינוי מסחרי',
        value: data ? data.kinuy_mishari : '',
        dark: true,
      },
      { label: 'רמת גימור', value: data ? data.ramat_gimur : '' },
      { label: 'שנת ייצור', value: data ? data.shnat_yitzur : '', dark: true },
      { label: 'צבע הרכב', value: data ? data.tzeva_rechev : '' },
      {
        label: 'סוג דגם (פרטי/מסחרי)',
        value: data ? data.sug_degem : '',
        dark: true,
      },
      {
        label: 'תאריך מבחן רכב (טסט)',
        value: data ? data.mivchan_acharon_dt : '',
      },
      {
        label: 'תוקף רישיון רכב',
        value: data ? data.tokef_dt : '',
        dark: true,
      },
      { label: 'מועד עליה לכביש', value: data ? data.moed_aliya_lakvish : '' },
      { label: 'סוג בעלות', value: data ? data.baalut : '', dark: true },
      { label: 'מספר צבע', value: data ? data.tzeva_cd : '' },
      { label: 'רמת אבזור בטחוני', value: data ? data.baalut : '', dark: true },

      { label: 'נתוני מנוע', value: '', isHeader: true },
      { label: 'קוד תוצר', value: data ? data.tozeret_cd : '', dark: true },
      { label: 'דגם מנוע', value: data ? data.degem_manoa : '' },
      { label: 'קוד דגם', value: data ? data.degem_cd : '', dark: true },
      { label: 'שם דגם', value: data ? data.degem_nm : '' },
      {
        label: 'קבוצת זיהום',
        value: data ? data.kvutzat_zihum : '',
        dark: true,
      },
      { label: 'מידות צמיד קדמי', value: data ? data.zmig_kidmi : '' },
      {
        label: 'מידות צמיד אחורי',
        value: data ? data.zmig_ahori : '',
        dark: true,
      },
      { label: 'סוג דלק', value: data ? data.sug_delek_nm : '' },
      {
        label: 'מספר הוראת רישום',
        value: data ? data.horaat_rishum : '',
        dark: true,
      },
      { label: 'מספר שילדה', value: data ? data.misgeret : '' },

      { label: 'תו נכה', value: '', isHeader: true },
    ];
    setLabels(newLabels);
    // console.log(
    //   'New labels are:',
    //   labels.map((obj) => JSON.stringify(obj))
    // );
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
  useEffect(() => {
    createLabels();
  }, [data]);

  // Format date
  const formatData = (message) => {
    let year = message.substring(0, 4);
    let month = message.substring(4, 6);
    let day = message.substring(6, 8);
    return year + '-' + month + '-' + day;
  };

  // Handle error to fix bug that error appears before data

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4511e" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#f4511e"
            style={{
              marginTop: screenHeight / 2 - 20,
            }}
          />
        ) : !data ? (
          <View style={{ marginTop: 60 }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                textAlign: 'center',
                marginTop: 100,
              }}
            >
              מספר הרכב שהוזן לא נמצא במאגר
            </Text>
          </View>
        ) : (
          <View>
            {labels.map((field, index) => (
              <Text
                key={index}
                style={[
                  styles.rightText,
                  field.isHeader && {
                    margin: 10,
                    fontWeight: 'bold',
                    fontSize: 25,
                  },
                  field.dark && styles.darkRow,
                ]}
              >
                {`${field.label}: ${field.value ? field.value : ''}`}
              </Text>
            ))}

            {!certificateData ? (
              <Text style={[styles.rightText, styles.darkRow]}>
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
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
  },
  rightText: {
    textAlign: 'right',
    textAlignVertical: 'center', //Centered vertically
    fontSize: 17,
    height: 50,
    paddingRight: 15,
  },
  darkRow: {
    backgroundColor: '#E0E0E0',
  },
});
