const postSection = document.querySelector('#posts');
const postTemplate = document.querySelector('#post-template');

getData()
  .catch(err => console.error(err));

async function getData() {
  const postStream = await fetch('/assets/json/info.json');
  const posts = await postStream.json();
  let i = 0;

  // throw 'Get Data Error';
  // console.log(posts);

  posts.forEach(post => {
    i++;
    if(i = 12) {
      const title = post.title;
      const body = post.body;
      const hobbies = post.hobbies

      fetch('https://unsplash.it/300/200')
        .then(res => res.blob())
        .then(blob => {
          const newPost = document.importNode(postTemplate.content, true);
          const postTitle = newPost.querySelector('.post__title');
          const postBody = newPost.querySelector('.post__body');
          const postImg = newPost.querySelector('.post__img');
          const postHobbies = newPost.querySelector('.post__hobbies');


          // throw 'Image Fetch Error';

          postImg.src = URL.createObjectURL(blob);
          postTitle.innerText = title;
          postBody.innerText = body;
          postHobbies.innerText = hobbies;
          postSection.appendChild(newPost);
        })
        .catch(err => console.error(err));
    }
  })
}
