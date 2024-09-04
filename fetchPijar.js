// Define the API URL
const apiUrl =
  "https://course-services.pijarmahir.id/api/course/v2/content/4863?";

// Make a GET request
fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

const fetchContent = async (id) => {
  const apiUrl = `https://course-services.pijarmahir.id/api/course/v2/content/${id}?`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

router.get("/content", async (req, res) => {
  const db = getDb();
  const col = db.collection("courses");

  const result = await col
    .find({})
    .project({ id: 1, _id: 0 })
    .skip(300)
    .toArray();

  for (let i = 0; i < result.length; i++) {
    rs = await fetchContent(result[i].id);
    updatedRs = rs.data.map((item) => {
      const { _id, ...rest } = item;
      return rest;
    });
    r = await db.collection("course-contents").insertMany(updatedRs);
  }
  res.json(rs.data);
});

const fetchContent2 = async (id) => {
  const apiUrl = `https://course-services.pijarmahir.id/api/rating/v2/course/${id}?limit=900&page=1`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

router.get("/review", async (req, res) => {
  const db = getDb();
  const col = db.collection("courses");

  const result = await col
    .find({})
    .project({ id: 1, _id: 0 })
    .skip(300)
    .toArray();

  for (let i = 0; i < result.length; i++) {
    rs = await fetchContent2(result[i].id);
    updatedRs = rs.data.map((item) => {
      const { _id, ...rest } = item;
      return rest;
    });
    r = await db.collection("course-contents").insertMany(updatedRs);
  }
  res.json(rs.data);
});
