// Theme Toggle with LocalStorage Support
const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggleBtn.textContent = '☀️ Light Mode';
} else {
    themeToggleBtn.textContent = '🌙 Dark Mode';
}

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    let theme = 'light';
    if (document.body.classList.contains('dark-mode')) {
        theme = 'dark';
        themeToggleBtn.textContent = '☀️ Light Mode';
    } else {
        themeToggleBtn.textContent = '🌙 Dark Mode';
    }
    localStorage.setItem('theme', theme);
});

// Blog Data (Simulated)
const blogData = [
    { title: 'Blog Post 1', date: '12th Sep, 2023', category: 'Technology', img: 'blog1.jpg' },
    { title: 'Blog Post 2', date: '15th Sep, 2023', category: 'Science', img: 'blog2.jpg' },
    { title: 'Blog Post 3', date: '20th Sep, 2023', category: 'Design', img: 'blog3.jpg' },
    { title: 'Blog Post 4', date: '22nd Sep, 2023', category: 'Programming', img: 'blog4.jpg' },
    { title: 'Blog Post 5', date: '25th Sep, 2023', category: 'AI', img: 'blog5.jpg' },
    { title: 'Blog Post 6', date: '30th Sep, 2023', category: 'VR', img: 'blog6.jpg' }
];

const recentBlogsContainer = document.getElementById('recent-blogs');
const allBlogsContainer = document.getElementById('all-blogs');
const pageInfo = document.getElementById('page-info');
let currentPage = 1;
const postsPerPage = 2;

// Display Recent Blogs
function renderRecentBlogs() {
    recentBlogsContainer.innerHTML = '';
    blogData.slice(0, 3).forEach(blog => {
        const blogElement = document.createElement('article');
        blogElement.classList.add('blog-post');
        blogElement.innerHTML = `
            <img src="${blog.img}" alt="${blog.title}">
            <h3>${blog.title}</h3>
            <p>Posted on <span>${blog.date}</span> in <span>${blog.category}</span></p>
        `;
        recentBlogsContainer.appendChild(blogElement);
    });
}

// Paginated Blog Rendering
function renderBlogPosts(page = 1) {
    allBlogsContainer.innerHTML = '';
    const start = (page - 1) * postsPerPage;
    const end = start + postsPerPage;
    const paginatedBlogs = blogData.slice(start, end);

    paginatedBlogs.forEach(blog => {
        const blogElement = document.createElement('article');
        blogElement.classList.add('blog-post');
        blogElement.innerHTML = `
            <img src="${blog.img}" alt="${blog.title}">
            <h3>${blog.title}</h3>
            <p>Posted on <span>${blog.date}</span> in <span>${blog.category}</span></p>
        `;
        allBlogsContainer.appendChild(blogElement);
    });

    pageInfo.textContent = `Page ${page}`;
}

// Pagination Controls
document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderBlogPosts(currentPage);
        document.getElementById('next-page').disabled = false;
    }
    if (currentPage === 1) {
        document.getElementById('prev-page').disabled = true;
    }
});

document.getElementById('next-page').addEventListener('click', () => {
    if (currentPage < Math.ceil(blogData.length / postsPerPage)) {
        currentPage++;
        renderBlogPosts(currentPage);
        document.getElementById('prev-page').disabled = false;
    }
    if (currentPage === Math.ceil(blogData.length / postsPerPage)) {
        document.getElementById('next-page').disabled = true;
    }
});

// Initial Page Load
renderRecentBlogs();
renderBlogPosts();
