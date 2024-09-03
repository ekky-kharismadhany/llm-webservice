export const fewShotSqlExample = [
  {
    input: "Daftar seluruh tempat wisata",
    query: "SELECT places.name AS place_name, latitude, longitude, city, province FROM places",
  },
  {
    input: "Daftar seluruh tempat wisata yang ada di kota Jakarta Utara",
    query:
      "SELECT places.name AS place_name, latitude, longitude, city, province FROM places WHERE city = 'Jakarta Utara'",
  },
  {
    input:
      "Daftar seluruh tempat wisata yang ada di provinsi Daerah Khusus Jakarta",
    query:
      "SELECT places.name AS place_name, latitude, longitude, city, province FROM places WHERE province = 'Daerah Khusus Jakarta'",
  },
  {
    input: "Daftar taman yang ada di Jakarta",
    query:
      "SELECT places.name AS place_name, latitude, longitude, city, province FROM places WHERE LOWER(name) like '%taman%' AND LOWER(province) LIKE '%jakarta%'",
  },
  {
    input: "Jumlah taman yang ada di Jakarta",
    query:
      "SELECT COUNT(uuid) FROM places WHERE LOWER(name) like '%taman%' AND LOWER(province) LIKE '%jakarta%'",
  },
  {
    input: "Mall atau pusat perbelanjaan di Jakarta",
    query: `SELECT places.name AS place_name, province, place_types."name" FROM places INNER JOIN place_types ON places.places_types_id = place_types.id where places.places_types_id = 1 AND LOWER(province) LIKE '%jakarta%' LIMIT 5`,
  },
  {
    input: "Rumah Sakit atau Rumah Sehat yang ada di Jakarta",
    query: `SELECT places.name AS place_name, province, place_types."name" FROM places INNER JOIN place_types ON places.places_types_id = place_types.id where places.places_types_id = 2 AND LOWER(province) LIKE '%jakarta%' LIMIT 5`,
  },
  {
    input: "Tempat Belanja atau pusat perbelanjaan di Jakarta",
    query: `SELECT places.name AS place_name, province, place_types."name" FROM places INNER JOIN place_types ON places.places_types_id = place_types.id where places.places_types_id = 3 AND LOWER(province) LIKE '%jakarta%' LIMIT 5`,
  },
  {
    input: "Mall atau pusat perbelanjaan di Jakarta Selatan",
    query: `SELECT places.name AS place_name, province, place_types."name" FROM places INNER JOIN place_types ON places.places_types_id = place_types.id where places.places_types_id = 1 AND LOWER(city) LIKE '%jakarta selatan%' LIMIT 5`,
  },
  {
    input: "Rumah Sakit atau Rumah Sehat yang ada di Jakarta Pusat",
    query: `SELECT places.name AS place_name, province, place_types."name" FROM places INNER JOIN place_types ON places.places_types_id = place_types.id where places.places_types_id = 2 AND LOWER(city) LIKE '%jakarta pusat%' LIMIT 5`,
  },
  {
    input: "Tempat Belanja atau pusat perbelanjaan di Jakarta Timur",
    query: `SELECT places.name AS place_name, province, place_types."name" FROM places INNER JOIN place_types ON places.places_types_id = place_types.id where places.places_types_id = 3 AND LOWER(city) LIKE '%jakarta timur%' LIMIT 5`,
  },
];

export const fewShotPrompTempate = `
    You are an postgresql expert.
    Given an input question, create a syntactically correct postgresql query to run.
    Unless otherwise specified, do not return more than {top_k} rows.
    Here is the relevant table info: {table_info}.
    Below are a number of examples of question and their correspoding SQL queries.
    The given answer should only contains SQL query with no other word or sentences.
    The question example is in Bahasa Indonesia.
`;

export const answerPromptTemplate = `
    Kamu adalah Bebi, agen virtual PT Blue Bird Tbk.
    Jawablah pertanyaan berikut {question} menggunakan informasi dari {result}.
    Apabila informasi yang diterima banyak. Tolong singkat informasi tersebut.
    Jangan jawab apapun apabila informasi yang kamu dapat tidak ada.
    Jawablah pertanyaan pengguna dengan ramah dan lugas.
`;
