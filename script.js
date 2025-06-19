// Dummy course data
const courses = [
  {
    id: 'html-css',
    title: 'HTML & CSS',
    description: 'Learn how to build websites using HTML and CSS.',
    videoUrl: 'https://www.youtube.com/embed/UB1O30fR-EE'
  },
  {
    id: 'javascript',
    title: 'JavaScript Basics',
    description: 'Understand JS fundamentals for dynamic web apps.',
    videoUrl: 'https://www.youtube.com/embed/hdI2bqOjy3c'
  },
];

// Load courses on courses.html
if (document.getElementById('courseList')) {
  const courseList = document.getElementById('courseList');
  const searchInput = document.getElementById('searchInput');

  function renderCourses(filter = '') {
    courseList.innerHTML = '';
    const filteredCourses = courses.filter(course =>
      course.title.toLowerCase().includes(filter.toLowerCase())
    );
    filteredCourses.forEach(course => {
      const article = document.createElement('article');
      article.innerHTML = `
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <a href="course-detail.html?id=${course.id}">View Course</a>
      `;
      courseList.appendChild(article);
    });
  }

  renderCourses();

  searchInput.addEventListener('input', () => {
    renderCourses(searchInput.value);
  });
}

// Course detail page
if (window.location.href.includes('course-detail.html')) {
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get('id');
  const course = courses.find(c => c.id === courseId);

  if (course) {
    document.getElementById('courseTitle').innerText = course.title;
    document.getElementById('videoContainer').innerHTML = `
      <iframe width="560" height="315" src="${course.videoUrl}" frameborder="0" allowfullscreen></iframe>
    `;

    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

    function loadProgress() {
      const progress = localStorage.getItem(`progress-${courseId}`) || 0;
      progressBar.value = progress;
      progressText.innerText = `${progress}% Completed`;
    }

    window.updateProgress = function () {
      let current = parseInt(localStorage.getItem(`progress-${courseId}`)) || 0;
      current = Math.min(current + 10, 100);
      localStorage.setItem(`progress-${courseId}`, current);
      loadProgress();
    };

    loadProgress();
  }
}
