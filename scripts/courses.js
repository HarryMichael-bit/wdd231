// Course List Array

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

const grid = document.getElementById("courses");
const totalEl = document.getElementById("total-credits");
const btnAll = document.getElementById("filter-all");
const btnWdd = document.getElementById("filter-wdd");
const btnCse = document.getElementById("filter-cse");

function renderCourses(list) {
    if (!grid || !totalEl) return;
    grid.innerHTML = "";
    let total = 0;

    list.forEach(course => {
        total += course.credits;

        const card = document.createElement("article");
        card.className = `course-card${course.completed ? " completed" : ""}`;
        
        // Title (always visible)
        const title = document.createElement("h3");
        title.textContent = `${course.subject}: ${course.number}: ${course.title}`;
        title.classList.add("course-title");
        
        // Toggle button
        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Details";
        toggleBtn.className = "toggle-details";
        toggleBtn.setAttribute("aria-expanded", "false");

        // Hidden content
        const details = document.createElement("div");
        details.className = "course-details hidden";

        const meta = document.createElement("p");
        meta.textContent = `Credits: ${course.credits} • Certificate: ${course.certificate}`;

        const tech = document.createElement("p");
        tech.textContent = `Technologies: ${course.technology.join(",")}`;

        const desc = document.createElement("p");
        desc.textContent = course.description;

        details.append(meta, tech, desc);
        card.append(title, toggleBtn, details);
        grid.appendChild(card);

        // Toggle behavior
        toggleBtn.addEventListener("click", () => {
            const isVisible = details.classList.toggle("hidden");
            toggleBtn.setAttribute("aria-expanded", String(isVisible));
            toggleBtn.textContent = isVisible ? "Hide" : "Details";
        });
    });

    if (totalEl) totalEl.textContent = String(total);
}

function setActive(button) {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
}

function filterAll() {
    setActive(btnAll);
    renderCourses(courses);
}

function filterWdd() {
    setActive(btnWdd);
    renderCourses(courses.filter(c => c.subject === "WDD"));
}

function filterCse() {
    setActive(btnCse);
    renderCourses(courses.filter(c => c.subject === "CSE"));
}

// Wire buttons
btnAll?.addEventListener("click", filterAll);
btnWdd?.addEventListener("click", filterWdd);
btnCse?.addEventListener("click", filterCse);

// Initial render
filterAll(); 