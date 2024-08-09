let currentPage = 1;
let currentPageSize = 10;
let currentSortOrder = '-published_at';

const fetchPosts = async (pageNumber, pageSize, sortOrder) => {
    const response = await fetch(`https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${pageNumber}&page[size]=${pageSize}&append[]=small_image&append[]=medium_image&sort=${sortOrder}`);
    const data = await response.json();
    return data;
};

const renderPosts = (posts) => {
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';
    posts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${post.small_image}" alt="${post.title}">
            <div class="card-content">
                <h2 class="card-title">${post.title}</h2>
            </div>
        `;
        postList.appendChild(card);
    });
};

const updatePosts = async () => {
    const data = await fetchPosts(currentPage, currentPageSize, currentSortOrder);
    renderPosts(data.ideas);
};

document.getElementById('sort-select').addEventListener('change', (event) => {
    currentSortOrder = event.target.value;
    updatePosts();
});

document.getElementById('page-size-select').addEventListener('change', (event) => {
    currentPageSize = parseInt(event.target.value);
    updatePosts();
});

document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updatePosts();
    }
});

document.getElementById('next-page').addEventListener('click', () => {
    currentPage++;
    updatePosts();
});

// Initial fetch
updatePosts();
