// Öğrenci (kayıt) işlemleri için kullanılan servis
const postAPI = async (
  URL,
  body,
  method = "POST",
  headers = { "Content-Type": "application/json" }
) => {
  try {
    if (!process.env.NEXT_PUBLIC_API_URL || !URL) {
      throw new Error("URL bulunamadı!");
    }
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL + URL}`, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
      cache: "no-store",
      // cache önemli! her çalıştığında cache'deki veri yerine -> güncel veriyi almasını sağlar.
      // bu olmaz ise güncel veriyi almayabiliyor dikkat et.
      // Dinamik sayfalarda burası kullanılıyorsa o sayfalara -> export const dynamic = 'force-dynamic' ekle!
    })
    .then((res) => {
      return res.json()
    })
    .catch((err) => console.log(err));
 
    return data;
  } catch (err) {
    throw new Error(`API request failed: ${err}`);
  }
};


const getAPI = async (
  URL,
  headers = { "Content-Type": "application/json" }
) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL + URL}`, {
    method: "GET",
    headers: headers,
    cache: "no-store",
  })
    .then((res) => {
     return res.json()
    })
    .catch((err) => console.log(err));

  return data;
};

export { postAPI, getAPI };
