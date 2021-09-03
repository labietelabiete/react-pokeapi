import axios from "axios";

async function getPagination(page) {
  let promise = new Promise((resolve, reject) => {
    axios
      .get(page)
      .then(function ({ data }) {
        resolve(data);
      })
      .catch(function (error) {
        resolve(error);
      });
  });
  return await promise;
}

export { getPagination };
