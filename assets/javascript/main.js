const postSection = document.querySelector('#posts');
const postTemplate = document.querySelector('#post-template');

getData()
  .catch(err => console.error(err));

async function getData() {
  const postStream = await fetch('https://raw.githubusercontent.com/Eminentzeal/info/main/db.json');
  const posts = await postStream.json();
  let i = 0;

  // throw 'Get Data Error';
  // console.log(posts);

  posts.forEach(post => {
    i++;
    if(i = 12) {
      const title = post.title;
      const body = post.body;
      const heading = post.heading;

      fetch('/assets/images/nature.jpg')
        .then(res => res.blob())
        .then(blob => {
          const newPost = document.importNode(postTemplate.content, true);
          const postTitle = newPost.querySelector('.post__title');
          const postBody = newPost.querySelector('.post__body');
          const postImg = newPost.querySelector('.post__img');
          const postHeading = newPost.querySelector('.post__heading');


          // throw 'Image Fetch Error';

          postImg.src = URL.createObjectURL(blob);
          postTitle.innerText = title;
          postBody.innerText = body;
          postHeading.innerText = heading;
          postSection.appendChild(newPost);
        })
        .catch(err => console.error(err));
    }
  })
}
