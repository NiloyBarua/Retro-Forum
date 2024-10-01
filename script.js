const loadCardData = (searchBarValue) => {
   
    fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchBarValue}`)
        .then(res => res.json())
        .then(data => displayCardData(data.posts))

}

const displayCardData = (posts) => {
    for (const post of posts) {
        console.log(post)
        const cardContainer = document.getElementById('card-container')
        const createDiv = document.createElement('section')
        createDiv.innerHTML =
            `
     <div>
                <div class="card card-side text-black bg-slate-200 border p-8 shadow-xl">
                    <figure>
                        <img class = "h-20 w-20" src=${post.image}
                            alt="Movie" />
                        
                    </figure>
                    <div class="card-body">
                        <div class="flex">
                            <p># <span>${post.category}</span></p>
                            <p>Author: <span>${post.author.name}</span></p>
                        </div>
                        <h2 class="card-title font-bold text-2xl">${post.title}</h2>
                        <p class="text-lg">${post.description}</p>
                        
                        <hr>

                      
                       <div class="flex justify-between">
                        <div class="flex gap-10 justify-start mt-6">
                            <div class="flex gap-3">
                                <img class="w-8 h-8 " src="./images/icons8-message-50.png" alt="">
                                <p class="text-xl">${post.comment_count}</p>
                            </div>
                            <div class="flex gap-3">
                                <img class="w-8 h-8 " src="./images/icons8-eye-50 (1).png" alt="">
                                <p class="text-xl">${post.view_count}</p>
                            </div>
                            <div class="flex gap-3">
                                <img class="w-8 h-8 " src="./images/icons8-clock-50.png" alt="">
                                <p class="text-xl"><span>${post.posted_time}</span> min</p>
                            </div>
                        </div>

                        <div  class="mt-6">
                            <img  onclick="clickToTitle('${post.title}','${post.view_count}')"  class="w-12 h-12" src="./images/icons8-gmail-50.png" alt="">
                        </div>
                       </div>
                        
                    </div>
                </div>
            </div>
            <br><br>
    `
        cardContainer.appendChild(createDiv)
    }
}


const clickToTitle = (title, view) => {
    const titleContainer = document.getElementById('title-container');
    const createDiv = document.createElement('div');

    createDiv.innerHTML =
        `     <div  class="flex justify-between px-6  text-black mt-5  bg-slate-200 border">
                    <h1 class="text-sm w-32">${title}</h1>
                    <div class = 'flex'>
                    <img class="w-8 h-8 " src="./images/icons8-eye-50 (1).png" alt="">
                     <p class="text-xl">${view}</p>
                    </div>
                </div>

    `;
    
    
    titleContainer.appendChild(createDiv);
    const elementCount = document.getElementById('title-container');
    const count = (elementCount.childElementCount) - 2 ;
    const countNumber = document.getElementById('title-length');
    countNumber.innerText = count;
   
}


const loadLatestPosts = () => {
    fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    .then(res => res.json())
    .then(data => displayLatestPosts(data))
}
const displayLatestPosts = (posts) => {
  for (const post of posts) {
    console.log(post);
    
    const LatestPostsCardContainer = document.getElementById('latest-post-card-container');
    const createDiv = document.createElement('div');
    let datePosted = post.author.posted_date;
    if (datePosted === undefined) {
        datePosted = "No Publish Date"
    }
 
    createDiv.innerHTML = 
    `
    <div class="card bg-white text-black border w-96 shadow-xl">
                    <figure>
                        <img class="px-5 py-4"
                            src=${post.cover_image}
                            alt="Shoes" />
                    </figure>
                    <div class="card-body">
                        <p class="flex gap-4"><img class="w-8 h-8" src="./images/icons8-calendar-50.png" alt=""><span
                                class="text-xl">${datePosted}</span></p>
                        <h2 class="card-title">${post.title}</h2>
                        <p>${post.description}</p>

                        <div class="flex items-center gap-6">
                            <div>
                                <img class= "w-10 h-10 rounded-full" src=${post.profile_image} alt="">
                            </div>
                            <div>
                                <p class = "font-bold">${post.author.name}</p>
                                <h3>${post.author.designation}</h3>
                            </div>
                        </div>
                    </div>
                </div>
    `;
    LatestPostsCardContainer.appendChild(createDiv);
  }
}

const searchButton = () => {
    const inputSearch = document.getElementById('search-input');
    const searchBarValue = inputSearch.value;
    loadCardData(searchBarValue);
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ` `;
}

loadCardData()
loadLatestPosts()
