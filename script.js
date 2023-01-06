// this is for input elements
// text box
const textbox = document.getElementById("txt");
//button
const mybutton = document.getElementById("btn");

// this is for output elements
// this is for image
const Iimage = document.getElementById("image");
// this is for name
const Iname = document.getElementById("name");
// this is for blog
const Iblog = document.getElementById("blog");
// this is for location
const Ilocation = document.getElementById("location");
// this is for bio
const Ibio = document.getElementById("bio");
// this is for type of the request if it is local storage or HTTP request
const Itype = document.getElementById("type");
// this is for footer to showing the message
const Ifooter = document.getElementById("myFooter");
// this is for holding url
const Iurl = "https://api.github.com/users/";

// checking that if input is not null and see if we have it is local storage or not
const testInput = () => {
  if (textbox.value.length > 0) {
    if (JSON.parse(localStorage.getItem(textbox.value))) {
      //  we can retrieve objects from local storage with the JSON.parse method
      result = JSON.parse(localStorage.getItem(textbox.value));
      showData(
        result.name,
        result.blog,
        result.location,
        result.bio,
        result.avatar_url,
        "Local Storage",
        "lightskyblue"
      );
    } else {
      result = Iurl.concat(textbox.value);
      getData(result);
    }
  }

  // if input was empty
  else {
    showData(
      null,
      null,
      null,
      null,
      null,
      "input text can not be empty!!! ",
      "red"
    );
  }
};

// checking if any of the input data was null or empty
const testOutput = (input) => {
  if (input == null || input == "") {
    return false;
  }
  return true;
};

// getting data with fech
const getData = (iurl) => {
  fetch(iurl)
    .then((response) => {
      console.log(response.status);
      // if it was user fault
      if (response.status >= 400 && response.status < 500) {
        text = response.status;
        throw new Error(text + " : wrong username !!!");
      }
      // if it was server fault
      if (response.status >= 500) {
        text = response.status;
        throw new Error(
          text + " : sorry GITHUB service is unavalable try later"
        );
      }
      return response.json();
    })
    .then((responseData) => {
      // we can store JavaScript objects in localStorage by
      // first converting them to strings with the JSON.stringify method
      console.log(responseData);

      localStorage.setItem(
        textbox.value,
        JSON.stringify({
          name: responseData.name,
          blog: responseData.blog,
          location: responseData.location,
          bio: responseData.bio,
          avatar_url: responseData.avatar_url,
        })
      );

      console.log("item added to local storage");
      // showing a data
      showData(
        responseData.name,
        responseData.blog,
        responseData.location,
        responseData.bio,
        responseData.avatar_url,
        "HTTP REQUEST",
        "lightskyblue"
      );
    })
    .catch((error) => {
      showData(null, null, null, null, null, error, "red");
    });
};

// this is for showing data
const showData = (name, blog, location, bio, avatar_url, type, color) => {
  Iimage.src = testOutput(avatar_url) ? avatar_url : "./account.png";
  Iname.innerHTML = testOutput(name) ? name : " ";
  Iblog.innerHTML = testOutput(blog) ? blog : " ";
  Ilocation.innerHTML = testOutput(location) ? location : " ";
  Ibio.innerHTML = testOutput(bio) ? bio : " ";
  Itype.innerHTML = type;
  Ifooter.style.backgroundColor = color;
};

mybutton.addEventListener("click", testInput);
