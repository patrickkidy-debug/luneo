const UNSPLASH = "https://images.unsplash.com";

function photo(id: string, width = 800, quality = 75) {
  return `${UNSPLASH}/${id}?w=${width}&q=${quality}&auto=format&fit=crop`;
}

export const images = {
  heroLifestyle: photo("photo-1760552069014-78ff72ee7cac", 1200),
  storeInterior: photo("photo-1759910546804-68fd991aceac", 1200),
  eyeExam: photo("photo-1639945314222-60223e6cd32b", 1200),
  framesDisplay: photo("photo-1732674041928-925bb72c14f0", 1600),

  categoryVue: photo("photo-1608539733377-5557e02926b5"),
  categorySoleil: photo("photo-1611222777277-61319d63ca94"),
  categoryVerres: photo("photo-1517948430535-1e2469d314fe"),
  categoryAccessoires: photo("photo-1664648577389-d48c81657d52"),
  categoryServices: photo("photo-1542432389-a40026383873"),

  frameRoundBlack: photo("photo-1686165862816-ed104011f9a9"),
  frameRoundClear: photo("photo-1591843336309-cbf414ad7978"),
  frameSquareDark: photo("photo-1686165863154-b8f9d69add82"),
  framePremium: photo("photo-1615468822882-4828d2602857"),
  frameClearRound: photo("photo-1634046873488-4c088fd62ed3"),
  frameCatEye: photo("photo-1729474916002-f81cff963183"),

  sunglassesSport: photo("photo-1711223499758-8aef018b720e"),
  sunglassesFlatlay: photo("photo-1588768897961-332c50c55d18"),
  sunglassesWhite: photo("photo-1689660532312-4839eb3a6768"),
  sunglassesColorful: photo("photo-1647895078643-45fbee45d51f"),

  lensCare: photo("photo-1632054227742-67e0e23595b0"),
  cleaningCloth: photo("photo-1741253689523-68ff10ed8b56"),
  glassesCase: photo("photo-1762718900539-c51799fd71b3"),
  glassesFlatlay: photo("photo-1586806828699-f06085feb6c5"),

  serviceFitting: photo("photo-1486250944723-86bca2b15b06"),
  serviceAdvice: photo("photo-1667964394328-78f6389e79ab"),
  serviceAdjust: photo("photo-1616052286111-4bc3dd04ad29"),
} as const;
