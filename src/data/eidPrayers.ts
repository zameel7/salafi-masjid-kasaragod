export interface EidPrayerEntry {
  id: string;
  area: string;
  areaLocal: string;
  masjidId?: string;
  khateeb: string;
  time?: string;
}

export const eidInfo = {
  name: 'Eid ul Adha 2026',
  nameLocal: 'ഈദ്ഗാഹ്',
  subLocal: 'പെരുന്നാൾ നിസ്കാരം',
};

export const eidPrayers: EidPrayerEntry[] = [
  {
    id: 'noor-kunjathur',
    area: 'Kunjathur',
    areaLocal: 'നൂർ',
    masjidId: 'noor-kunjathur',
    khateeb: 'Anees Madani',
    time: '6:20 AM',
  },
  {
    id: 'sp-nagar',
    area: 'SP Nagar',
    areaLocal: 'എസ്‌പി നഗർ',
    masjidId: 'salafi-dawa-sp-nagar',
    khateeb: 'Mujeeb Swalahi',
    time: '7:00 AM',
  },
  {
    id: 'ksd-town',
    area: 'Kasaragod Town',
    areaLocal: 'ടൗൺ',
    masjidId: 'dawa-kasaragod-town',
    khateeb: 'Noufal Ottummal',
    time: '7:00 AM',
  },
  {
    id: 'uduma-padinjaar',
    area: 'Uduma Padinjaar',
    areaLocal: 'ഉദുമ പടിഞ്ഞാർ',
    masjidId: 'salafi-uduma-padinjaar',
    khateeb: 'Waris bin Sathar',
    time: '7:00 AM',
  },
  {
    id: 'perla',
    area: 'Perla',
    areaLocal: 'പെർള',
    masjidId: 'perla-salafi-juma',
    khateeb: 'Savad Salafi',
    time: '7:00 AM',
  },
  {
    id: 'mogral',
    area: 'Mogral',
    areaLocal: 'മൊഗ്രാൽ',
    masjidId: 'aysha-salafi-mogral',
    khateeb: 'Shihab Mogral',
    time: '7:15 AM',
  },
  {
    id: 'arikkady',
    area: 'Arikkady',
    areaLocal: 'ആരിക്കാടി',
    masjidId: 'al-ansar-arikkady',
    khateeb: 'Jazil Alhikami',
    time: '7:00 AM',
  },
  {
    id: 'bambrana',
    area: 'Bambrana',
    areaLocal: 'ബംബ്രാണ',
    masjidId: 'salafi-bambrana',
    khateeb: 'Hassan Salafi',
  },
  {
    id: 'bandiyod',
    area: 'Bandiyod',
    areaLocal: 'ബന്തിയോട്',
    masjidId: 'al-huda-bandiyod',
    khateeb: 'Shamaz Alhikami',
  },
  {
    id: 'bevincha',
    area: 'Bevincha',
    areaLocal: 'ബേവിഞ്ച',
    khateeb: 'Shameer Madani',
  },
  {
    id: 'bovikkanam',
    area: 'Bovikkanam',
    areaLocal: 'ബോവിക്കാനം',
    masjidId: 'salafi-juma-bovikkanam',
    khateeb: 'Aslam Madani',
  },
  {
    id: 'chowki',
    area: 'Chowki',
    areaLocal: 'ചൗക്കി',
    masjidId: 'salafi-chowki',
    khateeb: 'Musthafa Madani',
  },
  {
    id: 'kadambar',
    area: 'Kadambar',
    areaLocal: 'കടമ്പാർ',
    masjidId: 'darul-ilm-kadambar',
    khateeb: 'Ashiq Alhikami',
  },
  {
    id: 'kallakatta',
    area: 'Kallakatta',
    areaLocal: 'കല്ലകട്ട',
    masjidId: 'thaqwa-kallakatta',
    khateeb: 'Muhammed Ali Najmi',
  },
  {
    id: 'kanhangad',
    area: 'Kanhangad',
    areaLocal: 'കാഞ്ഞങ്ങാട്',
    masjidId: 'salafi-juma-kanhangad',
    khateeb: 'Muhajir Faroqi',
  },
  {
    id: 'melparamba',
    area: 'Melparamba',
    areaLocal: 'മേൽപറമ്പ്',
    masjidId: 'salafi-melparamba',
    khateeb: 'Asbak Alhikami',
  },
  {
    id: 'miyapadavu',
    area: 'Miyapadavu',
    areaLocal: 'മിയാപദവ്',
    masjidId: 'miyapadavu-salafi',
    khateeb: 'Usthad',
  },
  {
    id: 'mugu-road',
    area: 'Mugu Road',
    areaLocal: 'മുഗു റോഡ്',
    masjidId: 'salafi-mugu-road',
    khateeb: 'Ashraf Manya',
  },
  {
    id: 'neerchal',
    area: 'Neerchal',
    areaLocal: 'നീർച്ചാൽ',
    masjidId: 'neerchal-salafi',
    khateeb: 'Anas Paivalike',
  },
  {
    id: 'orimukku',
    area: 'Orimukku',
    areaLocal: 'ഓരിമുക്ക്',
    masjidId: 'salafi-orimukku',
    khateeb: 'Muneer Sharafi',
  },
  {
    id: 'paivalike',
    area: 'Paivalike',
    areaLocal: 'പൈവളികെ',
    masjidId: 'salafi-paivalike',
    khateeb: 'Ansar Arikady',
  },
  {
    id: 'patla',
    area: 'Patla',
    areaLocal: 'പട്ല',
    masjidId: 'salafi-juma-patla',
    khateeb: 'Shakeer Salafi',
  },
  {
    id: 'perumbatta',
    area: 'Perumbatta',
    areaLocal: 'പെരുമ്പട്ട',
    masjidId: 'salafi-kannamthodi-perumbatta',
    khateeb: 'Yasar Alhikami',
  },
  {
    id: 'uppala',
    area: 'Uppala',
    areaLocal: 'ഉപ്പള',
    masjidId: 'uppala-salafi-juma',
    khateeb: 'Rafeeq Moulavi',
  },
];
