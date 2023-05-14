const dataFields = [
  { label: 'מידע כללי', value: '', isHeader: true },
  { label: 'מספר רכב', value: data.mispar_rechev, dark: true },
  { label: 'שם תוצר', value: data.tozeret_nm },
  { label: 'כינוי מסחרי', value: data.kinuy_mishari, dark: true },
  { label: 'רמת גימור', value: data.ramat_gimur },
  { label: 'שנת ייצור', value: data.shnat_yitzur, dark: true },
  { label: 'צבע הרכב', value: data.tzeva_rechev },
  { label: 'סוג דגם (פרטי/מסחרי)', value: data.sug_degem, dark: true },
  { label: 'תאריך מבחן רכב (טסט)', value: data.mivchan_acharon_dt },
  { label: 'תוקף רישיון רכב', value: data.tokef_dt, dark: true },
  { label: 'מועד עליה לכביש', value: data.moed_aliya_lakvish },
  { label: 'סוג בעלות', value: data.baalut, dark: true },
  { label: 'מספר צבע', value: data.tzeva_cd },
  { label: 'רמת אבזור בטחוני', value: data.baalut, dark: true },

  { label: 'נתוני מנוע', value: '', isHeader: true },
  { label: 'קוד תוצר', value: data.tozeret_cd, dark: true },
  { label: 'דגם מנוע', value: data.degem_manoa },
  { label: 'קוד דגם', value: data.degem_cd, dark: true },
  { label: 'שם דגם', value: data.degem_nm },
  { label: 'קבוצת זיהום', value: data.kvutzat_zihum, dark: true },
  { label: 'מידות צמיד קדמי', value: data.zmig_kidmi },
  { label: 'מידות צמיד אחורי', value: data.zmig_ahori, dark: true },
  { label: 'סוג דלק', value: data.sug_delek_nm },
  { label: 'מספר הוראת רישום', value: data.horaat_rishum, dark: true },
  { label: 'מספר שילדה', value: data.misgeret },

  { label: 'תג נכה', value: '', isHeader: true },
];

export { dataFields };
